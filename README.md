# Student LinkedIn Platform

A full-stack social networking platform designed specifically for students. The platform allows students to create profiles, share posts, connect with other students, and interact with content in a professional networking environment similar to LinkedIn.

## Live Demo

https://connectsd.vercel.app/

## GitHub Repository

https://github.com/harshrai2910/Student_Linkedin_platform

---

## Features

### User Authentication

- User registration and login
- Secure password handling
- Session-based authentication
- Protected routes
- User session management

### User Profiles

- Create and update user profiles
- Upload profile pictures
- Add personal and academic information
- View other student's profiles
- Display user posts and profile information

### Posts

- Create posts with text and images
- Upload post images
- View posts from users
- Delete posts
- Store post data in MongoDB
- Cloudinary integration for image storage

### Networking

- Connect with other students
- View other users
- Search for students and content
- Build a student-focused professional network

### Frontend

- Responsive React interface
- Component-based architecture
- Client-side routing
- API integration with the backend
- Authentication-aware UI

---

## Tech Stack

### Frontend

- React.js
- JavaScript
- HTML5
- CSS3
- React Router

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- Multer
- Cloudinary

### Deployment

- Render
- Vercel
- MongoDB Atlas
- Cloudinary
- multer

---

## Project Structure

```text
Student_Linkedin_platform/
│
├── client/
│   ├── public/
│   └── src/
│       ├── components/
│       ├── pages/
│       ├── services/
│       ├── App.jsx
│       └── main.jsx
│
├── server/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── server.js
│   └── package.json
│
├── .gitignore
└── README.md
```

> The exact folder structure may change as the project continues to be developed.

---

## Application Architecture

The project follows a client-server architecture.

```text
                    User
                      |
                      v
              React Frontend
                      |
                      | HTTP Requests
                      v
              Express Backend
                      |
          +-----------+-----------+
          |                       |
          v                       v
      MongoDB                 Cloudinary
    Database                 Image Storage
```

The React frontend communicates with the Express backend through REST APIs. The backend handles authentication, business logic, database operations, and file uploads.

MongoDB is used to store application data, while Cloudinary is used to store profile and post images.

---

## Authentication Flow

```text
User
 |
 | Register / Login
 v
React Frontend
 |
 | API Request
 v
Express Server
 |
 v
MongoDB
 |
 | Authentication
 v
Authenticated User
```

Protected API routes verify the session before allowing users to perform authenticated operations.

---

## Image Upload Flow

The application uses Multer and Cloudinary for handling image uploads.

```text
User selects image
        |
        v
React Frontend
        |
        v
Express API
        |
        v
Multer
        |
        v
Cloudinary
        |
        v
Image URL
        |
        v
MongoDB
```

Instead of storing image files directly on the server, the application stores images on Cloudinary and saves their URLs in MongoDB.

---

## Environment Variables

Create a `.env` file inside the `server` directory.

Example:

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

SESSION_SECRET=secret_session_key

FRONTEND_URL=https://connectsd.vercel.app

CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

Never commit your `.env` file to GitHub.

---

## Database

MongoDB is used as the primary database.

Typical collections include:

- Users
- Posts
- Connections

The exact collections and relationships depend on the current implementation of the project.

Mongoose is used to define schemas and interact with MongoDB.

---

## API Structure

The backend follows a REST API architecture.

Example API categories:

```text
/api/auth
/api/users
/api/posts
```

Authentication endpoints handle registration and login.

User endpoints handle profiles and networking functionality.

Post endpoints handle creating, retrieving, and deleting posts.

---

## Security

The project implements several security practices:

- Password authentication
- Sesssion-based authorization
- Protected API routes
- Environment variables for sensitive credentials
- Server-side validation
- Cloudinary for external image storage

For production deployment, additional security measures such as rate limiting, stricter validation, secure HTTP headers, and improved error handling can be added.

---

## Deployment

The application can be deployed using services such as Render.

The production setup consists of:

```text
React Frontend
      |
      v
Production Backend
      |
      +------> MongoDB Atlas
      |
      +------> Cloudinary
```

Make sure production environment variables are configured on the hosting platform.

---

## Future Improvements

Possible future features include:

- Real-time chat system
- Real-time notifications
- Connection requests
- Post likes and comments
- Advanced search
- Student recommendations
- Job and internship section
- Resume upload
- Profile verification
- Email notifications
- Admin dashboard
- Improved mobile responsiveness
- Pagination and infinite scrolling
- Advanced security and rate limiting

---

## Learning Objectives

This project was developed to gain practical experience with:

- MERN stack development
- REST API development
- MongoDB database design
- Authentication and authorization
- File upload handling
- Cloudinary integration
- React component architecture
- Frontend-backend communication
- API deployment
- Environment configuration
- Git and GitHub workflow

---

## Contributing

Contributions, suggestions, and improvements are welcome.

To contribute:

```bash
git clone https://github.com/harshrai2910/Student_Linkedin_platform.git

git checkout -b feature/your-feature

git add .

git commit -m "Add your feature"

git push origin feature/your-feature
```

Then create a Pull Request.

---

## Author

**Harsh Rai**

BCA Student
MERN Stack Developer

GitHub:
https://github.com/harshrai2910

---

## License

This project is intended for educational and development purposes.
