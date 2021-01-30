import {
  Entity,
  ObjectID,
  ObjectIdColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('staffUsers')
export default class StaffUser {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  staff_id: string;

  @Column()
  username: string;

  @Column()
  avatar: string | null;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
