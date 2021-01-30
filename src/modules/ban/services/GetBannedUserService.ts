import { inject, injectable } from 'tsyringe';

import IBanRepository from '../repositories/IBanRepository';
import BannedUser from '../infra/typeorm/schemas/BannedUser';
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
  }: IDiscordUserDTO): Promise<BannedUser | undefined> {
    const banExists = await this.ormRepository.findBannedUser({
      id,
      username,
      avatar,
    });

    return banExists;
  }
}
