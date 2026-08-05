import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateKostDto } from './dto/create-kost.dto';
import { UpdateKostDto } from './dto/update-kost.dto';

@Injectable()
export class KostService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateKostDto) {
    return this.prisma.kost.create({
      data: dto,
    });
  }

  async findAll() {
    return this.prisma.kost.findMany({
      include: {
        rooms: true,
      },
    });
  }

  async findOne(id: number) {
    return this.prisma.kost.findUnique({
      where: { id },
      include: {
        rooms: true,
      },
    });
  }

  async update(id: number, dto: UpdateKostDto) {
    return this.prisma.kost.update({
      where: { id },
      data: dto,
    });
  }

  async remove(id: number) {
    return this.prisma.kost.delete({
      where: { id },
    });
  }
}