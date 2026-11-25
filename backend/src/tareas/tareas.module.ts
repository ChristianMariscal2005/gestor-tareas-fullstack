import { Module } from '@nestjs/common';
import { TareasController } from './tareas.controller.js';
import { TareasService } from './tareas.service.js';
import { DatabaseModule } from '../database/database.module.js';

@Module({
  imports: [DatabaseModule],
  controllers: [TareasController],
  providers: [TareasService],
})
export class TareasModule {}