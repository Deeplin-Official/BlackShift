import { GuildMember, Message } from 'discord.js';
import { inject, injectable } from 'tsyringe';

import BannedUser from '../infra/typeorm/schemas/Ban';
import IBanRepository from '../repositories/IBanRepository';

interface IResquest {
  member: GuildMember | undefined;
  bannedUser: BannedUser;
  message: Message;
}

@injectable()
export default class BanUserService {
  constructor(
    @inject('BansRepository')
    private ormRepository: IBanRepository,
  ) {}

  async execute({ member, bannedUser, message }: IResquest): Promise<void> {
    if (!member) return;

    await member.ban({ reason: 'Test', days: 1 });

    await this.ormRepository.destroy(bannedUser);

    message.channel.send(
      `${member.user.username} was banned of this server for 1 day`,
    );
  }
}
