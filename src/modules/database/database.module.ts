import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const isDevelopmentEnv =
          configService.get('NODE_ENV') === 'development';
        const dbConfig: DataSourceOptions & SeederOptions = {
          type: 'postgres',
          host: configService.get('DATABASE_HOST'),
          port: configService.get('DATABASE_PORT'),
          username: configService.get('DATABASE_USERNAME'),
          password: configService.get('DATABASE_PASSWORD'),
          database: configService.get('DATABASE_NAME'),
          entities: [__dirname + '/../../**/*.entity{.ts,.js}'],
          synchronize: isDevelopmentEnv,
          logging: isDevelopmentEnv,
          seeds: [__dirname + '/../../**/*.seeder{.ts,.js}'],
        };

        return dbConfig;
      },
    }),
  ],
})
export class DatabaseModule {}
