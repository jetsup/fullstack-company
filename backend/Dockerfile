# Use a Node.js image as the base
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY . .

# Install dependencies
RUN npm install

# Copy the rest of the application code
# COPY . .

# Expose the port the app will listen on
EXPOSE 9090

# Start the app
CMD ["npm", "run", "dev"]
