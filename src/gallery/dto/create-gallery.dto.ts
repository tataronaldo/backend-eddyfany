import { ApiProperty } from '@nestjs/swagger';

export class CreateGalleryDto {
  @ApiProperty()
  title: string;

  @ApiProperty({ required: false })
  description?: string;

  @ApiProperty()
  mediaUrl: string;

  @ApiProperty()
  mediaType: string;

  @ApiProperty()
  category: string;

  @ApiProperty({ required: false })
  thumbnail?: string;

  @ApiProperty({ required: false })
  duration?: number;

  @ApiProperty({ required: false })
  fileSize?: number;

  @ApiProperty({ required: false, type: [String] })
  tags?: string[];

  @ApiProperty()
  uploadedBy: string;
}
