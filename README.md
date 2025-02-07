# Notes App

## Description

A simple web application that allows users to **create, read, update, and delete (CRUD)** notes.

## Technologies Used

### Backend:

- **Node.js**
- **Express.js**
- **TypeScript**
- **File Storage (JSON)**
- **Jest & Supertest**

### Frontend:

- **Vite**
- **React.js**
- **TypeScript**
- **Axios**
- **React Router**

---

## Project Structure

```
/backend
  /src
    /controllers
    /models
      notes.json
    /routes
    app.ts
  package.json
  tsconfig.json

/frontend
  /src
    /components
    /services
    App.tsx
  package.json
```

---

## Installation & Running the Project

### Clone the Repository

```bash
git clone https://github.com/codezilla322/ivim-assessment.git
cd ivim-assessment
```

### Frontend Setup

```bash
cd frontend
npm install
```

### Backend Setup

```bash
cd backend
npm install
```

### Project build

```bash
npm run build
```

### Running the Project

```bash
//development mode
npm run dev

//production mode
npm start
```

The frontend will run on `http://localhost:5173`.
The backend will run on `http://localhost:8000`.

---

## Running Backend Tests

```bash
cd backend
npm test
```

---

## How It Was Built

1. **Backend:** Created a RESTful API with **Express.js** and **TypeScript**, using **file storage (JSON)** for persistence.
2. **Frontend:** Developed using **React.js** with **Vite**, **TypeScript**, styled for responsiveness, and connected to the backend using **Axios**.
3. **Testing:** API endpoints tested with **Jest & Supertest**

---

## Time Spent on the Project

- **Backend Development:** \1 hour (API + File Storage + Testing)
- **Frontend Development:** \1 hour (React UI + API Integration + Styling)
- **Testing & Debugging:** \0.5 hour
- **Total Time:** **\2.5 hours**
