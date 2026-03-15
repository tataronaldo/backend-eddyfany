import { ApiProperty } from '@nestjs/swagger';

export class UploadFileDto {
  @ApiProperty({
    type: 'string',
    format: 'binary',
    description: 'File to upload',
  })
  file: any;
}

export class DeleteFileDto {
  @ApiProperty({
    description: 'Public ID of the file to delete',
    example: 'eddyfany-ministry/images/abc123def',
  })
  publicId: string;

  @ApiProperty({
    description: 'Resource type of the file',
    enum: ['image', 'video', 'raw'],
    example: 'image',
  })
  resourceType: 'image' | 'video' | 'raw';
}
