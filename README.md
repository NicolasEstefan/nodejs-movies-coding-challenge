# Movies API

A Node.js REST API built with Express and TypeScript that provides movie search functionality with JWT-based authentication.

## Prerequisites

- Docker and Docker Compose installed on your system
- Node.js (for local development without Docker)

## Setup & Installation

### 1. Environment Variables

Create a `.env` file in the project root with the following variables:

```env
# Database Configuration
DB_PORT=5432 # Port to expose to the host system
DB_NAME=movies_db
DB_USERNAME=postgres
DB_PASSWORD=your_password_here

# Server Configuration
PORT=3000
SERVER_SECRET=your_secret_key_here
```

### 2. Run with Docker Compose

Start the development server and PostgreSQL database:

```bash
docker-compose up
```

The API will be available at `http://localhost:3000` (or the port specified in your `.env` file).

## API Endpoints

A postman collection is available at the root of the project `nodejs-challenge.postman_collection.json`. It contains requests for all implemented endpoints.

### Authentication Endpoints

All authentication endpoints are prefixed with `/api/auth`.

#### `POST /api/auth/signup`

Create a new user account.

**Request Body:**

```json
{
  "name": "John",
  "email": "user@example.com",
  "password": "yourpassword"
}
```

#### `POST /api/auth/login`

Authenticate and receive access tokens.

**Request Body:**

```json
{
  "email": "user@example.com",
  "password": "yourpassword"
}
```

**Response:** Sets `access-token` and `refresh-token` cookies.

#### `GET /api/auth/refresh`

Refresh your access token using a valid refresh token.

**Requirements:** Must have valid `refresh-token` cookie.

**Response:** Sets new `access-token` cookie.

#### `POST /api/auth/logout`

Logout and invalidate refresh token.

### Movies Endpoints

All movie endpoints are prefixed with `/api/movies` and require authentication.

#### `GET /api/movies/search`

Search for movies (requires authentication).

**Query Parameters:**

- `query` (required): Search term for movies
- `page` (optional): Page number for pagination

**Example:**

```bash
GET /api/movies/search?query=minecraft&page=1
```

## Authentication

This API uses **JWT (JSON Web Token)** authentication with HTTP-only cookies.

### How It Works

1. **Sign Up/Login**: Users register or login via `/api/auth/signup` or `/api/auth/login`
2. **Tokens Issued**: Two tokens are issued:
   - **Access Token**: Short-lived token stored in `access-token` cookie (used for API requests)
   - **Refresh Token**: Longer-lived token stored in `refresh-token` cookie (used to obtain new access tokens)
3. **Making Authenticated Requests**: Include the cookies in your requests. The `access-token` cookie is automatically validated.
4. **Token Refresh**: When the access token expires, use `/api/auth/refresh` to get a new one using the refresh token.
5. **Logout**: Call `/api/auth/logout` to invalidate the refresh token.

## Project Structure

```
src/
├── api/              # API layer (routes, middleware)
├── core/             # Business logic
├── models/           # Sequelize database models
├── repository/       # Data access layer
├── schemas/          # Zod validation schemas
├── types/            # TypeScript type definitions
└── util/             # Utility functions
```

## Development

The application uses `nodemon` and `tsx` for hot-reloading during development. Any changes to the source files will automatically restart the server when running with Docker Compose.

## Tech Stack

- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js
- **Database**: PostgreSQL (with Sequelize ORM)
- **Authentication**: JWT (jsonwebtoken)
- **Validation**: Zod
- **Containerization**: Docker & Docker Compose
