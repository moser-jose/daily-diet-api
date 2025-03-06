# Daily Diet API

## About the Project

The Daily Diet API is an application for daily diet control, allowing users to record their meals and track metrics related to their diet.

## Features

### Users
- User creation
- User identification between requests

### Meals
- Meal registration with:
  - Name
  - Description
  - Date and Time
  - Status (within or outside the diet)
- Editing existing meals
- Deleting meals
- Listing all user meals
- Detailed view of a specific meal

### Metrics
- Total number of registered meals
- Total number of meals within the diet
- Total number of meals outside the diet
- Best sequence of meals within the diet

## Application Rules

- Each meal belongs to a single user
- The user can only view, edit, and delete meals they created
- User identification is required between requests to ensure correct access to information

## Technologies (Suggested)

- Node.js
- TypeScript
- Express/Fastify
- Database (PostgreSQL, SQLite, etc.)
- JWT Authentication
- Docker (optional for containerization)

## Data Structure

### User
- ID
- Name
- Email
- Password (hash)
- Creation date

### Meal
- ID
- User ID (relationship)
- Name
- Description
- Date and time
- Is within the diet (boolean)
- Creation date
- Update date

## How to Run the Project

### Requirements
- Node.js installed
- Package manager (npm, yarn, or pnpm)
- Configured database (according to implementation choice)

### Execution Steps
1. Clone the repository
2. Install dependencies
3. Configure environment variables
4. Run database migrations
5. Start the application

```bash
# Install dependencies
yarn

# Configure environment
cp .env.example .env

# Docker
docker compose up -d

# Migrations 

npx prisma migrate dev

# Run migrations
yarn run migrate

# Start in development
yarn run dev
```

## API Routes

### Users
- `POST /users` - Create a new user
- `POST /sessions` - Login/Authentication

### Meals
- `POST /meals` - Create a new meal
- `GET /meals` - List all user meals
- `GET /meals/:id` - Get details of a specific meal
- `PUT /meals/:id` - Update a meal
- `DELETE /meals/:id` - Delete a meal

### Metrics
- `GET /metrics` - Get user metrics

## License

This project is under the MIT license.