# Use a base image for your application (e.g., Node.js)
FROM node:14

# Set the working directory
WORKDIR /darkroom

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Expose the port your application listens on (e.g., 3000)
EXPOSE 8080

# Define the command to start your application
CMD ["npm", "start"]
