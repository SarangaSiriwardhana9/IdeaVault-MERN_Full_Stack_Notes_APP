# Idea Vault

Idea Vault is a note-keeping web application designed to help users organize their thoughts, ideas, and tasks. Users can create, update, and delete notes, as well as pin notes for easy access and search for notes. The application provides a user-friendly interface and is built with Vite, Node.js, Express, MongoDB, and Firebase for authentication and image storage. JWT and Redux are used for authentication, and Google login is integrated.



| Image 1 | Image 2 |
|---------|---------|
| ![12](https://github.com/SarangaSiriwardhana9/IdeaVault-MERN_Full_Stack_Notes_APP/assets/99233703/7370dafa-b35b-4b59-a2ba-011e1c268576) | ![6](https://github.com/SarangaSiriwardhana9/IdeaVault-MERN_Full_Stack_Notes_APP/assets/99233703/4f5e33c9-e489-461d-8374-c75ed8c2467c) |
| ![1](https://github.com/SarangaSiriwardhana9/IdeaVault-MERN_Full_Stack_Notes_APP/assets/99233703/c1c2af29-ebb5-4511-a408-b16d5570744f) | ![4](https://github.com/SarangaSiriwardhana9/IdeaVault-MERN_Full_Stack_Notes_APP/assets/99233703/f4346660-17b1-4e54-b28e-fd93e3716dbb) |
| ![2](https://github.com/SarangaSiriwardhana9/IdeaVault-MERN_Full_Stack_Notes_APP/assets/99233703/3f93bc54-1ecc-4534-b48c-f3baea28587a) | ![3](https://github.com/SarangaSiriwardhana9/IdeaVault-MERN_Full_Stack_Notes_APP/assets/99233703/48dee718-3ad3-442f-962b-5778852a2bd9) |
| ![9](https://github.com/SarangaSiriwardhana9/IdeaVault-MERN_Full_Stack_Notes_APP/assets/99233703/11ad6231-1b29-4fb8-a567-87e2e88a28dc) | ![11](https://github.com/SarangaSiriwardhana9/IdeaVault-MERN_Full_Stack_Notes_APP/assets/99233703/858b499d-8112-4da2-8d2f-374ff7c06776) |

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

