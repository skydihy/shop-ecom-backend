import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseService } from '../base/base.service';
import { Address, AddressDocument } from './entities/address.entity';

@Injectable()
export class AddressesService extends BaseService<AddressDocument> {
  constructor(
    @InjectRepository(Address) private addressRepo: Repository<AddressDocument>,
  ) {
    super(addressRepo);
  }
}
