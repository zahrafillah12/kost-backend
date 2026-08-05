import {Controller,Post,UploadedFile,UseInterceptors,} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('upload')
export class UploadController {

  @Post('kost')
  @UseInterceptors(
    FileInterceptor('foto', {
      storage: diskStorage({
        destination: './uploads/kost',

        filename(req, file, callback) {
          const uniqueName =
            Date.now() +
            '-' +
            Math.round(Math.random() * 1000000) +
            extname(file.originalname);

          callback(null, uniqueName);
        },
      }),
    }),
  )
  uploadKost(@UploadedFile() file: Express.Multer.File) {
    return {
      message: 'Upload berhasil',
      filename: file.filename,
      path: '/uploads/kost/' + file.filename,
    };
  }

  @Post('room')
  @UseInterceptors(
    FileInterceptor('foto', {
      storage: diskStorage({
        destination: './uploads/room',

        filename(req, file, callback) {
          const uniqueName =
            Date.now() +
            '-' +
            Math.round(Math.random() * 1000000) +
            extname(file.originalname);

          callback(null, uniqueName);
        },
      }),
    }),
  )
  uploadRoom(@UploadedFile() file: Express.Multer.File) {
    return {
      message: 'Upload berhasil',
      filename: file.filename,
      path: '/uploads/room/' + file.filename,
    };
  }
}