# Badminton-Raptor-API

## Final Year Project

### Overview

The **Badminton-Raptor-API** is the backend system of the Badminton Raptor application. It provides RESTful API endpoints to handle various badminton-related operations such as user data management, generating string tension advice, and managing gameplay data. The API integrates with a frontend built using modern web technologies and relies on a relational database for data persistence.

---

## Project Structure

The project is organized as follows:

- **assets/**
  - Contains the database schema (`DbStructure.sql`) and initial data (`DbData.sql`) files required to set up the RDBMS.
  
- **config/**
  - Configuration files for the application, including database and environment settings.
  
- **controllers/**
  - Contains logic that handles API requests and interacts with services to process data.
  
- **models/**
  - Includes the schema definitions for the data stored in the database.
  
- **routes/**
  - Defines the API routes/endpoints and links them to corresponding controller actions.
  
- **services/**
  - Implements the core business logic for various operations such as generating string advice.
  
- **index.js**
  - The main entry point of the API, setting up the server and defining middleware.

- **.env**
  - Environment variables for configuring the API.

---

## Prerequisites

To run the project, ensure that you have the following installed:

- **Node.js** (version 14.x or higher)
- **NPM** (Node Package Manager)
- **A Relational Database Management System (RDBMS)** such as MySQL or PostgreSQL.

---

## Database Setup

1. **Create the database schema:**
   - Navigate to `Badminton-Raptor-API/assets` and locate the `DbStructure.sql` file.
   - Import the `DbStructure.sql` file into your RDBMS to set up the database structure.

2. **Populate the database:**
   - Once the structure is created, import the `DbData.sql` file from the same directory to populate the initial data.

---

## Running the API

1. Navigate to the backend project directory:

   - cd Badminton-Raptor-API

2. Command to run the backend project directory:
   - node index.js 
