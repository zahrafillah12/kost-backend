import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';

@Injectable()
export class RoomService {
  constructor(private prisma: PrismaService) {}

  create(dto: CreateRoomDto) {
    return this.prisma.room.create({
        data: dto,
    });
  }

  findAll() {
    return this.prisma.room.findMany({
      include: {
        kost: true,
      },
    });
  }

  findOne(id: number) {
    return this.prisma.room.findUnique({
      where: { id },
      include: {
        kost: true,
      },
    });
  }

  update(id: number, dto: UpdateRoomDto) {
    return this.prisma.room.update({
      where: { id },
      data: dto,
    });
  }

  remove(id: number) {
    return this.prisma.room.delete({
      where: { id },
    });
  }
}