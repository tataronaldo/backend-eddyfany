import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateDonationDto } from './dto/create-donation.dto';

@Injectable()
export class DonationsService {
  constructor(private prisma: PrismaService) {}

  async create(createDonationDto: CreateDonationDto) {
    return this.prisma.donation.create({
      data: createDonationDto,
    });
  }

  async findAll() {
    return this.prisma.donation.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    return this.prisma.donation.findUnique({
      where: { id },
    });
  }

  async update(id: string, updateDonationDto: any) {
    return this.prisma.donation.update({
      where: { id },
      data: updateDonationDto,
    });
  }

  async remove(id: string) {
    return this.prisma.donation.delete({
      where: { id },
    });
  }

  async findByStatus(status: string) {
    return this.prisma.donation.findMany({
      where: { status },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getTotalAmount() {
    const result = await this.prisma.donation.aggregate({
      where: { status: 'completed' },
      _sum: { amount: true },
    });
    return result._sum.amount || 0;
  }
}
