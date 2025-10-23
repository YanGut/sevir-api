import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UserRoleService } from '../user-role/user-role.service';

@Injectable()
export class SeederService implements OnModuleInit {
  constructor(
    private readonly configService: ConfigService,
    private readonly userRoleService: UserRoleService,
  ) {}

  async onModuleInit() {
    const runSeed = this.configService.get<boolean>('runSeed');
    if (runSeed) {
      await this.seed();
    }
  }

  async seed(): Promise<void> {
    await this.userRoleService.seed();
  }
}
