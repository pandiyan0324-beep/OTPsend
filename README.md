# Reactive OTP Backend (with DB Save Logic)

Tech:
- Spring Boot 3.3.4
- Spring WebFlux
- Firebase Admin SDK
- PostgreSQL via R2DBC (reactive)
- Lombok

## Setup

1. Put your Firebase Admin SDK JSON as:

   src/main/resources/serviceAccountKey.json

2. Create PostgreSQL database, e.g.:

   CREATE DATABASE otpdb;

3. Create table:

   CREATE TABLE users (
       id SERIAL PRIMARY KEY,
       phone VARCHAR(30),
       created_at TIMESTAMP
   );

4. Adjust DB credentials in src/main/resources/application.properties:

   spring.r2dbc.url=r2dbc:postgresql://localhost:5432/otpdb
   spring.r2dbc.username=your_username
   spring.r2dbc.password=your_password

5. Build and run:

   mvn clean package
   mvn spring-boot:run

Backend runs on: http://localhost:8080

Endpoints:

- POST /api/otp/send   { "phone": "+919999999999" }
- POST /api/otp/verify { "idToken": "<FIREBASE_ID_TOKEN>" }

On successful verify, a row is inserted into "users" table with phone and created_at.
