import { IsString, IsOptional, IsBoolean, IsArray, IsUrl } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateSermonDto {
  @ApiPropertyOptional({
    description: 'Title of the sermon',
    example: 'The Power of Persistent Prayer',
  })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiPropertyOptional({
    description: 'Description of the sermon',
    example: 'A powerful message about the importance of persistent prayer in our spiritual journey',
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({
    description: 'Full content of the sermon',
    example: 'Today I want to talk to you about the power of persistent prayer...',
  })
  @IsOptional()
  @IsString()
  content?: string;

  @ApiPropertyOptional({
    description: 'URL to video file (uploaded via /api/uploads/video)',
    example: 'https://res.cloudinary.com/your-cloud/video/upload/v1234567890/eddyfany-ministry/videos/sermon.mp4',
  })
  @IsOptional()
  @IsUrl()
  videoUrl?: string;

  @ApiPropertyOptional({
    description: 'URL to audio file (uploaded via /api/uploads/audio)',
    example: 'https://res.cloudinary.com/your-cloud/video/upload/v1234567890/eddyfany-ministry/audio/sermon.mp3',
  })
  @IsOptional()
  @IsUrl()
  audioUrl?: string;

  @ApiPropertyOptional({
    description: 'URL to thumbnail image (uploaded via /api/uploads/image)',
    example: 'https://res.cloudinary.com/your-cloud/image/upload/v1234567890/eddyfany-ministry/images/thumbnail.jpg',
  })
  @IsOptional()
  @IsUrl()
  thumbnail?: string;

  @ApiPropertyOptional({
    description: 'URL to sermon document/transcript (uploaded via /api/uploads/document)',
    example: 'https://res.cloudinary.com/your-cloud/raw/upload/v1234567890/eddyfany-ministry/documents/transcript.pdf',
  })
  @IsOptional()
  @IsUrl()
  documentUrl?: string;

  @ApiPropertyOptional({
    description: 'Date of the sermon',
    example: '2024-01-15T10:00:00Z',
  })
  @IsOptional()
  date?: Date;

  @ApiPropertyOptional({
    description: 'Whether the sermon is published',
    default: false,
  })
  @IsOptional()
  @IsBoolean()
  published?: boolean;

  @ApiPropertyOptional({
    description: 'Tags associated with the sermon',
    example: ['prayer', 'faith', 'spiritual growth'],
  })
  @IsOptional()
  @IsArray()
  tags?: string[];
}
