# Servir Mais API

This is the backend API for the "Servir Mais" platform, a volunteer management system designed to help organizations recruit, onboard, and manage volunteers. The name "Servir Mais" is Portuguese for "Serve More".

The API is built with [NestJS](https://nestjs.com/), a progressive Node.js framework, and uses a PostgreSQL database.

## Features

-   **Volunteer Registration:** A comprehensive registration process for new volunteers.
-   **Department Management:** Create and manage different departments or teams within the organization.
-   **Volunteer Assignment:** Assign volunteers to specific departments and track their status.
-   **User Authentication:** Secure endpoints with JWT-based authentication.
-   **Role-Based Access Control:** Different user roles (e.g., admin) with different permissions.
-   **Database Seeding:** Automatically populates the database with initial data (e.g., default admin user, volunteer statuses).

## Getting Started

There are two primary ways to run the application: using Docker (recommended for a consistent environment) or running it directly on your local machine.

### Prerequisites

-   [Node.js](https://nodejs.org/en/) (v18 or later recommended)
-   [npm](https://www.npmjs.com/)
-   [Docker](https://www.docker.com/) and [Docker Compose](https://docs.docker.com/compose/) (if using Docker)

### 1. Running with Docker (Recommended)

This is the easiest way to get the API and its database up and running.

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd sevir-api
    ```

2.  **Create a `.env` file:**
    Copy the example environment file and customize it if needed. The default values are suitable for a local development environment.
    ```bash
    cp .env.example .env
    ```

3.  **Build and run with Docker Compose:**
    ```bash
    docker-compose up --build
    ```

The API will be available at `http://localhost:3000`. The PostgreSQL database will be running on port `5433`.

### 2. Running Locally

1.  **Clone the repository and install dependencies:**
    ```bash
    git clone <repository-url>
    cd sevir-api
    npm install
    ```

2.  **Set up a PostgreSQL database:**
    Make sure you have a running PostgreSQL instance. You can use Docker to easily start one:
    ```bash
    docker run --name servir-mais-db -e POSTGRES_USER=servir_mais_user -e POSTGRES_PASSWORD=servir_mais_password -e POSTGRES_DB=servir_mais_db -p 5433:5432 -d postgres
    ```

3.  **Create a `.env` file:**
    Copy the example environment file.
    ```bash
    cp .env.example .env
    ```
    Ensure the `POSTGRES_*` variables in your `.env` file match the credentials for your local PostgreSQL instance.

4.  **Run the application:**
    ```bash
    npm run start:dev
    ```
    The application will start in watch mode, automatically restarting on file changes.

## API Documentation

Once the application is running, interactive API documentation is available at:

-   **[http://localhost:3000/docs](http://localhost:3000/docs)**

This documentation is powered by Scalar and provides a way to explore and test the API endpoints.

## Available Scripts

-   `npm run start:dev`: Runs the app in watch mode.
-   `npm run build`: Compiles the TypeScript code to JavaScript.
-   `npm run start:prod`: Runs the compiled app in production mode.
-   `npm test`: Runs unit tests.
-   `npm run lint`: Lints the codebase.
-   `npm run format`: Formats the codebase with Prettier.
