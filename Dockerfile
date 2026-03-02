# Use lightweight Node image
FROM node:18-alpine

# Create working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all source code
COPY . .

# Expose backend port
EXPOSE 4000

# Run server
CMD ["npm", "start"]