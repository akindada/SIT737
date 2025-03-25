# Use Node.js 16 image as base
FROM node:16

# Create and set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies defined in package.json
RUN npm install

# Bundle the application source code into the container
COPY simpleserver.js .

# Expose port 8080 to the host
EXPOSE 8080

# Define the command to run your app when the container starts
CMD ["node", "simpleserver.js"]
