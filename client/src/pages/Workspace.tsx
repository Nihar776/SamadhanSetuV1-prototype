/**
 * Village Signal design reminder: each workspace is a calm, role-specific civic action board.
 * Show only essential next steps and preserve the shared community-outcome context.
 */
import { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "wouter";
import { ArrowRight, BadgeCheck, Bell, Building2, CheckCircle2, ClipboardCheck, FileText, LogOut, MapPin, ShieldCheck, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import IndustryDashboard from "@/pages/IndustryDashboard";
import { PortalRole, PortalSession, SESSION_KEY, isPortalRole, roleDetails } from "@/lib/portalRoles";

const workspaceContent: Record<PortalRole, {
  eyebrow: string;
  title: (name: string) => string;
  description: string;
  stat: string;
  statLabel: string;
  panelTitle: string;
  primaryAction: string;
  rows: { title: string; detail: string; tag: string }[];
}> = {
  citizen: {
    eyebrow: "Your local workspace",
    title: (name) => `Welcome, ${name}.`,
    description: "You can follow the local challenge you shared and see each next step toward a practical improvement.",
    stat: "01",
    statLabel: "report in progress",
    panelTitle: "Your reported challenge",
    primaryAction: "Add more detail",
    rows: [
      { title: "Irregular drinking water supply", detail: "Your report is being checked with local residents and the verification team.", tag: "Under review" },
      { title: "Next update", detail: "You will receive a notification when the report is verified.", tag: "Upcoming" },
    ],
  },
  university: {
    eyebrow: "University problem board",
    title: (name) => `${name}, your expertise is needed.`,
    description: "Review challenges matching your disciplines, then organise a student-and-faculty response team.",
    stat: "06",
    statLabel: "matching challenges",
    panelTitle: "Priority matches",
    primaryAction: "Review all challenges",
    rows: [
      { title: "Community water monitoring", detail: "Matches civil engineering and environmental systems expertise.", tag: "Open" },
      { title: "Accessible bus-stop signage", detail: "Matches design, accessibility, and computer science expertise.", tag: "Open" },
    ],
  },
  industry: {
    eyebrow: "Partner collaboration desk",
    title: (name) => `${name}, see where you can help.`,
    description: "Explore promising university-led pilots where resources, technical support, or mentorship can speed up impact.",
    stat: "03",
    statLabel: "pilot-ready projects",
    panelTitle: "Potential collaborations",
    primaryAction: "View solution summaries",
    rows: [
      { title: "Low-cost water quality sensor", detail: "Prototype stage · Collaboration support requested in Ranchi.", tag: "Pilot-ready" },
      { title: "Solar crop dryer", detail: "Student project seeking technical mentoring and test support.", tag: "Open" },
    ],
  },
  government: {
    eyebrow: "Local verification desk",
    title: (name) => `Welcome, ${name}.`,
    description: "Review local reports, provide timely verification, and monitor the work moving from problem to outcome.",
    stat: "14",
    statLabel: "reports awaiting attention",
    panelTitle: "Verification queue",
    primaryAction: "Open local triage",
    rows: [
      { title: "Ward 12 drinking water request", detail: "Resident evidence and local confirmations are ready for review.", tag: "Pending" },
      { title: "Rural market waste collection", detail: "University pilot proposal has been submitted for departmental review.", tag: "Review" },
    ],
  },
};

export default function Workspace() {
  const params = useParams<{ role?: string }>();
  const [, setLocation] = useLocation();
  const [session, setSession] = useState<PortalSession | null>(null);
  const [endorsed, setEndorsed] = useState(false);
  const role = params.role;

  useEffect(() => {
    if (!isPortalRole(role)) {
      setLocation("/access");
      return;
    }

    try {
      const stored = localStorage.getItem(SESSION_KEY);
      const parsed = stored ? (JSON.parse(stored) as PortalSession) : null;
      if (!parsed || parsed.role !== role) {
        setLocation(`/access/${role}`);
        return;
      }
      setSession(parsed);
    } catch {
      setLocation(`/access/${role}`);
    }
  }, [role, setLocation]);

  if (!isPortalRole(role) || !session) {
    return <main className="grid min-h-screen place-items-center bg-[#fbf8ef] px-4 text-center"><div><span className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-[#e5eee1] text-[#176b4d]"><ShieldCheck className="h-6 w-6" /></span><p className="mt-4 font-bold text-[#315248]">Preparing your workspace…</p></div></main>;
  }

  if (role === "industry") return <IndustryDashboard session={session} />;

  const detail = roleDetails[role];
  const content = workspaceContent[role];
  const Icon = detail.Icon;
  const locality = session.profile.area || session.profile.serviceArea || "Jharkhand";
  const handleSignOut = () => {
    localStorage.removeItem(SESSION_KEY);
    toast.message("You have signed out of this prototype workspace.");
    setLocation("/");
  };

  return (
    <main className="min-h-screen bg-[#f4f6ee] text-[#19332b]">
      <header className="border-b border-[#d5e0d3] bg-[#fffdf6]">
        <div className="mx-auto flex h-[74px] max-w-[1440px] items-center justify-between px-4 sm:px-6 lg:px-10">
          <Link href="/" className="flex items-center gap-3 rounded-md"><img src="/manus-storage/village-signal-mark_01384756.png" className="h-10 w-10" alt="SamadhanSetu symbol" /><span><span className="block font-bold tracking-[-0.02em]">SamadhanSetu</span>
<span className="block text-[11px] font-semibold uppercase tracking-[0.12em] text-[#6b7b73]">{detail.workspace}</span></span></Link>
          <div className="flex items-center gap-3"><span className="hidden text-sm font-semibold text-[#5d7067] sm:inline">Signed in as <strong className="text-[#244d40]">{detail.shortTitle}</strong></span><Button variant="outline" onClick={handleSignOut} className="rounded-full border-[#bfcebf] bg-white text-[#36594c] hover:bg-[#eef4eb]"><LogOut className="mr-2 h-4 w-4" /> Sign out</Button></div>
        </div>
      </header>

      <div className="mx-auto max-w-[1320px] px-4 py-8 sm:px-6 lg:px-10 lg:py-11">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl"><div className="flex items-center gap-2 text-sm font-bold text-[#176b4d]"><Icon className="h-4 w-4" /> {content.eyebrow}</div><h1 className="mt-4 font-display text-4xl font-semibold tracking-[-0.05em] sm:text-5xl">{content.title(session.displayName)}</h1><p className="mt-4 max-w-2xl text-base leading-7 text-[#597066]">{content.description}</p></div>
          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-[#c6d4c5] bg-[#fffdf6] px-4 py-2.5 text-sm font-bold text-[#315248]"><MapPin className="h-4 w-4 text-[#176b4d]" /> {locality}</div>
        </div>

        <section className="mt-9 grid gap-5 lg:grid-cols-[0.69fr_1.31fr]">
          <aside className="relative overflow-hidden rounded-[26px] bg-[#193f31] p-7 text-white sm:p-8"><p className="text-sm font-bold uppercase tracking-[0.13em] text-[#b8d6bc]">Your next view</p><p className="mt-8 font-display text-7xl font-semibold tracking-[-0.06em]">{content.stat}</p><p className="mt-1 text-base text-[#d9e9dc]">{content.statLabel}</p><div className="mt-10 flex items-center gap-2 text-sm font-semibold text-[#d7e5d9]"><Bell className="h-4 w-4 text-[#e5a53a]" /> Updates are shown here</div><div className="absolute -bottom-12 -right-9 h-44 w-44 rounded-full border-[28px] border-[#2f6552]" /></aside>
          <section className="rounded-[26px] border border-[#d6e0d4] bg-[#fffdf6] p-5 shadow-[0_12px_30px_rgba(29,56,44,0.07)] sm:p-7"><div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start"><div><p className="eyebrow">Focused work</p><h2 className="mt-2 font-display text-3xl font-semibold tracking-[-0.04em]">{content.panelTitle}</h2></div><span className="inline-flex w-fit items-center gap-2 rounded-full bg-[#eaf3e7] px-3 py-1.5 text-xs font-bold text-[#176b4d]"><CheckCircle2 className="h-4 w-4" /> Role-based view</span></div>
            <div className="mt-6 divide-y divide-[#e0e8de] border-y border-[#e0e8de]">{content.rows.map((row) => <article key={row.title} className="flex items-start justify-between gap-4 py-4"><div><h3 className="font-bold text-[#294d41]">{row.title}</h3><p className="mt-1 max-w-xl text-sm leading-6 text-[#66786f]">{row.detail}</p></div><span className="shrink-0 rounded-full bg-[#eff5eb] px-3 py-1.5 text-xs font-bold text-[#236143]">{row.tag}</span></article>)}</div>
            <Button onClick={() => toast.message(`${content.primaryAction} is represented in this prototype`)} className="mt-6 rounded-full bg-[#176b4d] px-5 font-bold text-white hover:bg-[#0f573d]">{content.primaryAction}<ArrowRight className="ml-2 h-4 w-4" /></Button>
          </section>
        </section>

        <section className="mt-7 grid gap-5 md:grid-cols-3">
          <article className="workspace-mini-card"><ClipboardCheck className="h-5 w-5 text-[#176b4d]" /><h2>Clear status</h2><p>Every activity has a visible owner and next step.</p></article>
          <article className="workspace-mini-card"><FileText className="h-5 w-5 text-[#176b4d]" /><h2>Secure records</h2><p>Documents and approvals are separated by responsibility in the full platform.</p></article>
          <article className="workspace-mini-card"><Sparkles className="h-5 w-5 text-[#176b4d]" /><h2>Shared outcomes</h2><p>Progress stays connected to the original community challenge.</p></article>
        </section>

        {role === "citizen" && <section className="mt-7 grid gap-7 rounded-[26px] border border-[#d5e0d3] bg-[#eef3e9] p-5 sm:p-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <div className="overflow-hidden rounded-[20px] border border-[#d4dfd1] bg-[#e4ece1]"><img src="/manus-storage/village-signal-community_5c0bcfd2.png" alt="A locality marker and community water point used for confirmation" className="h-full min-h-[250px] w-full object-cover" /></div>
          <div><p className="eyebrow">Community confirmation</p><h2 className="mt-3 font-display text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">The people nearby can add useful context.</h2><p className="mt-4 max-w-xl text-base leading-7 text-[#5a7066]">Confirm that the issue affects your area so the report can reach the right verification queue.</p><article className="mt-6 border-y border-[#cfdbcf] py-5"><div className="flex items-start justify-between gap-4"><div><div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.13em] text-[#176b4d]"><MapPin className="h-4 w-4" /> Ranchi · Ward 12</div><h3 className="mt-2 text-lg font-bold text-[#244d40]">Irregular drinking water supply</h3><p className="mt-1 text-sm leading-6 text-[#63756d]">Reported by a resident. Visible on the local community feed.</p></div><span className="shrink-0 rounded-full bg-[#fff5df] px-3 py-1.5 text-xs font-bold text-[#8f5d16]">Needs review</span></div><div className="mt-5 flex flex-wrap gap-3"><Button variant="outline" onClick={() => { setEndorsed((value) => !value); toast.success(endorsed ? "Your confirmation was removed" : "You confirmed this affects your area"); }} className={`rounded-full border-[#b7cbb9] ${endorsed ? "bg-[#176b4d] text-white hover:bg-[#0f573d] hover:text-white" : "bg-white text-[#244d40] hover:bg-[#f7faf3]"}`}><BadgeCheck className="mr-2 h-4 w-4" /> {endorsed ? "Confirmed by you" : "I also face this"}</Button><Button variant="ghost" onClick={() => toast.message("This would open a short verification form in the full platform")} className="rounded-full text-[#49635a] hover:bg-[#e3ece1] hover:text-[#244d40]">Share a detail</Button></div></article></div>
        </section>}
      </div>
    </main>
  );
}
