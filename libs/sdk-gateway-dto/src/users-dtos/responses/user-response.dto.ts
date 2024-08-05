import { IsDate, IsNotEmpty, IsString } from 'class-validator';
import { UserDto } from '../common/user.dto';
import { Type } from 'class-transformer';

export class UserResponseDto extends UserDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsDate()
  @Type(() => Date)
  createdAt: Date;

  @IsDate()
  @Type(() => Date)
  updatedAt: Date;
}
