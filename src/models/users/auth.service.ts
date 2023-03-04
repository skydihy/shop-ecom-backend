import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { Repository } from 'typeorm';
import { promisify } from 'util';
import { BaseService } from '../base/base.service';
import { CreateUserDto } from './dto/create-user.dto';
import { SignInDto } from './dto/sign-in.dto';
import { User, UserDocument } from './entities/user.entity';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService extends BaseService<User> {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<UserDocument>,
  ) {
    super(userRepo);
  }

  async signup(body: CreateUserDto) {
    const { username, password } = body;
    const userResult = await this.findByCondition({
      where: {
        username,
      },
    });

    if (userResult.length) {
      throw new BadRequestException('username in use');
    }

    const salt = randomBytes(8).toString('hex');
    const hash = (await scrypt(password, salt, 32)) as Buffer;
    const hashed = salt + '.' + hash.toString('hex');

    const user = this.create({ ...body, password: hashed });

    return await this.save(user);
  }

  async signin(body: SignInDto) {
    const { username, password } = body;
    const userResult = await this.findOneByCondition({
      where: {
        username,
      },
    });

    if (!userResult) {
      throw new NotFoundException('user not found');
    }

    const [salt, storedHash] = userResult.password.split('.');
    const hash = (await scrypt(password, salt, 32)) as Buffer;

    if (hash.toString('hex') === storedHash) {
      return userResult;
    } else {
      throw new BadRequestException('bad password');
    }
  }
}
