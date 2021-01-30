import IStaffUserDTO from '../dtos/ICreateStaffUserDTO';
import StaffUser from '../infra/typeorm/schemas/StaffUser';

export default interface IStaffsRepository {
  create(data: IStaffUserDTO): Promise<StaffUser>;
  findByStaffId(staff_id: string): Promise<StaffUser | undefined>;
  destroy(data: StaffUser): Promise<void>;
  save(data: StaffUser): Promise<StaffUser>;
}
