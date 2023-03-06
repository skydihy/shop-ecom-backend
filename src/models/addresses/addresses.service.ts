import {
  ICreateAddressByUserId,
  IUpdateAddressByAddressId,
} from './types/index.d';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseService } from '../base/base.service';
import { UsersService } from '../users/users.service';
import { Address, AddressDocument } from './entities/address.entity';

@Injectable()
export class AddressesService extends BaseService<AddressDocument> {
  constructor(
    @InjectRepository(Address) private addressRepo: Repository<AddressDocument>,
    private userService: UsersService,
  ) {
    super(addressRepo);
  }

  /**
   * Get Address
   * @params userId
   * @returns promise<Address>
   **/
  async getAddressByUserId(userId: number) {
    const user = await this.userService.findOneByCondition({
      where: {
        id: userId,
      },
    });

    return await this.findOneByCondition({
      where: {
        user: user,
      },
    });
  }

  /**
   * Create a New Address
   * @params userId:number, address:Partial<AddressDocument>
   * @returns promise<AddressDocument>
   **/
  async createAddressByUserId(body: ICreateAddressByUserId) {
    const user = await this.userService.findOneByCondition({
      where: {
        id: body.userId,
      },
    });

    const addressData = this.create({
      ...body.address,
      user: user,
    });

    return await this.save(addressData);
  }

  /**
   * Update Address
   * @params userId:number, address:Partial<AddressDocument>
   * @returns promise<AddressDocument>
   **/
  async updateAddressByUserId(body: IUpdateAddressByAddressId) {
    const user = await this.userService.findOneByCondition({
      where: {
        id: body.userId,
      },
    });

    const isUserAddressExist = await this.addressRepo.exist({
      where: {
        id: body.addressId,
      },
    });

    if (isUserAddressExist) {
      const addressData = this.create({
        ...body.address,
        user: user,
      });

      return await this.updateOneById(body.addressId, addressData);
    }

    throw new NotFoundException('address id is not found');
  }
}
