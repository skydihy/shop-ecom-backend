import {
  CreateNewAddressDto,
  CreateNewAddressResponseDto,
} from './dto/create-new-address.dto';
import { AuthGuard } from '@/guards/auth.guard';
import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { CurrentUser } from '../users/decorators/current-user.decorator';
import { User } from '../users/entities/user.entity';
import { AddressesService } from './addresses.service';
import {
  UpdateMyAddressDto,
  UpdateMyAddressResponseDto,
} from './dto/update-my-address.dto';
import { Serialize } from '@/interceptors/serialize.interceptor';

@UseGuards(AuthGuard)
@Controller('addresses')
export class AddressesController {
  constructor(private addressesService: AddressesService) {}

  @Get('')
  async getMyAddress(@CurrentUser() user: User) {
    return await this.addressesService.findOneByCondition({
      where: {
        id: user.id,
      },
    });
  }

  @Serialize(CreateNewAddressResponseDto)
  @Post('')
  async createAddressByUserId(
    @CurrentUser() user: User,
    @Body() address: CreateNewAddressDto,
  ) {
    return this.addressesService.create({
      user: user[0],
      ...address,
    });
  }

  @Serialize(UpdateMyAddressResponseDto)
  @Put('')
  async updateMyAddress(
    @CurrentUser() user: User,
    @Body() body: UpdateMyAddressDto,
  ) {
    const userAddressExisted = await this.addressesService.findOneByCondition({
      where: {
        id: body.addressId,
      },
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { addressId, ...restOfBody } = body;

    if (userAddressExisted) {
      return await this.addressesService.updateOneById(userAddressExisted.id, {
        ...restOfBody,
        user: user[0],
      });
    } else {
      throw new NotFoundException();
    }
  }
}
