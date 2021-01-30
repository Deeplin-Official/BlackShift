import { inject, injectable } from 'tsyringe';

import IBanRepository from '../repositories/IBanRepository';
import BannedUser from '../infra/typeorm/schemas/Ban';
import ICreateBanUserDTO from '../dtos/ICreateBanUserDTO';

@injectable()
export default class CreateBannedUserService {
  constructor(
    @inject('BansRepository')
    private ormRepository: IBanRepository,
  ) {}

  async execute({
    votedUser,
    whoVote,
  }: ICreateBanUserDTO): Promise<BannedUser> {
    const bannedUser = await this.ormRepository.create({
      votedUser: {
        id: votedUser.id,
        username: votedUser.username,
        avatar: votedUser.avatar || null,
      },
      whoVote: {
        id: whoVote.id,
        username: whoVote.username,
        avatar: whoVote.avatar,
      },
    });

    return bannedUser;
  }
}
