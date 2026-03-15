import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';

@Injectable()
export class PrismaService implements OnModuleInit, OnModuleDestroy {
  private prisma: any;

  async onModuleInit() {
    try {
      // Use require to bypass TypeScript import issues
      const path = require('path');
      const prismaPath = path.join(__dirname, '../../generated/prisma');
      const { PrismaClient } = require(prismaPath);
      
      // Initialize Prisma Client - v6.19 has stable MongoDB support
      this.prisma = new PrismaClient({
        log: ['info', 'warn', 'error'],
      });
      
      await this.prisma.$connect();
      console.log('✅ Prisma connected successfully');
    } catch (error) {
      console.error('❌ Failed to initialize Prisma:', error);
      console.log('⚠️  App will continue without database connection');
      console.log('💡 Make sure you have a valid DATABASE_URL in your .env file');
    }
  }

  async onModuleDestroy() {
    if (this.prisma) {
      await this.prisma.$disconnect();
      console.log('✅ Prisma disconnected');
    }
  }

  // Expose Prisma client methods
  get sermon() {
    return this.prisma?.sermon;
  }

  get blogPost() {
    return this.prisma?.blogPost;
  }

  get project() {
    return this.prisma?.project;
  }

  get event() {
    return this.prisma?.event;
  }

  get donation() {
    return this.prisma?.donation;
  }

  get member() {
    return this.prisma?.member;
  }

  get prayerRequest() {
    return this.prisma?.prayerRequest;
  }

  get testimonial() {
    return this.prisma?.testimonial;
  }

  get contactMessage() {
    return this.prisma?.contactMessage;
  }

  get eventRegistration() {
    return this.prisma?.eventRegistration;
  }

  get adminUser() {
    return this.prisma?.adminUser;
  }

  get gallery() {
    return this.prisma.gallery;
  }

  get reaction() {
    return this.prisma.reaction;
  }
}
