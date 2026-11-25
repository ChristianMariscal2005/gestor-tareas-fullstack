import { PartialType } from '@nestjs/mapped-types';
import { CrearTareaDto } from './crear-tarea.dto.js';

export class ActualizarTareaDto extends PartialType(CrearTareaDto) {}