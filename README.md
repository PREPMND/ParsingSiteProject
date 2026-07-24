# Website Analyzer

A full-stack web application that analyzes any public website and provides useful insights such as:

- HTTP Status Code
- Response Time
- Page Title
- Meta Description
- First H1 Tag
- Images Missing Alt Attributes
- Word Count
- HTML Source Viewer

## Tech Stack

- Frontend: React, Vite, Tailwind CSS, TanStack Query, Axios
- Backend: Node.js, Express.js, Cheerio, Axios

## Setup Instructions

### 1. Clone the repository

```bash
git clone <repository-url>
```

### 2. Install dependencies

#### Backend

```bash
cd Backend
npm install
```

#### Frontend

```bash
cd ../App-Frontend
npm install
```

### 3. Configure environment variables

Create a `.env` file inside the `Backend` folder.

Example:

```env
PORT=8000
CORS_ORIGIN=http://localhost:5173
```

### 4. Start the backend

```bash
cd Backend
npm run dev
```

### 5. Start the frontend

```bash
cd App-Frontend
npm run dev
```

### 6. Open the application

Visit:

```
http://localhost:5173
```

## Notes

- Some websites (e.g. LeetCode, LinkedIn, Instagram) block automated requests and may return **403 Forbidden**.
- This is expected behavior and is handled gracefully by the application.
