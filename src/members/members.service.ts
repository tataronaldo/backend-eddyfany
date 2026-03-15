import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateMemberDto } from './dto/create-member.dto';

@Injectable()
export class MembersService {
  constructor(private prisma: PrismaService) {}

  async create(createMemberDto: CreateMemberDto) {
    return this.prisma.member.create({
      data: createMemberDto,
    });
  }

  async findAll() {
    return this.prisma.member.findMany({
      orderBy: { joinDate: 'desc' },
    });
  }

  async findOne(id: string) {
    return this.prisma.member.findUnique({
      where: { id },
    });
  }

  async findByEmail(email: string) {
    return this.prisma.member.findUnique({
      where: { email },
    });
  }

  async update(id: string, updateMemberDto: any) {
    return this.prisma.member.update({
      where: { id },
      data: updateMemberDto,
    });
  }

  async remove(id: string) {
    return this.prisma.member.delete({
      where: { id },
    });
  }

  async findActive() {
    return this.prisma.member.findMany({
      where: { isActive: true },
      orderBy: { joinDate: 'desc' },
    });
  }

  async findByRole(role: string) {
    return this.prisma.member.findMany({
      where: { role },
      orderBy: { joinDate: 'desc' },
    });
  }

  async getTotalCount() {
    return this.prisma.member.count();
  }
}
