import { container } from 'tsyringe';

import BansRepository from '@modules/ban/infra/typeorm/repositories/BansRepository';
import IBanRepository from '@modules/ban/repositories/IBanRepository';

import IStaffsRepository from '@modules/staff/repositories/IStaffsRepository';
import StaffUsersRepository from '@modules/staff/infra/typeorm/repositories/StaffUsersRepository';

container.registerSingleton<IBanRepository>('BansRepository', BansRepository);

container.registerSingleton<IStaffsRepository>(
  'StaffsRepository',
  StaffUsersRepository,
);
