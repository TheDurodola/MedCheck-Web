# MedCheck Web Client

> **Anti-Counterfeit Pharmaceutical Network & Verification Platform**

MedCheck is a cryptographically secured pharmaceutical authentication platform designed to safeguard the drug supply chain and eliminate counterfeit medications. The platform unifies pharmaceutical manufacturers, wholesale distribution depots, retail pharmacies, regulatory authorities, and everyday consumers into a tamper-evident verification ledger.

---

## Ecosystem & Repositories

MedCheck operates as a unified multi-platform ecosystem across backend, mobile, and web:

| Platform | Repository | Stack | Description |
|---|---|---|---|
| **Backend API** | [**MedCheck-Server**](https://github.com/TheDurodola/MedCheck-Server) | Spring Boot 3, Java, Security, PostgreSQL | Core verification engine, JWT authentication, and cryptographic batch ledger |
| **Mobile App** | [**MedCheck-Mobile**](https://github.com/TheDurodola/Medify-Mobile) | Flutter, Dart, Clean Architecture & BLoC | Native mobile scanner for on-the-go patient and inspector drug authentication |


---

## Key Highlights

- **Multi-Level Verification (PUT Requests)**: Authenticate medications at three distinct hierarchy levels:
  - **Pack Verification** (`PUT /api/v1/verification/pack/{code}`) — For retail medicine boxes and customer packs.
  - **Sachet Verification** (`PUT /api/v1/verification/sachet/{code}`) — For individual blister foils and strip units.
  - **Batch Verification** (`PUT /api/v1/verification/batch/{code}`) — Restricted to authorized supply-chain nodes.
- **Strict Role-Based Access Control (RBAC)**:
  - **Batch Verification** is exclusively restricted to authorized roles: `INVESTIGATOR`, `MANUFACTURER_EMPLOYEE`, `RETAIL_EMPLOYEE`, and `WHOLESALE_EMPLOYEE`.
  - Consumers and unauthenticated users only see Pack and Sachet options; Batch is completely excluded from their interface.
- **Guarded Dashboard Console**:
  - All dashboards (`/dashboard/*`) are protected by [`ProtectedRoute`](src/features/authentication/components/ProtectedRoute.jsx) and require valid authentication tokens.
  - Automatic authority routing directs users directly to their designated dashboard after sign-in.
- **Dynamic Header Navigation**:
  - Automatically switches between public navigation (Sign In / Sign Up) and authenticated navigation (Dashboard Shortcut & Sign Out).
- **Modern Flat UI Design**:
  - Built strictly adhering to a solid-color, zero-gradient design system with high-contrast `#0208F9` primary accents, Albert Sans typography, and JetBrains Mono technical readouts.

---

## Role & Dashboard Mapping

| Role Authority (`authority`) | Destination Dashboard | Batch Verification Allowed |
|---|---|:---:|
| `CONSUMER` | `/dashboard/consumer` | ❌ *(Hidden)* |
| `RETAIL_EMPLOYEE` | `/dashboard/retailer` | ✅ |
| `WHOLESALE_EMPLOYEE` | `/dashboard/wholesaler` | ✅ |
| `MANUFACTURING_EMPLOYEE` / `MANUFACTURER_EMPLOYEE` | `/dashboard/admin` | ✅ |
| `REGULATORY_OFFICER` / `INVESTIGATOR` | `/dashboard/investigator` | ✅ |

---

## Verification Endpoints (PUT)

All verification requests require an authorized `Bearer <token>` session:

```http
PUT /api/v1/verification/pack/:code
Authorization: Bearer <jwt-token>
```

```http
PUT /api/v1/verification/sachet/:code
Authorization: Bearer <jwt-token>
```

```http
PUT /api/v1/verification/batch/:code
Authorization: Bearer <jwt-token>
```
*(Requires `INVESTIGATOR`, `MANUFACTURER_EMPLOYEE`, `RETAIL_EMPLOYEE`, or `WHOLESALE_EMPLOYEE`)*

---

## Authentication Schemas

### Sign In
**Endpoint:** `POST /api/v1/auth/signin`

**Request Body:**
```json
{
  "username": "johndoe",
  "password": "Password123!"
}
```

**Response Body:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "authority": "MANUFACTURING_EMPLOYEE"
}
```

### Sign Up
**Endpoint:** `POST /api/v1/auth/signup`

**Request Body:**
```json
{
  "username": "johndoe",
  "firstName": "John",
  "lastName": "Doe",
  "middleName": "Alexander",
  "password": "Password123!",
  "email": "johndoe@example.com",
  "phoneNumber": "+2348012345678",
  "nationalIdentityNumber": "12345678901",
  "gender": "MALE",
  "role": "MANUFACTURING_EMPLOYEE",
  "dateOfBirth": "1990-01-01",
  "organisationId": "org-uuid-here",
  "organisationCode": "ORG123"
}
```

---

## Tech Stack

- **Framework**: [React 19](https://react.dev/) + [Vite 7](https://vitejs.dev/)
- **Routing**: [React Router DOM v7](https://reactrouter.com/) (Data Router with Protected Guards)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Component Primitives**: Radix UI Slot & CVA
- **Icons**: [Lucide React](https://lucide.dev/)
- **Typography**: Albert Sans (Display/Body) & JetBrains Mono (Technical/Serials)

---

## Project Structure

```text
medcheck/
├── src/
│   ├── assets/                 # Brand imagery and icons
│   ├── components/
│   │   ├── common/             # Reusable UI controls (VerificationTypeSelect)
│   │   ├── landing/            # Landing page sections (FounderMission, Stakeholders)
│   │   └── ui/                 # Atomic design components (Button, Card, Input, Table)
│   ├── features/
│   │   └── authentication/     # Auth Context, ProtectedRoute, SignIn/SignUp logic
│   ├── layouts/                # NavigationBar, FirstHero, SecondHero, Footer
│   ├── pages/                  # Route views & Role Dashboards
│   │   ├── AdminDashboard.jsx        # Manufacturer Hub
│   │   ├── ConsumerDashboard.jsx     # Patient / Consumer Portal
│   │   ├── RetailerDashboard.jsx     # Pharmacy Dispense Scanner
│   │   ├── WholesalerDashboard.jsx   # Consignment / Depot Scanner
│   │   ├── InvestigatorDashboard.jsx # Regulatory Dossiers
│   │   ├── SignIn.jsx                # Credential sign-in
│   │   └── SignUp.jsx                # Account registration
│   ├── routes/
│   │   └── router.jsx          # Route tree definition & Route Guards
│   ├── services/
│   │   └── verificationService.js # PUT verification API service
│   ├── App.jsx                 # App entry wrapped in AuthProvider
│   └── main.jsx                # React root mount
├── .env.example                # Sample environment configuration
├── vite.config.js              # Vite dev server proxy configuration
└── package.json
```

---

## Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

1. Navigate to the frontend directory:
   ```bash
   cd medcheck
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment:
   ```bash
   cp .env.example .env
   ```

   In development, leave `VITE_API_BASE_URL` empty so the Vite dev server proxy forwards `/api` requests to `http://localhost:8080`:
   ```env
   VITE_API_BASE_URL=
   ```

   In production, set your remote backend address:
   ```env
   VITE_API_BASE_URL=https://api.medcheck.ng
   ```

### Running Locally

```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### Production Build

```bash
npm run build
```
Build output will be bundled in the `dist/` directory.

---

## Development Notes & CORS Proxy

The Vite dev server (`vite.config.js`) includes a reverse proxy configured for `/api`:
```javascript
server: {
  proxy: {
    '/api': {
      target: 'http://localhost:8080',
      changeOrigin: true,
      secure: false,
    },
  },
}
```
This circumvents CORS restrictions in local development while allowing browser `fetch` calls to run on the same origin (`localhost:5173/api/...`).

---

## Leadership & Mission

> *"We have identified a threat in our society. The threat of counterfeit drugs in the market. Many individuals have lost their lives to this menace, and many more are at risk. MedCheck is our response to this crisis."*
> — **Akintayo Olamide**, Co-Founder

> *"MedCheck is not just a solution; it's a movement towards a safer and healthier future. We are dedicated to empowering individuals with the tools they need to verify the authenticity of their medications."*
> — **Durodola Toliat**, Co-Founder
