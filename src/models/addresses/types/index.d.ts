import { AddressDocument } from '../entities/address.entity';

export interface IUpdateAddressByAddressId {
  userId: number;
  addressId: number;
  address: Partial<AddressDocument>;
}

export interface ICreateAddressByUserId {
  userId: number;
  address: Partial<AddressDocument>;
}
