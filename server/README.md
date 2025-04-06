
# Placement Portal API

Backend API for the Placement Portal application built with Node.js, Express, and MongoDB.

## Setup

1. Install dependencies:
```
npm install
```

2. Create a `.env` file in the server directory with the following variables:
```
MONGODB_URI=mongodb://localhost:27017/placement-portal
JWT_SECRET=your_jwt_secret_key_here
PORT=5000
```

3. Start the server:
```
node server.js
```

## API Endpoints

### Authentication
- POST `/api/auth/register` - Register new user
- POST `/api/auth/login` - Login user
- GET `/api/auth/me` - Get current user

### Jobs
- GET `/api/jobs` - Get all jobs with filters
- GET `/api/jobs/:id` - Get job by ID
- POST `/api/jobs` - Create new job (company only)
- PUT `/api/jobs/:id` - Update job
- DELETE `/api/jobs/:id` - Delete job
- GET `/api/jobs/company/:companyId` - Get jobs for specific company

### Applications
- GET `/api/applications` - Get applications for current user
- GET `/api/applications/job/:jobId` - Get applications for a job
- POST `/api/applications/apply/:jobId` - Apply to a job
- PATCH `/api/applications/:id/status` - Update application status
- DELETE `/api/applications/:id` - Delete application (admin only)

### Users
- GET `/api/users` - Get all users (admin only)
- GET `/api/users/:id` - Get user by ID
- PUT `/api/users/profile` - Update user profile
- PUT `/api/users/password` - Change password
- DELETE `/api/users/:id` - Delete user
- GET `/api/users/companies/list` - Get all companies

## Models

- User (base model with discriminators)
- Student (extends User)
- Company (extends User)
- Job
- Application

## Authentication

This API uses JSON Web Tokens (JWT) for authentication. For protected routes, include the token in the Authorization header:

```
Authorization: Bearer YOUR_JWT_TOKEN
```

## Role-Based Authorization

The API implements role-based authorization with three roles:
- Admin: full access to all resources
- Company: can manage own profile, create/manage jobs, and manage applications
- Student: can manage own profile and apply to jobs
