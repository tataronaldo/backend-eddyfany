import { ApiProperty } from '@nestjs/swagger';

export class UpdateGalleryDto {
  @ApiProperty({ required: false })
  title?: string;

  @ApiProperty({ required: false })
  description?: string;

  @ApiProperty({ required: false })
  mediaUrl?: string;

  @ApiProperty({ required: false })
  mediaType?: string;

  @ApiProperty({ required: false })
  category?: string;

  @ApiProperty({ required: false })
  thumbnail?: string;

  @ApiProperty({ required: false })
  duration?: number;

  @ApiProperty({ required: false })
  fileSize?: number;

  @ApiProperty({ required: false, type: [String] })
  tags?: string[];

  @ApiProperty({ required: false })
  isPublished?: boolean;

  @ApiProperty({ required: false })
  isFeatured?: boolean;
}
