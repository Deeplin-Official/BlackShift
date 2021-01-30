import { inject, injectable } from 'tsyringe';

import IBanRepository from '../repositories/IBanRepository';
import UserBanned from '../infra/typeorm/schemas/Ban';
import IDiscordUserDTO from '../dtos/IDiscordUserDTO';

@injectable()
export default class GetBannedUserService {
  constructor(
    @inject('BansRepository')
    private ormRepository: IBanRepository,
  ) {}

  async execute({
    id,
    avatar,
    username,
  }: IDiscordUserDTO): Promise<UserBanned | undefined> {
    const banExists = await this.ormRepository.findBannedUser({
      id,
      username,
      avatar,
    });

    return banExists;
  }
}
