import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateEventDto } from './dto/create-event.dto';

@Injectable()
export class EventsService {
  constructor(private prisma: PrismaService) {}

  async create(createEventDto: CreateEventDto) {
    return this.prisma.event.create({
      data: createEventDto,
    });
  }

  async findAll() {
    return this.prisma.event.findMany({
      orderBy: { startDate: 'desc' },
    });
  }

  async findOne(id: string) {
    return this.prisma.event.findUnique({
      where: { id },
    });
  }

  async update(id: string, updateEventDto: any) {
    return this.prisma.event.update({
      where: { id },
      data: updateEventDto,
    });
  }

  async remove(id: string) {
    return this.prisma.event.delete({
      where: { id },
    });
  }

  async findPublished() {
    return this.prisma.event.findMany({
      where: { published: true },
      orderBy: { startDate: 'asc' },
    });
  }

  async findUpcoming() {
    return this.prisma.event.findMany({
      where: { 
        published: true,
        startDate: { gte: new Date() }
      },
      orderBy: { startDate: 'asc' },
    });
  }
}
