import { IsInt, IsString } from 'class-validator';

export class CreateRoomDto {
  @IsString()
  namaKamar!: string;

  @IsInt()
  harga!: number;

  @IsInt()
  stok!: number;

  @IsString()
  fasilitas!: string;

  @IsInt()
  kostId!: number;
}