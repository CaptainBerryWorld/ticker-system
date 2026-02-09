# Quick Start Guide - IT Ticketing System

## 🚀 Get Started in 5 Minutes

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Set Up Supabase

1. **Create a Supabase account** at [supabase.com](https://supabase.com)
2. **Create a new project**
3. **Get your API credentials**:
   - Go to: Project Settings > API
   - You'll need:
     - Project URL (looks like: `https://xxxxx.supabase.co`)
     - Anon/Public Key (long string starting with `eyJ...`)

### Step 3: Configure Environment Variables

1. Copy `.env.example` to `.env.local`:
   ```bash
   copy .env.example .env.local
   ```
   
2. Open `.env.local` and add your Supabase credentials:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
   ```

### Step 4: Create Database Table

1. Open your Supabase dashboard
2. Go to **SQL Editor**
3. Copy the contents of `supabase/migrations/001_create_tickets_table.sql`
4. Paste into the SQL Editor
5. Click **Run** or press `Ctrl/Cmd + Enter`

You should see: "Success. No rows returned"

### Step 5: Run the Application

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📋 What You Can Do

### For Staff:
- **Create New Ticket** - Submit IT support requests
- Fill in details about:
  - Date, name, department, position, email
  - Type of issue (printer, laptop, network, etc.)
  - Description and location

### For Admins:
- **Admin Dashboard** - View all tickets
- Update ticket status (Open/Resolved)
- Mark tickets for escalation
- Add solutions
- Edit or delete tickets

## 🎯 Ticket Types Supported

- 🖨️ Printer
- 💻 Laptop
- 🖥️ Desktop
- 🌐 Network
- 📡 Internet
- 📄 Office Suite
- 📧 Email Password Reset
- 📱 Phone App Installations

## ⚠️ Important Notes

1. **Never commit `.env.local`** to git (it's already in .gitignore)
2. The current setup allows anyone to create/edit tickets
3. For production, add proper authentication
4. See `SETUP_GUIDE.md` for detailed documentation

## 🐛 Troubleshooting

**Can't connect to Supabase?**
- Double-check your credentials in `.env.local`
- Make sure there are no quotes around the values
- Restart the dev server after changing `.env.local`

**Tickets not showing?**
- Verify the database table was created successfully
- Check the browser console for errors
- Make sure you ran the SQL migration

**Build errors?**
- Run `npm install` again
- Delete `.next` folder and restart: `npm run dev`

## 📚 Need More Help?

Check out `SETUP_GUIDE.md` for comprehensive documentation.

---

**Made with ❤️ using Next.js, TypeScript, Tailwind CSS, and Supabase**
