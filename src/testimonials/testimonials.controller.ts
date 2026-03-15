import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { TestimonialsService } from './testimonials.service';
import { CreateTestimonialDto } from './dto/create-testimonial.dto';
import { UpdateTestimonialDto } from './dto/update-testimonial.dto';

@ApiTags('testimonials')
@Controller('testimonials')
export class TestimonialsController {
  constructor(private readonly testimonialsService: TestimonialsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new testimonial' })
  @ApiResponse({ status: 201, description: 'Testimonial created successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiBody({ type: CreateTestimonialDto })
  create(@Body() createTestimonialDto: CreateTestimonialDto) {
    return this.testimonialsService.create(createTestimonialDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all testimonials' })
  @ApiResponse({ status: 200, description: 'List of all testimonials' })
  findAll() {
    return this.testimonialsService.findAll();
  }

  @Get('pending')
  @ApiOperation({ summary: 'Get pending testimonials' })
  @ApiResponse({ status: 200, description: 'List of pending testimonials' })
  findPending() {
    return this.testimonialsService.findPending();
  }

  @Get('approved')
  @ApiOperation({ summary: 'Get approved testimonials' })
  @ApiResponse({ status: 200, description: 'List of approved testimonials' })
  findApproved() {
    return this.testimonialsService.findApproved();
  }

  @Get('public')
  @ApiOperation({ summary: 'Get public testimonials' })
  @ApiResponse({ status: 200, description: 'List of public testimonials' })
  findPublic() {
    return this.testimonialsService.findPublic();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get testimonial by ID' })
  @ApiResponse({ status: 200, description: 'Testimonial found' })
  @ApiResponse({ status: 404, description: 'Testimonial not found' })
  @ApiParam({ name: 'id', description: 'Testimonial ID' })
  findOne(@Param('id') id: string) {
    return this.testimonialsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update testimonial' })
  @ApiResponse({ status: 200, description: 'Testimonial updated successfully' })
  @ApiResponse({ status: 404, description: 'Testimonial not found' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiParam({ name: 'id', description: 'Testimonial ID' })
  @ApiBody({ type: UpdateTestimonialDto })
  update(@Param('id') id: string, @Body() updateTestimonialDto: UpdateTestimonialDto) {
    return this.testimonialsService.update(id, updateTestimonialDto);
  }

  @Patch(':id/approve')
  @ApiOperation({ summary: 'Approve testimonial' })
  @ApiResponse({ status: 200, description: 'Testimonial approved successfully' })
  @ApiResponse({ status: 404, description: 'Testimonial not found' })
  @ApiParam({ name: 'id', description: 'Testimonial ID' })
  @ApiBody({ schema: { type: 'object', properties: { approvedBy: { type: 'string', description: 'Name of approver' } } } })
  approve(@Param('id') id: string, @Body('approvedBy') approvedBy: string) {
    return this.testimonialsService.approve(id, approvedBy);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete testimonial' })
  @ApiResponse({ status: 200, description: 'Testimonial deleted successfully' })
  @ApiResponse({ status: 404, description: 'Testimonial not found' })
  @ApiParam({ name: 'id', description: 'Testimonial ID' })
  remove(@Param('id') id: string) {
    return this.testimonialsService.remove(id);
  }
}
