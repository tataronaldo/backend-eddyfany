import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

export interface CreateGalleryDto {
  title: string;
  description?: string;
  mediaUrl: string;
  mediaType: string;
  category: string;
  thumbnail?: string;
  duration?: number;
  fileSize?: number;
  tags?: string[];
  uploadedBy: string;
}

export interface UpdateGalleryDto {
  title?: string;
  description?: string;
  mediaUrl?: string;
  mediaType?: string;
  category?: string;
  thumbnail?: string;
  duration?: number;
  fileSize?: number;
  tags?: string[];
  isPublished?: boolean;
  isFeatured?: boolean;
}

@Injectable()
export class GalleryService {
  constructor(private prisma: PrismaService) {}

  async create(createGalleryDto: CreateGalleryDto) {
    return this.prisma.gallery.create({
      data: createGalleryDto
    });
  }

  async findAll(params?: {
    category?: string;
    mediaType?: string;
    isPublished?: boolean;
    isFeatured?: boolean;
    limit?: number;
    page?: number;
  }) {
    const where: any = {};
    
    if (params?.category) where.category = params.category;
    if (params?.mediaType) where.mediaType = params.mediaType;
    if (params?.isPublished !== undefined) where.isPublished = params.isPublished;
    if (params?.isFeatured !== undefined) where.isFeatured = params.isFeatured;

    return this.prisma.gallery.findMany({
      where,
      orderBy: {
        createdAt: 'desc'
      },
      take: params?.limit,
      skip: params?.page && params?.limit ? (params.page - 1) * params.limit : undefined
    });
  }

  async findByCategory(category: string) {
    return this.prisma.gallery.findMany({
      where: { 
        category,
        isPublished: true 
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
  }

  async findFeatured() {
    return this.prisma.gallery.findMany({
      where: { 
        isFeatured: true,
        isPublished: true 
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
  }

  async findPublished() {
    return this.prisma.gallery.findMany({
      where: { isPublished: true },
      orderBy: {
        createdAt: 'desc'
      }
    });
  }

  async findOne(id: string) {
    return this.prisma.gallery.findUnique({
      where: { id }
    });
  }

  async update(id: string, updateGalleryDto: UpdateGalleryDto) {
    return this.prisma.gallery.update({
      where: { id },
      data: updateGalleryDto
    });
  }

  async remove(id: string) {
    return this.prisma.gallery.delete({
      where: { id }
    });
  }

  async getGalleryStats() {
    const [
      totalItems,
      publishedItems,
      featuredItems,
      itemsByCategory,
      itemsByType
    ] = await Promise.all([
      this.prisma.gallery.count(),
      this.prisma.gallery.count({ where: { isPublished: true } }),
      this.prisma.gallery.count({ where: { isFeatured: true } }),
      this.prisma.gallery.groupBy({
        by: ['category'],
        _count: { id: true }
      }),
      this.prisma.gallery.groupBy({
        by: ['mediaType'],
        _count: { id: true }
      })
    ]);

    return {
      totalItems,
      publishedItems,
      featuredItems,
      itemsByCategory: itemsByCategory.reduce((acc, item) => {
        acc[item.category] = item._count.id;
        return acc;
      }, {}),
      itemsByType: itemsByType.reduce((acc, item) => {
        acc[item.mediaType] = item._count.id;
        return acc;
      }, {})
    };
  }

  async togglePublish(id: string) {
    const gallery = await this.prisma.gallery.findUnique({
      where: { id }
    });

    if (!gallery) {
      throw new Error('Gallery item not found');
    }

    return this.prisma.gallery.update({
      where: { id },
      data: {
        isPublished: !gallery.isPublished
      }
    });
  }

  async toggleFeatured(id: string) {
    const gallery = await this.prisma.gallery.findUnique({
      where: { id }
    });

    if (!gallery) {
      throw new Error('Gallery item not found');
    }

    return this.prisma.gallery.update({
      where: { id },
      data: {
        isFeatured: !gallery.isFeatured
      }
    });
  }
}
