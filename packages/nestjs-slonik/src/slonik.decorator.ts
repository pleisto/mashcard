import { Inject } from '@nestjs/common'
import { SlonikModuleOptions } from './slonik.interface'
import { getPoolToken } from './slonik.utils'

export const InjectPool = (options?: SlonikModuleOptions | string): ParameterDecorator => Inject(getPoolToken(options))
