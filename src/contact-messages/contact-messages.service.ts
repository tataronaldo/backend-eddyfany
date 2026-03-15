import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateContactMessageDto } from './dto/create-contact-message.dto';

@Injectable()
export class ContactMessagesService {
  constructor(private prisma: PrismaService) {}

  async create(createContactMessageDto: CreateContactMessageDto) {
    return this.prisma.contactMessage.create({
      data: createContactMessageDto,
    });
  }

  async findAll() {
    return this.prisma.contactMessage.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    return this.prisma.contactMessage.findUnique({
      where: { id },
    });
  }

  async update(id: string, updateContactMessageDto: any) {
    return this.prisma.contactMessage.update({
      where: { id },
      data: updateContactMessageDto,
    });
  }

  async remove(id: string) {
    return this.prisma.contactMessage.delete({
      where: { id },
    });
  }

  async findUnread() {
    return this.prisma.contactMessage.findMany({
      where: { isRead: false },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findReplied() {
    return this.prisma.contactMessage.findMany({
      where: { replied: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async markAsRead(id: string) {
    return this.prisma.contactMessage.update({
      where: { id },
      data: { 
        isRead: true, 
        readAt: new Date() 
      },
    });
  }

  async markAsReplied(id: string) {
    return this.prisma.contactMessage.update({
      where: { id },
      data: { 
        replied: true, 
        repliedAt: new Date() 
      },
    });
  }
}
