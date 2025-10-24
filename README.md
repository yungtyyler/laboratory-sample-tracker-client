# LIMS - Laboratory Sample Tracker (Frontend)

This is the frontend for a full-stack LIMS-lite (Laboratory Information Management System) application. It's a modern, responsive single-page application (SPA) built with Next.js and TypeScript, designed to manage and track laboratory samples.

**Live Site:** [https://laboratory-sample-tracker-client.vercel.app](https://laboratory-sample-tracker-client.vercel.app)

**Backend API Repo:** [Link to your GitHub repo for the API]

## Features

- **Secure Authentication:** User registration and login using token-based authentication (JWT).
- **Protected Routes:** Dashboard and sample pages are protected and accessible only to logged-in users.
- **Sample Management (CRUD):**
  - **Create:** Register new samples with a unique ID and name.
  - **Read:** View a list of all samples in a responsive table.
  - **Update:** View a detailed page for each sample and update its status (Received, Processing, Analyzed, Complete).
- **Data Visualization:** A dynamic dashboard with interactive charts (Pie and Bar) from Recharts to visualize sample status breakdown and daily throughput.
- **Audit Log:** View a complete history of status changes for each sample, including the actor and timestamp.

## Tech Stack

- **Framework:** Next.js (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Charting:** Recharts
- **State Management:** React Context API
- **Deployment:** Vercel

## Running Locally

1.  **Clone the repository:**
    ```bash
    git clone [your-repo-url]
    cd lims-frontend
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Set up environment variables:**
    Create a `.env.local` file in the root. You'll need to run the [backend API]([link-to-your-api-repo]) locally.
    ```env
    NEXT_PUBLIC_API_URL=[http://127.0.0.1:8000](http://127.0.0.1:8000)
    ```
4.  **Run the development server:**
    ```bash
    npm run dev
    ```
    Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
