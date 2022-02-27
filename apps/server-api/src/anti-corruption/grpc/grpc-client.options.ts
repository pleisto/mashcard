import { ClientOptions, Transport } from '@nestjs/microservices'
import { join } from 'path'

export const grpcClientOptions: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    package: 'anti_corruption',
    protoPath: join(__dirname, 'main.proto'),
    url: 'localhost:3090'
  }
}
