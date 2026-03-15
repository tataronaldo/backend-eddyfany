import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSermonDto } from './dto/create-sermon.dto';
import { UpdateSermonDto } from './dto/update-sermon.dto';
import { Sermon } from '@prisma/client';

@Injectable()
export class SermonsService {
  constructor(private prisma: PrismaService) {}

  async create(createSermonDto: CreateSermonDto) {
    return this.prisma.sermon.create({
      data: createSermonDto,
    });
  }

  async findAll() {
    return this.prisma.sermon.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    return this.prisma.sermon.findUnique({
      where: { id },
    });
  }

  async update(id: string, updateSermonDto: any) {
    return this.prisma.sermon.update({
      where: { id },
      data: updateSermonDto,
    });
  }

  async remove(id: string) {
    return this.prisma.sermon.delete({
      where: { id },
    });
  }

  async findPublished() {
    return this.prisma.sermon.findMany({
      where: { published: true },
      orderBy: { date: 'desc' },
    });
  }
}
