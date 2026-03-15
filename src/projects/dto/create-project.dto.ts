import { IsString, IsOptional, IsArray, IsNumber, IsDateString, IsBoolean, IsUrl } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateProjectDto {
  @ApiProperty({
    description: 'Title of the project',
    example: 'Church Building Fund',
  })
  @IsString()
  title: string;

  @ApiProperty({
    description: 'Description of the project',
    example: 'Building a new sanctuary to accommodate our growing congregation',
  })
  @IsString()
  description: string;

  @ApiProperty({
    description: 'Full content/details about the project',
    example: 'We are excited to announce our church building project...',
  })
  @IsString()
  content: string;

  @ApiPropertyOptional({
    description: 'URL to project image (uploaded via /api/uploads/image)',
    example: 'https://res.cloudinary.com/your-cloud/image/upload/v1234567890/eddyfany-ministry/images/project-banner.jpg',
  })
  @IsOptional()
  @IsUrl()
  image?: string;

  @ApiPropertyOptional({
    description: 'URL to project document/proposal (uploaded via /api/uploads/document)',
    example: 'https://res.cloudinary.com/your-cloud/raw/upload/v1234567890/eddyfany-ministry/documents/proposal.pdf',
  })
  @IsOptional()
  @IsUrl()
  documentUrl?: string;

  @ApiPropertyOptional({
    description: 'Current status of the project',
    example: 'planning',
    })
  @IsOptional()
  @IsString()
  status?: string;

  @ApiPropertyOptional({
    description: 'Start date of the project',
    example: '2024-01-01T00:00:00Z',
  })
  @IsOptional()
  @IsDateString()
  startDate?: string;

  @ApiPropertyOptional({
    description: 'Expected end date of the project',
    example: '2024-12-31T23:59:59Z',
  })
  @IsOptional()
  @IsDateString()
  endDate?: string;

  @ApiPropertyOptional({
    description: 'Target fundraising amount',
    example: 500000,
  })
  @IsOptional()
  @IsNumber()
  targetAmount?: number;

  @ApiPropertyOptional({
    description: 'Current amount raised',
    example: 125000,
  })
  @IsOptional()
  @IsNumber()
  currentAmount?: number;

  @ApiPropertyOptional({
    description: 'Whether the project is published and visible to the public',
    default: false,
  })
  @IsOptional()
  @IsBoolean()
  published?: boolean;

  @ApiPropertyOptional({
    description: 'Tags for categorizing the project',
    example: ['building', 'fundraising', 'community'],
    type: [String],
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];
}
