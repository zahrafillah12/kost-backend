import { BookingStatus } from '@prisma/client';
import {BadRequestException,Injectable,NotFoundException,} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBookingDto } from './dto/create-booking.dto';

@Injectable()
export class BookingService {
  constructor(private readonly prisma: PrismaService) {}

  // ==========================
  // USER BOOKING KAMAR
  // ==========================
  async create(userId: number, dto: CreateBookingDto) {
    // Cari kamar
    const room = await this.prisma.room.findUnique({
      where: {
        id: dto.roomId,
      },
    });

    if (!room) {
      throw new NotFoundException('Kamar tidak ditemukan');
    }

    // Cek stok kamar
    if (room.stok <= 0) {
      throw new BadRequestException('Kamar sudah penuh');
    }

    // Hitung total harga
    const totalHarga = room.harga * dto.durasi;

    // Simpan booking
    const booking = await this.prisma.booking.create({
      data: {
        tanggalMasuk: new Date(dto.tanggalMasuk),
        durasi: dto.durasi,
        totalHarga: totalHarga,

        user: {
          connect: {
            id: userId,
          },
        },

        room: {
          connect: {
            id: dto.roomId,
          },
        },
      },

      include: {
        user: true,
        room: true,
      },
    });

    // Kurangi stok kamar
    await this.prisma.room.update({
      where: {
        id: dto.roomId,
      },
      data: {
        stok: {
          decrement: 1,
        },
      },
    });

    return booking;
  }

  // ==========================
  // ADMIN MELIHAT SEMUA BOOKING
  // ==========================
  async findAll() {
    return this.prisma.booking.findMany({
      include: {
        user: true,
        room: {
          include: {
            kost: true,
          },
        },
      },
      orderBy: {
        id: 'desc',
      },
    });
  }

  // ==========================
  // USER MELIHAT BOOKING SENDIRI
  // ==========================
  async findMyBooking(userId: number) {
    return this.prisma.booking.findMany({
      where: {
        userId,
      },

      include: {
        room: {
          include: {
            kost: true,
          },
        },
      },

      orderBy: {
        id: 'desc',
      },
    });
  }

  // ==========================
  // DETAIL BOOKING
  // ==========================
  async findOne(id: number) {
    const booking = await this.prisma.booking.findUnique({
      where: {
        id,
      },

      include: {
        user: true,
        room: {
          include: {
            kost: true,
          },
        },
      },
    });

    if (!booking) {
      throw new NotFoundException('Booking tidak ditemukan');
    }

    return booking;
  }

  // ==========================
  // ADMIN KONFIRMASI BOOKING
  // ==========================
  async confirm(id: number) {
    return this.prisma.booking.update({
      where: {
        id,
      },

     data: {
    status: BookingStatus.CONFIRMED,
},
    });
  }

  // ==========================
  // ADMIN MENOLAK BOOKING
  // ==========================
  async reject(id: number) {
    return this.prisma.booking.update({
      where: {
        id,
      },

      data: {
        status: 'REJECTED',
      },
    });
  }

  // ==========================
  // HAPUS BOOKING
  // ==========================
  async remove(id: number) {
    return this.prisma.booking.delete({
      where: {
        id,
      },
    });
  }
}