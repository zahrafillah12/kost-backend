import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { BookingService } from './booking.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '@prisma/client';

@ApiTags('Booking')
@Controller('booking')
export class BookingController {
  constructor(private bookingService: BookingService) {}

  // User bisa melakukan booking tanpa token
  @Post()
  create(@Body() dto: CreateBookingDto) {
    return this.bookingService.create(dto.userId, dto);
  }

  // Hanya Admin yang dapat melihat semua booking
  @ApiBearerAuth()
  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  findAll() {
    return this.bookingService.findAll();
  }

  // User bisa melihat booking miliknya berdasarkan userId (tanpa token)
  @Get('user/:userId')
  findUserBooking(@Param('userId', ParseIntPipe) userId: number) {
    return this.bookingService.findMyBooking(userId);
  }
}