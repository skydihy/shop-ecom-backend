import { CreateNewAddressDto } from './dto/create-new-address.dto';
import { instanceToPlain } from 'class-transformer';
import { AuthGuard } from '@/guards/auth.guard';
import { Body, Controller, Get, Post, Put, UseGuards } from '@nestjs/common';
import { CurrentUser } from '../users/decorators/current-user.decorator';
import { User } from '../users/entities/user.entity';
import { AddressesService } from './addresses.service';
import { UpdateMyAddressDto } from './dto/update-my-address.dto';
import { Serialize } from '@/interceptors/serialize.interceptor';

@UseGuards(AuthGuard)
@Controller('addresses')
export class AddressesController {
  constructor(private addressesService: AddressesService) {}

  @Get('')
  async getMyAddress(@CurrentUser() user: User) {
    const userId = instanceToPlain(user)[0].id;

    return await this.addressesService.getAddressByUserId(userId);
  }

  @Serialize(CreateNewAddressDto)
  @Post('')
  async createAddressByUserId(
    @CurrentUser() user: User,
    @Body() address: UpdateMyAddressDto,
  ) {
    const userId = instanceToPlain(user)[0].id;

    return this.addressesService.createAddressByUserId({
      userId,
      address,
    });
  }

  @Serialize(UpdateMyAddressDto)
  @Put('')
  async updateMyAddress(
    @CurrentUser() user: User,
    @Body() body: UpdateMyAddressDto,
  ) {
    const userId = instanceToPlain(user)[0].id;

    const { addressId, ...restBody } = body;

    return this.addressesService.updateAddressByUserId({
      userId,
      addressId: addressId,
      address: restBody,
    });
  }
}
