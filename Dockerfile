# Use official Node.js image
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json (or pnpm/yarn.lock)
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Setup DB
RUN npm run db:setup

# Build the Next.js application
RUN npm run build

# Expose port
EXPOSE 3000

# Run the Next.js app
CMD ["npm", "run", "start"]