# Use the official Node.js 16 image as the base image
FROM node:16-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the NestJS application
RUN npm run build

# Expose the port that the NestJS app runs on
EXPOSE 5000

# Start the NestJS application
CMD ["npm", "run", "start"]