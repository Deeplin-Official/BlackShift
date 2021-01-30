import { MongoRepository, getMongoRepository } from 'typeorm';

import ICreateStaffUserDTO from '@modules/staff/dtos/ICreateStaffUserDTO';
import IStaffsRepository from '@modules/staff/repositories/IStaffsRepository';

import StaffUser from '../schemas/StaffUser';

export default class StaffUsersRepository implements IStaffsRepository {
  private ormRepository: MongoRepository<StaffUser>;

  constructor() {
    this.ormRepository = getMongoRepository('staffUsers');
  }

  async create(data: ICreateStaffUserDTO): Promise<StaffUser> {
    const createdStaffUser = this.ormRepository.create(data);

    await this.ormRepository.save(createdStaffUser);

    return createdStaffUser;
  }

  async findByStaffId(staff_id: string): Promise<StaffUser | undefined> {
    const foundStaffUser = await this.ormRepository.findOne({
      where: { staff_id },
    });

    return foundStaffUser;
  }

  async destroy(data: StaffUser): Promise<void> {
    await this.ormRepository.delete(data);
  }

  async save(data: StaffUser): Promise<StaffUser> {
    const updatedStaffUser = await this.ormRepository.save(data);

    return updatedStaffUser;
  }
}
