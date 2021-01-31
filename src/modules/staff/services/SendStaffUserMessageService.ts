import { container } from 'tsyringe';
import { Message } from 'discord.js';

import BotMessageService from '@shared/services/BotMessageService';
import CreateStaffUserService from './CreateStaffUserService';
import FindStaffUserService from './FindStaffUserService';
import ICreateStaffUserDTO from '../dtos/ICreateStaffUserDTO';
import RemoveStaffUserService from './RemoveStaffUserService';

interface IRequest {
  message: Message;
  method: 'add' | 'remove';
}

interface IAddStaffRequest {
  message: Message;
  staffUser: ICreateStaffUserDTO;
}

interface IRemoveStaffRequest {
  message: Message;
  staff_id: string;
}

export default class SendStaffUserMessageService {
  async execute({ message, method }: IRequest): Promise<void> {
    const findStaff = container.resolve(FindStaffUserService);
    const sendBotMessage = container.resolve(BotMessageService);

    const { mentions, member } = message;

    const userTarget = mentions.users.first();
    const checkIsStaff = !!member?.roles.cache.find(
      roleName =>
        roleName.name === 'Administrator' || roleName.name === 'Moderator',
    );

    if (!checkIsStaff) {
      await sendBotMessage.execute({
        discordMessage: message,
        message: '⛔️ User not allowed to run this command.',
      });
      return;
    }

    if (!userTarget) {
      await sendBotMessage.execute({
        discordMessage: message,
        message: '⛔️ Please insert an user.',
      });
      return;
    }

    const foundStaffUser = await findStaff.execute({
      staffId: userTarget.id,
    });

    const { username, avatar, id } = userTarget;

    switch (method) {
      case 'add':
        if (foundStaffUser) {
          await sendBotMessage.execute({
            discordMessage: message,
            message: '⛔️ Staff already exists.',
          });
          return;
        }

        await this.AddStaff({
          staffUser: {
            staff_id: id,
            username,
            avatar: avatar || null,
          },
          message,
        });
        break;

      case 'remove':
        await this.RemoveStaff({ staff_id: id, message });
        break;
      default:
        await sendBotMessage.execute({
          discordMessage: message,
          message: '⛔️ Method does not exists.',
        });
    }
  }

  private async AddStaff({
    staffUser,
    message,
  }: IAddStaffRequest): Promise<void> {
    const createStaffUser = container.resolve(CreateStaffUserService);

    createStaffUser.execute({ staffUserData: staffUser, message });
  }

  private async RemoveStaff({
    staff_id,
    message,
  }: IRemoveStaffRequest): Promise<void> {
    const removeStaff = container.resolve(RemoveStaffUserService);

    await removeStaff.execute({ staff_id, message });
  }
}
