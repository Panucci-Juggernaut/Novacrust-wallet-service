# Wallet Service (NestJS)

## Overview
A simple wallet service built with NestJS that supports wallet creation, funding, transfers between wallets, and transaction history tracking. The application uses in-memory storage for simplicity and clarity, as required by the take-home exercise.

---

## Tech Stack
- NestJS
- TypeScript
- In-memory storage

---

## Setup Instructions
```bash
git clone https://github.com/Panucci-Juggernaut/Novacrust-wallet-service
cd wallet-service
npm install
npm run start:dev
```

The application will start on:
```
http://localhost:3000
```

---

## API Endpoints

**Create Wallet**  
`POST /wallets`  
Request body:
```json
{
  "currency": "USD"
}
```

**Fund Wallet**  
`POST /wallets/:id/fund`  
Request body:
```json
{
  "amount": 100
}
```


**Transfer Funds**  
`POST /wallets/transfer`  
Request body:
```json
{
  "fromWalletId": "uuid",
  "toWalletId": "uuid",
  "amount": 50
}
```

**Fetch Wallet Details**  
`GET /wallets/:id`  
Returns wallet information and its transaction history.

---

## Validation & Error Handling
- Request payloads are validated using DTOs and class-validator.
- Invalid or missing inputs return appropriate HTTP errors.
- Transfers prevent negative wallet balances.
- Meaningful error messages are returned for invalid operations.

---

## Assumptions
- Single currency support (USD).
- In-memory storage is sufficient for this exercise.
- No authentication or authorization layer is implemented.
- Application runs in a single instance.

---


## Scaling Considerations
In a production environment, the system could be scaled by:
- Replacing in-memory storage with PostgreSQL or another relational database.
- Using database transactions to guarantee atomic wallet transfers.
- Introducing Redis for idempotency key storage.
- Implementing an event-based transaction ledger.
- Adding authentication and authorization.