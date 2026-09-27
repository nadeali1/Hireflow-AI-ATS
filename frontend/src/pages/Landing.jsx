import { Link } from "react-router-dom";
import {
  Briefcase,
  FileText,
  Sparkles,
  BarChart3,
  Search,
  ShieldCheck,
} from "lucide-react";

const features = [
  {
    icon: Briefcase,
    title: "Track every application",
    text: "Log companies, roles, and statuses in one place instead of a scattered spreadsheet.",
  },
  {
    icon: FileText,
    title: "Keep your resume ready",
    text: "Upload one resume and reuse it whenever you apply or run an analysis.",
  },
  {
    icon: Sparkles,
    title: "Match resumes to job posts",
    text: "Paste a job description and see how your resume lines up with it.",
  },
  {
    icon: BarChart3,
    title: "See your pipeline at a glance",
    text: "A dashboard shows how many applications sit in each stage.",
  },
  {
    icon: Search,
    title: "Find applications fast",
    text: "Search and filter by company, role, or status as your list grows.",
  },
  {
    icon: ShieldCheck,
    title: "Your data stays yours",
    text: "Accounts are protected with hashed passwords and authenticated requests.",
  },
];

const steps = [
  { title: "Add a job", text: "Save a role you're interested in or already applied to, with its status." },
  { title: "Upload your resume", text: "Add a PDF resume once — it's reused across analyses." },
  { title: "Analyze the match", text: "Paste a job description to see your ATS score and gaps." },
  { title: "Track the outcome", text: "Update the status as you move through interviews and offers." },
];

const Landing = () => {
  return (
    <div className="min-h-screen bg-canvas text-ink">
      <header className="border-b border-ink/10">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-sm font-bold text-white">H</div>
            <span className="text-lg font-bold">HireFlow</span>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/login" className="text-sm font-medium text-ink-soft hover:text-ink">
              Log in
            </Link>
            <Link to="/register" className="btn-primary">
              Get started
            </Link>
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-5 pb-16 pt-14 sm:px-8 sm:pb-24 sm:pt-20">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <h1 className="text-3xl font-extrabold leading-tight text-ink sm:text-4xl">
              One place for every job application you send.
            </h1>
            <p className="mt-4 max-w-md text-base leading-relaxed text-ink-soft">
              Organize your applications and understand how well your resume matches each role,
              without spreadsheets or sticky notes.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Link to="/register" className="btn-primary">
                Create free account
              </Link>
              <Link to="/login" className="btn-secondary">
                I already have an account
              </Link>
            </div>
          </div>

          <div className="card">
            <p className="text-xs font-medium uppercase tracking-wide text-ink-soft/70">This week</p>
            <div className="mt-4 grid grid-cols-2 gap-3">
              {[
                { label: "Applied", value: "12" },
                { label: "Interview", value: "3" },
                { label: "Offer", value: "1" },
                { label: "Rejected", value: "4" },
              ].map((s) => (
                <div key={s.label} className="rounded-md bg-surface/60 px-3 py-3">
                  <p className="text-xl font-bold text-ink">{s.value}</p>
                  <p className="text-xs text-ink-soft">{s.label}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 rounded-md border border-ink/10 px-3 py-3">
              <p className="text-xs font-medium text-ink-soft">Latest match</p>
              <p className="mt-1 text-sm font-semibold text-ink">Frontend Developer — Acme Inc.</p>
              <p className="mt-0.5 text-xs text-ink-soft">ATS score: 82 / 100</p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-ink/10 bg-white/50 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <h2 className="text-xl font-bold text-ink sm:text-2xl">What HireFlow handles for you</h2>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {features.map(({ icon: Icon, title, text }) => (
              <div key={title} className="card">
                <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-md bg-surface">
                  <Icon size={17} className="text-primary-dark" />
                </div>
                <h3 className="text-sm font-semibold text-ink">{title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <h2 className="text-xl font-bold text-ink sm:text-2xl">How it works</h2>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, i) => (
              <div key={step.title} className="rounded-lg border border-ink/10 bg-white p-5">
                <p className="text-xs font-semibold text-primary-dark">{i + 1}</p>
                <h3 className="mt-2 text-sm font-semibold text-ink">{step.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-ink/10 bg-surface/40 py-16 sm:py-20">
        <div className="mx-auto max-w-2xl px-5 text-center sm:px-8">
          <h2 className="text-xl font-bold text-ink sm:text-2xl">
            Ready to organize your job search?
          </h2>
          <p className="mt-3 text-sm text-ink-soft">
            It takes less than a minute to create an account and add your first application.
          </p>
          <Link to="/register" className="btn-primary mt-6 inline-flex">
            Get started for free
          </Link>
        </div>
      </section>

      <footer className="border-t border-ink/10 py-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-5 text-sm text-ink-soft sm:flex-row sm:px-8">
          <span>© {new Date().getFullYear()} HireFlow</span>
          <span>Built as a personal portfolio project</span>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
