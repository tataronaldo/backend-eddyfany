import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTestimonialDto } from './dto/create-testimonial.dto';

@Injectable()
export class TestimonialsService {
  constructor(private prisma: PrismaService) {}

  async create(createTestimonialDto: CreateTestimonialDto) {
    return this.prisma.testimonial.create({
      data: createTestimonialDto,
    });
  }

  async findAll() {
    return this.prisma.testimonial.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    return this.prisma.testimonial.findUnique({
      where: { id },
    });
  }

  async update(id: string, updateTestimonialDto: any) {
    return this.prisma.testimonial.update({
      where: { id },
      data: updateTestimonialDto,
    });
  }

  async remove(id: string) {
    return this.prisma.testimonial.delete({
      where: { id },
    });
  }

  async findPending() {
    return this.prisma.testimonial.findMany({
      where: { isApproved: false },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findApproved() {
    return this.prisma.testimonial.findMany({
      where: { isApproved: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findPublic() {
    return this.prisma.testimonial.findMany({
      where: { isApproved: true, isPublic: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async approve(id: string, approvedBy: string) {
    return this.prisma.testimonial.update({
      where: { id },
      data: { 
        isApproved: true, 
        approvedAt: new Date(),
        approvedBy 
      },
    });
  }
}
