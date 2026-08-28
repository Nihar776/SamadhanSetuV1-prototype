/**
 * Village Signal design reminder: a warm civic noticeboard for inclusive public-service action.
 * Use large clear actions, progress-as-trust, and grounded Jharkhand-green details—not dense dashboards.
 */
import { FormEvent, useState } from "react";
import { toast } from "sonner";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  BadgeCheck,
  Bell,
  Camera,
  Building2,
  Check,
  ChevronDown,
  CircleHelp,
  ClipboardCheck,
  Factory,
  FileText,
  GraduationCap,
  HeartHandshake,
  Landmark,
  Languages,
  MapPin,
  Menu,
  Mic,
  Send,
  ShieldCheck,
  Sparkles,
  Upload,
  UsersRound,
  X,
} from "lucide-react";

type RoleKey = "citizen" | "university" | "industry" | "government";

const roles: { key: RoleKey; label: string; icon: typeof UsersRound }[] = [
  { key: "citizen", label: "Citizen", icon: UsersRound },
  { key: "university", label: "University", icon: GraduationCap },
  { key: "industry", label: "Industry", icon: Factory },
  { key: "government", label: "Government", icon: Landmark },
];

const journey = [
  { label: "Reported", state: "complete" },
  { label: "Verified", state: "complete" },
  { label: "Matched", state: "active" },
  { label: "In progress", state: "upcoming" },
  { label: "Resolved", state: "upcoming" },
];

export default function Home() {
  const [, setLocation] = useLocation();
  const [activeRole, setActiveRole] = useState<RoleKey>("citizen");
  const [submitted, setSubmitted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [voiceActive, setVoiceActive] = useState(false);
  const [evidenceName, setEvidenceName] = useState("");

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setMenuOpen(false);
  };

  const submitReport = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
    toast.success("Challenge saved in this prototype", {
      description: "Next step: it will be reviewed by the local verification team.",
    });
  };

  const roleContent = {
    citizen: {
      eyebrow: "Your local workspace",
      title: "Keep track of the change you started.",
      metric: "01",
      metricLabel: "active report",
      items: [
        ["Water supply at Jharia basti", "Matched with BIT Sindri", "Matched"],
        ["Street light near Ward 12", "Community check in progress", "Verified"],
      ],
      action: "Report another challenge",
    },
    university: {
      eyebrow: "University problem board",
      title: "Turn verified challenges into student-led projects.",
      metric: "06",
      metricLabel: "matching challenges",
      items: [
        ["Community water monitoring", "Civil + environmental engineering", "Open"],
        ["Accessible bus-stop signage", "Design + computer science", "Open"],
      ],
      action: "Review problem board",
    },
    industry: {
      eyebrow: "Collaboration desk",
      title: "Find practical projects ready for support.",
      metric: "03",
      metricLabel: "pilot-ready teams",
      items: [
        ["Low-cost water quality sensor", "Prototype stage · Ranchi", "Pilot-ready"],
        ["Solar crop dryer", "Mentorship requested", "Open"],
      ],
      action: "Browse solution summaries",
    },
    government: {
      eyebrow: "District overview",
      title: "See where local attention can unlock progress.",
      metric: "14",
      metricLabel: "reports to review",
      items: [
        ["Ward 12 drinking water request", "Awaiting local verification", "Pending"],
        ["Rural market waste collection", "University pilot submitted", "Review"],
      ],
      action: "Open triage list",
    },
  } as const;

  const activeContent = roleContent[activeRole];

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#fbf8ef] text-[#19332b]">
      <header className="sticky top-0 z-30 border-b border-[#dfe4d8] bg-[#fbf8ef]/95 backdrop-blur">
        <div className="mx-auto flex h-[72px] max-w-[1440px] items-center justify-between px-4 sm:px-6 lg:px-10">
          <button
            className="flex items-center gap-3 rounded-md text-left focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#e5a53a]/35"
            onClick={() => scrollTo("top")}
                          aria-label="SamadhanSetu home"

          >
            <img
              className="h-10 w-10 object-contain"
              src="/images/logo-mark.png"
              alt="SamadhanSetu symbol"
            />
            <span>
              <span className="block text-[17px] font-bold leading-none tracking-[-0.02em]">SamadhanSetu</span>
              <span className="mt-1 block text-[11px] font-medium uppercase tracking-[0.13em] text-[#62736b]">Jharkhand collaboration portal</span>
            </span>
          </button>

          <nav className="hidden items-center gap-7 text-sm font-semibold text-[#455c52] md:flex" aria-label="Primary navigation">
            <button onClick={() => setLocation("/access/citizen")} className="nav-link">Report a challenge</button>
            <button onClick={() => scrollTo("workspace")} className="nav-link">How it works</button>
            <button onClick={() => scrollTo("workspace")} className="nav-link">Workspaces</button>
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <label className="sr-only" htmlFor="language-select">Choose language</label>
            <div className="relative">
              <Languages className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#176b4d]" />
              <select
                id="language-select"
                className="h-10 appearance-none rounded-full border border-[#cbd8cc] bg-white py-2 pl-9 pr-9 text-sm font-semibold text-[#305449] outline-none transition focus:border-[#176b4d] focus:ring-4 focus:ring-[#176b4d]/15"
                defaultValue="English"
                onChange={(event) => toast.message(`${event.target.value} selected for this prototype`)}
              >
                <option>English</option>
                <option>Hindi</option>
                <option>Bangla</option>
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2" />
            </div>
            <Button onClick={() => setLocation("/access")} className="rounded-full bg-[#176b4d] px-5 font-bold text-white hover:bg-[#0f573d]">
              Sign in
            </Button>
          </div>

          <button
            className="grid h-10 w-10 place-items-center rounded-full border border-[#cbd8cc] text-[#176b4d] md:hidden"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
        {menuOpen && (
          <nav className="border-t border-[#dfe4d8] bg-[#fbf8ef] px-4 py-4 md:hidden" aria-label="Mobile navigation">
            <div className="flex flex-col gap-2">
              <button onClick={() => setLocation("/access/citizen")} className="mobile-nav-link">Report a challenge</button>
              <button onClick={() => scrollTo("workspace")} className="mobile-nav-link">How it works</button>
              <button onClick={() => scrollTo("workspace")} className="mobile-nav-link">Workspaces</button>
              <button onClick={() => setLocation("/access")} className="mobile-nav-link">Sign in</button>
            </div>
          </nav>
        )}
      </header>

      <main id="top">
        <section className="relative border-b border-[#dfe4d8]">
          <div className="mx-auto grid max-w-[1440px] gap-10 px-4 py-10 sm:px-6 sm:py-14 lg:grid-cols-[0.93fr_1.07fr] lg:px-10 lg:py-16">
            <div className="flex max-w-[610px] flex-col justify-center">
              <div className="mb-6 flex items-center gap-2 text-sm font-bold text-[#176b4d]">
                <span className="h-2.5 w-2.5 rounded-full bg-[#e5a53a]" />
                A shared route from problem to progress
              </div>
              <h1 className="font-display text-[clamp(2.9rem,5.7vw,5.8rem)] font-semibold leading-[0.95] tracking-[-0.05em] text-[#19332b]">
                Start with the problem you see nearby.
              </h1>
              <p className="mt-6 max-w-[530px] text-lg leading-8 text-[#51675e]">
                Report local challenges. Work with people who can help solve them. Follow each step until the outcome is visible in your community.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button onClick={() => setLocation("/access/citizen")} size="lg" className="h-14 rounded-full bg-[#176b4d] px-7 text-base font-bold text-white hover:bg-[#0f573d]">
                  Report an Issue Now <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button onClick={() => scrollTo("workspace")} size="lg" variant="outline" className="h-14 rounded-full border-[#b8c8ba] bg-transparent px-7 text-base font-bold text-[#244d40] hover:bg-[#f0f3e9]">
                  See how it works
                </Button>
              </div>
              <div className="mt-9 flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold text-[#52675e]">
                <span className="flex items-center gap-2"><BadgeCheck className="h-5 w-5 text-[#176b4d]" /> Easy to report</span>
                <span className="flex items-center gap-2"><Languages className="h-5 w-5 text-[#176b4d]" /> Language-friendly <Mic className="h-4 w-4 text-[#176b4d]" aria-label="Voice-to-text support" /></span>
                <span className="flex items-center gap-2"><ShieldCheck className="h-5 w-5 text-[#176b4d]" /> Clear progress</span>
              </div>
            </div>

            <div className="relative min-h-[340px] overflow-hidden rounded-[28px] border border-[#d6dfd4] bg-[#e9efe6] shadow-[0_18px_45px_rgba(29,56,44,0.10)] sm:min-h-[420px]">
              <img
                src="/images/hero.png"
                alt="Community members, students, industry experts, and an official discussing a local water solution"
                className="absolute inset-0 h-full w-full object-cover object-right"
              />
              <div className="absolute bottom-4 left-4 max-w-[270px] rounded-2xl border border-white/70 bg-[#fffdf6]/95 p-4 shadow-lg backdrop-blur sm:bottom-6 sm:left-6">
                <p className="text-xs font-bold uppercase tracking-[0.13em] text-[#176b4d]">Connected effort</p>
                <p className="mt-1 text-sm font-semibold leading-5 text-[#244236]">A local report can become a student project, a practical pilot, and a verified improvement.</p>
              </div>
            </div>
          </div>
        </section>


        <section id="workspace" className="scroll-mt-24 py-14 sm:py-20">
          <div className="mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-10">
            <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="eyebrow">One platform, focused views</p>
                <h2 className="mt-3 max-w-2xl font-display text-4xl font-semibold tracking-[-0.04em] text-[#19332b] sm:text-5xl">Each contributor sees their next useful action.</h2>
              </div>
              <p className="max-w-sm text-base leading-7 text-[#5a7066]">The interface changes by role, but the shared goal remains visible: a practical outcome for the community.</p>
            </div>

            <div className="mt-9 flex gap-2 overflow-x-auto border-b border-[#d5dfd3] pb-3" role="tablist" aria-label="Choose a workspace">
              {roles.map((role) => {
                const Icon = role.icon;
                const active = activeRole === role.key;
                return <button key={role.key} role="tab" aria-selected={active} onClick={() => setActiveRole(role.key)} className={`inline-flex shrink-0 items-center gap-2 rounded-full px-4 py-2.5 text-sm font-bold transition ${active ? "bg-[#176b4d] text-white shadow-sm" : "bg-transparent text-[#5d7067] hover:bg-[#edf2e9] hover:text-[#244d40]"}`}><Icon className="h-4 w-4" />{role.label}</button>;
              })}
            </div>

            <div className="mt-7 grid gap-5 lg:grid-cols-[0.82fr_1.18fr]" role="tabpanel">
              <aside className="relative overflow-hidden rounded-[24px] bg-[#193f31] p-6 text-white sm:p-8">
                <div className="relative z-10">
                  <p className="text-sm font-bold uppercase tracking-[0.13em] text-[#bad9bd]">{activeContent.eyebrow}</p>
                  <p className="mt-8 font-display text-6xl font-semibold tracking-[-0.06em]">{activeContent.metric}</p>
                  <p className="mt-1 text-base text-[#d5e5d7]">{activeContent.metricLabel}</p>
                  <div className="mt-10 flex items-center gap-2 text-sm font-semibold text-[#d8e7da]"><Bell className="h-4 w-4 text-[#e5a53a]" /> Clear update notifications</div>
                </div>
                <div className="absolute -bottom-12 -right-10 h-44 w-44 rounded-full border-[28px] border-[#2f6552] opacity-80" />
              </aside>
              <div className="field-note-card p-5 sm:p-7">
                <h3 className="max-w-xl font-display text-3xl font-semibold tracking-[-0.04em] text-[#19332b]">{activeContent.title}</h3>
                <div className="mt-6 divide-y divide-[#e0e7dd] border-y border-[#e0e7dd]">
                  {activeContent.items.map(([title, detail, state]) => (
                    <div key={title} className="flex items-center justify-between gap-4 py-4">
                      <div><p className="font-bold text-[#274b40]">{title}</p><p className="mt-1 text-sm text-[#6c7b73]">{detail}</p></div>
                      <span className="shrink-0 rounded-full bg-[#edf4e8] px-3 py-1.5 text-xs font-bold text-[#246344]">{state}</span>
                    </div>
                  ))}
                </div>
                <Button onClick={() => toast.message(`${activeContent.action} is a prototype action`)} className="mt-6 rounded-full bg-[#176b4d] px-5 font-bold text-white hover:bg-[#0f573d]">{activeContent.action} <ArrowRight className="ml-2 h-4 w-4" /></Button>
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-[#d6e0d3] bg-[#e6eee2]">
          <div className="mx-auto grid max-w-[1440px] gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-10 lg:py-14">
            <div className="flex flex-col justify-center">
              <p className="eyebrow">Collaboration that is easy to follow</p>
              <h2 className="mt-3 max-w-xl font-display text-4xl font-semibold tracking-[-0.04em] text-[#19332b] sm:text-5xl">Local knowledge meets the people who can build.</h2>
              <p className="mt-5 max-w-lg text-base leading-7 text-[#536b60]">Universities develop ideas with students and mentors. Industry partners support promising pilots. Government can monitor progress and enable implementation.</p>
              <div className="mt-7 flex flex-wrap gap-3 text-sm font-bold text-[#315748]"><span className="inline-flex items-center gap-2"><GraduationCap className="h-5 w-5 text-[#176b4d]" /> Universities</span><span className="inline-flex items-center gap-2"><Factory className="h-5 w-5 text-[#176b4d]" /> Industry</span><span className="inline-flex items-center gap-2"><Landmark className="h-5 w-5 text-[#176b4d]" /> Government</span></div>
            </div>
            <div className="overflow-hidden rounded-[24px] border border-[#cfdcca] shadow-[0_14px_30px_rgba(32,69,51,0.08)]"><img src="/images/collaboration.png" alt="Students, a mentor, an engineer, and a municipal official collaborating around an irrigation prototype" className="h-full min-h-[310px] w-full object-cover" /></div>
          </div>
        </section>
      </main>

      <footer className="bg-[#193f31] text-white">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-6 px-4 py-9 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-10">
          <div className="flex items-center gap-3"><img src="/images/logo-mark.png" alt="" className="h-10 w-10" /><div><p className="font-bold">SamadhanSetu</p><p className="mt-1 text-sm text-[#c8dacb]">A prototype for community-led innovation.</p></div></div>
          <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold text-[#d7e5d9]"><button onClick={() => toast.message("Help centre is represented in this prototype")} className="footer-link"><CircleHelp className="h-4 w-4" /> Help</button><button onClick={() => toast.message("Updates are represented in this prototype")} className="footer-link"><ClipboardCheck className="h-4 w-4" /> My updates</button><button onClick={() => toast.message("Public information page is represented in this prototype")} className="footer-link"><FileText className="h-4 w-4" /> About the portal</button></div>
        </div>
      </footer>
    </div>
  );
}
