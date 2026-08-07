import {BadRequestException,Injectable,UnauthorizedException,} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Role } from '@prisma/client';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  // =========================
  // REGISTER USER
  // =========================
  async register(dto: RegisterDto) {
    const existingUser = await this.usersService.findByEmail(dto.email);

    if (existingUser) {
      throw new BadRequestException('Email sudah digunakan');
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10);

    const user = await this.usersService.create({
  nama: dto.nama,
  email: dto.email,
  password: hashedPassword,
  role: dto.role ?? Role.USER,
});

    return {
      message: 'Register berhasil',
      data: {
        id: user.id,
        nama: user.nama,
        email: user.email,
        role: user.role,
      },
    };
  }

  // =========================
  // LOGIN USER
  // =========================
  async login(dto: LoginDto) {
    const user = await this.usersService.findByEmail(dto.email);

    if (!user) {
      throw new UnauthorizedException('Email atau password salah');
    }

    if (user.role !== Role.USER) {
      throw new UnauthorizedException(
        'Silakan login melalui halaman admin',
      );
    }

    const isPasswordMatch = await bcrypt.compare(
      dto.password,
      user.password,
    );

    if (!isPasswordMatch) {
      throw new UnauthorizedException('Email atau password salah');
    }

    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role,
    };

    return {
      message: 'Login berhasil',
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        nama: user.nama,
        email: user.email,
        role: user.role,
      },
    };
  }

  // =========================
  // LOGIN ADMIN
  // =========================
  async adminLogin(dto: LoginDto) {
    const admin = await this.usersService.findByEmail(dto.email);

    if (!admin) {
      throw new UnauthorizedException('Email atau password salah');
    }

    if (admin.role !== Role.ADMIN) {
      throw new UnauthorizedException(
        'Akun ini bukan admin',
      );
    }

    const isPasswordMatch = await bcrypt.compare(
      dto.password,
      admin.password,
    );

    if (!isPasswordMatch) {
      throw new UnauthorizedException('Email atau password salah');
    }

    const payload = {
      sub: admin.id,
      email: admin.email,
      role: admin.role,
    };

    return {
      message: 'Login Admin berhasil',
      access_token: this.jwtService.sign(payload),
      admin: {
        id: admin.id,
        nama: admin.nama,
        email: admin.email,
        role: admin.role,
      },
    };
  }
}