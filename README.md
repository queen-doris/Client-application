# Savings Management System

A comprehensive, secure savings management platform with separate client and admin applications.

[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-16.0-black)](https://nextjs.org/)
[![Express](https://img.shields.io/badge/Express-4.18-green)](https://expressjs.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-12+-blue)](https://www.postgresql.org/)
[![Prisma](https://img.shields.io/badge/Prisma-5.7-2D3748)](https://www.prisma.io/)

---

## 📋 Table of Contents

- [Overview](#overview)
- [System Architecture](#system-architecture)
- [Key Features](#key-features)
- [Technology Stack](#technology-stack)
- [Quick Start](#quick-start)
- [Project Structure](#project-structure)
- [Documentation](#documentation)
- [Security](#security)
- [Requirements Compliance](#requirements-compliance)
- [Support](#support)

---

## 🎯 Overview

The Savings Management System is a full-stack application that enables customers to manage their savings accounts while providing administrators with tools to verify users and monitor platform activities. The system is split into **two independent applications**:

1. **Client Application** - For customer use (registration, deposits, withdrawals, balance tracking)
2. **Admin Application** - For internal operations (customer verification, transaction monitoring, analytics)

Each application has its own frontend (Next.js) and backend (Node.js/Express) running on separate ports, allowing for independent development, testing, and deployment.

---

## 🏗 System Architecture

### Port Configuration

| Application | Port | URL |
|------------|------|-----|
| **Client Frontend** | 3000 | http://localhost:3000 |
| **Admin Backend** | 3001 | http://localhost:3001 |
| **Client Backend** | 3002 | http://localhost:3002 |
| **Admin Frontend** | 3003 | http://localhost:3003 |
| **PostgreSQL Database** | 5432 | localhost:5432 |

### Architecture Diagram

```
┌─────────────────────────────────────────────────────────┐
│                 SAVINGS MANAGEMENT SYSTEM                │
└─────────────────────────────────────────────────────────┘

          ┌──────────────────────────┐
          │   PostgreSQL Database    │
          │      (Port 5432)         │
          └──────────────────────────┘
                    ▲    ▲
          ┌─────────┘    └─────────┐
          │                        │
┌─────────▼──────────┐  ┌─────────▼──────────┐
│  ADMIN BACKEND     │  │  CLIENT BACKEND     │
│  Port 3001         │  │  Port 3002          │
│  - Admin Auth      │  │  - Client Auth      │
│  - Customer Mgmt   │  │  - Registration     │
│  - Verification    │  │  - Transactions     │
│  - Reporting       │  │  - Profile Mgmt     │
└─────────▲──────────┘  └─────────▲──────────┘
          │                        │
┌─────────┴──────────┐  ┌─────────┴──────────┐
│  ADMIN FRONTEND    │  │  CLIENT FRONTEND    │
│  Port 3003         │  │  Port 3000          │
│  - Dashboard       │  │  - Landing Page     │
│  - Customer List   │  │  - Registration     │
│  - Transactions    │  │  - Dashboard        │
│  - Verification UI │  │  - Transactions     │
└────────────────────┘  └────────────────────┘
```

---

## ✨ Key Features

### For Customers (Client App)

- ✅ **Secure Registration** with device ID verification
- ✅ **Two-Factor Authentication** via OTP
- ✅ **Account Dashboard** showing real-time balance
- ✅ **Deposit & Withdrawal** operations
- ✅ **Transaction History** with details
- ✅ **Profile Management** and device updates
- ✅ **Low Balance Alerts**
- ✅ **Responsive Design** for all devices

### For Administrators (Admin App)

- ✅ **Customer Verification** with OTP generation
- ✅ **Transaction Monitoring** across all accounts
- ✅ **Dashboard Analytics** with key metrics
- ✅ **Customer Management** (view, verify, reject)
- ✅ **Platform Statistics**
  - Total customers
  - Transaction volumes
  - Pending verifications
  - Low balance accounts

### Security Features

- ✅ **SHA-512 Password Hashing** with PBKDF2 (100,000 iterations)
- ✅ **JWT Authentication** with session management
- ✅ **Rate Limiting** on all endpoints
- ✅ **Input Validation** and sanitization
- ✅ **Secure HTTP Headers** (Helmet.js)
- ✅ **CORS Protection**
- ✅ **DTOs** to control data exposure
- ✅ **Device Verification** requirement
- ✅ **OTP Verification** for client login

---

## 🛠 Technology Stack

### Frontend
- **Framework:** Next.js 16.0.0
- **UI Library:** React 19.2.0
- **Language:** TypeScript 5.x
- **Styling:** Tailwind CSS 4.1.9
- **Components:** Radix UI
- **Charts:** Recharts (admin dashboard)
- **State:** React Context API

### Backend
- **Runtime:** Node.js 18+
- **Framework:** Express.js 4.18
- **Language:** TypeScript 5.1.6
- **Database:** PostgreSQL 12+
- **ORM:** Prisma 5.7.1
- **Authentication:** JWT (jsonwebtoken)
- **Password:** PBKDF2-SHA512
- **Email:** Nodemailer 6.10
- **Security:** Helmet, CORS

### Development Tools
- **Testing:** Jest 29.7 + Supertest
- **Linting:** ESLint
- **Build:** TypeScript Compiler
- **Dev Server:** ts-node-dev

---

## 🚀 Quick Start

### Prerequisites

```bash
# Check Node.js version (must be 18+)
node --version

# Check PostgreSQL (must be 12+)
psql --version

# Check npm
npm --version
```

### 1. Database Setup

```bash
# Start PostgreSQL
# Create database
createdb sms_db

# Or using psql
psql -c "CREATE DATABASE sms_db;"
```

### 2. Start Admin Application

```bash
# Admin Backend (Terminal 1)
cd admin/backend
npm install
cp .env.example .env
# Edit .env with your configuration
npm run db:generate
npm run db:push
npm run db:seed
npm run dev  # Runs on port 3001

# Admin Frontend (Terminal 2)
cd admin/frontend
npm install
cp .env.local.example .env.local
# Edit .env.local if needed
npm run dev  # Runs on port 3003
```

### 3. Start Client Application

```bash
# Client Backend (Terminal 3)
cd client/backend
npm install
cp .env.example .env
# Edit .env with your configuration
npm run db:generate
npm run dev  # Runs on port 3002

# Client Frontend (Terminal 4)
cd client/frontend
npm install
cp .env.local.example .env.local
# Edit .env.local if needed
npm run dev  # Runs on port 3000
```

### 4. Access the Applications

- **Client Portal:** http://localhost:3000
- **Admin Portal:** http://localhost:3003

**Default Admin Credentials:**
- Email: `admin@example.com`
- Password: `admin123`

---

## 📁 Project Structure

```
savings-management-system-main/
│
├── admin/                      # Admin Application
│   ├── backend/                # Admin Backend API (Port 3001)
│   │   ├── src/
│   │   │   ├── controllers/    # Request handlers
│   │   │   ├── services/       # Business logic
│   │   │   ├── repositories/   # Data access layer
│   │   │   ├── middlewares/    # Auth, error, rate limiting
│   │   │   ├── dtos/           # Data Transfer Objects
│   │   │   ├── models/         # Prisma models
│   │   │   └── utils/          # Helper functions
│   │   ├── prisma/             # Database schema
│   │   ├── tests/              # Unit tests
│   │   ├── server.ts           # Entry point
│   │   └── package.json
│   │
│   ├── frontend/               # Admin Frontend UI (Port 3003)
│   │   ├── src/
│   │   │   ├── app/            # Next.js pages
│   │   │   │   └── admin/      # Admin-specific pages
│   │   │   ├── components/     # React components
│   │   │   ├── services/       # API clients
│   │   │   └── store/          # State management
│   │   └── package.json
│   │
│   └── README.md               # Admin application docs
│
├── client/                     # Client Application
│   ├── backend/                # Client Backend API (Port 3002)
│   │   ├── src/
│   │   │   ├── controllers/    # Request handlers
│   │   │   ├── services/       # Business logic
│   │   │   ├── repositories/   # Data access layer
│   │   │   ├── middlewares/    # Auth, error, rate limiting
│   │   │   ├── dtos/           # Data Transfer Objects
│   │   │   ├── models/         # Prisma models
│   │   │   └── utils/          # Helper functions
│   │   ├── prisma/             # Database schema
│   │   ├── tests/              # Unit tests
│   │   ├── server.ts           # Entry point
│   │   └── package.json
│   │
│   ├── frontend/               # Client Frontend UI (Port 3000)
│   │   ├── src/
│   │   │   ├── app/            # Next.js pages
│   │   │   │   └── client/     # Client-specific pages
│   │   │   ├── components/     # React components
│   │   │   ├── services/       # API clients
│   │   │   └── store/          # State management
│   │   └── package.json
│   │
│   └── README.md               # Client application docs
│
├── Documentation/              # Comprehensive documentation
│   ├── QUICK_START.md          # Fast setup guide
│   ├── SEPARATION_GUIDE.md     # Architecture details
│   ├── START_ADMIN.md          # Admin setup
│   ├── START_CLIENT.md         # Client setup
│   ├── ENVIRONMENT_SETUP.md    # Environment configuration
│   ├── ARCHITECTURE_DIAGRAM.md # Visual diagrams
│   ├── MIGRATION_SUMMARY.md    # What was changed
│   └── REQUIREMENTS_COMPLIANCE.md # Requirements checklist
│
├── setup-postgres.sql          # Database initialization
└── README.md                   # This file
```

---

## 📚 Documentation

Comprehensive documentation is available for all aspects of the system:

### Getting Started
- **[Quick Start Guide](QUICK_START.md)** - Fast setup for all services
- **[Environment Setup](ENVIRONMENT_SETUP.md)** - Complete environment configuration

### Application Specific
- **[Admin README](admin/README.md)** - Admin application documentation
- **[Client README](client/README.md)** - Client application documentation
- **[Start Admin](START_ADMIN.md)** - Admin services setup
- **[Start Client](START_CLIENT.md)** - Client services setup

### Architecture & Design
- **[Architecture Diagram](ARCHITECTURE_DIAGRAM.md)** - Visual system architecture
- **[Separation Guide](SEPARATION_GUIDE.md)** - How code was separated
- **[Migration Summary](MIGRATION_SUMMARY.md)** - Changes made

### Compliance
- **[Requirements Compliance](REQUIREMENTS_COMPLIANCE.md)** - Full requirements checklist

---

## 🔒 Security

The system implements multiple layers of security:

### Authentication & Authorization
- **Password Hashing:** PBKDF2 with SHA-512 (100,000 iterations)
- **JWT Tokens:** Secure token-based authentication
- **Session Management:** Automatic session cleanup
- **Two-Factor Auth:** OTP verification for client login
- **Device Verification:** Admin must verify each device

### Network Security
- **Rate Limiting:**
  - Auth endpoints: 5 requests / 15 minutes
  - General endpoints: 100 requests / 15 minutes
  - Transaction endpoints: 10 requests / 15 minutes
- **Helmet.js:** Secure HTTP headers
- **CORS:** Cross-origin resource sharing protection
- **Input Validation:** All user inputs sanitized

### Data Protection
- **DTOs:** Sensitive data never exposed to frontend
- **SQL Injection Prevention:** Prisma ORM parameterized queries
- **XSS Protection:** Output encoding
- **Environment Variables:** Secrets never hardcoded

---

## ✅ Requirements Compliance

This system fully complies with all project requirements:

### Core Requirements
✅ Two separate repositories (Admin and Client)  
✅ Frontend + Backend structure for each  
✅ SHA-512 password hashing (PBKDF2)  
✅ JWT authentication  
✅ Device ID verification by admin  
✅ Only verified devices can login  
✅ Session expiration  
✅ Deposit and withdraw endpoints  
✅ Balance and transaction history  
✅ Withdrawal validation  
✅ DTOs implementation  
✅ Secure HTTP headers  
✅ Rate limiting  
✅ Input validation  
✅ Environment variables  
✅ Layered architecture  

### Frontend Requirements
✅ Admin authentication  
✅ Customer device management  
✅ View all customers and transactions  
✅ Statistics dashboard  
✅ Error handling  
✅ Client registration and login  
✅ Client dashboard  
✅ Transaction forms  
✅ Low balance alerts  

**See [REQUIREMENTS_COMPLIANCE.md](REQUIREMENTS_COMPLIANCE.md) for complete details.**

---

## 🧪 Testing

```bash
# Test Admin Backend
cd admin/backend
npm test

# Test Client Backend
cd client/backend
npm test

# Run all tests in watch mode
npm run test:watch
```

---

## 🚢 Deployment

### Production Checklist

- [ ] Update all `JWT_SECRET` values
- [ ] Configure production database
- [ ] Set up SMTP for emails
- [ ] Configure CORS for production domains
- [ ] Enable HTTPS
- [ ] Set `NODE_ENV=production`
- [ ] Update frontend API URLs
- [ ] Set up database backups
- [ ] Configure monitoring and logging
- [ ] Review and update rate limits

### Recommended Architecture

```
Load Balancer (nginx)
    ├── Admin Frontend → Vercel/Netlify
    ├── Client Frontend → Vercel/Netlify
    ├── Admin Backend → VPS/Cloud
    ├── Client Backend → VPS/Cloud
    └── PostgreSQL → Managed Database (AWS RDS/DigitalOcean)
```

---

## 🐛 Troubleshooting

### Common Issues

**Port Already in Use**
```bash
# Find and kill process
lsof -i :3001  # macOS/Linux
netstat -ano | findstr :3001  # Windows
```

**Database Connection Failed**
```bash
# Check PostgreSQL is running
pg_isready
# Create database if needed
createdb sms_db
```

**Cannot Send Emails**
- Enable 2FA on Gmail
- Use app-specific password
- Check SMTP settings

**OTP Not Working**
- Check OTP expiry (10 minutes)
- Resend OTP
- Verify email configuration

---

## 📊 Database Schema

```prisma
model User {
  id            String        @id @default(uuid())
  email         String        @unique
  password      String        // SHA-512 hashed
  name          String
  role          Role          @default(client)
  deviceId      String?
  balance       Float         @default(0)
  isVerified    Boolean       @default(false)
  emailVerified Boolean       @default(false)
  createdAt     DateTime      @default(now())
  lastLogin     DateTime?
  transactions  Transaction[]
  otpRecords    OtpRecord[]
}

model Transaction {
  id          String          @id @default(uuid())
  userId      String
  user        User            @relation(fields: [userId], references: [id])
  type        TransactionType
  amount      Float
  status      String          @default("completed")
  description String?
  createdAt   DateTime        @default(now())
}

model OtpRecord {
  id        String   @id @default(uuid())
  userId    String
  user      User     @relation(fields: [userId], references: [id])
  code      String
  type      OtpType
  isUsed    Boolean  @default(false)
  expiresAt DateTime
  createdAt DateTime @default(now())
}

enum Role {
  admin
  client
}

enum TransactionType {
  deposit
  withdrawal
}

enum OtpType {
  EMAIL_VERIFICATION
  LOGIN_OTP
}
```

---

## 🤝 Contributing

This is a complete, production-ready implementation. For modifications:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

---

## 📝 License

This project is part of the Savings Management System implementation.

---

## 🙏 Acknowledgments

Built with modern best practices and secure coding standards.

### Technologies Used
- Next.js team for the amazing framework
- Prisma team for excellent ORM
- Radix UI for accessible components
- PostgreSQL community

---

## 📞 Support

For detailed setup instructions:
- **Admin App:** See [admin/README.md](admin/README.md)
- **Client App:** See [client/README.md](client/README.md)
- **Quick Start:** See [QUICK_START.md](QUICK_START.md)
- **All Docs:** See `Documentation/` folder

---

## 🎯 Summary

**Two Independent Applications:**
- ✅ Client Application (Frontend: 3000, Backend: 3002)
- ✅ Admin Application (Frontend: 3003, Backend: 3001)

**Shared Database:**
- ✅ PostgreSQL (Port 5432)

**Complete Feature Set:**
- ✅ Secure authentication with OTP
- ✅ Device verification
- ✅ Transaction management
- ✅ Admin dashboard and monitoring
- ✅ Comprehensive security measures

**Extensive Documentation:**
- ✅ 10+ documentation files
- ✅ Setup guides for all services
- ✅ Architecture diagrams
- ✅ Requirements compliance

**Ready for Production! 🚀**

---

**Last Updated:** October 30, 2025  
**Version:** 1.0.0  
**Status:** Production Ready ✅
