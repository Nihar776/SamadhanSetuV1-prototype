/**
 * Village Signal design reminder: the industry workspace is a calm, practical solution marketplace.
 * Keep summaries useful but intentionally high-level; protected technical details stay out of the public card view.
 */
import { useEffect, useState } from "react";
import { Link, useLocation } from "wouter";
import { ArrowLeft, ArrowRight, CheckCircle2, Factory, FileLock2, Handshake, LogOut, MapPin, ShieldCheck, X } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { PortalSession, SESSION_KEY } from "@/lib/portalRoles";

type Solution = {
  category: string;
  categoryClass: string;
  status: string;
  problem: string;
  location: string;
  university: string;
  summary: string;
  impact: string;
  resources: string;
};

const solutions: Solution[] = [
  {
    category: "Water Supply",
    categoryClass: "bg-[#e6f2e8] text-[#176b4d]",
    status: "Pilot-ready",
    problem: "Broken rural pipeline",
    location: "Jharia block · Dhanbad",
    university: "IIT Bombay — Department of Civil Engineering",
    summary: "A modular pressure-monitoring kit that flags leak zones early and helps local maintenance teams prioritise repairs.",
    impact: "Designed for low-power use and simple field maintenance.",
    resources: "Pilot hardware + field testing",
  },
  {
    category: "Infrastructure",
    categoryClass: "bg-[#fff1d6] text-[#8a5b13]",
    status: "Prototype ready",
    problem: "Damaged village road",
    location: "Khunti district · Rural corridor",
    university: "BIT Mesra — Department of Civil & Environmental Engineering",
    summary: "A low-cost road-condition mapping approach that combines community reports with repeatable field scoring for repair planning.",
    impact: "Supports transparent prioritisation across village road networks.",
    resources: "Field partner + deployment mentor",
  },
  {
    category: "Agriculture",
    categoryClass: "bg-[#e8f0df] text-[#4f6c28]",
    status: "Team formed",
    problem: "Crop drying losses",
    location: "Lohardaga · Smallholder clusters",
    university: "Birsa Agricultural University — Department of Agricultural Engineering",
    summary: "A compact solar crop dryer designed to reduce post-harvest loss while working with small farm batches and local materials.",
    impact: "Aims to extend shelf life without grid dependence.",
    resources: "Fabrication support + pilot farms",
  },
  {
    category: "Sanitation",
    categoryClass: "bg-[#f2e9e3] text-[#8b5a40]",
    status: "Early concept",
    problem: "Market waste collection",
    location: "Ranchi · Ward 12 market",
    university: "NIT Jamshedpur — Centre for Sustainable Systems",
    summary: "A route-planning and source-separation model for market waste that makes collection gaps visible to local operators.",
    impact: "Built around simple daily routines and measurable diversion targets.",
    resources: "Operations partner + data support",
  },
  {
    category: "Public Health",
    categoryClass: "bg-[#e5eef2] text-[#3a6671]",
    status: "Prototype ready",
    problem: "Medicine access in remote areas",
    location: "Simdega · Rural health centres",
    university: "Central University of Jharkhand — Department of Computer Science",
    summary: "A lightweight stock-visibility workflow to help health workers flag essential medicine shortages before the next delivery cycle.",
    impact: "Prioritises visibility and escalation over complex infrastructure.",
    resources: "Implementation partner + trial sites",
  },
  {
    category: "Education",
    categoryClass: "bg-[#eee9f1] text-[#6a4d75]",
    status: "Open for interest",
    problem: "Accessible learning resources",
    location: "Palamu · Government schools",
    university: "XLRI Jamshedpur — School of Digital Learning",
    summary: "A local-language resource kit and distribution workflow for classrooms with limited connectivity and shared devices.",
    impact: "Keeps content usable offline and easy for teachers to adapt.",
    resources: "Content partner + distribution network",
  },
];

export default function IndustryDashboard({ session }: { session?: PortalSession }) {
  const [, setLocation] = useLocation();
  const [activeSession, setActiveSession] = useState<PortalSession | null>(session || null);
  const [selectedSolution, setSelectedSolution] = useState<Solution | null>(null);
  const [requestSent, setRequestSent] = useState(false);

  useEffect(() => {
    if (session) return;
    try {
      const stored = localStorage.getItem(SESSION_KEY);
      const parsed = stored ? (JSON.parse(stored) as PortalSession) : null;
      if (parsed?.role === "industry") setActiveSession(parsed);
      else setLocation("/access/industry");
    } catch {
      setLocation("/access/industry");
    }
  }, [session, setLocation]);

  if (!activeSession) {
    return <main className="grid min-h-screen place-items-center bg-[#fbf8ef] px-4 text-center"><p className="font-bold text-[#315248]">Preparing the solution marketplace…</p></main>;
  }

  const displayName = activeSession.displayName || "Industry partner";
  const handleSignOut = () => {
    localStorage.removeItem(SESSION_KEY);
    toast.message("You have signed out of this prototype workspace.");
    setLocation("/");
  };

  return (
    <main className="min-h-screen bg-[#f4f6ee] text-[#19332b]">
      <header className="border-b border-[#d5e0d3] bg-[#fffdf6]">
        <div className="mx-auto flex h-[74px] max-w-[1440px] items-center justify-between px-4 sm:px-6 lg:px-10">
          <Link href="/" className="flex items-center gap-3 rounded-md"><img src="/manus-storage/village-signal-mark_01384756.png" className="h-10 w-10" alt="SamadhanSetu symbol" /><span><span className="block font-bold tracking-[-0.02em]">SamadhanSetu</span><span className="block text-[11px] font-semibold uppercase tracking-[0.12em] text-[#6b7b73]">Industry solution marketplace</span></span></Link>
          <div className="flex items-center gap-3"><span className="hidden text-sm font-semibold text-[#5d7067] sm:inline">Signed in as <strong className="text-[#244d40]">{displayName}</strong></span><Button variant="outline" onClick={handleSignOut} className="rounded-full border-[#bfcebf] bg-white text-[#36594c] hover:bg-[#eef4eb]"><LogOut className="mr-2 h-4 w-4" /> Sign out</Button></div>
        </div>
      </header>

      <div className="mx-auto max-w-[1320px] px-4 py-8 sm:px-6 lg:px-10 lg:py-11">
        <Link href="/" className="brand-back"><ArrowLeft className="h-4 w-4" /> Back to SamadhanSetu</Link>
        <div className="mt-8 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl"><div className="flex items-center gap-2 text-sm font-bold text-[#176b4d]"><Factory className="h-4 w-4" /> Collaboration desk</div><h1 className="mt-4 font-display text-4xl font-semibold tracking-[-0.05em] sm:text-6xl">Practical ideas, ready for the right partner.</h1><p className="mt-4 max-w-2xl text-base leading-7 text-[#597066]">Browse high-level university solution summaries. Express interest when your expertise, resources, or pilot capacity can help. Technical details stay protected until the next approved step.</p></div>
          <div className="flex w-fit items-center gap-2 rounded-full border border-[#c7d5c5] bg-[#fffdf6] px-4 py-2.5 text-sm font-bold text-[#315248]"><MapPin className="h-4 w-4 text-[#176b4d]" /> Jharkhand focus</div>
        </div>

        <div className="mt-8 grid gap-3 sm:grid-cols-3"><div className="market-stat"><span>06</span><p>solution summaries</p></div><div className="market-stat"><span>04</span><p>pilot-ready ideas</p></div><div className="market-stat"><span>08</span><p>active university teams</p></div></div>

        <div className="mt-10 flex items-end justify-between gap-5"><div><p className="eyebrow">University submissions</p><h2 className="mt-2 font-display text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">Find a problem worth building around.</h2></div><span className="hidden items-center gap-2 text-sm font-semibold text-[#65776e] sm:flex"><ShieldCheck className="h-4 w-4 text-[#176b4d]" /> Public summaries only</span></div>

        <div className="mt-7 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {solutions.map((solution) => (
            <article key={solution.problem} className="marketplace-card flex flex-col">
              <div className="flex items-center justify-between gap-3"><span className={`rounded-full px-3 py-1.5 text-xs font-extrabold ${solution.categoryClass}`}>{solution.category}</span><span className="text-xs font-bold text-[#728178]">{solution.status}</span></div>
              <p className="mt-6 text-xs font-extrabold uppercase tracking-[0.13em] text-[#6a7c72]">Problem</p>
              <h3 className="mt-2 font-display text-3xl font-semibold leading-tight tracking-[-0.04em] text-[#19332b]">{solution.problem}</h3>
              <p className="mt-2 flex items-center gap-1.5 text-sm font-semibold text-[#5c7167]"><MapPin className="h-4 w-4 text-[#176b4d]" /> {solution.location}</p>
              <div className="mt-5 border-t border-[#e0e8dd] pt-5"><p className="text-sm font-extrabold text-[#315248]">Authored By:</p><p className="mt-1 text-sm font-semibold leading-6 text-[#4e665b]">{solution.university}</p></div>
              <div className="mt-5"><p className="text-sm font-extrabold text-[#315248]">Solution Summary</p><p className="mt-2 text-sm leading-6 text-[#64776d]">{solution.summary}</p></div>
              <div className="mt-5 rounded-xl bg-[#f4f7ef] p-3.5 text-sm leading-6 text-[#50675b]"><strong className="text-[#315248]">Potential impact:</strong> {solution.impact}</div>
              <div className="mt-auto pt-6"><Button onClick={() => { setSelectedSolution(solution); setRequestSent(false); }} className="h-11 w-full rounded-full bg-[#176b4d] font-bold text-white hover:bg-[#0f573d]">Request Meeting &amp; Sign NDA <ArrowRight className="ml-2 h-4 w-4" /></Button></div>
            </article>
          ))}
        </div>
      </div>

      {selectedSolution && <div className="fixed inset-0 z-50 grid place-items-center bg-[#15392d]/55 p-4 backdrop-blur-sm" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setSelectedSolution(null); }}>
        <div className="w-full max-w-lg rounded-[26px] border border-[#d6e0d4] bg-[#fffdf6] p-6 shadow-2xl sm:p-8" role="dialog" aria-modal="true" aria-labelledby="request-dialog-title">
          <div className="flex items-start justify-between gap-4"><div><span className="inline-flex items-center gap-2 rounded-full bg-[#eaf3e7] px-3 py-1.5 text-xs font-extrabold text-[#176b4d]"><Handshake className="h-4 w-4" /> Collaboration request</span><h2 id="request-dialog-title" className="mt-4 font-display text-3xl font-semibold tracking-[-0.04em]">{requestSent ? "Your request is on its way." : "Keep the next step clear."}</h2></div><button type="button" onClick={() => setSelectedSolution(null)} aria-label="Close request dialog" className="grid h-9 w-9 place-items-center rounded-full text-[#557066] hover:bg-[#eef3eb]"><X className="h-5 w-5" /></button></div>
          {requestSent ? <div className="mt-6"><div className="flex items-start gap-3 rounded-xl bg-[#eaf3e7] p-4 text-sm leading-6 text-[#315248]"><CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#176b4d]" /><p><strong>Meeting request recorded for this prototype.</strong> The university team would receive your interest and propose a time.</p></div><p className="mt-5 text-sm leading-6 text-[#66786e]">A confidentiality step would appear before any protected technical access. This simulation does not create a legally binding agreement.</p><Button onClick={() => setSelectedSolution(null)} className="mt-6 rounded-full bg-[#176b4d] px-6 font-bold text-white hover:bg-[#0f573d]">Done</Button></div> : <div className="mt-6"><p className="text-sm leading-6 text-[#5f7268]">You are requesting a meeting about <strong className="text-[#315248]">{selectedSolution.problem}</strong>, authored by <strong className="text-[#315248]">{selectedSolution.university}</strong>.</p><div className="mt-5 flex items-start gap-3 rounded-xl border border-[#e6d8b4] bg-[#fff8e9] p-4 text-sm leading-6 text-[#75521a]"><FileLock2 className="mt-0.5 h-5 w-5 shrink-0" /><p><strong>Protected details stay closed.</strong> This card only shows a high-level summary. Technical documentation would require a separate simulated confidentiality step.</p></div><div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end"><Button variant="outline" onClick={() => setSelectedSolution(null)} className="rounded-full border-[#bfcebf] bg-white text-[#36594c]">Cancel</Button><Button onClick={() => { setRequestSent(true); toast.success("Meeting request simulated"); }} className="rounded-full bg-[#176b4d] px-6 font-bold text-white hover:bg-[#0f573d]">Continue with request <ArrowRight className="ml-2 h-4 w-4" /></Button></div></div>}
        </div>
      </div>}
    </main>
  );
}
