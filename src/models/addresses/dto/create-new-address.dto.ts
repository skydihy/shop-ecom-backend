import { SimpleUserDto } from '@/models/users/dto/user.dto';
import { Expose, Type } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';

/**
 * Request
 */
export class CreateNewAddressDto {
  @IsString()
  address: string;

  @IsString()
  @IsOptional()
  subDistrict: string;

  @IsString()
  district: string;

  @IsString()
  city: string;

  @IsString()
  postalCode: string;

  @IsString()
  country: string;
}

/**
 * Response
 */
export class CreateNewAddressResponseDto {
  @Expose()
  @Type(() => SimpleUserDto)
  user: SimpleUserDto;

  @Expose()
  address: string;

  @Expose()
  subDistrict: string;

  @Expose()
  district: string;

  @Expose()
  city: string;

  @Expose()
  postalCode: string;

  @Expose()
  country: string;
}
