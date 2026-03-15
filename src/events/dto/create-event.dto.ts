import { IsString, IsOptional, IsArray, IsNumber, IsBoolean, IsDateString, IsUrl } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateEventDto {
  @ApiProperty({
    description: 'Title of the event',
    example: 'Annual Church Conference',
  })
  @IsString()
  title: string;

  @ApiProperty({
    description: 'Description of the event',
    example: 'Join us for our annual church conference featuring inspiring speakers and worship',
  })
  @IsString()
  description: string;

  @ApiPropertyOptional({
    description: 'Full content/details about the event',
    example: 'This year\'s conference will focus on spiritual growth and community building...',
  })
  @IsOptional()
  @IsString()
  content?: string;

  @ApiPropertyOptional({
    description: 'URL to event image (uploaded via /api/uploads/image)',
    example: 'https://res.cloudinary.com/your-cloud/image/upload/v1234567890/eddyfany-ministry/images/event-banner.jpg',
  })
  @IsOptional()
  @IsUrl()
  image?: string;

  @ApiPropertyOptional({
    description: 'URL to event document/agenda (uploaded via /api/uploads/document)',
    example: 'https://res.cloudinary.com/your-cloud/raw/upload/v1234567890/eddyfany-ministry/documents/agenda.pdf',
  })
  @IsOptional()
  @IsUrl()
  documentUrl?: string;

  @ApiProperty({
    description: 'Start date and time of the event',
    example: '2024-06-15T09:00:00Z',
  })
  @IsDateString()
  startDate: string;

  @ApiPropertyOptional({
    description: 'End date and time of the event',
    example: '2024-06-15T17:00:00Z',
  })
  @IsOptional()
  @IsDateString()
  endDate?: string;

  @ApiPropertyOptional({
    description: 'Physical location of the event',
    example: 'Main Sanctuary, Eddy Fany Ministry Church',
  })
  @IsOptional()
  @IsString()
  location?: string;

  @ApiPropertyOptional({
    description: 'Whether the event is online/virtual',
    example: false,
  })
  @IsOptional()
  @IsBoolean()
  isOnline?: boolean;

  @ApiPropertyOptional({
    description: 'Maximum number of attendees allowed',
    example: 200,
  })
  @IsOptional()
  @IsNumber()
  maxAttendees?: number;

  @ApiPropertyOptional({
    description: 'Current number of registered attendees',
    example: 45,
  })
  @IsOptional()
  @IsNumber()
  currentAttendees?: number;

  @ApiPropertyOptional({
    description: 'Registration deadline for the event',
    example: '2024-06-10T23:59:59Z',
  })
  @IsOptional()
  @IsDateString()
  registrationDeadline?: string;

  @ApiPropertyOptional({
    description: 'Whether the event is published and visible to the public',
    default: false,
  })
  @IsOptional()
  @IsBoolean()
  published?: boolean;

  @ApiPropertyOptional({
    description: 'Tags for categorizing the event',
    example: ['conference', 'worship', 'community'],
    type: [String],
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];
}
