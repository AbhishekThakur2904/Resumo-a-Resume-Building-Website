# Resume Builder - Frontend

This is the frontend part of the Resume and Cover Letter Builder application built using React, Redux, and Material UI. The application allows users to create, manage, and customize their resumes and cover letters, with an intuitive and responsive UI.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Prerequisites](#prerequisites)
- [Folder Structure](#folder-structure)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)
- [Running the Application](#running-the-application)
- [Contributing](#contributing)
- [License](#license)

## Installation

To set up the frontend application locally, follow these steps:

### Prerequisites

- [Node.js](https://nodejs.org/) (version 16.x or higher)
- [npm](https://www.npmjs.com/) (Node Package Manager)

### Steps

1. Clone the repository:

   ```bash
   git clone https://github.com/zeeshan-75way/resume-builder.git
   cd resume-builder
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root of the project and add the following environment variables:

   ```env
   REACT_APP_API_URL=http://localhost:3000
   ```

   - `REACT_APP_API_URL` should point to your backend API URL.

4. Run the frontend application:

   ```bash
   npm start
   ```

   The frontend will now be running at `http://localhost:3000`.

## Usage

Once the frontend is running, you can interact with the UI that communicates with the backend API. Here are the main features:

### Authentication

- **Login**: Users can log in using their registered email and password.
- **Register**: Users can register to create a new account.

### Resume & Cover Letter Management

- **Personal Info**: View and update personal details such as name, email, and phone.
- **Education**: Add, update, or remove education entries (e.g., school, degree, dates).
- **Experience**: Add, update, or remove work experience entries (e.g., company, position, dates).
- **Cover Letters**: Create, update, and view cover letters for job applications.

## Folder Structure

Here’s a breakdown of the folder structure:

```
/public
  index.html            # Main HTML template
/src
  /assets               # Global assets (e.g., images, styles)
  /components           # Reusable UI components (e.g., buttons, forms)
  /pages                # Page components (e.g., Home, Dashboard)
  /redux                # Redux slices for managing state
  /services             # API calls and business logic
  /styles               # Global CSS or SCSS files
  App.js                # Main app component
  index.js              # Entry point
  setupTests.js         # Test setup
  .env                  # Environment variables
```

### `/src/components`

Contains reusable UI components, like buttons, inputs, and form elements.

### `/src/pages`

Contains the page components for different sections of the app, such as the dashboard, login, and registration pages.

### `/src/redux`

Contains Redux slices for managing global state, including user authentication, personal information, education, experience, and cover letters.

### `/src/services`

Handles API communication with the backend, making GET, POST, PUT, and DELETE requests to the backend API.

### `/src/styles`

Contains global CSS or SCSS files for styling the application.

## Environment Variables

The following environment variable is required:

- `REACT_APP_API_URL`: URL of the backend API (for development, it should be set to `http://localhost:3000`).

## API Endpoints

The frontend interacts with the following backend API endpoints:

### Authentication

- **POST** `/auth/register` – Registers a new user.
- **POST** `/auth/login` – Logs in a user and returns a JWT token.

### Personal Info

- **GET** `/personal-info` – Fetch all personal information for the logged-in user.
- **POST** `/personal-info` – Create or update the user's personal information.
- **PATCH** `/personal-info/:id` – Update personal information.
- **DELETE** `/personal-info/:id` – Delete personal information.

### Education

- **GET** `/education` – Fetch all education records.
- **POST** `/education` – Add a new education record.
- **PATCH** `/education/:id` – Update an existing education record.
- **DELETE** `/education/:id` – Delete an education record.

### Experience

- **GET** `/experience` – Fetch all experience records.
- **POST** `/experience` – Add a new experience record.
- **PATCH** `/experience/:id` – Update an experience record.
- **DELETE** `/experience/:id` – Delete an experience record.

### Cover Letter

- **GET** `/cover-letters` – Fetch all cover letters.
- **POST** `/cover-letters` – Create a new cover letter.
- **PATCH** `/cover-letters/:id` – Update a cover letter.
- **DELETE** `/cover-letters/:id` – Delete a cover letter.

## Running the Application

### Running the Frontend

Once you’ve set up the backend and frontend as described above, run the frontend with:

```bash
npm start
```

This will start the frontend application at `http://localhost:3000`.

### Running the Backend (Optional)

To run the backend, follow the instructions in the backend `README.md` and ensure that your backend API is running on the specified URL (default is `http://localhost:3000`).

### Testing the Application

You can write tests for components, Redux actions, and reducers using libraries such as Jest and React Testing Library.

## Contributing

We welcome contributions! To contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature-name`).
3. Make your changes.
4. Commit your changes (`git commit -am 'Add new feature'`).
5. Push your branch (`git push origin feature/your-feature-name`).
6. Open a pull request.

