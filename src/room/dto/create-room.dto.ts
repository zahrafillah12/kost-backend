import {IsInt,IsNotEmpty,IsOptional,IsString,} from 'class-validator';
export class CreateRoomDto {
  @IsString()
  @IsNotEmpty()
  namaKamar!: string;

  @IsInt()
  harga!: number;

  @IsInt()
  stok!: number;

  @IsString()
  fasilitas!: string;

  @IsOptional()
  @IsString()
  foto?: string;

  @IsInt()
  kostId!: number;
}