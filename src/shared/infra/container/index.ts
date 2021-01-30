import { container } from 'tsyringe';

import BansRepository from '@modules/ban/infra/typeorm/repositories/BansRepository';
import IBanRepository from '@modules/ban/repositories/IBanRepository';

container.registerSingleton<IBanRepository>('BansRepository', BansRepository);
