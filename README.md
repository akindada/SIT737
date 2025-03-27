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

# Installation
## Prerequisites
Before running the project, ensure you have the following installed:
- **Node.js** (https://nodejs.org)
- **npm** (comes with Node.js)

### Steps

1. Clone this repository:
 git clone https://github.com/akindada/SIT737.git


