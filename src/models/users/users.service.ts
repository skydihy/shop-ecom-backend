import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseService } from '../base/base.service';
import { User, UserDocument } from './entities/user.entity';

@Injectable()
export class UsersService extends BaseService<UserDocument> {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<UserDocument>,
  ) {
    super(userRepo);
  }
}
