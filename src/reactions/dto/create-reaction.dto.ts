import { IsString, IsEnum, IsOptional } from 'class-validator';

// Local enum definitions - will match Prisma enums
export enum ReactionType {
  LIKE = 'LIKE',
  LOVE = 'LOVE',
  AMEN = 'AMEN',
  PRAISE = 'PRAISE',
  HALLELUJAH = 'HALLELUJAH'
}

export enum ReactionTargetType {
  SERMON = 'SERMON',
  BLOG_POST = 'BLOG_POST',
  EVENT = 'EVENT',
  TESTIMONIAL = 'TESTIMONIAL',
  GALLERY_ITEM = 'GALLERY_ITEM'
}

export class CreateReactionDto {
  @IsEnum(ReactionType)
  type: ReactionType;

  @IsEnum(ReactionTargetType)
  targetType: ReactionTargetType;

  @IsString()
  targetId: string;

  @IsString()
  @IsOptional()
  userId?: string;

  @IsString()
  @IsOptional()
  ipAddress?: string;
}
