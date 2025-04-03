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






# Installation
## Prerequisites
Before running the project, ensure you have the following installed:
- **Node.js** (https://nodejs.org)
- **npm** (comes with Node.js)
- **docker compose**

### Steps

1. Clone this repository:
 git clone https://github.com/akindada/SIT737.git
