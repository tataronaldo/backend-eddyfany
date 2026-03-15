import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { SermonsModule } from './sermons/sermons.module';
import { BlogModule } from './blog/blog.module';
import { ProjectsModule } from './projects/projects.module';
import { EventsModule } from './events/events.module';
import { DonationsModule } from './donations/donations.module';
import { MembersModule } from './members/members.module';
import { PrayerRequestsModule } from './prayer-requests/prayer-requests.module';
import { TestimonialsModule } from './testimonials/testimonials.module';
import { ContactMessagesModule } from './contact-messages/contact-messages.module';
import { UploadsModule } from './uploads/uploads.module';
import { EventRegistrationModule } from './event-registration/event-registration.module';
import { AuthModule } from './auth/auth.module';
import { GalleryModule } from './gallery/gallery.module';
import { ReactionsModule } from './reactions/reactions.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    SermonsModule,
    BlogModule,
    ProjectsModule,
    EventsModule,
    DonationsModule,
    MembersModule,
    PrayerRequestsModule,
    TestimonialsModule,
    ContactMessagesModule,
    UploadsModule,
    EventRegistrationModule,
    AuthModule,
    GalleryModule,
    ReactionsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
