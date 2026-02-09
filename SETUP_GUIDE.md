# IT Ticketing System

A modern IT support ticketing system built with Next.js, TypeScript, Tailwind CSS, and Supabase.

## Features

- ✅ Create new IT support tickets
- ✅ Admin dashboard to view and manage all tickets
- ✅ Update ticket status (resolved/open)
- ✅ Mark tickets for escalation
- ✅ Add solutions to tickets
- ✅ Support for multiple ticket types:
  - Printer issues
  - Laptop issues
  - Desktop issues
  - Network problems
  - Internet connectivity
  - Office Suite applications
  - Email password resets
  - Phone app installations

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth (optional)

## Getting Started

### Prerequisites

- Node.js 18+ installed
- A Supabase account ([sign up here](https://supabase.com))

### Installation

1. **Clone the repository** (or navigate to your project folder)

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Install Supabase client**:
   ```bash
   npm install @supabase/supabase-js
   ```

### Supabase Setup

1. **Create a new Supabase project**:
   - Go to [supabase.com](https://supabase.com)
   - Click "New Project"
   - Fill in your project details

2. **Get your Supabase credentials**:
   - Go to Project Settings > API
   - Copy the `Project URL` and `anon/public` key

3. **Update environment variables**:
   - Open `.env.local` in the project root
   - Replace the placeholder values:
     ```env
     NEXT_PUBLIC_SUPABASE_URL=your-project-url
     NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
     ```

4. **Create the database table**:
   - Go to the SQL Editor in your Supabase dashboard
   - Copy the contents of `supabase/migrations/001_create_tickets_table.sql`
   - Paste and run the SQL script

   Alternatively, you can run it manually:
   ```sql
   -- Copy and paste the SQL from the migration file
   ```

### Running the Application

1. **Start the development server**:
   ```bash
   npm run dev
   ```

2. **Open your browser**:
   - Navigate to [http://localhost:3000](http://localhost:3000)

3. **Test the application**:
   - Click "Create New Ticket" to submit a new ticket
   - Click "Admin Dashboard" to view and manage tickets

## Project Structure

```
ticket-system/
├── app/
│   ├── actions/
│   │   └── tickets.ts          # Server actions for ticket operations
│   ├── admin/
│   │   └── page.tsx            # Admin dashboard page
│   ├── new-ticket/
│   │   └── page.tsx            # New ticket submission form
│   ├── globals.css             # Global styles
│   ├── layout.tsx              # Root layout
│   └── page.tsx                # Homepage
├── components/
│   └── TicketCard.tsx          # Ticket display and edit component
├── lib/
│   ├── database.types.ts       # TypeScript types for database
│   └── supabase.ts             # Supabase client configuration
├── supabase/
│   └── migrations/
│       └── 001_create_tickets_table.sql  # Database schema
├── .env.local                  # Environment variables (not in git)
├── next.config.ts              # Next.js configuration
├── package.json                # Project dependencies
├── tailwind.config.ts          # Tailwind CSS configuration
└── tsconfig.json               # TypeScript configuration
```

## Usage

### Creating a Ticket

1. Navigate to the homepage
2. Click "Create New Ticket"
3. Fill in all required fields:
   - Date
   - Name of staff
   - Department
   - Position
   - Email
   - Ticket type
   - Description of issue
   - Location of issue
4. Click "Submit Ticket"

### Managing Tickets (Admin)

1. Navigate to the homepage
2. Click "Admin Dashboard"
3. View all tickets with their current status
4. For each ticket you can:
   - View full details
   - Edit ticket information
   - Mark as resolved/unresolved
   - Mark for escalation
   - Add a solution
   - Delete the ticket

## Database Schema

The `tickets` table includes:

- `id` (UUID, primary key)
- `created_at` (timestamp)
- `updated_at` (timestamp)
- `date` (date)
- `staff_name` (text)
- `department` (text)
- `position` (text)
- `email` (text)
- `ticket_type` (text, enum)
- `description` (text)
- `location` (text)
- `is_resolved` (boolean)
- `needs_escalation` (boolean)
- `solution` (text, nullable)

## Customization

### Adding New Ticket Types

1. Update `lib/database.types.ts`:
   ```typescript
   export type TicketType =
     | 'PRINTER'
     | 'YOUR_NEW_TYPE'
     // ... other types
   ```

2. Update the database check constraint in the migration file

3. The dropdown will automatically reflect the changes

### Styling

The application uses Tailwind CSS. You can customize:
- Colors in `tailwind.config.ts`
- Global styles in `app/globals.css`
- Component styles inline using Tailwind classes

## Security Notes

⚠️ **Important**: The current setup uses RLS (Row Level Security) with a permissive policy that allows all operations. For production:

1. Implement proper authentication (Supabase Auth)
2. Create appropriate RLS policies
3. Restrict admin operations to authorized users
4. Add input validation and sanitization

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import the project in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

### Other Platforms

The app can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- Render
- AWS Amplify

## Troubleshooting

### "Failed to create ticket" Error

- Check that your Supabase credentials are correct in `.env.local`
- Ensure the tickets table is created in Supabase
- Verify RLS policies are set up correctly

### Tickets Not Displaying

- Check browser console for errors
- Verify Supabase connection
- Ensure the database table has data

## License

MIT

## Support

For issues or questions, please create an issue in the repository.
