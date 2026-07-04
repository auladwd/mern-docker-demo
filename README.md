# MERN Task Manager — Dockerized

## Project Structure

```
mern-docker-demo/
├── backend/
│   ├── models/Task.js
│   ├── routes/taskRoutes.js
│   ├── server.js
│   ├── package.json
│   └── Dockerfile
├── frontend/
│   ├── src/
│   │   ├── App.js
│   │   └── index.js
│   ├── public/index.html
│   ├── package.json
│   └── Dockerfile
└── docker-compose.yml
```

## চালানোর নিয়ম

### ১. Build ও Start করা
```bash
docker compose up -d --build
```

### ২. Status চেক করা
```bash
docker compose ps
```

### ৩. Logs দেখা
```bash
docker compose logs -f backend
docker compose logs -f frontend
```

### ৪. ব্রাউজারে দেখা
- Frontend: http://3.95.55.48:3000
- Backend API: http://3.95.55.48:5000/api/tasks
- MongoDB: localhost:27017 

### ৫. বন্ধ করা
```bash
docker compose down
```

### ৬. ডেটাসহ সম্পূর্ণ মুছে ফেলা
```bash
docker compose down -v
```

## Screenshots:
<img width="985" height="1036" alt="Screenshot (Mern-Docker-Demo)" src="https://github.com/user-attachments/assets/4fed1f45-0fa0-49a9-a0ed-385414ad067f" />
<img width="909" height="866" alt="Pront-End" src="https://github.com/user-attachments/assets/9ffd8a6c-0890-40a7-810d-03da63096a7d" />
<img width="907" height="913" alt="Backent Server" src="https://github.com/user-attachments/assets/e0ef8a7f-5a00-4cb4-a164-ecc8bc2aec4f" />

Md. Aulad Hossen
