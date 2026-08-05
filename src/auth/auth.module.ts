import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { JwtStrategy } from './strategies/jwt.strategy';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { RolesGuard } from './guards/roles.guard';

@Module({
  imports: [
    UsersModule,

    JwtModule.register({
  global: true,
  secret: process.env.JWT_SECRET as string,
  signOptions: {
    expiresIn: '1d',
  },
}),
  ],

  controllers: [AuthController],

  providers: [
     AuthService,
    JwtStrategy,
    JwtAuthGuard,
    RolesGuard,
  ],
})
export class AuthModule {}