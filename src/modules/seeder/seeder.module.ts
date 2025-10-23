import { Module } from '@nestjs/common';
import { SeederService } from './seeder.service';
import { UserRoleModule } from '../user-role/user-role.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [UserRoleModule, ConfigModule],
  providers: [SeederService],
})
export class SeederModule {}
