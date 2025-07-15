# SubDub - Subscription Tracker

A comprehensive Node.js application for tracking and managing personal subscriptions with automated renewal reminders.

## 🌟 Features

- **User Authentication**: Secure JWT-based authentication with bcrypt password hashing
- **Subscription Management**: Add, view, and track multiple subscriptions
- **Automated Reminders**: Email notifications sent 7, 5, 3, and 1 days before renewal
- **Rate Limiting & Security**: Arcjet middleware for DDoS protection and bot detection
- **Multi-Currency Support**: USD, EUR, GBP, INR, AUD, CAD
- **Flexible Billing Cycles**: Daily, weekly, monthly, and yearly subscriptions
- **Category Organization**: Entertainment, utilities, food, health, education, and more
- **Beautiful Email Templates**: Professional HTML email reminders
- **Background Processing**: Upstash Workflow for reliable reminder scheduling

## 🛠️ Tech Stack

- **Backend**: Node.js with Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JSON Web Tokens (JWT) & bcrypt
- **Email Service**: Nodemailer (Gmail)
- **Security**: Arcjet (rate limiting, bot detection, shield protection)
- **Background Jobs**: Upstash Workflow
- **Environment**: dotenv for configuration management
- **Code Quality**: ESLint
- **Development**: Nodemon for hot reloading

## 📋 Prerequisites

- Node.js (v16 or higher)
- MongoDB database
- Gmail account (for sending emails)
- Arcjet account (for security features)
- Upstash account (for workflow management)

## 🚀 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd subscription-tracker
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   
   Create environment files for different stages:
   
   **For Development** (`.env.development.local`):
   ```env
   # Server Configuration
   PORT=3000
   SERVER_URL='http://localhost:3000'
   NODE_ENV='development'
   
   # Database
   DB_URI="your_mongodb_connection_string"
   
   # JWT Configuration
   JWT_SECRET='your_jwt_secret_here'
   JWT_EXPIRATION='1d'
   
   # Arcjet Security
   ARCJET_KEY='your_arcjet_key'
   ARCJET_ENV='development'
   
   # Upstash Workflow
   QSTASH_URL="http://localhost:8080"
   QSTASH_TOKEN="your_qstash_token"
   
   # Email Configuration (Gmail)
   EMAIL='your_gmail_address'
   EMAIL_PASSWORD='your_gmail_app_password'
   ```
   
   **For Production** (`.env.production.local`):
   ```env
   NODE_ENV='production'
   
   # Upstash Production URLs
   QSTASH_URL="https://qstash.upstash.io"
   QSTASH_TOKEN="your_production_qstash_token"
   QSTASH_CURRENT_SIGNING_KEY="your_current_signing_key"
   QSTASH_NEXT_SIGNING_KEY="your_next_signing_key"
   ```

4. **Start the application**
   
   **Development:**
   ```bash
   npm run dev
   ```
   
   **Production:**
   ```bash
   npm start
   ```

## 📖 API Documentation

### Authentication Endpoints

#### Sign Up
```http
POST /api/v1/auth/sign-up
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword"
}
```

#### Sign In
```http
POST /api/v1/auth/sign-in
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "securepassword"
}
```

#### Sign Out
```http
POST /api/v1/auth/sign-out
```

### User Endpoints

#### Get All Users
```http
GET /api/v1/users
```

#### Get User by ID
```http
GET /api/v1/users/:id
Authorization: Bearer <jwt_token>
```

### Subscription Endpoints

#### Create Subscription
```http
POST /api/v1/subscriptions
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "name": "Netflix",
  "price": 15.99,
  "currency": "USD",
  "frequency": "monthly",
  "category": "entertainment",
  "paymentMethod": "Visa **** 1234",
  "startDate": "2025-01-01T00:00:00.000Z",
  "renewalDate": "2025-02-01T00:00:00.000Z"
}
```

#### Get User Subscriptions
```http
GET /api/v1/subscriptions/user/:userId
Authorization: Bearer <jwt_token>
```

#### Get Upcoming Renewals
```http
GET /api/v1/subscriptions/upcoming-renewals
```

#### Cancel Subscription
```http
PUT /api/v1/subscriptions/:id/cancel
```

### Workflow Endpoints

#### Subscription Reminder Workflow
```http
POST /api/v1/workflows/subscription/reminder
Content-Type: application/json

{
  "subscriptionId": "subscription_object_id"
}
```

## 📊 Data Models

### User Schema
```javascript
{
  name: String (required, 2-50 chars),
  email: String (required, unique, valid email),
  password: String (required, min 6 chars, hashed),
  timestamps: true
}
```

### Subscription Schema
```javascript
{
  name: String (required, 2-100 chars),
  price: Number (required, > 0),
  currency: Enum ['USD', 'EUR', 'GBP', 'INR', 'AUD', 'CAD'],
  frequency: Enum ['daily', 'weekly', 'monthly', 'yearly'],
  category: Enum ['entertainment', 'utilities', 'food', 'health', 'education', 'other'],
  paymentMethod: String (required),
  status: Enum ['active', 'inactive', 'expired'],
  startDate: Date (required, <= today),
  renewalDate: Date (required, > startDate),
  user: ObjectId (required, ref: 'User'),
  timestamps: true
}
```

## 🔧 Configuration

### Security Features (Arcjet)
- **Rate Limiting**: 5 requests per 10 seconds per IP
- **Bot Detection**: Blocks malicious bots, allows search engines
- **Shield Protection**: SQL injection and common attack prevention

### Email Templates
The application includes 4 pre-configured email templates:
- 7 days before renewal
- 5 days before renewal
- 3 days before renewal (changed from 2 days in workflow)
- 1 day before renewal

### Workflow System
Uses Upstash Workflow for reliable background job processing:
- Automatically schedules reminders when subscriptions are created
- Handles retries and failure recovery
- Sleeps until reminder dates to minimize resource usage

## 🗂️ Project Structure

```
subscription-tracker/
├── app.js                          # Main application entry point
├── package.json                    # Dependencies and scripts
├── eslint.config.js               # ESLint configuration
├── config/
│   ├── env.js                     # Environment variables
│   ├── arcjet.js                  # Security configuration
│   ├── nodemailer.js              # Email service setup
│   └── upstash.js                 # Workflow client
├── controllers/
│   ├── auth.controller.js         # Authentication logic
│   ├── user.controller.js         # User management
│   ├── subscription.controller.js # Subscription CRUD
│   └── workflow.controller.js     # Background job handlers
├── database/
│   └── mongodb.js                 # Database connection
├── middlwares/
│   ├── auth.middleware.js         # JWT validation
│   ├── arcjet.middleware.js       # Security middleware
│   └── error.middleware.js        # Global error handling
├── models/
│   ├── user.model.js              # User schema
│   └── subscription.model.js      # Subscription schema
├── routes/
│   ├── auth.routes.js             # Authentication routes
│   ├── user.routes.js             # User routes
│   ├── subscription.routes.js     # Subscription routes
│   └── workflow.routes.js         # Workflow routes
└── utils/
    ├── email-template.js          # HTML email templates
    └── send-email.js              # Email sending utilities
```

## 🧪 Development

### Code Quality
- **ESLint**: Configured for Node.js environment
- **Error Handling**: Centralized error middleware
- **Validation**: Mongoose schema validation
- **Security**: JWT tokens, bcrypt hashing, rate limiting

### Development Scripts
```bash
npm run dev     # Start with nodemon (hot reload)
npm start       # Start production server
```

## 🔐 Security Considerations

1. **Password Security**: Bcrypt with salt rounds
2. **JWT Tokens**: Secure token-based authentication
3. **Rate Limiting**: Prevents brute force attacks
4. **Input Validation**: Mongoose schema validation
5. **Environment Variables**: Sensitive data in .env files
6. **CORS Protection**: Arcjet middleware
7. **Bot Detection**: Automated bot filtering

## 📧 Email Configuration

The application uses Gmail for sending emails. To set up:

1. Enable 2-factor authentication on your Gmail account
2. Generate an App Password for the application
3. Use the App Password in `EMAIL_PASSWORD` environment variable
4. Set your Gmail address in `EMAIL` environment variable

## 🚨 Troubleshooting

### Common Issues

1. **Database Connection Fails**
   - Verify MongoDB URI in environment variables
   - Check network connectivity
   - Ensure database user has proper permissions

2. **Email Sending Fails**
   - Verify Gmail App Password is correct
   - Check if 2FA is enabled on Gmail account
   - Ensure EMAIL and EMAIL_PASSWORD are set

3. **JWT Token Issues**
   - Verify JWT_SECRET is set and consistent
   - Check token expiration settings
   - Ensure proper Authorization header format

4. **Workflow Not Triggering**
   - Verify Upstash credentials
   - Check QSTASH_URL and QSTASH_TOKEN
   - Ensure SERVER_URL is accessible

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📄 License

This project is private and proprietary.

## 📞 Support

For support and questions, please contact the development team or create an issue in the repository.

---

**SubDub** - Making subscription management simple and reliable.
