# Resume and Cover Letter Builder API

This is a full-stack MERN application that allows users to create, manage, and customize their resumes and cover letters. The application includes features for managing personal information, education, work experience, and generating cover letters.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
  - [Authentication](#authentication)
  - [Personal Information](#personal-information)
  - [Education](#education)
  - [Experience](#experience)
  - [Cover Letter](#cover-letter)
- [Database Models](#database-models)
  - [User](#user)
  - [PersonalInfo](#personalinfo)
  - [Education](#education-model)
  - [Experience](#experience-model)
  - [CoverLetter](#coverletter)
- [Authentication](#authentication)
- [Environment Variables](#environment-variables)
- [Contributing](#contributing)
- [License](#license)

## Installation

To set up and run this application locally, follow these steps:

### Prerequisites

- [Node.js](https://nodejs.org/) (version 16.x or higher)
- [MongoDB](https://www.mongodb.com/) for the database

### Steps

1. Clone the repository:

   ```bash
   git clone https://github.com/AbhishekThakur2904/Resumo-a-Resume-Building-Website.git
   cd resume-builder
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root of the project and add the following environment variables:

   ```env
   MONGO_URI=your_mongo_database_connection_string
   JWT_SECRET=your_jwt_secret
   ```

4. Run the server:

   ```bash
   npm start
   ```

   The server will now be running at `http://localhost:5000`.

## Usage

Once the server is running, you can interact with the API using HTTP requests. The API supports various operations like managing personal information, education, work experience, and cover letters.

### Authentication

- **POST** `/auth/register` – Register a new user.
- **POST** `/auth/login` – Login to an existing account and receive a JWT token.

### Personal Information

- **GET** `/personal-info` – Fetch all personal information records (Admin only).
- **GET** `/personal-info/:id` – Fetch a specific personal information record by ID.
- **POST** `/personal-info` – Create a new personal information record.
- **PATCH** `/personal-info/:id` – Update a personal information record by ID.
- **DELETE** `/personal-info/:id` – Delete a personal information record by ID.

### Education

- **GET** `/education` – Fetch all education records (Admin only).
- **GET** `/education/:id` – Fetch a specific education record by ID.
- **POST** `/education` – Create a new education record.
- **PATCH** `/education/:id` – Update an education record by ID.
- **DELETE** `/education/:id` – Delete an education record by ID.

### Experience

- **GET** `/experience` – Fetch all experience records (Admin only).
- **GET** `/experience/:id` – Fetch a specific experience record by ID.
- **POST** `/experience` – Create a new experience record.
- **PATCH** `/experience/:id` – Update an experience record by ID.
- **DELETE** `/experience/:id` – Delete an experience record by ID.

### Cover Letter

- **GET** `/cover-letters` – Fetch all cover letters.
- **GET** `/cover-letters/my` – Fetch cover letters for the current user.
- **GET** `/cover-letters/:id` – Fetch a specific cover letter by ID.
- **POST** `/cover-letters` – Create a new cover letter.
- **PATCH** `/cover-letters/:id` – Update a cover letter by ID.
- **DELETE** `/cover-letters/:id` – Delete a cover letter by ID.

## Database Models

### User

The `User` model contains the user credentials and basic user details.

- `email` (String) – Unique user email.
- `password` (String) – Hashed user password.
- `role` (String) – User role (`USER`, `ADMIN`).

### PersonalInfo

The `PersonalInfo` model stores the personal details of the user.

- `fullName` (String) – Full name of the user.
- `email` (String) – User's email.
- `phone` (String) – User's phone number.
- `address` (String) – User's address.
- `resumeId` (ObjectId) – Reference to the user's resume.

### Education

The `Education` model stores educational background information.

- `school` (String) – Name of the school.
- `degree` (String) – Degree obtained.
- `startDate` (Date) – Start date of the education.
- `endDate` (Date) – End date of the education.

### Experience

The `Experience` model stores work experience details.

- `company` (String) – Company name.
- `position` (String) – Position held.
- `startDate` (Date) – Start date of the position.
- `endDate` (Date) – End date of the position.
- `description` (String) – Description of the role.

### CoverLetter

The `CoverLetter` model stores the cover letter details.

- `userId` (ObjectId) – Reference to the user who created the cover letter.
- `title` (String) – Title of the cover letter.
- `content` (String) – Content of the cover letter.
- `template` (String) – Optional template used for the cover letter.

## Authentication

The application uses JWT (JSON Web Token) for user authentication.

1. **Register** a new user by sending a `POST` request to `/auth/register`.
2. **Login** an existing user by sending a `POST` request to `/auth/login`. This will return a JWT that must be included in the `Authorization` header for protected routes.
3. **Role-based Authentication**: Only users with the `ADMIN` role can access certain endpoints (e.g., fetching all education records).

## Environment Variables

Below is a list of environment variables used in the application:

- `MONGO_URI`: MongoDB connection string.
- `JWT_SECRET`: Secret key for JWT signing and validation.

## Contributing

Contributions are welcome! Please feel free to fork the repository and submit pull requests. To contribute:

1. Fork the repository.
2. Clone your fork locally.
3. Create a new branch (`git checkout -b feature/your-feature-name`).
4. Commit your changes (`git commit -am 'Add new feature'`).
5. Push your branch (`git push origin feature/your-feature-name`).
6. Open a pull request.
