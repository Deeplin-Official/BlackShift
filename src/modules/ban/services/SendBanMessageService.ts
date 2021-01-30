import { container } from 'tsyringe';
import { Message } from 'discord.js';

import discorApi from '@shared/infra/http/services/ApiService';

import CreateBannedUserService from './CreateBannedUserService';
import UpdateBannedUserService from './UpdateBannedUserService';
import GetBannedUserService from './GetBannedUserService';

import Ban from '../infra/typeorm/schemas/Ban';
import IDiscordUserDTO from '../dtos/IDiscordUserDTO';

export default class SendBanMessageService {
  async execute(message: Message, votedUser: string): Promise<Ban | Message> {
    const createBannedUser = container.resolve(CreateBannedUserService);
    const updateBannedUser = container.resolve(UpdateBannedUserService);
    const getBannedUser = container.resolve(GetBannedUserService);

    const checkValidvotedUser = !!votedUser.includes('@');
    const votedUserId = votedUser
      .replace('<', '')
      .replace('>', '')
      .replace('!', '')
      .replace('@', '');

    const { author } = message;

    try {
      const checkYourselfBan = author.id === votedUserId;

      if (!checkValidvotedUser) throw new Error();

      if (checkYourselfBan) {
        return message.reply('Cannot ban yourself');
      }

      const { data: discordVotedUser } = await discorApi.get<IDiscordUserDTO>(
        `users/${votedUserId}`,
      );

      if (discordVotedUser.bot) return message.reply('Cannot ban a bot');

      const bannedUserData = await getBannedUser.execute({
        id: discordVotedUser.id,
        username: discordVotedUser.username,
        avatar: discordVotedUser.avatar,
      });

      if (bannedUserData) {
        const checkAlreadyVoted = bannedUserData.whoVotedList.find(
          votedUserData => votedUserData.id === author.id,
        );

        if (checkAlreadyVoted)
          return message.reply('Cannot request a ban many times');

        const updatedBannedUser = updateBannedUser.execute({
          bannedUserData,
          whoVotedUser: discordVotedUser,
        });

        return updatedBannedUser;
      }

      await createBannedUser.execute({
        votedUser: {
          id: discordVotedUser.id,
          username: discordVotedUser.username,
          avatar: discordVotedUser.avatar || null,
        },
        whoVote: {
          id: author.id,
          username: author.username,
          avatar: author.avatar,
        },
      });

      return message.reply(`Thanks for voting 📢️`);
    } catch (error) {
      return message.reply('Please inform a valid user');
    }
  }
}
