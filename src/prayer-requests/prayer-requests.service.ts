import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePrayerRequestDto } from './dto/create-prayer-request.dto';

@Injectable()
export class PrayerRequestsService {
  constructor(private prisma: PrismaService) {}

  async create(createPrayerRequestDto: CreatePrayerRequestDto) {
    return this.prisma.prayerRequest.create({
      data: createPrayerRequestDto,
    });
  }

  async findAll() {
    return this.prisma.prayerRequest.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    return this.prisma.prayerRequest.findUnique({
      where: { id },
    });
  }

  async update(id: string, updatePrayerRequestDto: any) {
    return this.prisma.prayerRequest.update({
      where: { id },
      data: updatePrayerRequestDto,
    });
  }

  async remove(id: string) {
    return this.prisma.prayerRequest.delete({
      where: { id },
    });
  }

  async findPublic() {
    return this.prisma.prayerRequest.findMany({
      where: { isPublic: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findUnanswered() {
    return this.prisma.prayerRequest.findMany({
      where: { isAnswered: false },
      orderBy: { createdAt: 'desc' },
    });
  }

  async markAsAnswered(id: string, answeredBy: string) {
    return this.prisma.prayerRequest.update({
      where: { id },
      data: { 
        isAnswered: true, 
        answeredAt: new Date(),
        answeredBy 
      },
    });
  }
}
