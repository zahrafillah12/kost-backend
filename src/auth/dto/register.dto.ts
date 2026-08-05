import { IsEmail, IsString, MinLength } from 'class-validator';

export class RegisterDto {
  @IsString()
  nama!: string;

  @IsEmail()
  email!: string;

  @MinLength(6)
  password!: string;
}