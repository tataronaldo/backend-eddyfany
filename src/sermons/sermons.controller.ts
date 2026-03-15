import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { SermonsService } from './sermons.service';
import { CreateSermonDto } from './dto/create-sermon.dto';
import { UpdateSermonDto } from './dto/update-sermon.dto';

@ApiTags('sermons')
@Controller('sermons')
export class SermonsController {
  constructor(private readonly sermonsService: SermonsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new sermon' })
  @ApiResponse({ status: 201, description: 'Sermon created successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiBody({ type: CreateSermonDto })
  create(@Body() createSermonDto: CreateSermonDto) {
    return this.sermonsService.create(createSermonDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all sermons' })
  @ApiResponse({ status: 200, description: 'List of all sermons' })
  findAll() {
    return this.sermonsService.findAll();
  }

  @Get('published')
  @ApiOperation({ summary: 'Get published sermons' })
  @ApiResponse({ status: 200, description: 'List of published sermons' })
  findPublished() {
    return this.sermonsService.findPublished();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get sermon by ID' })
  @ApiResponse({ status: 200, description: 'Sermon found' })
  @ApiResponse({ status: 404, description: 'Sermon not found' })
  @ApiParam({ name: 'id', description: 'Sermon ID' })
  findOne(@Param('id') id: string) {
    return this.sermonsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update sermon' })
  @ApiResponse({ status: 200, description: 'Sermon updated successfully' })
  @ApiResponse({ status: 404, description: 'Sermon not found' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiParam({ name: 'id', description: 'Sermon ID' })
  @ApiBody({ type: UpdateSermonDto })
  update(@Param('id') id: string, @Body() updateSermonDto: UpdateSermonDto) {
    return this.sermonsService.update(id, updateSermonDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete sermon' })
  @ApiResponse({ status: 200, description: 'Sermon deleted successfully' })
  @ApiResponse({ status: 404, description: 'Sermon not found' })
  @ApiParam({ name: 'id', description: 'Sermon ID' })
  remove(@Param('id') id: string) {
    return this.sermonsService.remove(id);
  }
}
