import { inject, injectable } from 'tsyringe';
import ICreateStaffUserDTO from '../dtos/ICreateStaffUserDTO';

import StaffUser from '../infra/typeorm/schemas/StaffUser';
import IStaffsRepository from '../repositories/IStaffsRepository';

interface IRequest {
  staffUserData: ICreateStaffUserDTO;
}

@injectable()
export default class CreateStaffUserService {
  constructor(
    @inject('StaffsRepository')
    private ormRepository: IStaffsRepository,
  ) {}

  async execute({ staffUserData }: IRequest): Promise<StaffUser> {
    const staffUser = this.ormRepository.create(staffUserData);

    return staffUser;
  }
}
