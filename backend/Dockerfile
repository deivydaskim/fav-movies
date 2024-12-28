FROM node:20

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json for dependency installation
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the rest of the application files into the container
COPY . .

# Expose port 3000 for the application
EXPOSE 3000

# Command to start the Nest.js application
CMD ["npm", "run", "start"]
