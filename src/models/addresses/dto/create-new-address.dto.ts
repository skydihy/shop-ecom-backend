import { Expose } from 'class-transformer';

export class CreateNewAddressDto {
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
