import { getMongoRepository, MongoRepository } from 'typeorm';

import ICreateBanUserDTO from '@modules/ban/dtos/ICreateBanUserDTO';
import IDiscordUserDTO from '@modules/ban/dtos/IDiscordUserDTO';
import BannedUser from '../schemas/BannedUser';

import IBanRepository from '../../../repositories/IBanRepository';

export default class BansRepository implements IBanRepository {
  private ormRepository: MongoRepository<BannedUser>;

  constructor() {
    this.ormRepository = getMongoRepository(BannedUser);
  }

  async create({ votedUser, whoVote }: ICreateBanUserDTO): Promise<BannedUser> {
    const createdBannedUser = this.ormRepository.create({
      discordBannedUser: {
        id: votedUser.id,
        username: votedUser.username,
        avatar: votedUser.avatar,
      },
      whoVotedList: [
        { id: whoVote.id, username: whoVote.username, avatar: whoVote.avatar },
      ],
      banCounts: 1,
    });

    await this.ormRepository.save(createdBannedUser);

    return createdBannedUser;
  }

  async findBannedUser(
    discordBannedUser: IDiscordUserDTO,
  ): Promise<BannedUser | undefined> {
    const bannedUser = await this.ormRepository.findOne({
      where: { discordBannedUser },
    });

    return bannedUser;
  }

  async save(user: BannedUser): Promise<BannedUser> {
    const bannedUser = await this.ormRepository.save(user);

    return bannedUser;
  }

  async destroy(user: BannedUser): Promise<void> {
    await this.ormRepository.delete(user);
  }
}
