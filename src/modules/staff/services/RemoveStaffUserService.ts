import { Message } from 'discord.js';
import { container, inject, injectable } from 'tsyringe';

import BotMessageService from '@shared/services/BotMessageService';

import IStaffsRepository from '../repositories/IStaffsRepository';

interface IRequest {
  staff_id: string;
  message: Message;
}

@injectable()
export default class RemoveStaffUserService {
  constructor(
    @inject('StaffsRepository')
    private ormRepository: IStaffsRepository,
  ) {}

  async execute({ staff_id, message }: IRequest): Promise<void> {
    const sendBotMessage = container.resolve(BotMessageService);
    const foundStaffUser = await this.ormRepository.findByStaffId(staff_id);

    if (!foundStaffUser) throw new Error('⛔️ Staff not exists.');

    await this.ormRepository.destroy(foundStaffUser);

    await sendBotMessage.execute({
      discordMessage: message,
      message: '✅️ Staff successfully removed.',
    });
  }
}
