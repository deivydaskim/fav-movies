FROM node:20

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to install dependencies
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the rest of the application code into the container
COPY . .

# Build the Vite project for production
RUN npm run build

# Expose the port used by the Vite preview server
EXPOSE 4173

# Start the Vite production server in preview mode, accessible from any host
CMD ["npm", "run", "preview", "--", "--host"]
