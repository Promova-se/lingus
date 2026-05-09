# LINGUS Database Schema

## Database: MongoDB

## Collections

### Users
```javascript
{
  _id: ObjectId,
  name: String,
  email: String,
  password: String (hashed),
  userType: "school" | "teacher",
  profile: {
    avatar: String,
    bio: String,
    phone: String,
    location: {
      city: String,
      state: String,
      country: String
    }
  },
  rating: {
    average: Number (0-5),
    count: Number,
    reviews: [ObjectId] // ref to Reviews
  },
  status: "active" | "inactive" | "suspended",
  createdAt: Date,
  updatedAt: Date
}
```

---

### Schools
```javascript
{
  _id: ObjectId,
  userId: ObjectId, // ref to Users
  name: String,
  email: String,
  phone: String,
  address: {
    street: String,
    city: String,
    state: String,
    zipCode: String
  },
  website: String,
  foundedYear: Number,
  studentsCount: Number,
  subscriptionPlan: "free" | "premium",
  subscriptionExpiry: Date,
  totalSpent: Number,
  totalContracts: Number,
  createdAt: Date,
  updatedAt: Date
}
```

---

### Teachers
```javascript
{
  _id: ObjectId,
  userId: ObjectId, // ref to Users
  bio: String,
  education: [
    {
      degree: String,
      institution: String,
      year: Number
    }
  ],
  qualifications: [String],
  languages: [String],
  subjects: [String],
  experience: Number, // years
  hourlyRate: Number,
  availableHours: Number,
  availability: {
    monday: { start: String, end: String },
    tuesday: { start: String, end: String },
    // ...
  },
  certifications: [
    {
      name: String,
      issuer: String,
      year: Number
    }
  ],
  totalEarnings: Number,
  totalContracts: Number,
  subscriptionPlan: "free" | "premium",
  subscriptionExpiry: Date,
  createdAt: Date,
  updatedAt: Date
}
```

---

### JobRequests
```javascript
{
  _id: ObjectId,
  schoolId: ObjectId, // ref to Schools
  subject: String,
  grade: String,
  hoursPerWeek: Number,
  hourlyRate: Number,
  description: String,
  requirements: [String],
  startDate: Date,
  endDate: Date,
  status: "open" | "in_progress" | "closed" | "cancelled",
  views: Number,
  applications: [ObjectId], // ref to Applications
  hiringTeacher: ObjectId, // ref to Teachers (when hired)
  createdAt: Date,
  updatedAt: Date
}
```

---

### Applications
```javascript
{
  _id: ObjectId,
  jobRequestId: ObjectId, // ref to JobRequests
  teacherId: ObjectId, // ref to Teachers
  proposal: String,
  status: "pending" | "accepted" | "rejected" | "withdrawn",
  matchScore: Number, // 0-100 (AI matching)
  submittedAt: Date,
  respondedAt: Date,
  createdAt: Date,
  updatedAt: Date
}
```

---

### Contracts
```javascript
{
  _id: ObjectId,
  jobRequestId: ObjectId, // ref to JobRequests
  schoolId: ObjectId, // ref to Schools
  teacherId: ObjectId, // ref to Teachers
  startDate: Date,
  endDate: Date,
  hourlyRate: Number,
  totalHours: Number,
  status: "active" | "completed" | "paused" | "cancelled",
  terms: {
    cancellationPolicy: String,
    paymentTerms: String
  },
  totalPaid: Number,
  createdAt: Date,
  updatedAt: Date
}
```

---

### Payments
```javascript
{
  _id: ObjectId,
  contractId: ObjectId, // ref to Contracts
  schoolId: ObjectId, // ref to Schools
  teacherId: ObjectId, // ref to Teachers
  amount: Number,
  currency: "brl" | "usd",
  status: "pending" | "completed" | "failed" | "refunded",
  stripePaymentId: String,
  paymentDate: Date,
  dueDate: Date,
  description: String,
  createdAt: Date,
  updatedAt: Date
}
```

---

### Reviews
```javascript
{
  _id: ObjectId,
  contractId: ObjectId, // ref to Contracts
  reviewerId: ObjectId, // ref to Users
  revieweeId: ObjectId, // ref to Users
  rating: Number, // 1-5
  title: String,
  comment: String,
  categories: {
    communication: Number,
    professionalism: Number,
    punctuality: Number,
    qualityOfWork: Number
  },
  createdAt: Date,
  updatedAt: Date
}
```

---

### Messages
```javascript
{
  _id: ObjectId,
  senderId: ObjectId, // ref to Users
  recipientId: ObjectId, // ref to Users
  contractId: ObjectId, // ref to Contracts
  message: String,
  attachments: [
    {
      url: String,
      filename: String,
      type: String
    }
  ],
  isRead: Boolean,
  createdAt: Date
}
```

---

### Transactions
```javascript
{
  _id: ObjectId,
  type: "commission" | "payout" | "refund",
  amount: Number,
  relatedId: ObjectId, // ref to Payments or Contracts
  description: String,
  status: "pending" | "completed" | "failed",
  createdAt: Date,
  updatedAt: Date
}
```

---

## Indexes

```javascript
// Users
db.users.createIndex({ email: 1 }, { unique: true })
db.users.createIndex({ userType: 1 })
db.users.createIndex({ createdAt: -1 })

// Schools
db.schools.createIndex({ userId: 1 }, { unique: true })
db.schools.createIndex({ email: 1 })
db.schools.createIndex({ "address.city": 1 })

// Teachers
db.teachers.createIndex({ userId: 1 }, { unique: true })
db.teachers.createIndex({ subjects: 1 })
db.teachers.createIndex({ languages: 1 })
db.teachers.createIndex({ hourlyRate: 1 })

// JobRequests
db.jobRequests.createIndex({ schoolId: 1 })
db.jobRequests.createIndex({ subject: 1 })
db.jobRequests.createIndex({ status: 1 })
db.jobRequests.createIndex({ createdAt: -1 })

// Applications
db.applications.createIndex({ jobRequestId: 1 })
db.applications.createIndex({ teacherId: 1 })
db.applications.createIndex({ status: 1 })

// Contracts
db.contracts.createIndex({ schoolId: 1 })
db.contracts.createIndex({ teacherId: 1 })
db.contracts.createIndex({ status: 1 })

// Payments
db.payments.createIndex({ contractId: 1 })
db.payments.createIndex({ status: 1 })
db.payments.createIndex({ paymentDate: -1 })

// Messages
db.messages.createIndex({ senderId: 1 })
db.messages.createIndex({ recipientId: 1 })
db.messages.createIndex({ createdAt: -1 })
```

---

## Relationships

```
Users (1) ←→ (1) Schools
Users (1) ←→ (1) Teachers
Schools (1) ←→ (N) JobRequests
Teachers (N) ←→ (N) JobRequests (via Applications)
JobRequests (1) ←→ (N) Applications
JobRequests (1) ←→ (1) Contracts
Schools (1) ←→ (N) Contracts
Teachers (1) ←→ (N) Contracts
Contracts (1) ←→ (N) Payments
Contracts (1) ←→ (N) Reviews
Users (N) ←→ (N) Users (via Messages)
```
