# Savings Management System - Complete Setup Guide

## Quick Start

This guide will help you set up and run the complete Savings Management System in under 10 minutes.

---

## Prerequisites

Ensure you have the following installed:
- **Node.js** v18 or higher ([Download](https://nodejs.org/))
- **PostgreSQL** v12 or higher ([Download](https://www.postgresql.org/download/))
- **Git** ([Download](https://git-scm.com/downloads))
- **npm** (comes with Node.js)

---

## Step 1: Database Setup

### Create Database

```bash
# Start PostgreSQL service
# On Windows: Start from Services or pgAdmin
# On Mac: brew services start postgresql
# On Linux: sudo systemctl start postgresql

# Create database
createdb sms_db

# Or using psql:
psql -U postgres
CREATE DATABASE sms_db;
\q
```

---

## Step 2: Backend Setup

### Option A: Unified Backend (Recommended for Development)

```bash
cd backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Edit .env and update:
# - DATABASE_URL with your PostgreSQL credentials
# - JWT_SECRET with a secure random string (min 32 chars)
# - SMTP settings for email (or leave blank for dev)

# Generate Prisma client
npx prisma generate

# Push schema to database
npx prisma db push

# Seed database with sample data
npm run db:seed

# Start backend server
npm run dev
```

**Backend will run at:** `http://localhost:3001`

### Option B: Separate Admin & Client Backends

#### Admin Backend (Port 3001)

```bash
cd admin/backend
npm install
cp .env.example .env
# Edit .env with your settings
npx prisma generate
npx prisma db push
npm run db:seed
npm run dev
```

#### Client Backend (Port 3002)

```bash
cd client/backend
npm install
cp .env.example .env
# Edit .env with your settings
npx prisma generate
npm run dev
```

---

## Step 3: Frontend Setup

### Option A: Unified Frontend

```bash
cd frontend

# Install dependencies
npm install

# Create environment file
cp .env.local.example .env.local

# Start frontend
npm run dev
```

**Frontend will run at:** `http://localhost:3000`

### Option B: Separate Admin & Client Frontends

#### Admin Frontend (Port 3003)

```bash
cd admin/frontend
npm install
cp .env.local.example .env.local
npm run dev
```

#### Client Frontend (Port 3000)

```bash
cd client/frontend
npm install
cp .env.local.example .env.local
npm run dev
```

---

## Step 4: Mobile App Setup (Optional)

```bash
cd mobile

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Edit .env with your API URL:
# - Android Emulator: API_URL=http://10.0.2.2:3002
# - iOS Simulator: API_URL=http://localhost:3002
# - Physical Device: API_URL=http://YOUR_COMPUTER_IP:3002

# Start Expo
npm start

# Scan QR code with Expo Go app
# Or press 'a' for Android emulator
# Or press 'i' for iOS simulator
```

---

## Step 5: Access the Applications

### Web Applications

| Application | URL | Default Credentials |
|-------------|-----|---------------------|
| **Admin Portal** | http://localhost:3003 | admin@example.com / admin123 |
| **Client Portal** | http://localhost:3000 | Register new account |
| **Unified Portal** | http://localhost:3000 | Both admin and client access |
| **API Documentation** | http://localhost:3001/api-docs | N/A |
| **Health Check** | http://localhost:3001/health | N/A |

### Mobile App

- Install **Expo Go** from App Store (iOS) or Play Store (Android)
- Scan the QR code from the terminal
- Login with registered credentials

---

## Default Test Accounts

After running `npm run db:seed`, you'll have:

### Admin Account
```
Email: admin@example.com
Password: admin123
```

### Sample Client Accounts
```
Client 1 (Verified):
Email: client1@example.com
Password: client123

Client 2 (Pending):
Email: client2@example.com
Password: client456
```

---

## Environment Variables Reference

### Backend (.env)

```env
# Server
PORT=3001
NODE_ENV=development

# Database
DATABASE_URL="postgresql://username:password@localhost:5432/sms_db?schema=public"

# JWT
JWT_SECRET="your-super-secret-jwt-key-min-32-chars"
JWT_EXPIRES_IN="24h"

# Email (Optional in development)
SMTP_HOST="smtp.gmail.com"
SMTP_PORT=587
SMTP_USER="your-email@gmail.com"
SMTP_PASS="your-app-specific-password"
EMAIL_FROM="noreply@example.com"

# CORS
CORS_ORIGIN="http://localhost:3000,http://localhost:3003"
```

### Frontend (.env.local)

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_APP_NAME="Savings Management System"
```

### Mobile (.env)

```env
API_URL=http://10.0.2.2:3002  # For Android Emulator
APP_NAME="Savings Management"
```

---

## Troubleshooting

### Port Already in Use

```bash
# Windows
netstat -ano | findstr :3001
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:3001 | xargs kill -9
```

### Database Connection Failed

```bash
# Check PostgreSQL is running
pg_isready

# Verify database exists
psql -U postgres -l

# Create database if missing
createdb sms_db
```

### Cannot Send Emails

- **Development**: Emails will be simulated in console
- **Production**: 
  - Enable 2FA on Gmail
  - Create app-specific password
  - Use app password in SMTP_PASS

### OTP Not Working

- Check email (including spam folder)
- OTP expires in 10 minutes
- Use "Resend OTP" button
- In development, OTP is printed in console

---

## Testing

### Run Backend Tests

```bash
cd backend
npm test

# Watch mode
npm run test:watch
```

### API Testing

1. Import `postman_collection.json` into Postman
2. Set `baseUrl` variable to `http://localhost:3001`
3. Run requests in order (Register → Login → Other endpoints)

---

## Development Workflow

### Recommended Terminal Setup

```
Terminal 1: Backend (npm run dev)
Terminal 2: Frontend (npm run dev)
Terminal 3: Mobile (npm start) - optional
Terminal 4: Database logs / tests
```

### Making Changes

1. Backend changes: Auto-reload with `ts-node-dev`
2. Frontend changes: Auto-reload with Next.js hot reload
3. Database changes: Run `npx prisma db push`
4. After schema changes: Run `npx prisma generate`

---

## Production Deployment Checklist

- [ ] Update `JWT_SECRET` to strong random value
- [ ] Set `NODE_ENV=production`
- [ ] Configure real SMTP server
- [ ] Update CORS origins to production domains
- [ ] Enable HTTPS
- [ ] Set up database backups
- [ ] Configure monitoring (Sentry, etc.)
- [ ] Review and update rate limits
- [ ] Remove development endpoints
- [ ] Use environment-specific configs

---

## Project Architecture

```
savings-management-system-main/
├── backend/              # Unified backend (Port 3001)
├── frontend/             # Unified frontend (Port 3000)
├── admin/
│   ├── backend/          # Admin-only backend (Port 3001)
│   └── frontend/         # Admin-only frontend (Port 3003)
├── client/
│   ├── backend/          # Client-only backend (Port 3002)
│   └── frontend/         # Client-only frontend (Port 3000)
├── mobile/               # React Native mobile app
├── .github/              # CI/CD workflows
└── postman_collection.json  # API documentation
```

---

## Key Features

### Security
- ✅ SHA-512 password hashing (PBKDF2, 100K iterations)
- ✅ JWT authentication with session management
- ✅ Rate limiting on all endpoints
- ✅ Device ID verification by admin
- ✅ OTP-based two-factor authentication
- ✅ Input validation and sanitization
- ✅ Secure HTTP headers (Helmet.js)

### Admin Features
- ✅ Customer verification workflow
- ✅ Transaction monitoring
- ✅ Dashboard analytics
- ✅ User management
- ✅ OTP generation

### Client Features
- ✅ Registration and login
- ✅ Deposit and withdrawal
- ✅ Transaction history
- ✅ Balance tracking
- ✅ Low balance alerts
- ✅ Profile management

### Mobile Features
- ✅ All client features
- ✅ Push notifications
- ✅ Offline handling
- ✅ Secure storage

---

## Support

For issues or questions:
1. Check this guide first
2. Review README.md files in each directory
3. Check API documentation at `/api-docs`
4. Review console logs for errors

---

## License

MIT License - See LICENSE file for details

---

**Last Updated:** October 30, 2025  
**Version:** 1.0.0  
**Status:** Production Ready ✅

