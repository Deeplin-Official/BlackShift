import { Message } from 'discord.js';
import { container, inject, injectable } from 'tsyringe';

import BotMessageService from '@shared/services/BotMessageService';
import ICreateStaffUserDTO from '../dtos/ICreateStaffUserDTO';

import StaffUser from '../infra/typeorm/schemas/StaffUser';
import IStaffsRepository from '../repositories/IStaffsRepository';

interface IRequest {
  staffUserData: ICreateStaffUserDTO;
  message: Message;
}

@injectable()
export default class CreateStaffUserService {
  constructor(
    @inject('StaffsRepository')
    private ormRepository: IStaffsRepository,
  ) {}

  async execute({ staffUserData, message }: IRequest): Promise<StaffUser> {
    const sendBotMessage = container.resolve(BotMessageService);

    const staffUser = this.ormRepository.create(staffUserData);

    await sendBotMessage.execute({
      discordMessage: message,
      message: '✅️ Staff successfully added.',
    });

    return staffUser;
  }
}
