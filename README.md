# Internet Billing System - SaaS Platform

A comprehensive multi-tenant SaaS-based Internet Billing System built with ReactJS (frontend) and Node.js + Express.js (backend) with MySQL database.

## 🎯 Features

- **Multi-tenant Architecture**: Each ISP has its own isolated data and customers
- **Role-Based Access Control**: 6 different user roles with specific permissions
- **Customer Management**: Complete customer lifecycle management
- **Automated Billing**: Auto-generate bills based on subscription plans
- **Payment Processing**: Support for multiple payment methods including Stripe
- **Invoice Generation**: PDF invoice generation and download
- **Recovery Management**: Track bill recovery by recovery officers
- **Analytics & Reports**: Dashboard with charts and detailed reports
- **Email/SMS Notifications**: Automated notifications for bill due dates

## 👥 User Roles

1. **Super Admin** - Full system access, manages all ISPs
2. **Admin (ISP Owner)** - Manages their ISP branch, customers, packages, and staff
3. **Account Manager** - Handles customer accounts, generates invoices, verifies payments
4. **Technical Officer** - Manages internet connections, installations, and disconnections
5. **Recovery Officer** - Visits customers for bill recovery, updates payment status
6. **Customer/User** - Views bills, downloads invoices, makes online payments

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- MySQL (v8.0 or higher)
- npm or yarn

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file (copy from `.env.example`):
```bash
cp .env.example .env
```

4. Update `.env` with your database credentials:
```env
PORT=5000
NODE_ENV=development
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=internet_billing_db
JWT_SECRET=your_super_secret_jwt_key
JWT_EXPIRE=7d
FRONTEND_URL=http://localhost:3000
```

5. Create MySQL database:
```sql
CREATE DATABASE internet_billing_db;
```

6. Start the backend server:
```bash
npm start
# or for development
npm run dev
```

The backend will automatically:
- Create database tables
- Create a default super admin user:
  - Email: `admin@billing.com`
  - Password: `admin123`

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The frontend will be available at `http://localhost:3000`

## 📁 Project Structure

### Backend
```
backend/
├── config/          # Database configuration
├── controllers/     # Route controllers
├── middlewares/     # Authentication & authorization
├── models/          # Sequelize models
├── routes/          # API routes
├── utils/           # Utility functions
├── server.js        # Entry point
└── package.json
```

### Frontend
```
frontend/
├── public/          # Static files
├── src/
│   ├── api/         # API client
│   ├── components/  # Reusable components
│   ├── context/     # React Context (Auth)
│   ├── pages/       # Page components
│   ├── utils/       # Helper functions
│   ├── App.jsx      # Main app component
│   └── main.jsx     # Entry point
└── package.json
```

## 🔐 Authentication

The system uses JWT (JSON Web Tokens) for authentication. Tokens are stored in localStorage and automatically included in API requests.

### Default Login Credentials

- **Email**: `admin@billing.com`
- **Password**: `admin123`
- **Role**: Super Admin

## 📊 Database Schema

### Main Tables

- **users** - System users (admins, officers, etc.)
- **isps** - Internet Service Providers (tenants)
- **customers** - ISP customers
- **packages** - Internet packages
- **bills** - Customer bills
- **payments** - Payment records
- **recoveries** - Bill recovery records

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Customers
- `GET /api/customers` - Get all customers
- `GET /api/customers/:id` - Get single customer
- `POST /api/customers` - Create customer
- `PUT /api/customers/:id` - Update customer
- `DELETE /api/customers/:id` - Delete customer

### Billing
- `GET /api/bills` - Get all bills
- `GET /api/bills/:id` - Get single bill
- `POST /api/bills` - Create bill
- `POST /api/bills/auto-generate` - Auto-generate bills
- `GET /api/bills/:id/invoice` - Download invoice PDF

### Payments
- `GET /api/payments` - Get all payments
- `POST /api/payments` - Record payment
- `POST /api/payments/online` - Process online payment
- `GET /api/payments/stats` - Get payment statistics

### Reports
- `GET /api/reports/dashboard` - Get dashboard statistics
- `GET /api/reports/revenue` - Get revenue report
- `GET /api/reports/customers` - Get customer report
- `GET /api/reports/bills` - Get bill report

## 🛠️ Technologies Used

### Backend
- Node.js
- Express.js
- Sequelize ORM
- MySQL
- JWT (jsonwebtoken)
- Bcrypt
- PDFKit (for invoice generation)
- Nodemailer (for email notifications)
- Stripe (for payment processing)

### Frontend
- React 18
- React Router DOM
- Axios
- TailwindCSS
- Recharts (for charts)
- Vite (build tool)

## 📝 Environment Variables

### Backend (.env)
```env
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=internet_billing_db
JWT_SECRET=your_secret_key
JWT_EXPIRE=7d
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
STRIPE_SECRET_KEY=sk_test_your_key
FRONTEND_URL=http://localhost:3000
```

## 🔒 Security Features

- Password hashing with bcrypt
- JWT token-based authentication
- Role-based access control (RBAC)
- Multi-tenant data isolation
- Input validation and sanitization
- CORS configuration

## 📧 Email & SMS Notifications

The system supports email and SMS notifications for:
- New bill generation
- Bill due date reminders
- Payment confirmations

Configure email and SMS settings in `.env` file.

## 💳 Payment Integration

Currently supports:
- Cash payments
- Card payments
- Online payments (Stripe)
- Bank transfers
- JazzCash
- EasyPaisa

## 🚧 Future Enhancements

- [ ] Real-time notifications
- [ ] Mobile app (React Native)
- [ ] Advanced analytics
- [ ] Multi-currency support
- [ ] Automated recurring billing
- [ ] Customer portal enhancements
- [ ] API documentation (Swagger)
- [ ] Unit and integration tests

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

For support, email support@billing.com or create an issue in the repository.

---

**Built with ❤️ for Internet Service Providers**

