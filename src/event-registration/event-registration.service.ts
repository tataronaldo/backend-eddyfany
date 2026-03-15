import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

export interface CreateEventRegistrationDto {
  eventId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  age?: number;
  specialNeeds?: string;
  notes?: string;
}

export interface UpdateEventRegistrationDto {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  age?: number;
  specialNeeds?: string;
  status?: string;
  notes?: string;
}

@Injectable()
export class EventRegistrationService {
  constructor(private prisma: PrismaService) {}

  async create(createEventRegistrationDto: CreateEventRegistrationDto) {
    // Check if event exists and has space
    const event = await this.prisma.event.findUnique({
      where: { id: createEventRegistrationDto.eventId }
    });

    if (!event) {
      throw new Error('Event not found');
    }

    // Check registration deadline
    if (event.registrationDeadline && new Date() > event.registrationDeadline) {
      throw new Error('Registration deadline has passed');
    }

    // Check if event is full
    if (event.maxAttendees && event.currentAttendees >= event.maxAttendees) {
      throw new Error('Event is full');
    }

    // Check if user is already registered
    const existingRegistration = await this.prisma.eventRegistration.findFirst({
      where: {
        eventId: createEventRegistrationDto.eventId,
        email: createEventRegistrationDto.email,
        status: 'registered'
      }
    });

    if (existingRegistration) {
      throw new Error('Already registered for this event');
    }

    // Create registration
    const registration = await this.prisma.eventRegistration.create({
      data: createEventRegistrationDto,
      include: {
        event: true
      }
    });

    // Update event attendee count
    await this.prisma.event.update({
      where: { id: createEventRegistrationDto.eventId },
      data: {
        currentAttendees: {
          increment: 1
        }
      }
    });

    return registration;
  }

  async findAll(eventId?: string) {
    const where = eventId ? { eventId } : {};
    return this.prisma.eventRegistration.findMany({
      where,
      include: {
        event: true
      },
      orderBy: {
        registeredAt: 'desc'
      }
    });
  }

  async findOne(id: string) {
    return this.prisma.eventRegistration.findUnique({
      where: { id },
      include: {
        event: true
      }
    });
  }

  async findByEvent(eventId: string) {
    return this.prisma.eventRegistration.findMany({
      where: { eventId },
      include: {
        event: true
      },
      orderBy: {
        registeredAt: 'desc'
      }
    });
  }

  async update(id: string, updateEventRegistrationDto: UpdateEventRegistrationDto) {
    const registration = await this.prisma.eventRegistration.update({
      where: { id },
      data: updateEventRegistrationDto,
      include: {
        event: true
      }
    });

    // If status changed to cancelled, decrement event attendee count
    if (updateEventRegistrationDto.status === 'cancelled') {
      await this.prisma.event.update({
        where: { id: registration.eventId },
        data: {
          currentAttendees: {
            decrement: 1
          }
        }
      });
    }

    return registration;
  }

  async remove(id: string) {
    const registration = await this.prisma.eventRegistration.findUnique({
      where: { id }
    });

    if (!registration) {
      throw new Error('Registration not found');
    }

    // Decrement event attendee count
    await this.prisma.event.update({
      where: { id: registration.eventId },
      data: {
        currentAttendees: {
          decrement: 1
        }
      }
    });

    return this.prisma.eventRegistration.delete({
      where: { id }
    });
  }

  async getRegistrationStats(eventId: string) {
    const stats = await this.prisma.eventRegistration.groupBy({
      by: ['status'],
      where: { eventId },
      _count: {
        id: true
      }
    });

    return stats.reduce((acc, stat) => {
      acc[stat.status] = stat._count.id;
      return acc;
    }, {});
  }
}
