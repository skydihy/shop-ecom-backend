import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, FindManyOptions, Repository } from 'typeorm';
import { BaseDocument } from './entities/base.entity';

@Injectable()
export class BaseService<T extends BaseDocument> {
  constructor(@InjectRepository(Repository) private repo: Repository<T>) {}

  public create(data: DeepPartial<T>): T {
    return this.repo.create(data);
  }

  public async save(data: DeepPartial<T>): Promise<T> {
    return await this.repo.save(data);
  }

  public async findAll(): Promise<T[]> {
    return await this.repo.find();
  }

  public async findOneByCondition(conditions: FindManyOptions<T>): Promise<T> {
    return await this.repo.findOne(conditions).then((result: T) => {
      if (!result) throw new NotFoundException();
      return result;
    });
  }

  public async findByCondition(conditions: FindManyOptions<T>): Promise<T[]> {
    return await this.repo.find(conditions).then((result: T[]) => {
      if (!result) throw new NotFoundException();
      return result;
    });
  }
}
