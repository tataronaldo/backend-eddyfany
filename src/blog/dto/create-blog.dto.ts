import { IsString, IsOptional, IsBoolean, IsArray, IsUrl } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateBlogDto {
  @ApiProperty({
    description: 'Title of the blog post',
    example: 'The Power of Persistent Prayer',
  })
  @IsString()
  title: string;

  @ApiProperty({
    description: 'URL-friendly slug for the blog post',
    example: 'power-of-persistent-prayer',
  })
  @IsString()
  slug: string;

  @ApiProperty({
    description: 'Full content of the blog post',
    example: 'Prayer is one of the most powerful tools...',
  })
  @IsString()
  content: string;

  @ApiPropertyOptional({
    description: 'Brief excerpt of the blog post',
    example: 'Discover how persistent prayer can transform your spiritual life.',
  })
  @IsOptional()
  @IsString()
  excerpt?: string;

  @ApiPropertyOptional({
    description: 'Whether this is a featured post',
    default: false,
  })
  @IsOptional()
  @IsBoolean()
  featured?: boolean;

  @ApiPropertyOptional({
    description: 'URL to featured image (uploaded via /api/uploads/image)',
    example: 'https://res.cloudinary.com/your-cloud/image/upload/v1234567890/eddyfany-ministry/images/blog-thumbnail.jpg',
  })
  @IsOptional()
  @IsUrl()
  thumbnail?: string;

  @ApiPropertyOptional({
    description: 'URL to blog document/PDF (uploaded via /api/uploads/document)',
    example: 'https://res.cloudinary.com/your-cloud/raw/upload/v1234567890/eddyfany-ministry/documents/blog-pdf.pdf',
  })
  @IsOptional()
  @IsUrl()
  documentUrl?: string;

  @ApiProperty({
    description: 'Author of the blog post',
    example: 'Pastor John Smith',
  })
  @IsString()
  author: string;

  @ApiPropertyOptional({
    description: 'Whether the post is published',
    default: false,
  })
  @IsOptional()
  @IsBoolean()
  published?: boolean;

  @ApiPropertyOptional({
    description: 'Tags for categorizing the blog post',
    example: ['prayer', 'spiritual growth', 'faith'],
    type: [String],
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];

  @ApiPropertyOptional({
    description: 'Category of the blog post',
    example: 'Spiritual Growth',
  })
  @IsOptional()
  @IsString()
  category?: string;
}
