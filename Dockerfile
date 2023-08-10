FROM node:18.16.1

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Expose the port your Nest.js application listens on
EXPOSE 3000

# Start the Nest.js application
CMD ["npm", "run", "start"]