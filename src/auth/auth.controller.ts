import { Controller, Post, Body, Get, Param, Patch, Delete, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import type { CreateAdminUserDto, LoginDto, AuthResponse } from './auth.service';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Register a new admin user' })
  @ApiResponse({ status: 201, description: 'User registered successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  register(@Body() createAdminUserDto: CreateAdminUserDto) {
    return this.authService.create(createAdminUserDto);
  }

  @Post('login')
  @ApiOperation({ summary: 'Login admin user' })
  @ApiResponse({ status: 200, description: 'Login successful' })
  @ApiResponse({ status: 401, description: 'Invalid credentials' })
  login(@Body() loginDto: LoginDto): Promise<AuthResponse> {
    return this.authService.login(loginDto);
  }

  @Post('validate')
  @ApiOperation({ summary: 'Validate admin token' })
  @ApiResponse({ status: 200, description: 'Token is valid' })
  @ApiResponse({ status: 401, description: 'Invalid token' })
  validateToken(@Body('token') token: string) {
    return this.authService.validateToken(token);
  }

  @Get('users')
  @ApiOperation({ summary: 'Get all admin users' })
  @ApiResponse({ status: 200, description: 'List of all admin users' })
  findAll() {
    return this.authService.findAll();
  }

  @Get('users/:id')
  @ApiOperation({ summary: 'Get admin user by ID' })
  @ApiResponse({ status: 200, description: 'User found' })
  @ApiResponse({ status: 404, description: 'User not found' })
  findOne(@Param('id') id: string) {
    return this.authService.findOne(id);
  }

  @Patch('users/:id')
  @ApiOperation({ summary: 'Update admin user' })
  @ApiResponse({ status: 200, description: 'User updated successfully' })
  @ApiResponse({ status: 404, description: 'User not found' })
  update(@Param('id') id: string, @Body() updateData: Partial<CreateAdminUserDto>) {
    return this.authService.update(id, updateData);
  }

  @Patch('users/:id/toggle-active')
  @ApiOperation({ summary: 'Toggle admin user active status' })
  @ApiResponse({ status: 200, description: 'User status updated successfully' })
  @ApiResponse({ status: 404, description: 'User not found' })
  toggleActive(@Param('id') id: string) {
    return this.authService.toggleActive(id);
  }

  @Delete('users/:id')
  @ApiOperation({ summary: 'Delete admin user' })
  @ApiResponse({ status: 200, description: 'User deleted successfully' })
  @ApiResponse({ status: 404, description: 'User not found' })
  remove(@Param('id') id: string) {
    return this.authService.remove(id);
  }
}
