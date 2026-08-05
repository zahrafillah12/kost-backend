import { IsDateString, IsInt } from 'class-validator';

export class CreateBookingDto {
  @IsInt()
  roomId!: number;

  @IsDateString()
  tanggalMasuk!: string;

  @IsInt()
  durasi!: number;
}