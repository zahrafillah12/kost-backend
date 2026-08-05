import { PartialType } from '@nestjs/mapped-types';
import { CreateKostDto } from './create-kost.dto';

export class UpdateKostDto extends PartialType(CreateKostDto) {}