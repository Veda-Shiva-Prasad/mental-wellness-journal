# Mental Wellness Journal 🌱

A full-stack MERN journaling application with user authentication and mood tracking.

## 🚀 Live Demo
**[View Live App](https://mental-wellness-journal-rouge.vercel.app)**

---

Welcome to the Mental Wellness Journal!

This is a simple, beginner-friendly MERN stack project (MongoDB, Express, React, Node.js) built to help you reflect on your mental well-being. Write private journal entries, track your moods, and see your growth—all safely stored in the cloud.

---

## 🛠️ Tech Stack
- **Frontend:** React, CSS
- **Backend:** Node.js, Express
- **Database:** MongoDB Atlas
- **Authentication:** JWT (JSON Web Tokens)
- **Deployment:** Vercel (Frontend) + Render (Backend)

---

## ✨ Features

- **Sign Up & Login:** Your private journal is safe and only for you.
- **Journal Management:** Easily add, edit, or delete entries.
- **Mood Tracking:** Tag your entries with your current mood.
- **Mobile-Responsive:** Use it on any device—phone, tablet, or desktop.
- **Cloud Database:** All data is securely kept in MongoDB Atlas.
- **Secure Authentication:** Password hashing with bcrypt and JWT tokens.

---

## 🗂 Project Structure

server/
│
├── models/
├── routes/
├── index.js
├── .gitignore
└── frontend/
├── src/
├── public/
├── .gitignore
└── package.json

- Back-end code is inside the `server` folder.
- React front-end is inside `server/frontend`.

---

## 🛠 Running the App Locally

### Backend
1. Move to the server folder:
cd server
2. Install dependencies:
npm install
3. Create a `.env` file in the `server` folder:
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.ipqcxfd.mongodb.net/wellness?appName=Cluster0
JWT_SECRET=your_jwt_secret_key
_(Replace `<username>` and `<password>` with your credentials. Never publish your .env!)_
4. Start the server:
npm start

### Frontend
1. Go to the frontend directory:
cd server/frontend
2. Install frontend dependencies:
npm install
3. Start the React app:
npm start

---

## 🚀 Deployment

- **Frontend:** Deployed on [Vercel](https://vercel.com/)
- **Backend:** Deployed on [Render](https://render.com/)
- Never upload your `.env` (secrets) to GitHub!

---

## 💬 Why this project?

Mental wellness is important for everyone! Journaling can help relieve stress, find balance, and encourage self-growth—even for busy students and developers.  
This project is great for learning real-world MERN stack skills, and helping yourself and others build healthier habits.

---

## 🤝 Contributions

Ideas, improvements, and even typo fixes are welcome.  
Feel free to fork, open issues, or submit pull requests—let's make mental wellness accessible to all.

---

**Built with care for better mind days. 💜**

