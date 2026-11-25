import { Injectable, Inject } from '@nestjs/common';
import type { Pool } from 'mysql2/promise';
import { MYSQL_POOL } from '../database/database.module.js';
import { ResultSetHeader } from 'mysql2/promise';
import { ActualizarTareaDto } from './dto/actualizar-tarea.js';
import {
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';

@Injectable()
export class TareasService {
  constructor(
    @Inject(MYSQL_POOL)
    private readonly db: Pool,
  ) {}

  async obtenerTareas() {
    const [resultado] = await this.db.query('SELECT * FROM tareas');

    return resultado;
  }

  async crearTarea(datos: any) {
    const [resultado] = await this.db.execute(
      `INSERT INTO tareas 
      (titulo, descripcion, prioridad, estado, fecha_limite, usuario_id)
      VALUES (?, ?, ?, ?, ?, ?)`,
      [
        datos.titulo,
        datos.descripcion,
        datos.prioridad,
        datos.estado,
        datos.fecha_limite,
        datos.usuario_id,
      ],
    );

    return resultado;
  }

async editarTarea(id: number, datos: ActualizarTareaDto) {

  const [tarea] = await this.db.execute(
    'SELECT id FROM tareas WHERE id = ?',
    [id],
  );

  if ((tarea as any[]).length === 0) {
    throw new NotFoundException('Tarea no encontrada');
  }

  const campos: string[] = [];
  const valores: any[] = [];

  if (datos.titulo !== undefined) {
    campos.push('titulo = ?');
    valores.push(datos.titulo);
  }

  if (datos.descripcion !== undefined) {
    campos.push('descripcion = ?');
    valores.push(datos.descripcion);
  }

  if (datos.prioridad !== undefined) {
    campos.push('prioridad = ?');
    valores.push(datos.prioridad);
  }

  if (datos.fecha_limite !== undefined) {
    campos.push('fecha_limite = ?');
    valores.push(datos.fecha_limite);
  }

  if (datos.estado !== undefined) {
    campos.push('estado = ?');
    valores.push(datos.estado);
  }

  if (campos.length === 0) {
    throw new BadRequestException('No se enviaron datos para actualizar');
  }

  valores.push(id);

  const [resultado] = await this.db.execute<ResultSetHeader>(
    `UPDATE tareas SET ${campos.join(', ')} WHERE id = ?`,
    valores,
  );

  return resultado;
}
async eliminarTarea(id: number) {
  const [resultado] = await this.db.execute<ResultSetHeader>(
    'DELETE FROM tareas WHERE id = ?',
    [id],
  );

  if (resultado.affectedRows === 0) {
    throw new NotFoundException('Tarea no encontrada');
  }

  return resultado;
}
  
}