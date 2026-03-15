import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { EventRegistrationService } from './event-registration.service';
import type { CreateEventRegistrationDto, UpdateEventRegistrationDto } from './event-registration.service';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';

@ApiTags('event-registrations')
@Controller('event-registrations')
export class EventRegistrationController {
  constructor(private readonly eventRegistrationService: EventRegistrationService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new event registration' })
  @ApiResponse({ status: 201, description: 'Registration created successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 404, description: 'Event not found' })
  create(@Body() createEventRegistrationDto: CreateEventRegistrationDto) {
    return this.eventRegistrationService.create(createEventRegistrationDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all event registrations' })
  @ApiResponse({ status: 200, description: 'List of all registrations' })
  findAll(@Param('eventId') eventId?: string) {
    return this.eventRegistrationService.findAll(eventId);
  }

  @Get('event/:eventId')
  @ApiOperation({ summary: 'Get registrations for a specific event' })
  @ApiParam({ name: 'eventId', description: 'Event ID' })
  @ApiResponse({ status: 200, description: 'Registrations for the specified event' })
  findByEvent(@Param('eventId') eventId: string) {
    return this.eventRegistrationService.findByEvent(eventId);
  }

  @Get('stats/:eventId')
  @ApiOperation({ summary: 'Get registration statistics for an event' })
  @ApiParam({ name: 'eventId', description: 'Event ID' })
  @ApiResponse({ status: 200, description: 'Registration statistics' })
  getRegistrationStats(@Param('eventId') eventId: string) {
    return this.eventRegistrationService.getRegistrationStats(eventId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a specific registration by ID' })
  @ApiParam({ name: 'id', description: 'Registration ID' })
  @ApiResponse({ status: 200, description: 'Registration found' })
  @ApiResponse({ status: 404, description: 'Registration not found' })
  findOne(@Param('id') id: string) {
    return this.eventRegistrationService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a registration' })
  @ApiParam({ name: 'id', description: 'Registration ID' })
  @ApiResponse({ status: 200, description: 'Registration updated successfully' })
  @ApiResponse({ status: 404, description: 'Registration not found' })
  update(@Param('id') id: string, @Body() updateEventRegistrationDto: UpdateEventRegistrationDto) {
    return this.eventRegistrationService.update(id, updateEventRegistrationDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a registration' })
  @ApiParam({ name: 'id', description: 'Registration ID' })
  @ApiResponse({ status: 200, description: 'Registration deleted successfully' })
  @ApiResponse({ status: 404, description: 'Registration not found' })
  remove(@Param('id') id: string) {
    return this.eventRegistrationService.remove(id);
  }
}
