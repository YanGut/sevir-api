import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('database.postgres.host', 'localhost'),
        port: configService.get<number>('database.postgres.port', 5433),
        username: configService.get<string>('database.postgres.username', 'servir_mais_user'),
        password: configService.get<string>('database.postgres.password', '12345678'),
        database: configService.get<string>('database.postgres.database', 'servir_mais_db'),
        synchronize: configService.get<boolean>('database.synchronize', true),
        dropSchema: configService.get<string>('environment') !== 'production',
        autoLoadEntities: true,
        logging: ['error'],
      }),
    }),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
