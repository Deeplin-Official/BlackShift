import BotMessageService from '@shared/services/BotMessageService';
import { GuildMember, Message } from 'discord.js';
import { container, inject, injectable } from 'tsyringe';

import BannedUser from '../infra/typeorm/schemas/BannedUser';
import IBanRepository from '../repositories/IBanRepository';

interface IResquest {
  message: Message;
  member: GuildMember | undefined;
  bannedUser: BannedUser;
}

@injectable()
export default class BanUserService {
  constructor(
    @inject('BansRepository')
    private ormRepository: IBanRepository,
  ) {}

  async execute({ message, bannedUser, member }: IResquest): Promise<void> {
    const sendBotMessage = container.resolve(BotMessageService);

    if (!member) return;

    await member.ban({ reason: 'Test', days: 1 });

    await this.ormRepository.destroy(bannedUser);

    await sendBotMessage.execute({
      discordMessage: message,
      message: `${member.user.username} was banned of this server for 1 day`,
    });
  }
}
