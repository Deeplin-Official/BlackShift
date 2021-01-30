import { inject, injectable } from 'tsyringe';
import IBanRepository from '../repositories/IBanRepository';
import BannedUser from '../infra/typeorm/schemas/BannedUser';
import IDiscordUserDTO from '../dtos/IDiscordUserDTO';

interface IRequest {
  bannedUserData: BannedUser;
  whoVotedUser: IDiscordUserDTO;
}

@injectable()
export default class UpdateBannedUserService {
  constructor(
    @inject('BansRepository')
    private ormRepository: IBanRepository,
  ) {}

  async execute({
    bannedUserData,
    whoVotedUser,
  }: IRequest): Promise<BannedUser> {
    const bannedUser = bannedUserData;

    bannedUser.banCounts += 1;
    bannedUser.whoVotedList = [
      ...bannedUser.whoVotedList,
      {
        id: whoVotedUser.id,
        username: whoVotedUser.username,
        avatar: whoVotedUser.avatar,
      },
    ];

    const updatedvotedUser = await this.ormRepository.save(bannedUser);

    return updatedvotedUser;
  }
}
