import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateKostDto {
  @IsString()
  @IsNotEmpty()
  nama!: string;

  @IsString()
  @IsNotEmpty()
  alamat!: string;

  @IsString()
  @IsNotEmpty()
  kota!: string;

  @IsString()
  @IsNotEmpty()
  deskripsi!: string;

  @IsOptional()
  @IsString()
  foto?: string;
}