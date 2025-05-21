# User Access Management System (Full Stack)

This is a full-stack User Access Management system built with Node.js (Express) backend and React frontend, using PostgreSQL and TypeORM.

## Table of Contents

1.  [Introduction](#1-introduction)
    * [Purpose](#11-purpose)
    * [Scope](#12-scope)
    * [Tech Stack](#13-tech-stack)
2.  [System Overview](#2-system-overview)
    * [User Roles](#21-user-roles)
    * [Functionalities](#22-functionalities)
3.  [API Endpoints](#3-api-endpoints)
4.  [Database Schema](#4-database-schema)
5.  [Setup Instructions](#5-setup-instructions)
    * [Prerequisites](#prerequisites)
    * [Database Setup (PostgreSQL)](#database-setup-postgresql)
    * [Backend Setup](#backend-setup)
    * [Frontend Setup](#frontend-setup)
    * [Running the Application](#running-the-application)
6.  [Evaluation Criteria](#6-evaluation-criteria)

## 1. Introduction

### 1.1 Purpose
This system facilitates user access management, including:
* User registration and authentication
* Software access requests by employees
* Managerial approvals or rejections of access requests

### 1.2 Scope
Core features covered by this system are:
* User Registration
* JWT-based Authentication
* Software Listing & Creation (Admin only)
* Access Request Submission (Employee only)
* Access Request Approval or Rejection (Manager only)

### 1.3 Tech Stack
* *Backend:* Node.js + Express.js
* *Frontend:* React
* *Database:* PostgreSQL
* *ORM:* TypeORM
* *Authentication:* JWT (JSON Web Tokens)
* *Tooling:* bcrypt (for password hashing), dotenv (for environment variables), nodemon (for development server)

## 2. System Overview

### 2.1 User Roles
The system defines three primary user roles:
* *Employee:* Can sign up, log in, and request software access.
* *Manager:* Can view and approve/reject access requests.
* *Admin:* Can create software entries and has full administrative access.

### 2.2 Functionalities
* *Sign-Up/Login with JWT:* Secure user authentication.
* *Role-based redirection:* Users are redirected based on their assigned roles after login.
* *Software management:* Admin users can add new software entries.
* *Request access to software:* Employees can submit requests for specific software and access types.
* *Approve/reject requests:* Managers can review and decide on pending access requests.

## 3. API Endpoints

### 3.1 Authentication
* POST /api/auth/signup: Registers a new user with the default role 'Employee'.
* POST /api/auth/login: Authenticates a user and returns a JWT and their role.

### 3.2 Software Management (Admin Only)
* POST /api/software: Adds a new software entry. Fields: name, description, accessLevels (e.g., ["Read", "Write", "Admin"]).
* GET /api/software: (Implicitly used by frontend) Retrieves a list of all software.

### 3.3 Access Request (Employee Only)
* POST /api/requests: Submits an access request for a software. Fields: softwareId, accessType, reason.

### 3.4 Request Approval (Manager Only)
* GET /api/requests/pending: (Implicitly used by frontend) Retrieves a list of all pending access requests.
* PATCH /api/requests/:id: Approves or rejects a specific access request. Body: { status: 'Approved' | 'Rejected' }.

## 4. Database Schema (TypeORM Entities)

### User Entity
* id: Primary key (number)
* username: Unique username (string)
* password: Hashed password (string)
* role: User role ('Employee' | 'Manager' | 'Admin')

### Software Entity
* id: Primary key (number)
* name: Software name (string)
* description: Software description (text)
* accessLevels: Array of allowed access levels (e.g., ["Read", "Write", "Admin"])

### Request Entity
* id: Primary key (number)
* user: Many-to-one relationship with the User entity (the user who made the request)
* software: Many-to-one relationship with the Software entity (the software being requested)
* accessType: Type of access requested ('Read' | 'Write' | 'Admin')
* reason: Reason for the access request (text)
* status: Current status of the request ('Pending' | 'Approved' | 'Rejected')

## 5. Setup Instructions

### Prerequisites
* Node.js (LTS version recommended)
* npm (Node Package Manager)
* PostgreSQL database server

### Database Setup (PostgreSQL)

1.  *Install PostgreSQL:* If you don't have it, download and install PostgreSQL for your operating system.
2.  *Create a database:*
    * Open a PostgreSQL client (e.g., psql in terminal, or pgAdmin).
    * Create a new database for the project:
        sql
        CREATE DATABASE user_access_db;
        
    * Ensure you have a user with privileges to this database (e.g., the default postgres user).

### Backend Setup

1.  *Navigate to the backend directory:*
    bash
    cd user-access-management/backend
    
2.  **Create .env file:** Copy .env.example to .env and fill in your PostgreSQL and JWT details.
    bash
    copy .env.example .env  # On Windows CMD
    # or cp .env.example .env # On Linux/macOS
    
    Edit .env with your actual database credentials and a strong JWT_SECRET.
3.  *Install dependencies:*
    bash
    npm install
    
4.  *Build the TypeScript code:*
    bash
    npm run build
    
5.  *Start the backend server (development mode):*
    bash
    npm run dev
    
    The server should start on http://localhost:5000. You should see "Data Source has been initialized!"

### Frontend Setup

1.  *Navigate to the frontend directory:*
    bash
    cd user-access-management/frontend
    
2.  *Install dependencies:*
    bash
    npm install
    
3.  *Start the frontend development server:*
    bash
    npm start
    
    This will typically open the application in your browser at http://localhost:3000.

### Running the Application

1.  Ensure your PostgreSQL database is running.
2.  Start the backend server (from user-access-management/backend).
3.  Start the frontend development server (from user-access-management/frontend).
4.  Access the application in your web browser at http://localhost:3000.

## 6. Evaluation Criteria
The system will be evaluated based on the following criteria:

* *Functionality:* Correct implementation of sign-up, login, request creation, and approval handling.
* *Code Structure:* Modular, clean folder organization, and reusable components.
* *Security:* Proper JWT handling and password encryption.
* *DB Integration:* Correct database schema and relations implemented using TypeORM.
* *Completeness:* All described features are functional and testable.
*