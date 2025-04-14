# Use Node.js 16 image as base
FROM node:16

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies defined in package.json
RUN npm install

# Copy the application source code into the container
COPY webapp.js .

# Expose port 3000 to the host
EXPOSE 3000

# Define the command to run your app when the container starts
CMD ["node", "webapp.js"]
