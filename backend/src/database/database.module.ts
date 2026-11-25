import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createPool } from 'mysql2/promise';

export const MYSQL_POOL = 'MYSQL_POOL';

@Module({
  providers: [
    {
      provide: MYSQL_POOL,
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return createPool({
          host: configService.getOrThrow<string>('DB_HOST'),
          port: configService.getOrThrow<number>('DB_PORT'),
          user: configService.getOrThrow<string>('DB_USER'),
          password: configService.getOrThrow<string>('DB_PASSWORD'),
          database: configService.getOrThrow<string>('DB_NAME'),
          waitForConnections: true,
          connectionLimit: 10,
          queueLimit: 0,
        });
      },
    },
  ],
  exports: [MYSQL_POOL],
})
export class DatabaseModule {}