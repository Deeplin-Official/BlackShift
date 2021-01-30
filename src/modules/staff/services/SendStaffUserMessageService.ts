import { container } from 'tsyringe';
import { Message } from 'discord.js';

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

/**
 * Todos
 *
 * [x] Somente um Staff pode rodar esse comando
 * [x] Verificar se o usuário ja existe no banco de dados
 * [x] Criar um staff no banco de dados se ele não existir
 * [] Remover um staff no banco de dados somente se ele existir
 *
 */

export default class SendStaffUserMessageService {
  async execute({ message, method }: IRequest): Promise<void> {
    try {
      const findStaff = container.resolve(FindStaffUserService);

      const { mentions, member } = message;

      const userTarget = mentions.users.first();
      const checkIsStaff = !!member?.roles.cache.find(
        roleName =>
          roleName.name === 'Administrator' || roleName.name === 'Moderator',
      );

      if (!checkIsStaff)
        throw new Error('⛔️ User not allowed to run this command.');

      if (!userTarget) throw new Error('⛔️ Please insert an user.');

      const foundStaffUser = await findStaff.execute({
        staffId: userTarget.id,
      });

      const { username, avatar, id } = userTarget;

      switch (method) {
        case 'add':
          if (foundStaffUser) throw new Error('⛔️ Staff already exists.');

          await this.AddStaff({
            message,
            staffUser: {
              staff_id: id,
              username,
              avatar: avatar || null,
            },
          });
          break;

        case 'remove':
          await this.RemoveStaff({ message, staff_id: id });
          break;
        default:
          throw new Error('⛔️ Method does not exists.');
      }
    } catch (error) {
      if (error.message) {
        message.channel.send(error.message);
      }
    }
  }

  private async AddStaff({
    message,
    staffUser,
  }: IAddStaffRequest): Promise<void> {
    const createStaffUser = container.resolve(CreateStaffUserService);

    createStaffUser.execute({ staffUserData: staffUser });

    message.channel.send('✅️ Staff successfully added.');
  }

  private async RemoveStaff({
    message,
    staff_id,
  }: IRemoveStaffRequest): Promise<void> {
    const removeStaff = container.resolve(RemoveStaffUserService);

    await removeStaff.execute({ staff_id });

    message.channel.send('✅️ Staff successfully removed.');
  }
}
