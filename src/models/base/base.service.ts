import { ExtractModel, PropertyOf, RequireAtLeastOne } from '@/types';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, FindManyOptions, Repository } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { BaseDocument } from './entities/base.entity';

type ModelPropertyOf<T> = PropertyOf<T>;

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

  public async exists(
    data: RequireAtLeastOne<ModelPropertyOf<T>>,
  ): Promise<boolean> {
    return (await this.repo.createQueryBuilder().where(data).getCount()) !== 0;
  }

  async updateOneById(
    id: BaseDocument['id'],
    data: QueryDeepPartialEntity<ExtractModel<T>>,
  ): Promise<T> {
    const result = await this.repo.findOne({
      where: {
        id: id as any,
      },
    });
    return await this.repo.update(id, data as any).then((res) => {
      if (!res) throw new NotFoundException();
      return { ...result, ...data };
    });
  }
}
