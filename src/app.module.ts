import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { KostModule } from './kost/kost.module';
import { RoomModule } from './room/room.module';
import { BookingModule } from './booking/booking.module';
import { UploadModule } from './uplaod/upload.modul';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    UsersModule,
    KostModule,
    RoomModule,
    BookingModule,
    UploadModule,
  ],
})
export class AppModule {}