# Health Claim Management System

A full-stack health insurance claim platform for submitting, reviewing, verifying, approving, and tracking medical claims. The system provides separate dashboards for patients, third-party administrators (TPAs), and insurance teams, plus a rule-based fraud analysis view.

## Features

- Patient registration and login with JWT-based session data
- Role-aware dashboards for:
  - **Patients:** submit claims, upload certificates, and view claim history
  - **TPAs:** review pending claims, verify or reject claims, and view statistics
  - **Insurance teams:** approve or reject verified claims and simulate payment release
- Claim certificate uploads stored by the backend
- Claim status and payment tracking
- Rule-based fraud risk analysis based on:
  - High claim amount
  - Multiple claims by the same patient
  - Duplicate certificate files
  - Flagged hospital names
- MongoDB persistence through Mongoose

## Technology Stack

### Frontend

- React 19
- React Router
- Axios
- Framer Motion
- Create React App

### Backend

- Node.js with Express 5
- MongoDB with Mongoose
- JWT and bcryptjs for authentication
- Multer for certificate uploads
- Nodemon for development

## Project Structure

```text
health_claim_system/
├── backend/
│   ├── config/          # Database connection
│   ├── controllers/     # Authentication and claim controllers
│   ├── middleware/      # Backend middleware
│   ├── models/          # User and claim schemas
│   ├── routes/          # REST API routes
│   ├── uploads/         # Uploaded claim certificates
│   ├── utils/           # Fraud analysis rules
│   ├── .env             # Local backend configuration
│   ├── package.json
│   └── server.js
└── frontend/
    ├── public/
    ├── src/
    │   ├── components/
    │   ├── context/
    │   ├── pages/
    │   └── App.js
    └── package.json
```

## Prerequisites

- Node.js 18 or later
- npm
- MongoDB running locally or a MongoDB connection string

## Installation

Clone the repository and install dependencies for both applications:

```bash
git clone <repository-url>
cd health_claim_system

cd backend
npm install

cd ../frontend
npm install
```

## Configuration

Create or update `backend/.env`:

```env
MONGO_URI=mongodb://127.0.0.1:27017/insuranceDB
PORT=5000
JWT_SECRET=replace-with-a-long-random-secret
```

Do not use a real production secret in source control. Keep environment files private and use deployment-platform secrets in hosted environments.

## Running the Application

Start the backend in one terminal:

```bash
cd backend
npm start
```

The API runs at [http://localhost:5000](http://localhost:5000).

Start the frontend in a second terminal:

```bash
cd frontend
npm start
```

The web application runs at [http://localhost:3000](http://localhost:3000).

The frontend currently uses `http://localhost:5000` directly for API and uploaded-file URLs, so the backend should be running on port `5000` during local development.

## User Workflow

1. Register as a patient, TPA, or insurance user.
2. Log in to open the dashboard for the selected role.
3. A patient submits a claim with hospital, treatment, amount, and certificate details.
4. A TPA reviews pending claims and marks them `Verified` or `Rejected`.
5. The insurance team reviews verified claims and marks them `Approved` or `Rejected`.
6. An approved claim can be final-approved, which simulates payment and records a transaction ID.
7. The fraud dashboard calculates a risk score and reasons for each claim.

## API Overview

The backend exposes the following routes:

| Method | Endpoint | Purpose |
| --- | --- | --- |
| `POST` | `/api/auth/register` | Register a user |
| `POST` | `/api/auth/login` | Authenticate a user |
| `POST` | `/api/patient/claim` | Submit a claim with `certificateFile` upload |
| `GET` | `/api/patient/claims/:patientId` | Fetch a patient's claims |
| `GET` | `/api/tpa/claims` | Fetch pending claims |
| `PUT` | `/api/tpa/claim/:id` | Verify or reject a claim |
| `GET` | `/api/insurance/claims` | Fetch verified or approved claims |
| `PUT` | `/api/insurance/claim/:id` | Approve or reject a claim |
| `PUT` | `/api/insurance/final-approve/:id` | Finalize approval and simulate payment |
| `GET` | `/api/stats` | Fetch claim counts by status |
| `GET` | `/api/fraud/analyze` | Analyze all claims for fraud risk |
| `GET` | `/uploads/:filename` | Serve an uploaded certificate |
| `GET` | `/` | Check that the API is running |

### Example registration request

```json
{
  "name": "Example User",
  "email": "user@example.com",
  "password": "change-me",
  "role": "patient"
}
```

Valid roles are `patient`, `tpa`, and `insurance`.

### Claim upload fields

The `POST /api/patient/claim` endpoint expects multipart form data with:

- `patientId`
- `hospitalName`
- `treatmentType`
- `amount`
- `certificateFile`

## Claim and Payment Statuses

Claims may use the following statuses:

- `Pending`
- `Verified`
- `Rejected`
- `Approved`
- `FinalApproved`

Payment tracking supports:

- `Not Initiated`
- `Processing`
- `Paid`
- `Failed`

Final approval currently simulates payment by setting the payment status to `Paid` and generating a transaction ID. It does not connect to a payment provider.

## Development Notes

- The backend currently exposes several claim-management endpoints without server-side role authorization middleware. The frontend protects dashboard routes, but production deployments should enforce authentication and role checks in the API as well.
- Uploaded files are served from the public `/uploads` route. Add file type, size, naming, and access controls before using this system with sensitive medical documents.
- The fraud analyzer is a deterministic rules engine, not a machine-learning model.
- The backend package currently has no automated test suite configured.

## Production Checklist

- Use strong, rotated secrets and environment-specific configuration.
- Add server-side JWT verification and role-based authorization to protected routes.
- Validate request bodies, file types, file sizes, and ownership of `patientId`.
- Store uploads outside the public web root or protect them with authorization.
- Add audit logging for claim decisions and payment actions.
- Configure frontend API URLs through environment variables instead of hard-coded localhost URLs.
- Add automated API and frontend tests.

## License

This project does not currently declare a production license.
