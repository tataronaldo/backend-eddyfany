import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateReactionDto, ReactionType, ReactionTargetType } from './dto/create-reaction.dto';

@Injectable()
export class ReactionsService {
  constructor(private prisma: PrismaService) {}

  async createReaction(createReactionDto: CreateReactionDto) {
    const { type, targetType, targetId, userId, ipAddress } = createReactionDto;

    // Check if user/IP already reacted to this target
    const existingReaction = await this.prisma.reaction.findFirst({
      where: {
        targetType,
        targetId,
        ...(userId ? { userId } : { ipAddress }),
      },
    });

    if (existingReaction) {
      // Update existing reaction type
      return this.prisma.reaction.update({
        where: { id: existingReaction.id },
        data: { type },
      });
    }

    // Create new reaction
    return this.prisma.reaction.create({
      data: {
        type,
        targetType,
        targetId,
        userId,
        ipAddress,
      },
    });
  }

  async removeReaction(targetType: ReactionTargetType, targetId: string, userId?: string, ipAddress?: string) {
    const whereClause: any = {
      targetType,
      targetId,
    };

    if (userId) {
      whereClause.userId = userId;
    } else if (ipAddress) {
      whereClause.ipAddress = ipAddress;
    }

    return this.prisma.reaction.deleteMany({
      where: whereClause,
    });
  }

  async getReactions(targetType: ReactionTargetType, targetId: string) {
    const reactions = await this.prisma.reaction.groupBy({
      by: ['type'],
      where: {
        targetType,
        targetId,
      },
      _count: {
        type: true,
      },
    });

    // Convert to a more usable format
    const reactionCounts = {};
    reactions.forEach(reaction => {
      reactionCounts[reaction.type] = reaction._count.type;
    });

    // Get total count
    const totalCount = await this.prisma.reaction.count({
      where: {
        targetType,
        targetId,
      },
    });

    return {
      counts: reactionCounts,
      total: totalCount,
    };
  }

  async getUserReaction(targetType: ReactionTargetType, targetId: string, userId?: string, ipAddress?: string) {
    const whereClause: any = {
      targetType,
      targetId,
    };

    if (userId) {
      whereClause.userId = userId;
    } else if (ipAddress) {
      whereClause.ipAddress = ipAddress;
    }

    return this.prisma.reaction.findFirst({
      where: whereClause,
    });
  }

  async getReactionStats(targetType: ReactionTargetType) {
    const reactions = await this.prisma.reaction.groupBy({
      by: ['type'],
      where: {
        targetType,
      },
      _count: {
        type: true,
      },
    });

    const stats = {};
    reactions.forEach(reaction => {
      stats[reaction.type] = reaction._count.type;
    });

    return stats;
  }
}
