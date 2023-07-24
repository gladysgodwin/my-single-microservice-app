FROM node:latest

# Set the working directory to /app
WORKDIR /app

COPY package*.json ./

# Install the dependencies
RUN npm install

COPY . .

EXPOSE 3000

CMD ["node", "app.js"]
