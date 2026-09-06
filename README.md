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