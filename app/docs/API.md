# LINGUS API Documentation

## Base URL
```
http://localhost:5000/api
```

## Authentication
All protected endpoints require a JWT token in the Authorization header:
```
Authorization: Bearer <token>
```

## Endpoints

### Health Check
```
GET /health
```
Response:
```json
{
  "status": "Server is running"
}
```

---

## Authentication

### Register User
```
POST /auth/register
```

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "userType": "teacher" // or "school"
}
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "123",
    "name": "John Doe",
    "email": "john@example.com",
    "userType": "teacher"
  }
}
```

---

### Login
```
POST /auth/login
```

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "123",
    "name": "John Doe",
    "email": "john@example.com",
    "userType": "teacher"
  }
}
```

---

## Schools

### Create Job Request
```
POST /school/requests
```

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "subject": "Inglês",
  "grade": "7º ano",
  "hoursPerWeek": 10,
  "hourlyRate": 85,
  "description": "Professor de inglês para turma de 7º ano",
  "startDate": "2026-06-01"
}
```

**Response:**
```json
{
  "id": "req_123",
  "schoolId": "sch_123",
  "subject": "Inglês",
  "status": "open",
  "createdAt": "2026-05-09T10:00:00Z"
}
```

---

### Get School Requests
```
GET /school/requests
```

**Response:**
```json
{
  "requests": [
    {
      "id": "req_123",
      "subject": "Inglês",
      "grade": "7º ano",
      "status": "open",
      "candidates": 5
    }
  ]
}
```

---

## Teachers

### Update Teacher Profile
```
PUT /teacher/profile
```

**Request Body:**
```json
{
  "bio": "Professor com 10 anos de experiência",
  "qualifications": ["Licenciatura em Letras", "MBA em Educação"],
  "languages": ["Português", "Inglês", "Espanhol"],
  "availableHours": 20,
  "subjects": ["Inglês", "Português"],
  "rate": 85
}
```

---

### Get Available Opportunities
```
GET /teacher/opportunities
```

**Query Parameters:**
```
?subject=Inglês&grade=7&minRate=70&maxRate=150
```

**Response:**
```json
{
  "opportunities": [
    {
      "id": "req_123",
      "school": "E.E. São Paulo",
      "subject": "Inglês",
      "grade": "7º ano",
      "hourlyRate": 85,
      "match": 92
    }
  ]
}
```

---

### Apply for Opportunity
```
POST /teacher/apply
```

**Request Body:**
```json
{
  "opportunityId": "req_123",
  "proposal": "Estou muito interessado nesta oportunidade"
}
```

**Response:**
```json
{
  "applicationId": "app_123",
  "status": "pending",
  "createdAt": "2026-05-09T10:00:00Z"
}
```

---

## Payment

### Create Payment Intent
```
POST /payments/intent
```

**Request Body:**
```json
{
  "amount": 1000,
  "currency": "brl",
  "contractId": "contract_123"
}
```

**Response:**
```json
{
  "clientSecret": "pi_123_secret",
  "publishableKey": "pk_test_123"
}
```

---

## Error Responses

### 400 Bad Request
```json
{
  "error": "Validation failed",
  "details": {
    "email": "Invalid email format"
  }
}
```

### 401 Unauthorized
```json
{
  "error": "Authentication required"
}
```

### 403 Forbidden
```json
{
  "error": "You do not have permission to access this resource"
}
```

### 404 Not Found
```json
{
  "error": "Resource not found"
}
```

### 500 Server Error
```json
{
  "error": "Internal server error"
}
```

---

## Rate Limiting
API requests are limited to 100 requests per minute per IP.

## Webhooks
Stripe webhooks are available for payment events at:
```
POST /webhooks/stripe
```
