import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';

@Injectable()
export class PrismaService implements OnModuleInit, OnModuleDestroy {
  private prisma: any;

  async onModuleInit() {
    try {
      // Use require to bypass TypeScript import issues
      const { PrismaClient } = require('@prisma/client');
      this.prisma = new PrismaClient();
      await this.prisma.$connect();
      console.log('✅ Prisma connected successfully');
    } catch (error) {
      console.error('❌ Failed to initialize Prisma:', error);
    }
  }

  async onModuleDestroy() {
    if (this.prisma) {
      await this.prisma.$disconnect();
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
}
