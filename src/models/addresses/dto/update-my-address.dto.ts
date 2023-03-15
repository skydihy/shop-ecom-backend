import { SimpleUserDto } from '@/models/users/dto/user.dto';
import { Expose, Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';

/**
 * Request
 */
export class UpdateMyAddressDto {
  @IsNumber()
  addressId: number;

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

export class UpdateMyAddressResponseDto {
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
