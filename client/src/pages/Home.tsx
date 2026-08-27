/**
 * Village Signal design reminder: a warm civic noticeboard for inclusive public-service action.
 * Use large clear actions, progress-as-trust, and grounded Jharkhand-green details—not dense dashboards.
 */
import { FormEvent, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  BadgeCheck,
  Bell,
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
  const [activeRole, setActiveRole] = useState<RoleKey>("citizen");
  const [submitted, setSubmitted] = useState(false);
  const [endorsed, setEndorsed] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

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
            aria-label="Village Signal home"
          >
            <img
              className="h-10 w-10 object-contain"
              src="/manus-storage/village-signal-mark_01384756.png"
              alt="Village Signal symbol"
            />
            <span>
              <span className="block text-[17px] font-bold leading-none tracking-[-0.02em]">Village Signal</span>
              <span className="mt-1 block text-[11px] font-medium uppercase tracking-[0.13em] text-[#62736b]">Jharkhand collaboration portal</span>
            </span>
          </button>

          <nav className="hidden items-center gap-7 text-sm font-semibold text-[#455c52] md:flex" aria-label="Primary navigation">
            <button onClick={() => scrollTo("report")} className="nav-link">Report a challenge</button>
            <button onClick={() => scrollTo("journey")} className="nav-link">How it works</button>
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
            <Button onClick={() => scrollTo("report")} className="rounded-full bg-[#176b4d] px-5 font-bold text-white hover:bg-[#0f573d]">
              Report a challenge
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
              <button onClick={() => scrollTo("report")} className="mobile-nav-link">Report a challenge</button>
              <button onClick={() => scrollTo("journey")} className="mobile-nav-link">How it works</button>
              <button onClick={() => scrollTo("workspace")} className="mobile-nav-link">Workspaces</button>
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
                <Button onClick={() => scrollTo("report")} size="lg" className="h-14 rounded-full bg-[#176b4d] px-7 text-base font-bold text-white hover:bg-[#0f573d]">
                  Report a challenge <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button onClick={() => scrollTo("journey")} size="lg" variant="outline" className="h-14 rounded-full border-[#b8c8ba] bg-transparent px-7 text-base font-bold text-[#244d40] hover:bg-[#f0f3e9]">
                  See how it works
                </Button>
              </div>
              <div className="mt-9 flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold text-[#52675e]">
                <span className="flex items-center gap-2"><BadgeCheck className="h-5 w-5 text-[#176b4d]" /> Easy to report</span>
                <span className="flex items-center gap-2"><Languages className="h-5 w-5 text-[#176b4d]" /> Language-friendly</span>
                <span className="flex items-center gap-2"><ShieldCheck className="h-5 w-5 text-[#176b4d]" /> Clear progress</span>
              </div>
            </div>

            <div className="relative min-h-[340px] overflow-hidden rounded-[28px] border border-[#d6dfd4] bg-[#e9efe6] shadow-[0_18px_45px_rgba(29,56,44,0.10)] sm:min-h-[420px]">
              <img
                src="/manus-storage/village-signal-hero_5056f2df.png"
                alt="Community members, students, industry experts, and an official discussing a local water solution"
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute bottom-4 left-4 max-w-[270px] rounded-2xl border border-white/70 bg-[#fffdf6]/95 p-4 shadow-lg backdrop-blur sm:bottom-6 sm:left-6">
                <p className="text-xs font-bold uppercase tracking-[0.13em] text-[#176b4d]">Connected effort</p>
                <p className="mt-1 text-sm font-semibold leading-5 text-[#244236]">A local report can become a student project, a practical pilot, and a verified improvement.</p>
              </div>
            </div>
          </div>
        </section>

        <section id="journey" className="scroll-mt-24 border-b border-[#dfe4d8] bg-[#f0f3e9] py-12 sm:py-16">
          <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
            <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
              <div>
                <p className="eyebrow">A transparent journey</p>
                <h2 className="mt-3 max-w-xl font-display text-4xl font-semibold tracking-[-0.04em] text-[#19332b] sm:text-5xl">Your report is now moving toward a solution.</h2>
              </div>
              <p className="max-w-md text-base leading-7 text-[#5a7066]">Everyone sees the next responsible step. No technical language, no guessing what happens after you report.</p>
            </div>

            <div className="mt-10 overflow-x-auto pb-2">
              <div className="min-w-[700px] rounded-[22px] border border-[#d1ddce] bg-[#fbf8ef] p-5 sm:p-7">
                <div className="flex items-start">
                  {journey.map((step, index) => (
                    <div className="flex min-w-0 flex-1 items-start" key={step.label}>
                      <div className="flex min-w-[100px] flex-col items-start">
                        <span className={`grid h-10 w-10 place-items-center rounded-full border-2 ${step.state === "complete" ? "border-[#176b4d] bg-[#176b4d] text-white" : step.state === "active" ? "border-[#e5a53a] bg-[#fff5df] text-[#966114]" : "border-[#c8d4c8] bg-[#fbf8ef] text-[#9aa8a0]"}`}>
                          {step.state === "complete" ? <Check className="h-5 w-5" /> : <span className="text-sm font-bold">{index + 1}</span>}
                        </span>
                        <span className={`mt-3 text-sm font-bold ${step.state === "upcoming" ? "text-[#829088]" : "text-[#244d40]"}`}>{step.label}</span>
                      </div>
                      {index < journey.length - 1 && <div className={`mt-5 h-[2px] flex-1 ${index < 2 ? "bg-[#176b4d]" : "bg-[#d3ddd2]"}`} />}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="report" className="scroll-mt-24 border-b border-[#dfe4d8] py-14 sm:py-20">
          <div className="mx-auto grid max-w-[1240px] gap-10 px-4 sm:px-6 lg:grid-cols-[0.78fr_1.22fr] lg:px-10">
            <div>
              <p className="eyebrow">For citizens and local groups</p>
              <h2 className="mt-3 font-display text-4xl font-semibold tracking-[-0.04em] text-[#19332b] sm:text-5xl">Tell us what needs attention.</h2>
              <p className="mt-5 max-w-md text-base leading-7 text-[#587066]">Use simple words. Add a photo if it helps. A local team will review your report before it moves forward.</p>
              <div className="mt-8 border-l-4 border-[#e5a53a] pl-4 text-sm leading-6 text-[#4d665b]">
                <strong className="text-[#244d40]">Prototype note:</strong> This form demonstrates the reporting flow. It does not send information to a real government service.
              </div>
            </div>

            <div className="field-note-card p-5 sm:p-8">
              {submitted ? (
                <div className="flex min-h-[360px] flex-col items-start justify-center py-8">
                  <span className="grid h-14 w-14 place-items-center rounded-full bg-[#dcebdd] text-[#176b4d]"><Check className="h-7 w-7" /></span>
                  <p className="mt-6 text-sm font-bold uppercase tracking-[0.13em] text-[#176b4d]">Report received</p>
                  <h3 className="mt-2 font-display text-4xl font-semibold tracking-[-0.04em]">Thank you for speaking up.</h3>
                  <p className="mt-4 max-w-lg text-base leading-7 text-[#557066]">Your local challenge has been placed in the review queue. In the full platform, you would receive updates as it is checked, matched, and worked on.</p>
                  <Button className="mt-7 rounded-full bg-[#176b4d] px-6 font-bold text-white hover:bg-[#0f573d]" onClick={() => setSubmitted(false)}>Report another challenge</Button>
                </div>
              ) : (
                <form onSubmit={submitReport} className="space-y-6">
                  <div className="flex items-center justify-between gap-4 border-b border-[#e3e7db] pb-5">
                    <div>
                      <p className="text-lg font-bold text-[#244d40]">Report a local challenge</p>
                      <p className="mt-1 text-sm text-[#63766d]">Fields marked with an asterisk are required.</p>
                    </div>
                    <span className="hidden items-center gap-1.5 rounded-full bg-[#eff5ec] px-3 py-1.5 text-xs font-bold text-[#176b4d] sm:flex"><ShieldCheck className="h-4 w-4" /> Private by default</span>
                  </div>
                  <div>
                    <label className="form-label" htmlFor="issue">What is happening? *</label>
                    <textarea id="issue" required rows={4} className="form-input resize-none" placeholder="For example: Water has not reached our handpump for three days." />
                    <button type="button" className="mt-2 inline-flex items-center gap-2 text-sm font-bold text-[#176b4d] hover:text-[#0f573d]" onClick={() => toast.message("Voice reporting is represented in this prototype")}> <Mic className="h-4 w-4" /> Speak instead of typing</button>
                  </div>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label className="form-label" htmlFor="category">Choose a topic *</label>
                      <select id="category" required className="form-input">
                        <option value="">Choose a topic</option>
                        <option>Water & sanitation</option>
                        <option>Education</option>
                        <option>Healthcare</option>
                        <option>Agriculture</option>
                        <option>Roads & public spaces</option>
                        <option>Accessibility</option>
                      </select>
                    </div>
                    <div>
                      <label className="form-label" htmlFor="place">Your area or PIN code *</label>
                      <div className="relative"><MapPin className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#176b4d]" /><input id="place" required className="form-input pl-9" placeholder="e.g. Ranchi, 834001" /></div>
                    </div>
                  </div>
                  <div>
                    <p className="form-label">Add a photo or video <span className="font-normal text-[#708078]">(optional)</span></p>
                    <button type="button" className="flex w-full items-center gap-3 rounded-xl border border-dashed border-[#aac2ad] bg-[#f7faf3] p-4 text-left transition hover:border-[#176b4d] hover:bg-[#f1f7ef]" onClick={() => toast.message("Media upload is represented in this prototype")}>
                      <span className="grid h-9 w-9 place-items-center rounded-full bg-white text-[#176b4d]"><Upload className="h-4 w-4" /></span>
                      <span><span className="block text-sm font-bold text-[#315248]">Choose photo or video</span><span className="mt-0.5 block text-xs text-[#6c7c73]">A clear picture helps the local team understand the issue.</span></span>
                    </button>
                  </div>
                  <Button type="submit" className="h-12 w-full rounded-full bg-[#176b4d] text-base font-bold text-white hover:bg-[#0f573d]">Send report <Send className="ml-2 h-4 w-4" /></Button>
                </form>
              )}
            </div>
          </div>
        </section>

        <section className="border-b border-[#dfe4d8] bg-[#f0f3e9] py-14 sm:py-20">
          <div className="mx-auto grid max-w-[1240px] gap-9 px-4 sm:px-6 lg:grid-cols-[1fr_0.92fr] lg:px-10">
            <div className="overflow-hidden rounded-[26px] border border-[#d4dfd1] bg-[#e4ece1] shadow-[0_14px_35px_rgba(29,56,44,0.08)]">
              <img src="/manus-storage/village-signal-community_5c0bcfd2.png" alt="Neighbours using their phones to confirm a local water concern" className="h-full min-h-[300px] w-full object-cover" />
            </div>
            <div className="flex flex-col justify-center">
              <p className="eyebrow">Community confirmation</p>
              <h2 className="mt-3 font-display text-4xl font-semibold tracking-[-0.04em] text-[#19332b] sm:text-5xl">The people nearby can add useful context.</h2>
              <p className="mt-5 max-w-xl text-base leading-7 text-[#5a7066]">A report is stronger when local residents, community groups, and responsible officials can confirm that it matters.</p>
              <article className="mt-7 border-y border-[#cfdbcf] py-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.13em] text-[#176b4d]"><MapPin className="h-4 w-4" /> Ranchi · Ward 12</div>
                    <h3 className="mt-2 text-lg font-bold text-[#244d40]">Irregular drinking water supply</h3>
                    <p className="mt-1 text-sm leading-6 text-[#63756d]">Reported by a resident. Visible on the local community feed.</p>
                  </div>
                  <span className="shrink-0 rounded-full bg-[#fff5df] px-3 py-1.5 text-xs font-bold text-[#8f5d16]">Needs review</span>
                </div>
                <div className="mt-5 flex flex-wrap gap-3">
                  <Button variant="outline" onClick={() => { setEndorsed((value) => !value); toast.success(endorsed ? "Your confirmation was removed" : "You confirmed this affects your area"); }} className={`rounded-full border-[#b7cbb9] ${endorsed ? "bg-[#176b4d] text-white hover:bg-[#0f573d] hover:text-white" : "bg-white text-[#244d40] hover:bg-[#f7faf3]"}`}>
                    <BadgeCheck className="mr-2 h-4 w-4" /> {endorsed ? "Confirmed by you" : "I also face this"}
                  </Button>
                  <Button variant="ghost" onClick={() => toast.message("This would open a short verification form in the full platform")} className="rounded-full text-[#49635a] hover:bg-[#e3ece1] hover:text-[#244d40]">Share a detail</Button>
                </div>
              </article>
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
            <div className="overflow-hidden rounded-[24px] border border-[#cfdcca] shadow-[0_14px_30px_rgba(32,69,51,0.08)]"><img src="/manus-storage/village-signal-collaboration_5aa9b381.png" alt="Students, a mentor, an engineer, and a municipal official collaborating around an irrigation prototype" className="h-full min-h-[310px] w-full object-cover" /></div>
          </div>
        </section>
      </main>

      <footer className="bg-[#193f31] text-white">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-6 px-4 py-9 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-10">
          <div className="flex items-center gap-3"><img src="/manus-storage/village-signal-mark_01384756.png" alt="" className="h-10 w-10" /><div><p className="font-bold">Village Signal</p><p className="mt-1 text-sm text-[#c8dacb]">A prototype for community-led innovation.</p></div></div>
          <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold text-[#d7e5d9]"><button onClick={() => toast.message("Help centre is represented in this prototype")} className="footer-link"><CircleHelp className="h-4 w-4" /> Help</button><button onClick={() => toast.message("Updates are represented in this prototype")} className="footer-link"><ClipboardCheck className="h-4 w-4" /> My updates</button><button onClick={() => toast.message("Public information page is represented in this prototype")} className="footer-link"><FileText className="h-4 w-4" /> About the portal</button></div>
        </div>
      </footer>
    </div>
  );
}
