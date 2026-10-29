# Campus Event & Activity Tracker

[![CI](https://github.com/<EndayaRK>/itelect4-project/actions/workflows/ci.yml/badge.svg)](https://github.com/EndayaRK/itelect4-project/actions/workflows/ci.yml)

- **Live site:** itelect4-project-rho.vercel.app
- **Backend repo:** https://github.com/EndayaRK/itelect4-backend

## Project Concept

A React + TypeScript web application for managing campus events, user registrations, and event sign-ups. This project is built using Vite and demonstrates typed React components with TypeScript.

## Tech Stack

- React 18
- TypeScript
- Vite

## Architecture

```mermaid
flowchart LR
  fe["itelect4-project<br/>React + Vite on Vercel"]
  be["itelect4-backend<br/>Express on Vercel"]
  db[("MongoDB Atlas")]
  ai["Gemini API"]
  fe -- "fetch + Bearer token" --> be
  be -- "Mongoose" --> db
  be -- "GEMINI_API_KEY" --> ai
```

## Installation & Setup
Install dependencies

npm install

Start development server

npm run dev
