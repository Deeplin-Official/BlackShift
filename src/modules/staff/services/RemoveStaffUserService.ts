import { inject, injectable } from 'tsyringe';

import IStaffsRepository from '../repositories/IStaffsRepository';

interface IRequest {
  staff_id: string;
}

@injectable()
export default class RemoveStaffUserService {
  constructor(
    @inject('StaffsRepository')
    private ormRepository: IStaffsRepository,
  ) {}

  async execute({ staff_id }: IRequest): Promise<void> {
    const foundStaffUser = await this.ormRepository.findByStaffId(staff_id);

    if (!foundStaffUser) throw new Error('⛔️ Staff not exists.');

    await this.ormRepository.destroy(foundStaffUser);
  }
}
