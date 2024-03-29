# Idea Vault

Idea Vault is a note-keeping web application designed to help users organize their thoughts, ideas, and tasks. Users can create, update, and delete notes, as well as pin notes for easy access and search for notes. The application provides a user-friendly interface and is built with Vite, Node.js, Express, MongoDB, and Firebase for authentication and image storage. JWT and Redux are used for authentication, and Google login is integrated.

## Features

- User authentication with JWT and Redux
- Google login integration
- CRUD operations for notes
- Pinning notes
- Search functionality
- Responsive design
- Loading indicators and customized alerts with React Toastify

## Setup

### Prerequisites

- Node.js
- MongoDB
- Firebase account for authentication and image storage

### Installation

1. Clone the repository:
   ```bash
   https://github.com/SarangaSiriwardhana9/IdeaVault-MERN_Full_Stack_Notes_APP.git
   
2.Install dependencies for both the client and server:

  ```bash
cd idea-vault
cd client && npm install
cd ../server && npm install
```

3.Create .env files in the client and server directories with the following content:

client/.env
```bash
VITE_FIREBASE_API_KEY="your-firebase-api-key"
```

server/.env
```bash
MONGO_DB_URL="your-mongodb-url"
JWT_SECRET="your-jwt-secret"
```

4.Run the development servers for both the client and server:

```bash
npm run dev
```

## Deployment

- The application is deployed on Render and can be accessed at Idea Vault.

## Future Updates

- In future updates, users will be able to share their notes with other users.


Feel free to customize the content according to your project's specific details and requirements.

