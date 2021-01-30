import { inject, injectable } from 'tsyringe';

import StaffUser from '../infra/typeorm/schemas/StaffUser';
import IStaffsRepository from '../repositories/IStaffsRepository';

interface IRequest {
  staffId: string;
}

@injectable()
export default class FindStaffUserService {
  constructor(
    @inject('StaffsRepository')
    private ormRepository: IStaffsRepository,
  ) {}

  async execute({ staffId }: IRequest): Promise<StaffUser | undefined> {
    const staffUser = this.ormRepository.findByStaffId(staffId);

    return staffUser;
  }
}
