import { Controller, Get, Post, Patch, Delete,  Body, Param } from '@nestjs/common';
import { TareasService } from './tareas.service.js';
import { CrearTareaDto } from './dto/crear-tarea.dto.js';
import { ActualizarTareaDto } from './dto/actualizar-tarea.js'; 
import { ParseIntPipe } from '@nestjs/common'; 

@Controller('tareas')
export class TareasController {
  constructor(private readonly tareasService: TareasService) {}

  @Get()
  obtenerTareas() {
    return this.tareasService.obtenerTareas();
  }

  @Post()
  crearTarea(@Body() datos: CrearTareaDto ) {
    return this.tareasService.crearTarea(datos);
  }

  @Patch(':id')
  editarTarea(
    @Param('id', ParseIntPipe) id: number,
    @Body() datos: ActualizarTareaDto,
  ) {
    return this.tareasService.editarTarea(id, datos);
  }

  @Delete(':id')
  eliminarTarea(@Param('id', ParseIntPipe) id: number) {
    return this.tareasService.eliminarTarea(id);
  }

}