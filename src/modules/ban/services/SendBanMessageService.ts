import { container } from 'tsyringe';
import { Message } from 'discord.js';

import BannedUser from '../infra/typeorm/schemas/BannedUser';

import CreateBannedUserService from './CreateBannedUserService';
import UpdateBannedUserService from './UpdateBannedUserService';
import GetBannedUserService from './GetBannedUserService';
import BanUserService from './BanUserService';

export default class SendBanMessageService {
  async execute(message: Message): Promise<BannedUser | Message> {
    const createBannedUser = container.resolve(CreateBannedUserService);
    const updateBannedUser = container.resolve(UpdateBannedUserService);
    const getBannedUser = container.resolve(GetBannedUserService);
    const banUser = container.resolve(BanUserService);

    const { author, mentions } = message;

    const target = mentions.users.first();

    if (!target) {
      throw new Error();
    }

    try {
      const checkYourselfBan = author.id === target.id;

      if (checkYourselfBan) {
        return message.channel.send('Cannot ban yourself');
      }

      if (target.bot) return message.channel.send('Cannot ban a bot');

      const bannedUserData = await getBannedUser.execute({
        id: target.id,
        username: target.username,
        avatar: target.avatar,
      });

      if (bannedUserData) {
        const checkAlreadyVoted = bannedUserData.whoVotedList.find(
          votedUserData => votedUserData.id === author.id,
        );

        if (checkAlreadyVoted)
          return message.channel.send('Cannot request a ban many times');

        if (bannedUserData.banCounts === 10) {
          await banUser.execute({
            member: message.guild?.members.cache.get(target.id),
            bannedUser: bannedUserData,
            message,
          });
        }

        const updatedBannedUser = updateBannedUser.execute({
          bannedUserData,
          whoVotedUser: target,
        });

        return updatedBannedUser;
      }

      await createBannedUser.execute({
        votedUser: {
          id: target.id,
          username: target.username,
          avatar: target.avatar || null,
        },
        whoVote: {
          id: author.id,
          username: author.username,
          avatar: author.avatar,
        },
      });

      return message.channel.send(`Thanks for voting 📢️`);
    } catch (error) {
      console.log(error);

      return message.channel.send('Please inform a valid user');
    }
  }
}
