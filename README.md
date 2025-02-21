# Resumo - Resume and Cover Letter Builder

![Resume Builder](https://your-image-link.com)

## 🚀 Project Overview
The **Resumo** is a full-stack MERN application that enables users to create, manage, and customize professional resumes and cover letters. The application provides an intuitive and responsive UI built with React, Redux, and Material UI, while the backend is powered by Node.js, Express, and MongoDB.

## 📌 Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
  - [Frontend Setup](#frontend-setup)
  - [Backend Setup](#backend-setup)
- [Folder Structure](#folder-structure)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)
- [Running the Application](#running-the-application)
- [Contributing](#contributing)
- [License](#license)

## ✨ Features
✅ User Authentication (Login, Registration, JWT Authentication)  
✅ Resume & Cover Letter Management  
✅ Personal Info, Education, and Work Experience Handling  
✅ CRUD Operations for Resume Sections  
✅ Dynamic and Customizable Resume Templates  
✅ RESTful API for Seamless Integration  
✅ Responsive UI for a Smooth User Experience  

## 🛠 Tech Stack
### **Frontend:**
- React.js
- Redux Toolkit
- Material UI
- Axios

### **Backend:**
- Node.js
- Express.js
- MongoDB (Mongoose)
- JSON Web Token (JWT) Authentication
- Bcrypt.js for Password Hashing

---

## 🏗 Installation
To set up and run this project locally, follow the steps below.

### **Frontend Setup**
1. Clone the repository:
   ```sh
   git clone https://github.com/zeeshan-75way/resume-builder.git
   cd resume-builder/frontend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Create a `.env` file and add:
   ```sh
   REACT_APP_API_URL=http://localhost:5000
   ```
4. Run the frontend:
   ```sh
   npm start
   ```
   The app will be available at [http://localhost:3000](http://localhost:3000).

### **Backend Setup**
1. Navigate to the backend directory:
   ```sh
   cd backend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Create a `.env` file and add:
   ```sh
   MONGO_URI=your_mongo_database_connection_string
   JWT_SECRET=your_jwt_secret
   ```
4. Run the backend server:
   ```sh
   npm start
   ```
   The backend will be available at [http://localhost:5000](http://localhost:5000).

---

## 📁 Folder Structure
```
resume-builder/
│-- frontend/
│   │-- src/
│   │   ├── assets/          # Global assets (images, styles)
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/           # Page components (Dashboard, Login, Register)
│   │   ├── redux/           # Redux slices for state management
│   │   ├── services/        # API calls and business logic
│   │   ├── styles/          # Global CSS or SCSS files
│   │   ├── App.js           # Main App component
│   │   ├── index.js         # Entry point
│-- backend/
│   │-- models/              # Mongoose models (User, Resume, Cover Letter)
│   │-- routes/              # Express routes (Auth, Resume, Cover Letter)
│   │-- controllers/         # Business logic
│   │-- middleware/          # Authentication & validation middleware
│   │-- server.js            # Main entry point
```

---

## 🔑 Environment Variables
The project requires the following environment variables:

### **Frontend:** `.env`
```sh
REACT_APP_API_URL=http://localhost:5000
```

### **Backend:** `.env`
```sh
MONGO_URI=your_mongo_database_connection_string
JWT_SECRET=your_jwt_secret
```

---

## 🔗 API Endpoints
### **Authentication**
- `POST /auth/register` – Register a new user
- `POST /auth/login` – Authenticate user & return JWT

### **Personal Information**
- `GET /personal-info` – Fetch user’s personal information
- `POST /personal-info` – Create/update personal details

### **Education**
- `GET /education` – Get all education records
- `POST /education` – Add a new education record

### **Experience**
- `GET /experience` – Get all work experience records
- `POST /experience` – Add a new work experience record

### **Cover Letter**
- `GET /cover-letters` – Fetch all cover letters
- `POST /cover-letters` – Create a new cover letter

---

## 🚀 Running the Application
1. Start the **backend**:
   ```sh
   cd backend
   npm start
   ```
2. Start the **frontend**:
   ```sh
   cd frontend
   npm start
   ```

---

## 🤝 Contributing
We welcome contributions! To contribute:
1. **Fork** the repository.
2. Create a new branch:
   ```sh
   git checkout -b feature/your-feature-name
   ```
3. Make your changes and commit:
   ```sh
   git commit -am 'Add new feature'
   ```
4. Push to your branch:
   ```sh
   git push origin feature/your-feature-name
   ```
5. Open a **Pull Request**.

---

## 📜 License
This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details.

---

🔹 **Author:** Abhishek Thakur - [GitHub](https://github.com/AbhishekThakur2904)  

---

