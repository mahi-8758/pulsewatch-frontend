# ⚡ PulseWatch

### AWS-Powered Website & API Uptime Monitoring Platform

PulseWatch is a cloud-based uptime monitoring platform that allows users to monitor websites and APIs, track availability and response times, view incidents, and receive email alerts when monitored services go down or recover.

Built with **React** and **Amazon Web Services (AWS)**.

---

## 🎥 Demo

### ▶️ Project Demo

[Watch the PulseWatch Demo on YouTube](https://www.youtube.com/watch?v=lCfbnnLQq3o)

### 🌐 Live Application

[Open PulseWatch](http://pulsewatch-frontend-685394474879.s3-website.ap-south-1.amazonaws.com/)

---

## ✨ Features

- 🔐 User registration and login
- 📧 Email verification with OTP
- 🛡️ Protected dashboard
- 🌐 Add and manage website/API monitors
- ⚡ Instant **Check Now** functionality
- 🟢 UP / 🔴 DOWN status detection
- 📊 Response time tracking
- 📈 Monitoring history
- 🚨 Incident tracking
- 📩 Email alerts using Amazon SNS
- 🗑️ Delete monitors
- ⏱️ Automatic monitoring every 5 minutes
- ☁️ Serverless AWS architecture

---

## 🏗️ AWS Architecture

<p align="center">
  <img
    src="https://github.com/mahi-8758/pulsewatch-frontend/blob/main/aws%20architecture%20diagram.jpg"
    alt="PulseWatch AWS Architecture"
    width="1000"
  />
</p>

<p align="center">
  <i>High-level AWS architecture of the PulseWatch monitoring platform.</i>
</p>

---

## ☁️ AWS Services

| AWS Service | Purpose |
|---|---|
| **Amazon S3** | Hosts the React frontend |
| **Amazon Cognito** | User authentication and JWT tokens |
| **Amazon API Gateway** | REST API |
| **AWS Lambda** | API operations and uptime checks |
| **Amazon DynamoDB** | Stores monitors, results, and incidents |
| **Amazon EventBridge** | Triggers automatic checks every 5 minutes |
| **Amazon SNS** | Sends email notifications |
| **Amazon CloudWatch** | Monitoring and error alarms |

---

## 🛠️ Technology Stack

### Frontend
- React
- Vite
- React Router
- JavaScript
- Amazon Cognito Identity SDK

### Backend
- Node.js
- AWS Lambda
- API Gateway
- DynamoDB

### Cloud
- Amazon S3
- Amazon Cognito
- Amazon EventBridge
- Amazon SNS
- Amazon CloudWatch

---

## 📁 Project Structure

```text
pulsewatch-frontend/
│
├── public/
│
├── src/
│   ├── components/
│   ├── pages/
│   ├── services/
│   ├── App.jsx
│   └── main.jsx
│
├── .env.example
├── .gitignore
├── index.html
├── package.json
├── package-lock.json
└── vite.config.js
```

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/mahi-8758/pulsewatch-frontend.git
cd pulsewatch-frontend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env.local` file:

```env
VITE_API_BASE_URL=YOUR_API_GATEWAY_URL
VITE_COGNITO_USER_POOL_ID=YOUR_COGNITO_USER_POOL_ID
VITE_COGNITO_CLIENT_ID=YOUR_COGNITO_CLIENT_ID
VITE_AWS_REGION=YOUR_AWS_REGION
```

> ⚠️ Never commit `.env.local`, passwords, tokens, or other secrets to GitHub.

### 4. Start the development server

```bash
npm run dev
```

The application will be available at:

```text
http://localhost:5173
```

---

## 📦 Production Build

Create a production build:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

Run linting:

```bash
npm run lint
```

---

## 🔐 Authentication Flow

PulseWatch uses **Amazon Cognito** for secure user authentication.

```text
User
 │
 ├── Sign Up
 │
 ▼
Amazon Cognito
 │
 ├── Email OTP Verification
 │
 ▼
Login
 │
 ▼
JWT ID Token
 │
 ▼
Protected Dashboard
 │
 ▼
Authenticated API Requests
```

---

## 📡 Monitoring Flow

PulseWatch automatically checks monitored websites and APIs every 5 minutes.

```text
Amazon EventBridge
        │
        │ Every 5 minutes
        ▼
Checker Lambda
        │
        ├── Check URL
        ├── Measure response time
        └── Determine UP / DOWN
                │
                ▼
           DynamoDB
          /         \
 CheckResults     Incidents
                    │
                    ▼
               Amazon SNS
                    │
                    ▼
              Email Alert
```

### Status Changes

```text
UP → DOWN    🚨 Downtime Alert

DOWN → UP    ✅ Recovery Alert
```

---

## ⚡ Instant Check

Users can manually check a monitor using the **Check Now** feature.

```text
User
 │
 ▼
Check Now
 │
 ▼
API Gateway
 │
 ▼
API Lambda
 │
 ▼
Target URL
 │
 ▼
Check Result
 │
 ▼
Dashboard
```

The result includes the monitor status, HTTP status code, response time, and check time.

---

## 🔌 API Integration

The frontend communicates with the backend through Amazon API Gateway.

| Method | Endpoint | Purpose |
|---|---|---|
| `POST` | `/targets` | Add a monitor |
| `GET` | `/targets` | Get monitors |
| `DELETE` | `/targets/{targetId}` | Delete a monitor |
| `POST` | `/targets/{targetId}/check` | Run an instant check |
| `GET` | `/history/{targetId}` | Get monitoring history |
| `GET` | `/incidents/{targetId}` | Get incidents |

Protected endpoints require a valid Cognito authentication token.

---

## 🗄️ Data Storage

PulseWatch uses Amazon DynamoDB to store monitoring data.

### MonitorTargets

Stores monitored websites and APIs.

```text
Target ID
Owner ID
Label
URL
Current Status
Created At
```

### CheckResults

Stores individual monitoring results.

```text
Target ID
Status
HTTP Status Code
Response Time
Checked At
```

### Incidents

Stores downtime and recovery events.

```text
Target ID
Incident Type
Status
Started At
Resolved At
```

---

## 🧩 Related Repositories

### 🎨 Frontend

[PulseWatch Frontend](https://github.com/mahi-8758/pulsewatch-frontend)

React + Vite frontend application.

### ⚙️ Backend

[PulseWatch Backend](https://github.com/mahi-8758/pulsewatch-backend)

Backend and AWS Lambda API components.

### ☁️ Infrastructure

[PulseWatch Infrastructure](https://github.com/mahi-8758/pulsewatch-infrastructure)

AWS infrastructure configuration and deployment scripts.

---

## 🌐 Deployment

The React frontend is built using Vite and hosted on Amazon S3.

Build the application:

```bash
npm run build
```

Upload the production build:

```bash
aws s3 sync dist/ s3://YOUR_BUCKET_NAME --delete
```

---

## 🔒 Security

PulseWatch follows basic cloud security practices:

- Authentication using Amazon Cognito
- JWT-based authorization
- Protected API endpoints
- User ownership validation
- IAM permissions for AWS resources
- Environment variables for configuration
- Secrets excluded from Git

> Never commit AWS credentials, passwords, access tokens, refresh tokens, or private environment files.

---

## 🎯 Project Goals

PulseWatch was built to demonstrate practical implementation of:

- React frontend development
- REST API integration
- User authentication
- Serverless AWS architecture
- Website uptime monitoring
- NoSQL database design
- Event-driven architecture
- Automated health checks
- Email notification systems
- AWS deployment

---

## 🚀 Future Improvements

- 📊 Advanced monitoring analytics
- 📈 Uptime percentage reports
- 🌍 Multi-region monitoring
- 🔔 Additional notification channels
- ☁️ CloudFront + HTTPS
- 🤖 CI/CD automation
- 📱 Further responsive UI improvements
- ⏱️ Custom monitoring intervals

---

## 👨‍💻 Author

**Mahi Kumar**

GitHub: [@mahi-8758](https://github.com/mahi-8758)

---

## ⭐ Project

If you find PulseWatch useful, consider giving the repository a ⭐ on GitHub.

---
