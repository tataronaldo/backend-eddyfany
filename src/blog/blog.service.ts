import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBlogDto } from './dto/create-blog.dto';

@Injectable()
export class BlogService {
  constructor(private prisma: PrismaService) {}

  async create(createBlogDto: CreateBlogDto) {
    return this.prisma.blogPost.create({
      data: createBlogDto,
    });
  }

  async findAll() {
    return this.prisma.blogPost.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    return this.prisma.blogPost.findUnique({
      where: { id },
    });
  }

  async findBySlug(slug: string) {
    return this.prisma.blogPost.findUnique({
      where: { slug },
    });
  }

  async update(id: string, updateBlogDto: any) {
    return this.prisma.blogPost.update({
      where: { id },
      data: updateBlogDto,
    });
  }

  async remove(id: string) {
    return this.prisma.blogPost.delete({
      where: { id },
    });
  }

  async findPublished() {
    return this.prisma.blogPost.findMany({
      where: { published: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findFeatured() {
    return this.prisma.blogPost.findMany({
      where: { published: true, featured: true },
      orderBy: { createdAt: 'desc' },
    });
  }
}
