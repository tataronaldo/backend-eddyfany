import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Enable validation
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));
  
  // Set prefix for API
  app.setGlobalPrefix('api');
  
  // Swagger configuration
  const config = new DocumentBuilder()
    .setTitle('Eddy Fany Ministry API')
    .setDescription(`
Backend API for managing Eddy Fany Ministry content and operations. 

## 🚀 Quick Test Scripts

### File Uploads
\`\`\`bash
# Upload Image
curl -X POST http://localhost:3001/api/uploads/image \\
  -H "Content-Type: multipart/form-data" \\
  -F "file=@/path/to/image.jpg"

# Upload Video  
curl -X POST http://localhost:3001/api/uploads/video \\
  -H "Content-Type: multipart/form-data" \\
  -F "file=@/path/to/video.mp4"

# Upload Audio
curl -X POST http://localhost:3001/api/uploads/audio \\
  -H "Content-Type: multipart/form-data" \\
  -F "file=@/path/to/audio.mp3"

# Upload Document
curl -X POST http://localhost:3001/api/uploads/document \\
  -H "Content-Type: multipart/form-data" \\
  -F "file=@/path/to/document.pdf"
\`\`\`

### Sermons
\`\`\`bash
# Create Sermon with Media
curl -X POST http://localhost:3001/api/sermons \\
  -H "Content-Type: application/json" \\
  -d '{
    "title": "The Power of Persistent Prayer",
    "description": "A powerful message about prayer",
    "content": "Today I want to talk to you about the power of persistent prayer...",
    "videoUrl": "https://res.cloudinary.com/your-cloud/video/upload/v123/eddyfany-ministry/videos/sermon.mp4",
    "audioUrl": "https://res.cloudinary.com/your-cloud/video/upload/v123/eddyfany-ministry/audio/sermon.mp3",
    "thumbnail": "https://res.cloudinary.com/your-cloud/image/upload/v123/eddyfany-ministry/images/thumbnail.jpg",
    "documentUrl": "https://res.cloudinary.com/your-cloud/raw/upload/v123/eddyfany-ministry/documents/transcript.pdf",
    "published": true,
    "tags": ["prayer", "faith", "spiritual growth"]
  }'

# Get All Sermons
curl http://localhost:3001/api/sermons

# Get Published Sermons
curl http://localhost:3001/api/sermons/published
\`\`\`

### Blog Posts
\`\`\`bash
# Create Blog Post with Media
curl -X POST http://localhost:3001/api/blog \\
  -H "Content-Type: application/json" \\
  -d '{
    "title": "The Power of Persistent Prayer",
    "slug": "power-of-persistent-prayer",
    "content": "Prayer is one of the most powerful tools...",
    "excerpt": "Discover how persistent prayer can transform your spiritual life.",
    "thumbnail": "https://res.cloudinary.com/your-cloud/image/upload/v123/eddyfany-ministry/images/blog-thumb.jpg",
    "documentUrl": "https://res.cloudinary.com/your-cloud/raw/upload/v123/eddyfany-ministry/documents/blog-pdf.pdf",
    "author": "Pastor John Smith",
    "featured": true,
    "published": true,
    "tags": ["prayer", "spiritual growth", "faith"],
    "category": "Spiritual Growth"
  }'

# Get Blog Posts
curl http://localhost:3001/api/blog

# Get Featured Posts
curl http://localhost:3001/api/blog/featured
\`\`\`

### Events
\`\`\`bash
# Create Event with Media
curl -X POST http://localhost:3001/api/events \\
  -H "Content-Type: application/json" \\
  -d '{
    "title": "Annual Church Conference",
    "description": "Join us for our annual church conference",
    "content": "This year conference will focus on spiritual growth...",
    "image": "https://res.cloudinary.com/your-cloud/image/upload/v123/eddyfany-ministry/images/event-banner.jpg",
    "documentUrl": "https://res.cloudinary.com/your-cloud/raw/upload/v123/eddyfany-ministry/documents/agenda.pdf",
    "startDate": "2024-06-15T09:00:00Z",
    "endDate": "2024-06-15T17:00:00Z",
    "location": "Main Sanctuary, Eddy Fany Ministry Church",
    "maxAttendees": 200,
    "published": true,
    "tags": ["conference", "worship", "community"]
  }'

# Get Events
curl http://localhost:3001/api/events

# Get Upcoming Events
curl http://localhost:3001/api/events/upcoming
\`\`\`

### Projects
\`\`\`bash
# Create Project with Media
curl -X POST http://localhost:3001/api/projects \\
  -H "Content-Type: application/json" \\
  -d '{
    "title": "Church Building Fund",
    "description": "Building a new sanctuary to accommodate our growing congregation",
    "content": "We are excited to announce our church building project...",
    "image": "https://res.cloudinary.com/your-cloud/image/upload/v123/eddyfany-ministry/images/project-banner.jpg",
    "documentUrl": "https://res.cloudinary.com/your-cloud/raw/upload/v123/eddyfany-ministry/documents/proposal.pdf",
    "status": "planning",
    "startDate": "2024-01-01T00:00:00Z",
    "endDate": "2024-12-31T23:59:59Z",
    "targetAmount": 500000,
    "currentAmount": 125000,
    "published": true,
    "tags": ["building", "fundraising", "community"]
  }'

# Get Projects
curl http://localhost:3001/api/projects

# Get Projects by Status
curl http://localhost:3001/api/projects/status/planning
\`\`\`

### Other Endpoints
\`\`\`bash
# Create Donation
curl -X POST http://localhost:3001/api/donations \\
  -H "Content-Type: application/json" \\
  -d '{
    "amount": 100,
    "donorName": "John Doe",
    "email": "john@example.com",
    "type": "one-time",
    "status": "completed"
  }'

# Create Prayer Request
curl -X POST http://localhost:3001/api/prayer-requests \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "Jane Smith",
    "email": "jane@example.com",
    "phone": "123-456-7890",
    "request": "Please pray for my family",
    "isPublic": true,
    "isAnswered": false
  }'

# Create Testimonial
curl -X POST http://localhost:3001/api/testimonials \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "content": "This church has changed my life!",
    "rating": 5,
    "isPublic": true,
    "isApproved": true
  }'

# Create Contact Message
curl -X POST http://localhost:3001/api/contact-messages \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "Jane Smith",
    "email": "jane@example.com",
    "phone": "123-456-7890",
    "subject": "General Inquiry",
    "message": "I would like to know more about your services."
  }'
\`\`\`

## 📝 Testing Tips
1. **Upload files first** before creating content with media URLs
2. **Replace Cloudinary URLs** with actual URLs from upload responses
3. **Use Swagger UI** at /api/docs for interactive testing
4. **Check responses** for proper data structure
5. **Test error cases** by sending invalid data

Features include sermons with media uploads, blog management, projects tracking, events management, donations handling, member management, prayer requests, testimonials, contact messages, and comprehensive file upload support for images, videos, audio, and documents.
`)
    .setVersion('1.0')
    .addTag('sermons', 'Church sermons and messages management with media support')
    .addTag('blog', 'Blog posts and articles management with image and document uploads')
    .addTag('projects', 'Ministry projects and initiatives with file attachments')
    .addTag('events', 'Church events and gatherings with media and documents')
    .addTag('donations', 'Donations and financial contributions')
    .addTag('members', 'Church members and congregation')
    .addTag('prayer-requests', 'Prayer requests from community')
    .addTag('testimonials', 'Member testimonials and stories')
    .addTag('contact-messages', 'Website contact form submissions')
    .addTag('uploads', 'File upload management (images, videos, audio, documents)')
    .addServer('http://localhost:3001', 'Development server')
    .addBearerAuth()
    .build();
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
      displayRequestDuration: true,
      docExpansion: 'none',
      filter: true,
      showExtensions: true,
      showCommonExtensions: true,
    },
    customSiteTitle: 'Eddy Fany Ministry API Documentation',
    customfavIcon: '/favicon.ico',
    customCss: `
      .topbar-wrapper img { content: url('https://via.placeholder.com/40x40/2563eb/ffffff?text=EF'); }
      .swagger-ui .topbar { background-color: #2563eb; }
      .swagger-ui .topbar-wrapper .link { color: white; }
    `,
  });
  
  await app.listen(process.env.PORT ?? 3001);
  console.log(`🚀 Application is running on: http://localhost:${process.env.PORT ?? 3001}/api`);
  console.log(`📚 API Documentation: http://localhost:${process.env.PORT ?? 3001}/api/docs`);
}
bootstrap();
