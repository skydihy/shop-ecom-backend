import { Expose } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateMyAddressDto {
  @Expose()
  @IsNumber()
  addressId: number;

  @Expose()
  @IsString()
  address: string;

  @Expose()
  @IsString()
  @IsOptional()
  subDistrict: string;

  @Expose()
  @IsString()
  district: string;

  @Expose()
  @IsString()
  city: string;

  @Expose()
  @IsString()
  postalCode: string;

  @Expose()
  @IsString()
  country: string;
}
