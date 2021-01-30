import ICreateBanUserDTO from '../dtos/ICreateBanUserDTO';
import IDiscordUserDTO from '../dtos/IDiscordUserDTO';
import UserBanned from '../infra/typeorm/schemas/Ban';

export default interface IBanRepository {
  create(data: ICreateBanUserDTO): Promise<UserBanned>;
  findBannedUser(data: IDiscordUserDTO): Promise<UserBanned | undefined>;
  save(user: UserBanned): Promise<UserBanned>;
  destroy(use: UserBanned): Promise<void>;
}
