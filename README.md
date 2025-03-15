
## Introduction

Powered by Next.js, TypeScript, and PostgreSQL, Book Wise is a University Library Management System.

It is a production-ready platform with both a public-facing app and an admin interface. 

It provides advanced features such as seamless book borrowing with reminders and receipts, efficient user management, automated email workflows, and a modern, high-performance tech stack designed for real-world scalability.



## Tech Stack
- Next.js
- PostgreSQL
- Upstash
- ImageKit
- TypeScript
- Resend
- Tailwind CSS
## Features

⭐ Open-source Authentication: Personalized onboarding flow with email notifications.

⭐ Home Page: Highlighted books and newly added books with 3D effects.

⭐ Book Detail Pages: Availability tracking, book summaries, book-trailers.

⭐ Profile Page: Manage accounts, track borrowed books, and download receipts.

⭐ Onboarding Workflows: Automated welcome emails when users sign up, with follow-ups based on inactivity or activity dates.

⭐ Advanced Functionalities: Caching, rate-limiting, DDoS protection, and custom notifications.

⭐ Book Management Forms: Add new books and edit existing entries.

⭐ Seamless Email Handling: Resend for automated email communications, including notifications and updates.

⭐ Database Management: Postgres with Neon for scalable and collaborative database handling.

⭐ Real-time Media Processing: ImageKit for image and video optimization and transformations.

⭐ Efficient Caching: Upstash Redis for caching, workflows, and triggers.

⭐ Database ORM: Drizzle ORM for simplified and efficient database interactions.




## Upcoming Improvements
### Administrators Section
👉 Account Requests Page: Admin approval for account requests, with email notifications for user verification.

👉 All Books Page: List and manage all library books with advanced search, pagination, and filters.

👉 Book Details Page: Detailed book information for administrators.

👉 Borrow Records Page: Complete borrow history with pagination and search.

👉 Role Management: Change user roles to invite more admins, with email notifications sent upon role updates.

👉 Analytics Dashboard: Statistics, new users, books, borrow requests, and more.

👉 All Users Page: View and manage users, including approving or revoking access.

👉 Modern UI/UX: Built with TailwindCSS, ShadCN, and other cutting-edge tools.

## Local Setup


**Prerequisites**

Make sure you have the following installed on your machine:

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/en)
- [npm](https://www.npmjs.com/) (Node Package Manager)

**Cloning the Repository**

```bash
git clonehttps://github.com/aashrith-raksh/Book-Wise.git
cd book-wise
```

**Installation**

Install the project dependencies using npm:

```bash
npm install
```


**Setup environment variables**

Create a new file named .env in the root of your project and add the following content:

```env
NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY=
IMAGEKIT_PRIVATE_KEY=
NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT=

NEXT_PUBLIC_API_ENDPOINT=
NEXT_PUBLIC_PROD_API_ENDPOINT=

DATABASE_URL=

UPSTASH_REDIS_URL=
UPSTASH_REDIS_TOKEN=

AUTH_SECRET=
AUTH_GOOGLE_ID=
AUTH_GOOGLE_SECRET=
AUTH_TRUST_HOST=

# Required for workflow
QSTASH_URL=
QSTASH_TOKEN=

RESEND_TOKEN=
```

Replace the placeholder values with your actual ImageKit, NeonDB, Upstash, and Resend credentials. You can obtain these credentials by signing up on the [ImageKit](https://bit.ly/49zmXkt), [NeonDB](https://fyi.neon.tech/1jsm), [Upstash](https://upstash.com/?utm_source=jsmastery1), and [Resend](https://resend.com/). 

**DB Setup**

After getting your DB connectiong string, migrate your DB and seed you DB using the following command:

```bash
npm run db:setup
```

**Build the project**

After setting up your DB with seed users, you can build the project with the following command:

```bash
npm run build
```


## Setup with Docker

Make sure you have the following installed on your machine:

- [Docker](https://docs.docker.com/desktop/)
- [Docker Compose](https://docs.docker.com/compose/install/)

**Build and start the app container**
```bash
docker-compose up --build -d
```