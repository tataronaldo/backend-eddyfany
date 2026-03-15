import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { MembersService } from './members.service';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';

@ApiTags('members')
@Controller('members')
export class MembersController {
  constructor(private readonly membersService: MembersService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new member' })
  @ApiResponse({ status: 201, description: 'Member created successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiBody({ type: CreateMemberDto })
  create(@Body() createMemberDto: CreateMemberDto) {
    return this.membersService.create(createMemberDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all members' })
  @ApiResponse({ status: 200, description: 'List of all members' })
  findAll() {
    return this.membersService.findAll();
  }

  @Get('count')
  @ApiOperation({ summary: 'Get total member count' })
  @ApiResponse({ status: 200, description: 'Total member count' })
  getTotalCount() {
    return this.membersService.getTotalCount();
  }

  @Get('active')
  @ApiOperation({ summary: 'Get active members' })
  @ApiResponse({ status: 200, description: 'List of active members' })
  findActive() {
    return this.membersService.findActive();
  }

  @Get('role/:role')
  @ApiOperation({ summary: 'Get members by role' })
  @ApiResponse({ status: 200, description: 'List of members by role' })
  @ApiParam({ name: 'role', description: 'Member role' })
  findByRole(@Param('role') role: string) {
    return this.membersService.findByRole(role);
  }

  @Get('email/:email')
  @ApiOperation({ summary: 'Get member by email' })
  @ApiResponse({ status: 200, description: 'Member found' })
  @ApiResponse({ status: 404, description: 'Member not found' })
  @ApiParam({ name: 'email', description: 'Member email' })
  findByEmail(@Param('email') email: string) {
    return this.membersService.findByEmail(email);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get member by ID' })
  @ApiResponse({ status: 200, description: 'Member found' })
  @ApiResponse({ status: 404, description: 'Member not found' })
  @ApiParam({ name: 'id', description: 'Member ID' })
  findOne(@Param('id') id: string) {
    return this.membersService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update member' })
  @ApiResponse({ status: 200, description: 'Member updated successfully' })
  @ApiResponse({ status: 404, description: 'Member not found' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiParam({ name: 'id', description: 'Member ID' })
  @ApiBody({ type: UpdateMemberDto })
  update(@Param('id') id: string, @Body() updateMemberDto: UpdateMemberDto) {
    return this.membersService.update(id, updateMemberDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete member' })
  @ApiResponse({ status: 200, description: 'Member deleted successfully' })
  @ApiResponse({ status: 404, description: 'Member not found' })
  @ApiParam({ name: 'id', description: 'Member ID' })
  remove(@Param('id') id: string) {
    return this.membersService.remove(id);
  }
}
