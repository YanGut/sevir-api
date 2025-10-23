import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

import { DatabaseModule } from './modules/database/database.module';

import config from './common/config/config';
import { LoggingMiddleware } from './common/middlewares/logging.middleware';
import { UserModule } from './modules/user/user.module';
import { UserRoleModule } from './modules/user-role/user-role.module';
import { DepartmentModule } from './modules/department/department.module';
import { VolunteerHasDepartmentModule } from './modules/volunteer-has-department/volunteer-has-department.module';

import { VolunteerModule } from './modules/volunteer/volunteer.module';
import { GcParticipationTimeModule } from './modules/gc-participation-time/gc-participation-time.module';
import { AboutYouModule } from './modules/about-you/about-you.module';
import { FundamentalLineCourseModule } from './modules/fundamental-line-course/fundamental-line-course.module';
import { PhoneNumberModule } from './modules/phone-number/phone-number.module';
import { AuthModule } from './modules/auth/auth.module';
import { VolunteerStatusModule } from './modules/volunteer-status/volunteer-status.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [config],
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      global: true,
      useFactory: async (configService: ConfigService) => {
        const secret = await Promise.resolve(configService.get<string>('jwt.secret'));
        return { secret };
      },
    }),
    DatabaseModule,
    UserModule,
    UserRoleModule,
    DepartmentModule,
    VolunteerHasDepartmentModule,
    VolunteerStatusModule,
    VolunteerModule,
    GcParticipationTimeModule,
    AboutYouModule,
    FundamentalLineCourseModule,
    PhoneNumberModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggingMiddleware).forRoutes('*');
  }
}
