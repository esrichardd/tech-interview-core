import { LoggerService } from '@libs/logger';
import { ConflictException } from '@nestjs/common';
import { DeepPartial, FindOneOptions, Repository } from 'typeorm';

type ValidatedAction = 'create' | 'findOneAndUpdate' | 'update' | 'updateOne';
export type ValidationContext = {
  action: ValidatedAction;
  entityId?: string;
};

export abstract class AbstractCrudHandler<T> {
  constructor(
    private abstractRepository: Repository<T>,
    protected readonly loggerService: LoggerService,
  ) {}

  async create(dto: any): Promise<any> {
    try {
      const entity = this.mapDtoToEntity(dto);
      const record = await this.abstractRepository.save(entity);
      return this.mapEntityToDto(record);
    } catch (error) {
      this.throwUnhandledError(error, 'create', 'Error creating record');
    }
  }

  async find(): Promise<any[]> {
    try {
      const records = await this.abstractRepository.find();
      return records.map((record) => this.mapEntityToDto(record));
    } catch (error) {
      this.throwUnhandledError(error, 'find', 'Error finding records');
    }
  }

  async findById(id: string): Promise<any> {
    try {
      const record = await this.abstractRepository.findOne({
        where: { id },
      } as unknown as FindOneOptions<T>);
      return this.mapEntityToDto(record);
    } catch (error) {
      this.throwUnhandledError(error, 'findById', 'Error finding record');
    }
  }

  async update(id: string, dto: any): Promise<any> {
    try {
      const entity = this.mapDtoToEntity(dto);
      await this.abstractRepository.save({ id, ...entity });
      return this.findById(id);
    } catch (error) {
      this.throwUnhandledError(error, 'update', 'Error updating record');
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await this.abstractRepository.delete(id);
    } catch (error) {
      this.throwUnhandledError(error, 'delete', 'Error deleting record');
    }
  }

  protected mapDtoToEntity(dto: any): DeepPartial<T> {
    return dto;
  }

  protected throwUnhandledError(
    error: any,
    context: string,
    message: string,
  ): never {
    this.loggerService.error(
      `Error in ${context} ${JSON.stringify(error)}`,
      error.stack,
      `${this.constructor.name}-service`,
    );

    throw new ConflictException(error, message);
  }

  protected abstract mapEntityToDto(record: T): any;
}
