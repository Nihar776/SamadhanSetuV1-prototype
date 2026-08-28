/**
 * Village Signal design reminder: each workspace is a calm, role-specific civic action board.
 * Show only essential next steps and preserve the shared community-outcome context.
 */
import { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "wouter";
import { ArrowRight, Bell, Building2, Camera, Check, CheckCircle2, ClipboardCheck, FileText, LogOut, MapPin, Mic, Send, ShieldCheck, Sparkles } from "lucide-react";
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
  const [citizenSubmitted, setCitizenSubmitted] = useState(false);
  const [citizenVoiceActive, setCitizenVoiceActive] = useState(false);
  const [citizenEvidenceName, setCitizenEvidenceName] = useState("");
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

        {role === "citizen" && <>
          <section className="mt-7 rounded-[26px] border border-[#d5e0d3] bg-[#eef3e9] p-5 sm:p-8">
            <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end"><div><p className="eyebrow">A transparent journey</p><h2 className="mt-3 max-w-2xl font-display text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">Your report is moving toward a solution.</h2></div><p className="max-w-md text-sm leading-6 text-[#5a7066]">See the next responsible step without technical language or guesswork.</p></div>
            <div className="mt-7 overflow-x-auto pb-2"><div className="min-w-[640px] rounded-[20px] border border-[#d1ddce] bg-[#fffdf6] p-5"><div className="flex items-start">{[{ label: "Reported", state: "complete" }, { label: "Verified", state: "complete" }, { label: "Matched", state: "active" }, { label: "In progress", state: "upcoming" }, { label: "Resolved", state: "upcoming" }].map((step, index, steps) => <div className="flex min-w-0 flex-1 items-start" key={step.label}><div className="flex min-w-[92px] flex-col items-start"><span className={`grid h-9 w-9 place-items-center rounded-full border-2 ${step.state === "complete" ? "border-[#176b4d] bg-[#176b4d] text-white" : step.state === "active" ? "border-[#e5a53a] bg-[#fff5df] text-[#966114]" : "border-[#c8d4c8] bg-[#fffdf6] text-[#9aa8a0]"}`}>{step.state === "complete" ? <Check className="h-4 w-4" /> : <span className="text-xs font-bold">{index + 1}</span>}</span><span className={`mt-2 text-xs font-bold ${step.state === "upcoming" ? "text-[#829088]" : "text-[#244d40]"}`}>{step.label}</span></div>{index < steps.length - 1 && <div className={`mt-4 h-[2px] flex-1 ${index < 2 ? "bg-[#176b4d]" : "bg-[#d3ddd2]"}`} />}</div>)}</div></div></div>
          </section>

          <section className="mt-7 grid gap-7 rounded-[26px] border border-[#d5e0d3] bg-[#fffdf6] p-5 sm:p-8 lg:grid-cols-[0.72fr_1.28fr]">
            <div><p className="eyebrow">For citizens and local groups</p><h2 className="mt-3 font-display text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">Tell us what needs attention.</h2><p className="mt-4 max-w-md text-sm leading-6 text-[#587066]">Use simple words and add evidence. A local team will review your report before it moves forward.</p><div className="mt-6 border-l-4 border-[#e5a53a] pl-4 text-sm leading-6 text-[#4d665b]"><strong className="text-[#244d40]">Prototype note:</strong> This dashboard form demonstrates the citizen reporting flow and does not send information to a government service.</div></div>
            <div className="field-note-card p-5 sm:p-7">{citizenSubmitted ? <div className="flex min-h-[300px] flex-col items-start justify-center"><span className="grid h-12 w-12 place-items-center rounded-full bg-[#dcebdd] text-[#176b4d]"><Check className="h-6 w-6" /></span><p className="mt-5 text-sm font-bold uppercase tracking-[0.13em] text-[#176b4d]">Report received</p><h3 className="mt-2 font-display text-3xl font-semibold tracking-[-0.04em]">Thank you for speaking up.</h3><p className="mt-3 text-sm leading-6 text-[#557066]">Your challenge is now in the review queue for this prototype.</p><Button className="mt-6 rounded-full bg-[#176b4d] px-5 font-bold text-white hover:bg-[#0f573d]" onClick={() => setCitizenSubmitted(false)}>Report another challenge</Button></div> : <form onSubmit={(event) => { event.preventDefault(); setCitizenSubmitted(true); toast.success("Citizen report simulated"); }} className="space-y-5"><div className="flex items-center justify-between gap-4 border-b border-[#e3e7db] pb-4"><div><p className="text-lg font-bold text-[#244d40]">Report a local challenge</p><p className="mt-1 text-sm text-[#63766d]">Fields marked with an asterisk are required.</p></div><span className="hidden items-center gap-1.5 rounded-full bg-[#eff5ec] px-3 py-1.5 text-xs font-bold text-[#176b4d] sm:flex"><ShieldCheck className="h-4 w-4" /> Private by default</span></div><div><label className="form-label" htmlFor="dashboard-category">Problem category *</label><select id="dashboard-category" required className="form-input"><option value="">Choose the closest topic</option><option>Infrastructure</option><option>Water Supply</option><option>Sanitation</option><option>Public Health</option><option>Agriculture</option></select><p className="mt-2 text-xs text-[#718078]">Auto-categorized by AI</p></div><div><div className="flex items-center justify-between gap-3"><label className="form-label mb-2" htmlFor="dashboard-issue">What is happening? *</label>{citizenVoiceActive && <span className="mb-2 text-xs font-bold text-[#176b4d]">Voice draft captured</span>}</div><div className="relative"><textarea id="dashboard-issue" required rows={4} className="form-input resize-none pr-16" placeholder="For example: Water has not reached our handpump for three days." /><button type="button" aria-label="Use voice-to-text" className="absolute right-3 top-3 grid h-11 w-11 place-items-center rounded-full bg-[#176b4d] text-white shadow-sm transition hover:bg-[#0f573d]" onClick={() => { setCitizenVoiceActive(true); toast.message("Voice-to-text is simulated in this prototype"); }}><Mic className="h-5 w-5" /></button></div></div><div><label className="form-label" htmlFor="dashboard-place">Your area or PIN code *</label><div className="relative"><MapPin className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#176b4d]" /><input id="dashboard-place" required className="form-input pl-9" placeholder="e.g. Ranchi, 834001" /></div></div><div><label className="form-label" htmlFor="dashboard-evidence">Upload evidence (photo/video) <span className="text-[#a3641c]">*</span></label><label htmlFor="dashboard-evidence" className="flex w-full cursor-pointer items-center gap-3 rounded-xl border border-dashed border-[#8fb696] bg-[#f7faf3] p-4 text-left transition hover:border-[#176b4d] hover:bg-[#f1f7ef]"><span className="grid h-11 w-11 place-items-center rounded-full bg-white text-[#176b4d] shadow-sm"><Camera className="h-5 w-5" /></span><span><span className="block text-sm font-bold text-[#315248]">{citizenEvidenceName || "Choose a photo or video"}</span><span className="mt-0.5 block text-xs text-[#6c7c73]">A supporting image or clip is required for this prototype submission.</span></span></label><input id="dashboard-evidence" type="file" required accept="image/*,video/*" className="sr-only" onChange={(event) => setCitizenEvidenceName(event.target.files?.[0]?.name || "")} /></div><Button type="submit" className="h-12 w-full rounded-full bg-[#176b4d] text-base font-bold text-white hover:bg-[#0f573d]">Send report <Send className="ml-2 h-4 w-4" /></Button></form>}</div>
          </section>
        </>}
      </div>
    </main>
  );
}
