FROM node:18-alpine

WORKDIR /app

# Dependency ফাইল আগে কপি করা (layer caching এর জন্য)
COPY package*.json ./
RUN npm install

# বাকি সোর্স কোড কপি করা
COPY . .

EXPOSE 5000

CMD ["node", "server.js"]
