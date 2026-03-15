import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery, ApiBody } from '@nestjs/swagger';
import { GalleryService } from './gallery.service';
import { CreateGalleryDto } from './dto/create-gallery.dto';
import { UpdateGalleryDto } from './dto/update-gallery.dto';

@ApiTags('gallery')
@Controller('gallery')
export class GalleryController {
  constructor(private readonly galleryService: GalleryService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new gallery item' })
  @ApiResponse({ status: 201, description: 'Gallery item created successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  create(@Body() createGalleryDto: CreateGalleryDto) {
    return this.galleryService.create(createGalleryDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all gallery items' })
  @ApiQuery({ name: 'category', required: false, description: 'Filter by category' })
  @ApiQuery({ name: 'mediaType', required: false, description: 'Filter by media type' })
  @ApiQuery({ name: 'isPublished', required: false, description: 'Filter by published status' })
  @ApiQuery({ name: 'isFeatured', required: false, description: 'Filter by featured status' })
  @ApiQuery({ name: 'limit', required: false, description: 'Number of items to return' })
  @ApiQuery({ name: 'page', required: false, description: 'Page number' })
  @ApiResponse({ status: 200, description: 'List of gallery items' })
  findAll(@Query() query: any) {
    return this.galleryService.findAll(query);
  }

  @Get('published')
  @ApiOperation({ summary: 'Get all published gallery items' })
  @ApiResponse({ status: 200, description: 'List of published gallery items' })
  findPublished() {
    return this.galleryService.findPublished();
  }

  @Get('featured')
  @ApiOperation({ summary: 'Get all featured gallery items' })
  @ApiResponse({ status: 200, description: 'List of featured gallery items' })
  findFeatured() {
    return this.galleryService.findFeatured();
  }

  @Get('category/:category')
  @ApiOperation({ summary: 'Get gallery items by category' })
  @ApiParam({ name: 'category', description: 'Gallery category' })
  @ApiResponse({ status: 200, description: 'Gallery items for the specified category' })
  findByCategory(@Param('category') category: string) {
    return this.galleryService.findByCategory(category);
  }

  @Get('stats')
  @ApiOperation({ summary: 'Get gallery statistics' })
  @ApiResponse({ status: 200, description: 'Gallery statistics' })
  getGalleryStats() {
    return this.galleryService.getGalleryStats();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a specific gallery item by ID' })
  @ApiParam({ name: 'id', description: 'Gallery item ID' })
  @ApiResponse({ status: 200, description: 'Gallery item found' })
  @ApiResponse({ status: 404, description: 'Gallery item not found' })
  findOne(@Param('id') id: string) {
    return this.galleryService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a gallery item' })
  @ApiParam({ name: 'id', description: 'Gallery item ID' })
  @ApiResponse({ status: 200, description: 'Gallery item updated successfully' })
  @ApiResponse({ status: 404, description: 'Gallery item not found' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiBody({ type: UpdateGalleryDto })
  update(@Param('id') id: string, @Body() updateGalleryDto: UpdateGalleryDto) {
    return this.galleryService.update(id, updateGalleryDto);
  }

  @Patch(':id/toggle-publish')
  @ApiOperation({ summary: 'Toggle publish status of a gallery item' })
  @ApiParam({ name: 'id', description: 'Gallery item ID' })
  @ApiResponse({ status: 200, description: 'Publish status updated successfully' })
  @ApiResponse({ status: 404, description: 'Gallery item not found' })
  togglePublish(@Param('id') id: string) {
    return this.galleryService.togglePublish(id);
  }

  @Patch(':id/toggle-featured')
  @ApiOperation({ summary: 'Toggle featured status of a gallery item' })
  @ApiParam({ name: 'id', description: 'Gallery item ID' })
  @ApiResponse({ status: 200, description: 'Featured status updated successfully' })
  @ApiResponse({ status: 404, description: 'Gallery item not found' })
  toggleFeatured(@Param('id') id: string) {
    return this.galleryService.toggleFeatured(id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a gallery item' })
  @ApiParam({ name: 'id', description: 'Gallery item ID' })
  @ApiResponse({ status: 200, description: 'Gallery item deleted successfully' })
  @ApiResponse({ status: 404, description: 'Gallery item not found' })
  remove(@Param('id') id: string) {
    return this.galleryService.remove(id);
  }
}
