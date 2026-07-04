# MERN Task Manager — Dockerized

একটি simple Task Manager অ্যাপ, যেটা MongoDB + Express + React দিয়ে বানানো এবং সম্পূর্ণ Docker Compose দিয়ে চালানো যায়।

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
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000/api/tasks
- MongoDB: localhost:27017 (Compass দিয়ে কানেক্ট করতে পারবেন)

### ৫. বন্ধ করা
```bash
docker compose down
```

### ৬. ডেটাসহ সম্পূর্ণ মুছে ফেলা
```bash
docker compose down -v
```

## যেভাবে এটা কাজ করে

1. **mongo** service প্রথমে চালু হয়, healthcheck দিয়ে নিশ্চিত করা হয় সেটা রেডি কিনা।
2. **backend** service `mongo` healthy হওয়ার পর চালু হয়, এবং `MONGO_URI` environment variable দিয়ে মঙ্গোডিবির সাথে কানেক্ট করে (এখানে service নাম `mongo` কেই hostname হিসেবে ব্যবহার করা হয়েছে — Docker এর internal networking এর কারণে এটা কাজ করে)।
3. **frontend** service backend এর সাথে REST API কল করে ডেটা আনা-নেওয়া করে।
4. `volumes` ব্যবহার করে লোকাল কোড পরিবর্তন সরাসরি container এ রিফ্লেক্ট হয় (development এর জন্য সুবিধাজনক — hot reload এর মতো কাজ করে)।

## শেখার জন্য গুরুত্বপূর্ণ পয়েন্ট

- `depends_on` + `condition: service_healthy` কীভাবে service startup order নিয়ন্ত্রণ করে
- Docker network এ container-রা একে অপরকে **service name** দিয়ে চেনে, IP address দিয়ে না
- `volumes` দিয়ে কীভাবে বাইরের কোড ফোল্ডার container এর ভিতরে mount করা হয় (bind mount)
- আলাদা আলাদা Dockerfile থাকলেও একটাই `docker-compose.yml` দিয়ে পুরো stack ম্যানেজ করা যায়
