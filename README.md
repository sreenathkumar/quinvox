# Quinvox

Quinvox is a modern, fast, and free online invoice creator. It allows freelancers and small businesses to generate professional invoices, manage client details, and export documents to PDF seamlessly.

---

## 🚀 Features

- **Instant Invoice Generation:** Create invoices quickly with a user-friendly form interface.
- **Live Preview:** See changes in real-time as you edit invoice details.
- **PDF Export & Print:** Download invoices as high-quality PDFs or print them directly from the browser.
- **Local Persistence:** Invoices are saved locally using browser storage, so you don't lose your work on refresh.
- **Cloud Backup:** Invoices will be saved on cloud automatically for multi device sync.
- **Authentication:** Optional User Sign-up/Login to manage sessions (powered by Better Auth).
- **Client & Biller Management:** Easily input and manage billing details for both parties.
- **Tax & Totals Calculation:** Automatic calculation of subtotals, taxes, and grand totals.

---

## 🛠️ Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** Shadcn UI (Radix UI)
- **State Management:** Zustand with persistence
- **Forms & Validation:** React Hook Form + Zod
- **Auth:** Better-Auth
- **PDF Generation:** html2canvas, jspdf, react-to-print
- **Testing:** Vitest + React Testing Library
- **Deployment:** Vercel

---

## 📂 Project Structure

```

quinvox/
├── app/                         # Next.js App Router pages
│   ├── dashboard/
│   ├── invoice/
│   ├── login/
│   └── signup/
├── components/                  # Reusable UI components
├── hooks/                       # Custom hooks (Zustand stores, utilities)
├── lib/                         # Firebase config, helpers, utils
├── styles/                      # Global Tailwind styles
├── tests/                       # Vitest + RTL test files
├── public/                      # Public static assets
└── package.json

```

---

## 🔧 Environment Variables

Create a `.env` file in the root directory and add:

```bash
BETTER_AUTH_SECRET
BETTER_AUTH_URL
DATABASE_URL
GOOGLE_CLIENT_ID
GOOGLE_CLIENT_SECRET
LINKEDIN_CLIENT_ID
LINKEDIN_CLIENT_SECRET
EMAIL_SEVER_API_KEY
```

---

## 💻 Getting Started

### Prerequisites

- Node.js v18+
- pnpm (recommended), npm, or yarn

### Installation Steps

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-username/quinvox.git
   cd quinvox
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   # or npm install
   ```

3. **Run the development server**

   ```bash
   pnpm dev
   ```

4. Visit:

   ```
   http://localhost:3000
   ```

---

## 📜 Available Scripts

| Command      | Description             |
| ------------ | ----------------------- |
| `pnpm dev`   | Run development server  |
| `pnpm build` | Build for production    |
| `pnpm start` | Start production server |
| `pnpm lint`  | Run ESLint              |
| `pnpm test`  | Run tests               |

---

## 🧪 Testing

Quinvox uses:

- **Vitest** for unit testing
- **React Testing Library** for component testing
- **(Optional)** MSW for API mocking

Run tests:

```bash
pnpm test
```

---

## 📦 Deployment

You can deploy Quinvox easily using **Vercel**:

1. Push the project to a GitHub repository
2. Import it into Vercel
3. Add required environment variables
4. Deploy 🚀

---

## 🌱 Roadmap

- [ ] Send invoices via email
- [ ] Invoice templates & themes
- [ ] Multi-language support
- [ ] Team & workspace collaboration
- [ ] Easy share

---

## 🤝 Contributing

Contributions are welcome and appreciated!

1. Fork the repository
2. Create a new feature branch
3. Commit using conventional commit messages
4. Open a pull request

**Example commit messages:**

```
feat: add dark mode toggle
fix: correct invoice total calculation
refact: optimize Zustand store
```

---

## 📄 License

Quinvox is released under the **MIT License**.
You are free to use, modify, and distribute this project.

---

## ⭐ Support the Project

If you find Quinvox useful:

- ⭐ Star the repository
- 📮 Share it with others
- 🛠️ Contribute improvements
