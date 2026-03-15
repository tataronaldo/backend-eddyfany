# Eddy Fany Ministry Backend

A NestJS backend API for managing the Eddy Fany Ministry website content and operations.

## Features

- **Sermons Management**: Create, read, update, delete sermons with video/audio support
- **Blog Management**: Full-featured blog with categories, tags, and publishing status
- **Projects Management**: Track ministry projects with status and funding
- **Events Management**: Schedule and manage church events
- **Donations Tracking**: Monitor and manage donations
- **Member Management**: Church member database
- **Prayer Requests**: Handle and track prayer requests
- **Testimonials**: Manage member testimonials and reviews
- **Contact Messages**: Handle website contact form submissions

## Tech Stack

- **Framework**: NestJS
- **Database**: MongoDB with Prisma ORM
- **Validation**: class-validator and class-transformer
- **Language**: TypeScript

## Prerequisites

- Node.js (v18 or higher)
- MongoDB (MongoDB Atlas recommended)
- npm or yarn

## Setup

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Environment Setup**
   ```bash
   cp .env.example .env
   ```
   Update `.env` with your MongoDB connection string:
   ```
   DATABASE_URL="mongodb+srv://username:password@cluster.mongodb.net/eddyfany?retryWrites=true&w=majority"
   NODE_ENV=development
   PORT=3000
   ```

3. **Generate Prisma Client**
   ```bash
   npm run prisma:generate
   ```

4. **Run Database Migrations** (if needed)
   ```bash
   npm run prisma:push
   ```

5. **Set up Cloudinary Account**
   - Sign up for a free Cloudinary account at https://cloudinary.com
   - Get your Cloud Name, API Key, and API Secret from the dashboard
   - Update `.env` file with your Cloudinary credentials

6. **Optional: View Database with MongoDB Atlas**
   ```bash
   # Prisma Studio is not supported for MongoDB
   # Use MongoDB Atlas, MongoDB Compass, or MongoDB shell instead
   ```

## Important Notes for MongoDB

- **Prisma Studio**: Not supported for MongoDB. Use MongoDB Atlas, Compass, or shell to view data
- **Prisma Version**: Using Prisma v6.19.0 - Stable MongoDB support
- **Database URL**: Must be a valid MongoDB connection string in `.env` file

## Prisma Scripts

The following Prisma scripts are available:

- `npm run prisma:generate` - Generate Prisma client
- `npm run prisma:push` - Push schema changes to database
- `npm run prisma:migrate` - Run database migrations
- `npm run prisma:studio` - Open Prisma Studio (not supported for MongoDB)
- `npm run prisma:seed` - Seed database with sample data
- `npm run prisma:reset` - Reset database and reapply migrations

## Running the Application

```bash
# Development mode with hot reload
npm run start:dev

# Production mode
npm run start:prod

# Build the application
npm run build
```

The API will be available at `http://localhost:3000/api`

## API Documentation

Swagger/OpenAPI documentation is automatically generated and available at:
- **Interactive API Docs**: `http://localhost:3000/api/docs`
- **JSON Spec**: `http://localhost:3000/api/docs-json`

The documentation includes:
- Interactive API testing
- Request/response schemas
- Authentication examples
- Detailed endpoint descriptions
- Model definitions with examples

## API Endpoints

### Sermons
- `GET /api/sermons` - Get all sermons
- `GET /api/sermons/published` - Get published sermons
- `GET /api/sermons/:id` - Get sermon by ID
- `POST /api/sermons` - Create new sermon
- `PATCH /api/sermons/:id` - Update sermon
- `DELETE /api/sermons/:id` - Delete sermon

### Blog Posts
- `GET /api/blog` - Get all blog posts
- `GET /api/blog/published` - Get published posts
- `GET /api/blog/featured` - Get featured posts
- `GET /api/blog/slug/:slug` - Get post by slug
- `GET /api/blog/:id` - Get post by ID
- `POST /api/blog` - Create new post
- `PATCH /api/blog/:id` - Update post
- `DELETE /api/blog/:id` - Delete post

### Projects
- `GET /api/projects` - Get all projects
- `GET /api/projects/published` - Get published projects
- `GET /api/projects/status/:status` - Get projects by status
- `GET /api/projects/:id` - Get project by ID
- `POST /api/projects` - Create new project
- `PATCH /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project

### Events
- `GET /api/events` - Get all events
- `GET /api/events/published` - Get published events
- `GET /api/events/upcoming` - Get upcoming events
- `GET /api/events/:id` - Get event by ID
- `POST /api/events` - Create new event
- `PATCH /api/events/:id` - Update event
- `DELETE /api/events/:id` - Delete event

### Donations
- `GET /api/donations` - Get all donations
- `GET /api/donations/total` - Get total donation amount
- `GET /api/donations/status/:status` - Get donations by status
- `GET /api/donations/:id` - Get donation by ID
- `POST /api/donations` - Create new donation
- `PATCH /api/donations/:id` - Update donation
- `DELETE /api/donations/:id` - Delete donation

### Members
- `GET /api/members` - Get all members
- `GET /api/members/count` - Get total member count
- `GET /api/members/active` - Get active members
- `GET /api/members/role/:role` - Get members by role
- `GET /api/members/email/:email` - Get member by email
- `GET /api/members/:id` - Get member by ID
- `POST /api/members` - Create new member
- `PATCH /api/members/:id` - Update member
- `DELETE /api/members/:id` - Delete member

### Prayer Requests
- `GET /api/prayer-requests` - Get all prayer requests
- `GET /api/prayer-requests/public` - Get public prayer requests
- `GET /api/prayer-requests/unanswered` - Get unanswered requests
- `GET /api/prayer-requests/:id` - Get request by ID
- `POST /api/prayer-requests` - Create new request
- `PATCH /api/prayer-requests/:id` - Update request
- `PATCH /api/prayer-requests/:id/answer` - Mark as answered
- `DELETE /api/prayer-requests/:id` - Delete request

### Testimonials
- `GET /api/testimonials` - Get all testimonials
- `GET /api/testimonials/pending` - Get pending testimonials
- `GET /api/testimonials/approved` - Get approved testimonials
- `GET /api/testimonials/public` - Get public testimonials
- `GET /api/testimonials/:id` - Get testimonial by ID
- `POST /api/testimonials` - Create new testimonial
- `PATCH /api/testimonials/:id` - Update testimonial
- `PATCH /api/testimonials/:id/approve` - Approve testimonial
- `DELETE /api/testimonials/:id` - Delete testimonial

### Contact Messages
- `GET /api/contact-messages` - Get all contact messages
- `GET /api/contact-messages/unread` - Get unread contact messages
- `GET /api/contact-messages/replied` - Get replied contact messages
- `GET /api/contact-messages/:id` - Get contact message by ID
- `POST /api/contact-messages` - Create new contact message
- `PATCH /api/contact-messages/:id` - Update contact message
- `PATCH /api/contact-messages/:id/read` - Mark contact message as read
- `PATCH /api/contact-messages/:id/reply` - Reply to contact message
- `DELETE /api/contact-messages/:id` - Delete contact message

### File Uploads
- `POST /api/uploads/image` - Upload an image file
- `POST /api/uploads/video` - Upload a video file
- `POST /api/uploads/audio` - Upload an audio file
- `POST /api/uploads/document` - Upload a document file (PDF, DOC, etc.)
- `POST /api/uploads/delete` - Delete a file from Cloudinary

## Database Schema

The application uses MongoDB with the following collections:
- `sermons` - Church sermons and messages
- `blog_posts` - Blog articles and posts
- `projects` - Ministry projects and initiatives
- `events` - Church events and gatherings
- `donations` - Financial donations and contributions
- `members` - Church members and congregation
- `prayer_requests` - Prayer requests from community
- `testimonials` - Member testimonials and stories
- `contact_messages` - Website contact form submissions

## Development

```bash
# Run tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run test coverage
npm run test:cov

# Run ESLint
npm run lint

# Format code
npm run format
```

## License

This project is MIT licensed.
