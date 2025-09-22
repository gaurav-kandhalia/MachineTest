📌 Machine Test – MERN Stack Developer
🚀 Project Overview

This is a MERN stack application that allows:

Admin

Login

Create Agents

Upload CSV/XLSX/XLS files

Validate & distribute items equally among 5 agents

View distributed items with pagination

Agent

Login

View assigned tasks/items

Backend is deployed at:
🔗 https://machinetest-hsbk.onrender.com


⚙️ Tech Stack

MongoDB Atlas – Database

Express.js – Backend framework

Node.js – Server runtime

React – Frontend (to be implemented)

Multer – File upload

XLSX / CSV-Parser – File parsing

Zod – Input validation

JWT – Authentication

Bcrypt – Password hashing

📂 Project Structure

src/
 ├── Controllers/   # Business logic (admin, agent, items)
 ├── Db/            # MongoDB connection setup
 ├── Middlewares/   # Authentication, error handling
 ├── Models/        # Mongoose schemas (Admin, Agent, Item)
 ├── Routes/        # Admin & Agent routes
 ├── Seeds/         # Database seeding (Admin user)
 ├── Utils/         # Utility functions (distribution, parsing, helpers)
 ├── Validations/   # Zod validation schemas
 ├── app.js         # Express app setup
 └── index.js       # Server entry point



 🔑 Environment Variables

Create a .env file in the root directory (do not commit it).

PORT=5911
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/machinetest
JWT_SECRET=your_jwt_secret_here
CORS_ORIGIN='frontend url"

ADMIN_EMAIL = "adminEmail"
ADMIN_PASSWORD = 'adminPassword'


🛠️ Setup Instructions
1. Clone repo
githubRepo-https://github.com/gaurav-kandhalia/MachineTest.git
git clone <repo-url>
cd backend

2. Install dependencies
npm install

3. Run locally
npm run dev

4. Build & start in production
npm start

🔐 Authentication Flow

Admin login → JWT token generated

Protected routes → require Authorization: Bearer <token> header

🔐 Authentication Flow

Admin login → JWT token generated

Protected routes → require Authorization: Bearer <token> header

Agents also login using their credentials to fetch their tasks


📌 API Endpoints
Admin Routes
Method	Endpoint	Description
POST	/admin/login	Admin login
POST	/admin/create-agent	Create agent (auth required)
POST	/admin/uploadFile	Upload CSV/XLSX file (auth required)
POST	/admin/distributeItems	Parse & distribute items (auth required)
GET	/admin/items?page=1&limit=50	Get distributed items with pagination (auth required)

Agent Routes
Method	Endpoint	Description
GET	/agent/getTasks	Get agent’s assigned tasks (auth required)


🗂️ File Upload & Distribution

Admin uploads .csv, .xlsx, or .xls.

File validated → parsed → data validated (Zod + regex).

Items distributed equally among 5 agents (round-robin if remainder).

Items stored in MongoDB.

Admin & respective agents can fetch their lists (paginated, 50 per page).


✅ Features Checklist

 Admin login & JWT authentication

 Agent creation

 File upload (CSV/XLSX)

 File & row validation (Zod + regex)

 Items distribution among 5 agents

 Items stored in MongoDB

 Pagination for admin fetch

 Agent view of assigned items

 Admin seeding for initial access


 👨‍💻 Author

Machine Test – MERN Stack Developer Assignment
Created by: Gaurav Kandhalia

