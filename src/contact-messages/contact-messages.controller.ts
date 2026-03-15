import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { ContactMessagesService } from './contact-messages.service';
import { CreateContactMessageDto } from './dto/create-contact-message.dto';
import { UpdateContactMessageDto } from './dto/update-contact-message.dto';

@ApiTags('contact-messages')
@Controller('contact-messages')
export class ContactMessagesController {
  constructor(private readonly contactMessagesService: ContactMessagesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new contact message' })
  @ApiResponse({ status: 201, description: 'Contact message created successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiBody({ type: CreateContactMessageDto })
  create(@Body() createContactMessageDto: CreateContactMessageDto) {
    return this.contactMessagesService.create(createContactMessageDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all contact messages' })
  @ApiResponse({ status: 200, description: 'List of all contact messages' })
  findAll() {
    return this.contactMessagesService.findAll();
  }

  @Get('unread')
  @ApiOperation({ summary: 'Get unread contact messages' })
  @ApiResponse({ status: 200, description: 'List of unread contact messages' })
  findUnread() {
    return this.contactMessagesService.findUnread();
  }

  @Get('replied')
  @ApiOperation({ summary: 'Get replied contact messages' })
  @ApiResponse({ status: 200, description: 'List of replied contact messages' })
  findReplied() {
    return this.contactMessagesService.findReplied();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get contact message by ID' })
  @ApiResponse({ status: 200, description: 'Contact message found' })
  @ApiResponse({ status: 404, description: 'Contact message not found' })
  @ApiParam({ name: 'id', description: 'Contact message ID' })
  findOne(@Param('id') id: string) {
    return this.contactMessagesService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update contact message' })
  @ApiResponse({ status: 200, description: 'Contact message updated successfully' })
  @ApiResponse({ status: 404, description: 'Contact message not found' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiParam({ name: 'id', description: 'Contact message ID' })
  @ApiBody({ type: UpdateContactMessageDto })
  update(@Param('id') id: string, @Body() updateContactMessageDto: UpdateContactMessageDto) {
    return this.contactMessagesService.update(id, updateContactMessageDto);
  }

  @Patch(':id/read')
  @ApiOperation({ summary: 'Mark contact message as read' })
  @ApiResponse({ status: 200, description: 'Contact message marked as read' })
  @ApiResponse({ status: 404, description: 'Contact message not found' })
  @ApiParam({ name: 'id', description: 'Contact message ID' })
  markAsRead(@Param('id') id: string) {
    return this.contactMessagesService.markAsRead(id);
  }

  @Patch(':id/reply')
  @ApiOperation({ summary: 'Mark contact message as replied' })
  @ApiResponse({ status: 200, description: 'Contact message marked as replied' })
  @ApiResponse({ status: 404, description: 'Contact message not found' })
  @ApiParam({ name: 'id', description: 'Contact message ID' })
  markAsReplied(@Param('id') id: string) {
    return this.contactMessagesService.markAsReplied(id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete contact message' })
  @ApiResponse({ status: 200, description: 'Contact message deleted successfully' })
  @ApiResponse({ status: 404, description: 'Contact message not found' })
  @ApiParam({ name: 'id', description: 'Contact message ID' })
  remove(@Param('id') id: string) {
    return this.contactMessagesService.remove(id);
  }
}
