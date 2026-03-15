import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PrayerRequestsService } from './prayer-requests.service';
import { CreatePrayerRequestDto } from './dto/create-prayer-request.dto';

@Controller('prayer-requests')
export class PrayerRequestsController {
  constructor(private readonly prayerRequestsService: PrayerRequestsService) {}

  @Post()
  create(@Body() createPrayerRequestDto: CreatePrayerRequestDto) {
    return this.prayerRequestsService.create(createPrayerRequestDto);
  }

  @Get()
  findAll() {
    return this.prayerRequestsService.findAll();
  }

  @Get('public')
  findPublic() {
    return this.prayerRequestsService.findPublic();
  }

  @Get('unanswered')
  findUnanswered() {
    return this.prayerRequestsService.findUnanswered();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.prayerRequestsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePrayerRequestDto: any) {
    return this.prayerRequestsService.update(id, updatePrayerRequestDto);
  }

  @Patch(':id/answer')
  markAsAnswered(@Param('id') id: string, @Body('answeredBy') answeredBy: string) {
    return this.prayerRequestsService.markAsAnswered(id, answeredBy);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.prayerRequestsService.remove(id);
  }
}
