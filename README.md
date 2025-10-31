# Client Application

## Savings Management System - Client Portal

This repository contains the Client application for the Savings Management System, allowing customers to register, manage their savings, perform transactions, and track their financial activities.

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Setup Instructions](#setup-instructions)
- [API Endpoints](#api-endpoints)
- [Environment Variables](#environment-variables)
- [Running the Application](#running-the-application)
- [User Flow](#user-flow)
- [Testing](#testing)
- [Security Features](#security-features)

---

## 🎯 Overview

The Client Application provides a user-friendly interface for customers to:
- Register and create savings accounts
- Securely login with OTP verification
- View account balance and transaction history
- Make deposits and withdrawals
- Manage profile and device information
- Receive low balance alerts

---

## ✨ Features

### Authentication
- ✅ Customer registration with device ID
- ✅ Secure login with OTP (after admin verification)
- ✅ JWT-based session management
- ✅ Password hashing using SHA-512 (PBKDF2)
- ✅ OTP resend functionality

### Account Management
- ✅ View account balance in real-time
- ✅ Complete transaction history
- ✅ Update device ID
- ✅ Account deletion option
- ✅ Profile management

### Transactions
- ✅ Deposit money into account
- ✅ Withdraw money with balance validation
- ✅ Transaction descriptions
- ✅ Instant balance updates
- ✅ Transaction status tracking

### User Experience
- ✅ Responsive design for all devices
- ✅ Loading states and feedback
- ✅ Error handling with user-friendly messages
- ✅ Low balance warnings
- ✅ Pending verification status display

### Security
- ✅ Rate limiting on all endpoints
- ✅ Secure HTTP headers (Helmet.js)
- ✅ Input validation and sanitization
- ✅ CORS protection
- ✅ DTOs to prevent sensitive data exposure
- ✅ Device verification requirement

---

## 🛠 Tech Stack

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js
- **Language:** TypeScript
- **Database:** PostgreSQL
- **ORM:** Prisma
- **Authentication:** JWT (jsonwebtoken)
- **Password Hashing:** PBKDF2-SHA512
- **Email:** Nodemailer
- **Security:** Helmet, CORS, Rate Limiting

### Frontend
- **Framework:** Next.js 16.0.0
- **UI Library:** React 19.2.0
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4.1.9
- **Components:** Radix UI
- **State Management:** React Context API
- **Form Handling:** React Hook Form

---

## 📁 Project Structure

```
client/
├── backend/                    # Client Backend API (Port 3002)
│   ├── src/
│   │   ├── controllers/
│   │   │   ├── clientController.ts     # Client operations
│   │   │   └── authController.ts       # Authentication
│   │   ├── services/
│   │   │   ├── userService.ts          # User business logic
│   │   │   ├── transactionService.ts   # Transaction logic
│   │   │   └── sessionService.ts       # Session management
│   │   ├── repositories/
│   │   │   ├── UserRepository.ts       # User data access
│   │   │   ├── TransactionRepository.ts
│   │   │   └── OtpRepository.ts        # OTP management
│   │   ├── middlewares/
│   │   │   ├── auth.ts                 # JWT verification
│   │   │   ├── error.ts                # Error handling
│   │   │   └── rateLimiter.ts          # Rate limiting
│   │   ├── dtos/
│   │   │   ├── auth.dto.ts             # Authentication DTOs
│   │   │   └── transaction.dto.ts      # Transaction DTOs
│   │   ├── models/                     # Prisma models
│   │   └── utils/
│   │       ├── database.ts             # DB connection
│   │       ├── email.ts                # Email utilities
│   │       ├── jwt.ts                  # JWT utilities
│   │       ├── password.ts             # Password hashing
│   │       └── validation.ts           # Input validation
│   ├── prisma/
│   │   └── schema.prisma               # Database schema
│   ├── tests/
│   │   └── auth.test.ts                # Authentication tests
│   ├── scripts/
│   │   ├── init-db.js                  # Database initialization
│   │   └── setup.js                    # Setup script
│   ├── server.ts                       # Express server entry
│   ├── package.json
│   ├── tsconfig.json
│   └── .env.example                    # Environment template
│
└── frontend/                   # Client Frontend UI (Port 3000)
    ├── src/
    │   ├── app/
    │   │   ├── client/
    │   │   │   ├── dashboard/          # Client dashboard
    │   │   │   ├── transactions/       # Transaction history
    │   │   │   ├── profile/            # User profile
    │   │   │   ├── login/              # Login page
    │   │   │   └── register/           # Registration page
    │   │   ├── layout.tsx              # Root layout
    │   │   └── page.tsx                # Landing page
    │   ├── components/
    │   │   ├── client-nav.tsx          # Client navigation
    │   │   ├── hero.tsx                # Hero section
    │   │   ├── features.tsx            # Features section
    │   │   └── ui/                     # UI components
    │   ├── services/
    │   │   ├── api.ts                  # API client
    │   │   └── auth.ts                 # Auth service
    │   ├── store/
    │   │   └── auth-context.tsx        # Auth state
    │   └── lib/
    │       └── utils.ts                # Utilities
    ├── public/                         # Static assets
    ├── package.json
    ├── tsconfig.json
    ├── next.config.mjs
    ├── tailwind.config.ts
    └── .env.local.example              # Environment template
```

---

## 🚀 Setup Instructions

### Prerequisites

- Node.js v18 or higher
- PostgreSQL 12 or higher
- npm or yarn

### 1. Clone the Repository

```bash
git clone <repository-url>
cd client
```

### 2. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Edit .env with your configuration
# - Set DATABASE_URL to your PostgreSQL connection string
# - Set JWT_SECRET to a secure random string
# - Configure SMTP settings for email

# Generate Prisma client
npm run db:generate

# Note: Database should already be initialized by admin backend
# If not, run:
# npm run db:push

# Start development server
npm run dev
```

**Backend will run at:** http://localhost:3002

### 3. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Create environment file
cp .env.local.example .env.local

# Edit .env.local
# Set NEXT_PUBLIC_API_URL=http://localhost:3002

# Start development server
npm run dev
```

**Frontend will run at:** http://localhost:3000

---

## 🔌 API Endpoints

### Authentication

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/auth/register` | Register new account | No |
| POST | `/api/auth/login` | Login with OTP | No |
| POST | `/api/auth/resend-login-otp` | Resend OTP code | No |
| POST | `/api/auth/verify-email` | Verify email address | No |
| POST | `/api/auth/logout` | Logout | Yes |
| GET | `/api/auth/me` | Get current user | Yes |

### Account Operations

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/client/balance` | Get account balance | Yes (Client) |
| GET | `/api/client/transactions` | Get transaction history | Yes (Client) |
| POST | `/api/client/deposit` | Deposit money | Yes (Client) |
| POST | `/api/client/withdraw` | Withdraw money | Yes (Client) |
| PUT | `/api/client/device` | Update device ID | Yes (Client) |
| DELETE | `/api/client/account` | Delete account | Yes (Client) |

---

## ⚙️ Environment Variables

### Backend (.env)

```env
# Server Configuration
PORT=3002
NODE_ENV=development

# Database (same as admin backend)
DATABASE_URL="postgresql://user:password@localhost:5432/sms_db"

# JWT Configuration
JWT_SECRET="your-secure-random-secret-minimum-32-characters"
JWT_EXPIRES_IN="24h"

# Email Configuration
SMTP_HOST="smtp.gmail.com"
SMTP_PORT=587
SMTP_USER="your-email@gmail.com"
SMTP_PASS="your-app-specific-password"
EMAIL_FROM="noreply@savingsmanagement.com"

# OTP Configuration
OTP_EXPIRY_MINUTES=10

# CORS
CORS_ORIGIN="http://localhost:3000"
```

### Frontend (.env.local)

```env
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:3002
```

---

## 🏃 Running the Application

### Development Mode

**Option 1: Run both services (2 terminals)**

```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm run dev
```

**Option 2: Using scripts**

```bash
# Backend
cd backend && npm run dev

# Frontend
cd frontend && npm run dev
```

### Production Build

```bash
# Backend
cd backend
npm run build
npm start

# Frontend
cd frontend
npm run build
npm start
```

### Access the Application

- **Client Frontend:** http://localhost:3000
- **Client API:** http://localhost:3002
- **API Health Check:** http://localhost:3002/health

---

## 👤 User Flow

### 1. Registration

```
1. Visit http://localhost:3000
2. Click "Register" or navigate to /client/register
3. Fill in the registration form:
   - Name
   - Email
   - Password (min 8 chars, uppercase, lowercase, number)
   - Confirm Password
   - Device ID (unique identifier for your device)
4. Submit registration
5. Account created with "Pending Verification" status
```

### 2. Admin Verification

```
1. Admin logs into admin portal (http://localhost:3003)
2. Admin views customer list
3. Admin clicks "Verify" on your account
4. System generates OTP and sends to your email
5. Your account status changes to "Verified"
```

### 3. Login with OTP

```
1. Check your email for OTP code (6 digits)
2. Return to client portal (http://localhost:3000)
3. Click "Login" or navigate to /client/login
4. Enter:
   - Email
   - Password
   - OTP Code (from email)
5. Successfully logged in
6. Redirected to dashboard
```

### 4. Using the Dashboard

```
Dashboard Features:
- View current balance
- See recent transactions
- Quick deposit/withdraw buttons
- Transaction history
- Account information

Making Transactions:
1. Click "Deposit" or "Withdraw"
2. Enter amount
3. Add description (optional)
4. Confirm transaction
5. Balance updates immediately
6. Transaction appears in history
```

### 5. Managing Account

```
Profile Management:
- Update device ID if needed
- View account details
- Logout from any page

Account Deletion:
- Navigate to profile
- Click "Delete Account"
- Confirm deletion
- Account and all data permanently removed
```

---

## 🧪 Testing

```bash
cd backend

# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run specific test file
npm test auth.test.ts
```

### Manual Testing Checklist

- [ ] Register new account
- [ ] Receive verification pending message
- [ ] Get OTP email after admin verification
- [ ] Login with OTP
- [ ] View dashboard and balance
- [ ] Make a deposit
- [ ] Make a withdrawal
- [ ] View transaction history
- [ ] Update device ID
- [ ] Logout and login again
- [ ] Test OTP resend functionality

---

## 🔒 Security Features

### Password Security
- **SHA-512 with PBKDF2:** 100,000 iterations
- Unique salt for each password
- Timing-safe comparison
- Minimum password requirements enforced

### Authentication
- **Two-factor authentication** via OTP
- **JWT tokens** with expiration
- **Session management** with automatic cleanup
- **Device verification** required before login
- **Rate limiting:**
  - Auth endpoints: 5 requests / 15 minutes
  - General endpoints: 100 requests / 15 minutes
  - Transaction endpoints: 10 requests / 15 minutes

### Transaction Security
- **Balance validation** before withdrawal
- **Amount validation** (must be positive)
- **Transaction limits** via rate limiting
- **Audit trail** for all transactions

### Data Protection
- **DTOs** prevent sensitive data exposure
- **Input validation** on all endpoints
- **SQL injection** prevention via Prisma ORM
- **XSS protection** via Helmet.js
- **Password never returned** in API responses

### Network Security
- **Helmet.js** for secure HTTP headers
- **CORS** configuration
- **HTTPS** recommended for production

---

## 📊 Database Schema

```prisma
model User {
  id            String    @id @default(uuid())
  email         String    @unique
  password      String    // SHA-512 hashed
  name          String
  role          Role      @default(client)
  deviceId      String?   // Required for verification
  balance       Float     @default(0)
  isVerified    Boolean   @default(false)
  emailVerified Boolean   @default(false)
  createdAt     DateTime  @default(now())
  lastLogin     DateTime?
  transactions  Transaction[]
  otpRecords    OtpRecord[]
}

model Transaction {
  id          String          @id @default(uuid())
  userId      String
  user        User            @relation(fields: [userId], references: [id])
  type        TransactionType // 'deposit' or 'withdrawal'
  amount      Float
  status      String          @default("completed")
  description String?
  createdAt   DateTime        @default(now())
}

model OtpRecord {
  id        String   @id @default(uuid())
  userId    String
  user      User     @relation(fields: [userId], references: [id])
  code      String   // 6-digit OTP
  type      OtpType  // 'LOGIN_OTP' or 'EMAIL_VERIFICATION'
  isUsed    Boolean  @default(false)
  expiresAt DateTime // 10 minutes from creation
  createdAt DateTime @default(now())
}
```

---

## 🐛 Troubleshooting

### "Account pending admin verification"

**Problem:** Cannot login after registration  
**Solution:** Wait for admin to verify your account. Admin will send OTP via email.

### "Invalid or expired OTP code"

**Problem:** OTP not working  
**Solutions:**
- Check if OTP is expired (10 minutes validity)
- Request new OTP via "Resend OTP" button
- Verify you're using the most recent OTP email

### "Insufficient balance"

**Problem:** Cannot withdraw money  
**Solution:** Check your balance. You cannot withdraw more than your current balance.

### Port Already in Use

```bash
# Check what's using the port
lsof -i :3002  # macOS/Linux
netstat -ano | findstr :3002  # Windows

# Kill the process or change PORT in .env
```

### Database Connection Failed

```bash
# Verify PostgreSQL is running
pg_isready

# Check DATABASE_URL in .env
# Ensure admin backend has initialized the database
```

### Not Receiving OTP Emails

**Solutions:**
- Check spam/junk folder
- Verify SMTP settings in backend .env
- Ask admin to resend verification
- Check email configuration in backend

---

## 📚 Additional Documentation

- **Architecture:** See `../ARCHITECTURE_DIAGRAM.md`
- **Requirements:** See `../REQUIREMENTS_COMPLIANCE.md`
- **Quick Start:** See `../QUICK_START.md`
- **Environment Setup:** See `../ENVIRONMENT_SETUP.md`
- **Separation Guide:** See `../SEPARATION_GUIDE.md`

---

## 🎨 UI/UX Features

### Responsive Design
- Mobile-friendly interface
- Touch-optimized buttons
- Adaptive layouts

### User Feedback
- Loading states for all actions
- Success/error toast notifications
- Form validation feedback
- Transaction confirmations

### Accessibility
- Keyboard navigation
- Screen reader support
- High contrast mode
- Focus indicators

---

## 🔄 API Response Examples

### Successful Login

```json
{
  "user": {
    "id": "uuid",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "client",
    "balance": 1000.00,
    "isVerified": true,
    "createdAt": "2025-01-01T00:00:00.000Z",
    "lastLogin": "2025-01-30T10:30:00.000Z"
  },
  "token": "jwt.token.here"
}
```

### Get Balance

```json
{
  "balance": 1500.50
}
```

### Transaction History

```json
[
  {
    "id": "uuid",
    "userId": "uuid",
    "type": "deposit",
    "amount": 500.00,
    "status": "completed",
    "description": "Initial deposit",
    "createdAt": "2025-01-30T10:00:00.000Z"
  },
  {
    "id": "uuid",
    "userId": "uuid",
    "type": "withdrawal",
    "amount": 200.00,
    "status": "completed",
    "description": "ATM withdrawal",
    "createdAt": "2025-01-30T11:00:00.000Z"
  }
]
```

---

## 📝 License

This project is part of the Savings Management System.

---

## 🤝 Support

For issues, questions, or contributions, please refer to the main project documentation.

---

**Client Backend:** Port 3002  
**Client Frontend:** Port 3000  
**Database:** PostgreSQL (Port 5432) - Shared with Admin Backend

