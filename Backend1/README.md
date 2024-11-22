# Party App Backend

## Project Setup

### Prerequisites
- Node.js (version 16+)
- PostgreSQL
- npm or yarn

### Initial Setup

1. Clone the repository
```bash
git clone <your-repo-url>
cd backend1
```

2. Create .env File
```bash
touch .env
```

3. Configure .env with Following Variables
```
DATABASE_URL="postgresql://root:root@localhost:5432/party_app_db?schema=public"
JWT_SECRET="05762c2cd4c09c2b454a39fcbaa8012aafaa5f2ca251c39a7c8df9bbb22759062bef8fdff4121a8b76db186434ffa6dab5f1d063ef05e4b2300570fad6e9a6be"
```

4. Install Dependencies
```bash
npm install
```

5. Database Migrations
```bash
npx prisma migrate dev
```

6. Start Development Server
```bash
npm run start:dev
```

### Project Structure
- `src/`: Source code
- `prisma/`: Database schema and migrations
- `.env`: Environment configuration
- `package.json`: Project dependencies and scripts

### Key Technologies
- NestJS
- Prisma ORM
- PostgreSQL
- JWT Authentication
