import { container } from 'tsyringe';
import { Message } from 'discord.js';

import FindStaffUserService from '@modules/staff/services/FindStaffUserService';
import BotMessageService from '@shared/services/BotMessageService';

import CreateBannedUserService from './CreateBannedUserService';
import UpdateBannedUserService from './UpdateBannedUserService';
import GetBannedUserService from './GetBannedUserService';
import BanUserService from './BanUserService';

export default class SendBanMessageService {
  async execute(message: Message): Promise<void> {
    const createBannedUser = container.resolve(CreateBannedUserService);
    const updateBannedUser = container.resolve(UpdateBannedUserService);
    const getBannedUser = container.resolve(GetBannedUserService);
    const banUser = container.resolve(BanUserService);

    const getStaffUser = container.resolve(FindStaffUserService);
    const sendBotMessage = container.resolve(BotMessageService);

    const { author, mentions } = message;

    const target = mentions.users.first();

    if (!target) {
      await sendBotMessage.execute({
        discordMessage: message,
        message: '⛔️ Please inform a valid user',
      });
      return;
    }

    const checkYourselfBan = author.id === target.id;

    if (checkYourselfBan) {
      await sendBotMessage.execute({
        discordMessage: message,
        message: '⛔️ Cannot ban yourself',
      });
      return;
    }

    if (target.bot) {
      await sendBotMessage.execute({
        discordMessage: message,
        message: '⛔️ Cannot ban a bot',
      });
      return;
    }

    const checkStaffUser = await getStaffUser.execute({ staffId: target.id });

    if (checkStaffUser) {
      await sendBotMessage.execute({
        discordMessage: message,
        message: '⛔️ Cannot ban a staff user',
      });
      return;
    }

    const bannedUserData = await getBannedUser.execute({
      id: target.id,
      username: target.username,
      avatar: target.avatar,
    });

    if (bannedUserData) {
      const checkAlreadyVoted = bannedUserData.whoVotedList.find(
        votedUserData => votedUserData.id === author.id,
      );

      if (checkAlreadyVoted) {
        await sendBotMessage.execute({
          discordMessage: message,
          message: '⛔️ Cannot request a ban many times',
        });
        return;
      }

      if (bannedUserData.banCounts === 9) {
        await banUser.execute({
          message,
          member: message.guild?.members.cache.get(target.id),
          bannedUser: bannedUserData,
        });
      }

      await updateBannedUser.execute({
        bannedUserData,
        whoVotedUser: target,
      });
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

    await sendBotMessage.execute({
      discordMessage: message,
      message: `Thanks for voting 📢️`,
    });
  }
}
