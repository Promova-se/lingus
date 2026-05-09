# LINGUS Setup Guide

## Prerequisites

- Node.js 16+ ([Download](https://nodejs.org/))
- npm or yarn
- MongoDB ([Community Server](https://www.mongodb.com/try/download/community) or [MongoDB Atlas](https://www.mongodb.com/cloud/atlas))
- Git

## Project Structure

```
app/
├── frontend/          # React application
├── backend/           # Node.js/Express API
└── docs/             # Documentation
```

## Frontend Setup

### Installation

```bash
cd frontend
npm install
```

### Configuration

Create a `.env.local` file in the `frontend` directory:

```env
VITE_API_URL=http://localhost:5000/api
VITE_APP_NAME=LINGUS
```

### Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

### Build for Production

```bash
npm run build
```

Output files will be in the `dist` directory.

---

## Backend Setup

### Installation

```bash
cd backend
npm install
```

### Configuration

1. Copy the environment template:
```bash
cp .env.example .env
```

2. Edit `.env` with your configuration:

```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/lingus
JWT_SECRET=your_super_secret_key_change_in_production
STRIPE_SECRET_KEY=sk_test_your_key
STRIPE_PUBLIC_KEY=pk_test_your_key
FRONTEND_URL=http://localhost:3000
```

### Database Setup

#### Option 1: Local MongoDB

```bash
# Install MongoDB Community Edition
# Start MongoDB service
mongod

# In another terminal, verify connection:
mongo
```

#### Option 2: MongoDB Atlas (Cloud)

1. Create account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a cluster
3. Get connection string (looks like):
   ```
   mongodb+srv://username:password@cluster.mongodb.net/lingus
   ```
4. Add to `.env`:
   ```env
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/lingus
   ```

### Development Server

```bash
# Using nodemon (watches for changes)
npm run dev

# Or start normally
npm start
```

Server will run on `http://localhost:5000`

### Testing

```bash
npm test
npm run test:watch
```

---

## Full Stack Setup (Both Frontend & Backend)

### Quick Start

```bash
# Terminal 1 - Backend
cd app/backend
npm install
cp .env.example .env
npm run dev

# Terminal 2 - Frontend
cd app/frontend
npm install
npm run dev
```

Then visit `http://localhost:3000`

---

## Environment Variables

### Backend (.env)

| Variable | Description | Example |
|----------|-------------|---------|
| `NODE_ENV` | Environment mode | `development` or `production` |
| `PORT` | Server port | `5000` |
| `MONGODB_URI` | Database connection | `mongodb://localhost:27017/lingus` |
| `JWT_SECRET` | JWT signing key | Any secure string |
| `JWT_EXPIRE` | Token expiration | `7d` |
| `STRIPE_SECRET_KEY` | Stripe secret key | From Stripe dashboard |
| `STRIPE_PUBLIC_KEY` | Stripe public key | From Stripe dashboard |
| `FRONTEND_URL` | Frontend URL | `http://localhost:3000` |

### Frontend (.env.local)

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_API_URL` | API base URL | `http://localhost:5000/api` |
| `VITE_APP_NAME` | App name | `LINGUS` |

---

## Stripe Setup

1. Create account at [Stripe](https://stripe.com)
2. Go to Developers → API keys
3. Copy Secret Key and Publishable Key
4. Add to backend `.env`
5. (Optional) Set up Stripe CLI for webhook testing

---

## Database Migration

When schema changes, you can reset the database:

```bash
# In MongoDB shell
use lingus
db.dropDatabase()

# Or create initial indexes (after adding routes):
# See DATABASE.md for index creation scripts
```

---

## Common Issues

### MongoDB Connection Error
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```
**Solution:** Make sure MongoDB is running
```bash
mongod
```

### Port Already in Use
```
Error: listen EADDRINUSE: address already in use :::5000
```
**Solution:** Kill the process using the port
```bash
# macOS/Linux
lsof -ti :5000 | xargs kill -9

# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

### CORS Error
**Solution:** Make sure `FRONTEND_URL` is set correctly in backend `.env`

### JWT Token Invalid
**Solution:** Make sure `JWT_SECRET` is the same in backend `.env`

---

## Production Deployment

### Frontend
1. Build the app: `npm run build`
2. Deploy `dist/` folder to:
   - Vercel
   - Netlify
   - AWS S3 + CloudFront
   - Any static hosting

### Backend
1. Set `NODE_ENV=production`
2. Use production database URI
3. Deploy to:
   - Heroku
   - AWS EC2
   - DigitalOcean
   - Railway
   - Render

---

## Documentation

- [API Documentation](./API.md)
- [Database Schema](./DATABASE.md)
- [Contributing Guidelines](./CONTRIBUTING.md) (coming soon)

---

## Support

For issues and questions:
1. Check existing issues on GitHub
2. Create a new issue with detailed information
3. Contact the team

## License

MIT License
