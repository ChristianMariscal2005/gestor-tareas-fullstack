import { Controller, Get, Inject } from '@nestjs/common';
import type { Pool } from 'mysql2/promise';
import { MYSQL_POOL } from './database/database.module.js';

@Controller()
export class AppController {
  constructor(
    @Inject(MYSQL_POOL)
    private readonly db: Pool,
  ) {}

  @Get('conexion')
  async comprobarConexion() {
    const [resultado] = await this.db.query('SELECT 1');

    return {
      mensaje: 'Conexión con MySQL exitosa',
      resultado,
    };
  }
}