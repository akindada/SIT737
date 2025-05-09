## SIT737 - Cloud Native Application Development

# Week 4
## 4.1P: Building a simple calculator microservice

## Overview
This repository contains the implementation of a **Calculator Microservice** that provides basic arithmetic functionalities to clients. Built using **Node.js** and **Express**, the microservice supports the following operations:
- **Addition**
- **Subtraction**
- **Multiplication**
- **Division**
The microservice accepts incoming HTTP requests with query parameters and performs the requested operation on two input numbers. It is designed to be simple, efficient, and extensible for further enhancements.
## Key Features
- Basic arithmetic operations: addition, subtraction, multiplication, and division.
- Easy-to-use HTTP-based API, with query parameters for input numbers (`n1` and `n2`).
- Error handling for missing parameters and division by zero.
## API Endpoints
The microservice exposes the following HTTP endpoints:

**URL:**
## 1. Addition
http://localhost:3040/add?n1=1&n2=2
output: {"statusCode":200,"data":3}
## 2. Division
http://localhost:3040/div?n1=10&n2=2
output: {"statusCode":200,"data":5}
## 3. Multiplication
http://localhost:3040/mul?n1=10&n2=2
output: {"statusCode":200,"data":20}
## 4. Subtraction
http://localhost:3040/Sub?n1=10&n2=2
output: {"statusCode":200,"data":8}

## Note
If division by zero is attempted, the response will be:Division by zero is not allowed.

## 4.2C: Additional Arithmetic Operations
This repository contains the implementation of a Calculator Microservice that now supports both basic and advanced arithmetic operations. The microservice was expanded to include additional operations such as Exponentiation, Square Root, and Modulo to provide a more comprehensive set of calculation functionalities.

The microservice accepts incoming HTTP requests with query parameters and performs the requested operation on two input numbers (except for square root, which only requires one number). It is designed to be simple, efficient, and extensible for further enhancements.

**URL:**
## 5. exponential
http://localhost:3040/power?n1=2&n2=3
output: {"statusCode":200,"data":12}
## 6 Square root:
http://localhost:3040/sqrt?n1=9
output: {"statusCode":200,"data":3}
## 7 modulo: 
http://localhost:3040/modulo?n1=5&n2=3
output: {"statusCode":200,"data":2}

# 5.1P - Dockerizing Web Application and Google Cloud Registry

**Overview**:  
This task involves creating a Dockerized web application, configuring health checks, and pushing the Docker image to a private container registry on Google Cloud. The web application features a signup form, feedback form, and navigation via a homepage button.

**Key Steps**:

**Dockerizing the Web Application**:  
- Built a Docker image using Node.js.
- Configured the application to run on port 3000.
- Dockerfile included dependencies installation and setup.

**Docker Compose Configuration**:  
- Created a `docker-compose.yml` file to manage the container and port exposure.
- Added health check to monitor container status and restart it on failure.

**Pushing Docker Image to Google Cloud**:  
- Enabled Container Registry API on Google Cloud.
- Tagged and pushed the Docker image to a private container registry on Google Cloud.

**Testing**:  
- Verified application functionality by running the container with Docker Compose.
- Ensured health checks and auto-restart worked as intended.

# 5.2D - Publishing the microservice into the cloud

  In Task 5.2D, we prepared our microservice for production deployment by publishing it to a private container registry on Google Cloud.

 # This is a continuity from Task 5.1P
  Having push the image to Google Cloud, therefore the next step to achieve task 5.2D is to: 

 - Authenticate Docker (if not done previously): gcloud auth configure-docker australia-southeast1-docker.pkg.dev

 - Run the Published Image: docker run -d -p 8080:8080 australia-southeast1-docker.pkg.dev/sit737-25t1-akin-dada-35e8236/my-webapp-registry/webapp:latest

# 6.1P - Kubernetes Deployment
In this task, the containerized Node.js application from Task 5.1P is deployed to a Kubernetes cluster using multiple YAML configuration files.

### 📁 Files Used
- createDeployment.yaml: Defines a Kubernetes Deployment with multiple replicas of the Node.js app for scalability and rolling updates.
- createPod.yaml: Manually describes a single Pod running the Node.js container (used for learning and testing purposes).
- createReplicaset.yaml: Manages the number of identical Pods to ensure availability (used before deployment abstraction).
- dashboard-adminuser.yaml: Grants admin privileges for accessing the Kubernetes Dashboard securely.
- cluster_role_binding.yaml: Binds the `admin-user` with cluster-admin permissions to allow full dashboard access.

### Steps Performed
1. Buiold Docker Image and Pushed to docker hub  
2. Create kubernetes Components and deploy using the below commands:  
   - kubectl apply -f cluster_role_binding.yaml
   - kubectl apply -f dashboard-adminuser.yaml
   - kubectl apply -f createPod.yaml
   - kubectl apply -f createReplicaset.yaml
   - kubectl apply -f createDeployment.yaml
   
3. Accessing the App  
   - Exposed via a NodePort service (defined within `createDeployment.yaml` or as an external service YAML if applicable).
   - Access from `http://localhost:<NodePort>`.

4. To access Kubernetes Dashboard, follow the steps below:  
   - In terminal, start proxy using: kubectl proxy
   - In browser, visit: http://localhost:8001/api/v1/namespaces/kubernetes-dashboard/services/https:kubernetes-dashboard:/proxy/
   - Login using token and get token by using the given command in terminal: kubectl -n kubernetes-dashboard create token admin-user
 
# 6.2C: Kubernetes Deployment Update - Web Application

## Part 1: Interact with the Deployed Application on Kubernetes

Overview
In Part I of this task, we will interact with a deployed web application on Kubernetes. The main objective is to verify that the application is running, access it through Kubernetes services, and interact with it via a local web browser.

# Steps to Interact with the Deployed Application

# Verify that the Application is Running using:
- Check the Pods: kubectl get pods
- Check the Services:kubectl get svc
# Forward Traffic to Your Local Machine Using kubectl Port-Forward:
- kubectl port-forward svc/webapp-service 3000:3000
- access the app using: http://localhost:3000
# Interact with the Applicationusing browser to perform the following functions:
- Sign Up: Enter your name, email, and password on the signup page.
- Feedback: After signing up, you will be asked to provide feedback about the signup experience.

### Part II : Update the application

Overview
In Part II of this task, we will update the deployed Node.js web application on Kubernetes. The update involves modifying the Node.js application code, building a new Docker image, updating the Kubernetes deployment configuration to use the new image, and ensuring the new version is deployed correctly.

# Steps for Updating the Application

## Modify the Application Code
To update the application, we made modifications to the Node.js app. The app has been updated to reflect changes and improvements in functionality.
- We updated the code in webapp.js to enhance the signup, feedback, and thank-you pages.

## Build a New Docker Image
- After modifying the application, build a new Docker image to reflect the changes: docker build -t tvibe/webapp:v2 .

## Push the Image to DockerHub
- Push the newly built image to your DockerHub repository:docker push tvibe/webapp:v2

## Update the Kubernetes Deployment
Update the Kubernetes deployment to use the new Docker image.
- update createDeployment.yaml:
- Apply the updated configuration with:kubectl apply -f createDeployment.yaml

## Restart the Deployment to ensure the new image is used, you may need to restart the deployment.
- kubectl rollout restart deployment my-deployment

## Verify changes from the Kubernetes Dashboard
- check the Kubernetes Dashboard to visually verify the changes. This will show that the new version of the application is running as a pod in deployment.

## Task 9.1: MongoDB Setup, Backup, Monitoring, and CRUD Operations

# Project Overview

In this task, the goal was to set up a MongoDB database, a Node.js web application, and Mongo Express for real-time database management and monitoring. The focus was on enabling database backups, performing CRUD operations on the MongoDB data, and configuring real-time health monitoring through Mongo Express, a simple web-based MongoDB admin interface.

## Components
The project contains several key components, each contributing to the overall functionality:

- MongoDB: The database service for storing data.
- Node.js Web Application: A basic web app that interacts with MongoDB to manage users and feedback.
- Mongo Express: A web-based admin interface for MongoDB that allows monitoring and managing the database in real time.
- Backup System: Manual and automated backup solutions to ensure data persistence and disaster recovery.

## Docker Compose Setup
The docker-compose.yml file defines four services:

* MongoDB: Database service with authentication.
* Node.js Web Application: Provides an interface for interacting with MongoDB.
* Mongo Express: A simple web-based MongoDB admin interface for managing and monitoring the database.
* The setup includes environment variables for MongoDB authentication, with volume mappings for data and backups.

# To start the project, execute the following command: docker-compose up -d 
This command runs all services in detached mode, ensuring that MongoDB, the Node.js web app, and Mongo Express are up and running.
This services can be accessed using the web interface
- Web Application: Accessible via http://localhost:3001
- Mongo Express Admin Interface: Accessible via http://localhost:8081 — for real-time database management and monitoring.

# MongoDB Database Setup
MongoDB is configured with a root username (admin) and password (password). The database is accessible on port 27017 on localhost, and the Mongo Express admin interface is accessible on port 8081.

# Database Backup and Restore
Regular backups of MongoDB data are stored in the ./backups directory.

# To backup, use the following command within the running MongoDB container:
docker exec mongodb sh -c 'mongodump -d admin -u admin -p password --authenticationDatabase admin --out /backups/admin-full'
Backup files are saved in the ./backups/admin folder.

# For restoring data from a backup, run:
docker exec -it mongodb sh
mongorestore -u admin -p password --authenticationDatabase admin /backups/admin-full

# Real-Time Monitoring with Mongo Express
Mongo Express provides a simple, intuitive web interface for MongoDB management, allowing you to monitor and interact with your database in real time.

## Once Mongo Express is set up and running, you can:

- View collections and documents in MongoDB.
- Perform database operations such as adding, updating, and deleting documents.
- Check MongoDB statistics like the number of documents in each collection and the health of the database.
- Access Mongo Express via http://localhost:8081, where you'll have an interactive web interface to:
- View database statistics.
- Perform CRUD operations directly.
- Edit documents in real-time.

# CRUD Operations
The Node.js web application allows performing the following CRUD operations on the MongoDB database. You can test these operations using Postman by sending requests to the following URLs:

# Create Function: Adds a new user to the database.
## Method: POST
### URL: http://localhost:3001/signup

Request Body (JSON):
{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "password": "password123"
}

# Read (Submit Feedback): Submits feedback from the user and stores it in the database.
### Method: POST
### URL: http://localhost:3001/feedback

Request Body (JSON):
{
  "feedback": "This is my feedback."
}

# Update (Update User Information): Updates user information, such as their name or email, in the database.
## Method: PUT
### URL: http://localhost:3001/update-user

Request Body (JSON):

{
  "id": "user-id",
  "newName": "New Name"
}

# Delete (Delete User): Deletes a user from the database by their ID.
## Method: DELETE
### URL: http://localhost:3001/delete-user

Request Body (JSON):

{
  "id": "user-id"
}

These CRUD operations can be tested in Postman by setting the appropriate HTTP method (POST, PUT, DELETE) and providing the necessary data in the request body.

# Installation
## Prerequisites
Before running the project, ensure you have the following installed:
- **Node.js** (https://nodejs.org)
- **npm** (comes with Node.js)
- **docker compose**

### Steps

1. Clone this repository:
 git clone https://github.com/akindada/SIT737.git
