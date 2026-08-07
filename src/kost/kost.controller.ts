import {Body,Controller,Delete,Get,Param,ParseIntPipe,Patch,Post,UseGuards,} from '@nestjs/common';
import { Role } from '@prisma/client';
import { KostService } from './kost.service';
import { CreateKostDto } from './dto/create-kost.dto';
import { UpdateKostDto } from './dto/update-kost.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@Controller('kost')
export class KostController {
  constructor(private readonly kostService: KostService) {}

  // Semua user bisa melihat daftar kost
  @Get()
  findAll() {
    return this.kostService.findAll();
  }

  // Semua user bisa melihat detail kost
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.kostService.findOne(id);
  }

  // Hanya admin yang bisa menambah kost
  @Post()
  create(@Body() dto: CreateKostDto) {
    return this.kostService.create(dto);
  }

  // Hanya admin yang bisa mengubah kost
  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateKostDto,
  ) {
    return this.kostService.update(id, dto);
  }

  // Hanya admin yang bisa menghapus kost
  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.kostService.remove(id);
  }
}