import IDiscordUserDTO from '@modules/ban/dtos/IDiscordUserDTO';
import IWhoVotedDTO from '@modules/ban/dtos/IWhoVotedDTO';
import {
  Entity,
  ObjectID,
  ObjectIdColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('bans')
export default class Ban {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  discordBannedUser: IDiscordUserDTO;

  @Column()
  banCounts: number;

  @Column()
  whoVotedList: IWhoVotedDTO[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
