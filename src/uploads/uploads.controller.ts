import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  Body,
  BadRequestException,
  HttpStatus,
  Res,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { ApiTags, ApiOperation, ApiResponse, ApiConsumes, ApiBody } from '@nestjs/swagger';
import { UploadFileDto, DeleteFileDto } from './dto/upload-file.dto';

@ApiTags('uploads')
@Controller('uploads')
export class UploadsController {
  constructor(private readonly cloudinaryService: CloudinaryService) {}

  @Post('image')
  @UseInterceptors(FileInterceptor('file'))
  @ApiOperation({ summary: 'Upload an image' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Upload an image file',
    type: UploadFileDto,
  })
  @ApiResponse({
    status: 200,
    description: 'Image uploaded successfully',
    schema: {
      type: 'object',
      properties: {
        url: { type: 'string', example: 'https://res.cloudinary.com/your-cloud/image/upload/v1234567890/eddyfany-ministry/images/abc123.jpg' },
        publicId: { type: 'string', example: 'eddyfany-ministry/images/abc123' },
        secureUrl: { type: 'string', example: 'https://res.cloudinary.com/your-cloud/image/upload/v1234567890/eddyfany-ministry/images/abc123.jpg' },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request - No file uploaded or invalid file type',
  })
  async uploadImage(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('No file uploaded');
    }

    if (!file.mimetype.startsWith('image/')) {
      throw new BadRequestException('File must be an image');
    }

    try {
      const result = await this.cloudinaryService.uploadImage(file);
      return {
        url: result.secure_url,
        publicId: result.public_id,
        secureUrl: result.secure_url,
      };
    } catch (error) {
      throw new BadRequestException('Failed to upload image');
    }
  }

  @Post('video')
  @UseInterceptors(FileInterceptor('file'))
  @ApiOperation({ summary: 'Upload a video' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Upload a video file',
    type: UploadFileDto,
  })
  @ApiResponse({
    status: 200,
    description: 'Video uploaded successfully',
    schema: {
      type: 'object',
      properties: {
        url: { type: 'string', example: 'https://res.cloudinary.com/your-cloud/video/upload/v1234567890/eddyfany-ministry/videos/abc123.mp4' },
        publicId: { type: 'string', example: 'eddyfany-ministry/videos/abc123' },
        secureUrl: { type: 'string', example: 'https://res.cloudinary.com/your-cloud/video/upload/v1234567890/eddyfany-ministry/videos/abc123.mp4' },
        duration: { type: 'number', example: 120.5 },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request - No file uploaded or invalid file type',
  })
  async uploadVideo(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('No file uploaded');
    }

    if (!file.mimetype.startsWith('video/')) {
      throw new BadRequestException('File must be a video');
    }

    try {
      const result = await this.cloudinaryService.uploadVideo(file);
      return {
        url: result.secure_url,
        publicId: result.public_id,
        secureUrl: result.secure_url,
        duration: result.duration,
      };
    } catch (error) {
      throw new BadRequestException('Failed to upload video');
    }
  }

  @Post('audio')
  @UseInterceptors(FileInterceptor('file'))
  @ApiOperation({ summary: 'Upload an audio file' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Upload an audio file',
    type: UploadFileDto,
  })
  @ApiResponse({
    status: 200,
    description: 'Audio uploaded successfully',
    schema: {
      type: 'object',
      properties: {
        url: { type: 'string', example: 'https://res.cloudinary.com/your-cloud/video/upload/v1234567890/eddyfany-ministry/audio/abc123.mp3' },
        publicId: { type: 'string', example: 'eddyfany-ministry/audio/abc123' },
        secureUrl: { type: 'string', example: 'https://res.cloudinary.com/your-cloud/video/upload/v1234567890/eddyfany-ministry/audio/abc123.mp3' },
        duration: { type: 'number', example: 180.2 },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request - No file uploaded or invalid file type',
  })
  async uploadAudio(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('No file uploaded');
    }

    if (!file.mimetype.startsWith('audio/')) {
      throw new BadRequestException('File must be an audio file');
    }

    try {
      const result = await this.cloudinaryService.uploadAudio(file);
      return {
        url: result.secure_url,
        publicId: result.public_id,
        secureUrl: result.secure_url,
        duration: result.duration,
      };
    } catch (error) {
      throw new BadRequestException('Failed to upload audio');
    }
  }

  @Post('document')
  @UseInterceptors(FileInterceptor('file'))
  @ApiOperation({ summary: 'Upload a document (PDF, DOC, etc.)' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Upload a document file',
    type: UploadFileDto,
  })
  @ApiResponse({
    status: 200,
    description: 'Document uploaded successfully',
    schema: {
      type: 'object',
      properties: {
        url: { type: 'string', example: 'https://res.cloudinary.com/your-cloud/raw/upload/v1234567890/eddyfany-ministry/documents/abc123.pdf' },
        publicId: { type: 'string', example: 'eddyfany-ministry/documents/abc123' },
        secureUrl: { type: 'string', example: 'https://res.cloudinary.com/your-cloud/raw/upload/v1234567890/eddyfany-ministry/documents/abc123.pdf' },
        format: { type: 'string', example: 'pdf' },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request - No file uploaded or invalid file type',
  })
  async uploadDocument(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('No file uploaded');
    }

    // Accept common document types
    const allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'application/vnd.ms-powerpoint',
      'application/vnd.openxmlformats-officedocument.presentationml.presentation',
      'text/plain',
    ];

    if (!allowedTypes.includes(file.mimetype)) {
      throw new BadRequestException('File must be a document (PDF, DOC, DOCX, XLS, XLSX, PPT, PPTX, TXT)');
    }

    try {
      const result = await this.cloudinaryService.uploadDocument(file);
      return {
        url: result.secure_url,
        publicId: result.public_id,
        secureUrl: result.secure_url,
        format: result.format,
      };
    } catch (error) {
      throw new BadRequestException('Failed to upload document');
    }
  }

  @Post('delete')
  @ApiOperation({ summary: 'Delete a file from Cloudinary' })
  @ApiBody({
    description: 'Delete a file from Cloudinary',
    type: DeleteFileDto,
  })
  @ApiResponse({
    status: 200,
    description: 'File deleted successfully',
    schema: {
      type: 'object',
      properties: {
        success: { type: 'boolean', example: true },
        result: { type: 'object', example: { result: 'ok' } },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request - Failed to delete file',
  })
  async deleteFile(@Body() deleteDto: DeleteFileDto) {
    try {
      const result = await this.cloudinaryService.deleteFile(
        deleteDto.publicId,
        deleteDto.resourceType,
      );
      return {
        success: true,
        result,
      };
    } catch (error) {
      throw new BadRequestException('Failed to delete file');
    }
  }
}
