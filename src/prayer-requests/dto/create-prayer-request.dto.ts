import { IsString, IsOptional, IsBoolean } from 'class-validator';

export class CreatePrayerRequestDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  email?: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsString()
  request: string;

  @IsOptional()
  @IsBoolean()
  isPublic?: boolean;

  @IsOptional()
  @IsBoolean()
  isAnswered?: boolean;

  @IsOptional()
  @IsString()
  answeredBy?: string;
}
