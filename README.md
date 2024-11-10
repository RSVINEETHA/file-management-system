##  File Management System

This project is a simplified file management system inspired by Dropbox that allows users to upload, list, and download files via a web interface. It is built using a React frontend and a Java Spring Boot backend, providing RESTful APIs for file management operations.


##  Tech Stack Used :-
* Frontend : React, Material UI
* Backend : Java, Spring Boot, Spring Data JPA
* Database : MySQL

### Backend Setup :- 
1. Clone the repository and Navigate to the backend directory
2. Configure the database in application.properties file:
   ```
   spring.datasource.url=jdbc:mysql://localhost:3306/your_database
   spring.datasource.username=your_username
   spring.datasource.password=your_password
   file.upload-dir=path-to-store-files-in-local
   ```

3. Build and run the application using:
   ```
   mvn spring-boot:run
   ```
   The server should start at http://localhost:8080

### Frontend Setup :- 
1. Navigate to the frontend directory
2. Install dependencies: 
   ```
   npm install
   ```
3. Start the React development server:
   ```
   npm start
   ```
   The frontend server will start at http://localhost:3000



