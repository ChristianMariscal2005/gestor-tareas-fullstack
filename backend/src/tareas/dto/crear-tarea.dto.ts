import {
  IsString,
  IsNotEmpty,
  MaxLength,
  IsOptional,
  IsIn,
  IsDateString,
  IsInt,
} from 'class-validator';

export class CrearTareaDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(150)
  titulo: string;

  @IsString()
  @IsOptional()
  descripcion?: string;

  @IsIn(['Baja', 'Media', 'Alta'])
  prioridad: string;

  @IsDateString()
  @IsOptional()
  fecha_limite?: string;

  @IsOptional()
  @IsIn(['Pendiente', 'En progreso', 'Completada'])
  estado?: string;

  @IsOptional()
  @IsInt()
  usuario_id?: number;
}