import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';

export interface CreateAdminUserDto {
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role?: string;
}

export interface LoginDto {
  username: string;
  password: string;
}

export interface AuthResponse {
  user: {
    id: string;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    role: string;
  };
  token: string;
}

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async create(createAdminUserDto: CreateAdminUserDto) {
    const { username, email, password, firstName, lastName, role = 'admin' } = createAdminUserDto;

    // Check if user already exists
    const existingUser = await this.prisma.adminUser.findFirst({
      where: {
        OR: [
          { username },
          { email }
        ]
      }
    });

    if (existingUser) {
      throw new BadRequestException('Username or email already exists');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create admin user
    const user = await this.prisma.adminUser.create({
      data: {
        username,
        email,
        password: hashedPassword,
        firstName,
        lastName,
        role
      },
      select: {
        id: true,
        username: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        isActive: true,
        createdAt: true
      }
    });

    return user;
  }

  async login(loginDto: LoginDto): Promise<AuthResponse> {
    const { username, password } = loginDto;

    // Find user by username
    const user = await this.prisma.adminUser.findUnique({
      where: { username }
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Check if user is active
    if (!user.isActive) {
      throw new UnauthorizedException('Account is deactivated');
    }

    // Check if account is locked
    if (user.lockedUntil && user.lockedUntil > new Date()) {
      throw new UnauthorizedException('Account is temporarily locked');
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      // Increment login attempts
      const loginAttempts = user.loginAttempts + 1;
      const lockedUntil = loginAttempts >= 5 ? new Date(Date.now() + 30 * 60 * 1000) : null; // Lock for 30 minutes after 5 attempts

      await this.prisma.adminUser.update({
        where: { id: user.id },
        data: {
          loginAttempts,
          lockedUntil
        }
      });

      throw new UnauthorizedException('Invalid credentials');
    }

    // Reset login attempts on successful login
    await this.prisma.adminUser.update({
      where: { id: user.id },
      data: {
        loginAttempts: 0,
        lockedUntil: null,
        lastLoginAt: new Date()
      }
    });

    // Generate JWT token (you'll need to install @nestjs/jwt and configure it)
    const token = this.generateToken(user);

    return {
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role
      },
      token
    };
  }

  async validateToken(token: string): Promise<any> {
    try {
      // This is a placeholder - you'll need to implement proper JWT validation
      // For now, we'll decode the token to get user info
      const payload = this.decodeToken(token);
      
      const user = await this.prisma.adminUser.findUnique({
        where: { id: payload.sub },
        select: {
          id: true,
          username: true,
          email: true,
          firstName: true,
          lastName: true,
          role: true,
          isActive: true
        }
      });

      if (!user || !user.isActive) {
        throw new UnauthorizedException('Invalid token');
      }

      return user;
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }

  async findAll() {
    return this.prisma.adminUser.findMany({
      select: {
        id: true,
        username: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        isActive: true,
        lastLoginAt: true,
        loginAttempts: true,
        createdAt: true,
        updatedAt: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
  }

  async findOne(id: string) {
    return this.prisma.adminUser.findUnique({
      where: { id },
      select: {
        id: true,
        username: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        isActive: true,
        lastLoginAt: true,
        loginAttempts: true,
        createdAt: true,
        updatedAt: true
      }
    });
  }

  async update(id: string, updateData: Partial<CreateAdminUserDto>) {
    const { password, ...otherData } = updateData;

    const data: any = otherData;
    
    if (password) {
      data.password = await bcrypt.hash(password, 10);
    }

    return this.prisma.adminUser.update({
      where: { id },
      data,
      select: {
        id: true,
        username: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        isActive: true,
        lastLoginAt: true,
        loginAttempts: true,
        createdAt: true,
        updatedAt: true
      }
    });
  }

  async remove(id: string) {
    return this.prisma.adminUser.delete({
      where: { id }
    });
  }

  async toggleActive(id: string) {
    const user = await this.prisma.adminUser.findUnique({
      where: { id }
    });

    if (!user) {
      throw new BadRequestException('User not found');
    }

    return this.prisma.adminUser.update({
      where: { id },
      data: {
        isActive: !user.isActive
      }
    });
  }

  private generateToken(user: any): string {
    // This is a placeholder - you'll need to implement proper JWT token generation
    // For now, we'll create a simple token
    const payload = {
      sub: user.id,
      username: user.username,
      role: user.role,
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60) // 24 hours
    };
    
    return Buffer.from(JSON.stringify(payload)).toString('base64');
  }

  private decodeToken(token: string): any {
    try {
      const payload = Buffer.from(token, 'base64').toString();
      return JSON.parse(payload);
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
