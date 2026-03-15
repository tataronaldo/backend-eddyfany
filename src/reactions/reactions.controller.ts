import { Controller, Post, Delete, Get, Param, Body, Req } from '@nestjs/common';
import { ReactionsService } from './reactions.service';
import { CreateReactionDto, ReactionType, ReactionTargetType } from './dto/create-reaction.dto';

@Controller('reactions')
export class ReactionsController {
  constructor(private readonly reactionsService: ReactionsService) {}

  @Post()
  async createReaction(@Body() createReactionDto: CreateReactionDto, @Req() req: any) {
    // Add IP address if not provided
    if (!createReactionDto.userId && !createReactionDto.ipAddress) {
      createReactionDto.ipAddress = req.ip || req.connection.remoteAddress;
    }

    return this.reactionsService.createReaction(createReactionDto);
  }

  @Delete(':targetType/:targetId')
  async removeReaction(
    @Param('targetType') targetType: ReactionTargetType,
    @Param('targetId') targetId: string,
    @Body() body: { userId?: string; ipAddress?: string },
  ) {
    return this.reactionsService.removeReaction(targetType, targetId, body.userId, body.ipAddress);
  }

  @Get(':targetType/:targetId')
  async getReactions(
    @Param('targetType') targetType: ReactionTargetType,
    @Param('targetId') targetId: string,
  ) {
    return this.reactionsService.getReactions(targetType, targetId);
  }

  @Get(':targetType/:targetId/user')
  async getUserReaction(
    @Param('targetType') targetType: ReactionTargetType,
    @Param('targetId') targetId: string,
    @Req() req: any,
    @Body() body: { userId?: string; ipAddress?: string },
  ) {
    const userId = body.userId || req.user?.id;
    const ipAddress = body.ipAddress || req.ip || req.connection.remoteAddress;

    return this.reactionsService.getUserReaction(targetType, targetId, userId, ipAddress);
  }

  @Get('stats/:targetType')
  async getReactionStats(@Param('targetType') targetType: ReactionTargetType) {
    return this.reactionsService.getReactionStats(targetType);
  }

  // Specific endpoints for each content type
  @Get('sermons/:sermonId')
  async getSermonReactions(@Param('sermonId') sermonId: string) {
    return this.reactionsService.getReactions(ReactionTargetType.SERMON, sermonId);
  }

  @Post('sermons/:sermonId')
  async createSermonReaction(
    @Param('sermonId') sermonId: string,
    @Body() createReactionDto: CreateReactionDto,
    @Req() req: any,
  ) {
    createReactionDto.targetType = ReactionTargetType.SERMON;
    createReactionDto.targetId = sermonId;
    
    if (!createReactionDto.userId && !createReactionDto.ipAddress) {
      createReactionDto.ipAddress = req.ip || req.connection.remoteAddress;
    }

    return this.reactionsService.createReaction(createReactionDto);
  }

  @Get('blog-posts/:blogPostId')
  async getBlogPostReactions(@Param('blogPostId') blogPostId: string) {
    return this.reactionsService.getReactions(ReactionTargetType.BLOG_POST, blogPostId);
  }

  @Post('blog-posts/:blogPostId')
  async createBlogPostReaction(
    @Param('blogPostId') blogPostId: string,
    @Body() createReactionDto: CreateReactionDto,
    @Req() req: any,
  ) {
    createReactionDto.targetType = ReactionTargetType.BLOG_POST;
    createReactionDto.targetId = blogPostId;
    
    if (!createReactionDto.userId && !createReactionDto.ipAddress) {
      createReactionDto.ipAddress = req.ip || req.connection.remoteAddress;
    }

    return this.reactionsService.createReaction(createReactionDto);
  }

  @Get('events/:eventId')
  async getEventReactions(@Param('eventId') eventId: string) {
    return this.reactionsService.getReactions(ReactionTargetType.EVENT, eventId);
  }

  @Post('events/:eventId')
  async createEventReaction(
    @Param('eventId') eventId: string,
    @Body() createReactionDto: CreateReactionDto,
    @Req() req: any,
  ) {
    createReactionDto.targetType = ReactionTargetType.EVENT;
    createReactionDto.targetId = eventId;
    
    if (!createReactionDto.userId && !createReactionDto.ipAddress) {
      createReactionDto.ipAddress = req.ip || req.connection.remoteAddress;
    }

    return this.reactionsService.createReaction(createReactionDto);
  }
}
