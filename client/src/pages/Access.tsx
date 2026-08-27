/**
 * Village Signal design reminder: this is a low-friction civic access experience.
 * Keep identity prompts transparent, forms short, and non-human visual cues calm and practical.
 */
import { FormEvent, useEffect } from "react";
import { Link, useLocation, useParams } from "wouter";
import { ArrowLeft, ArrowRight, CheckCircle2, FileCheck2, LockKeyhole, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { PortalRole, PortalSession, SESSION_KEY, isPortalRole, roleDetails } from "@/lib/portalRoles";

type Field = {
  id: string;
  label: string;
  hint?: string;
  placeholder?: string;
  type?: "text" | "file" | "textarea";
  accept?: string;
};

const formDetails: Record<PortalRole, { eyebrow: string; heading: string; intro: string; primaryField: string; fields: Field[] }> = {
  citizen: {
    eyebrow: "Citizen sign-in",
    heading: "Begin with your local experience.",
    intro: "A few details help us keep your updates relevant to your area and your reported challenge.",
    primaryField: "fullName",
    fields: [
      { id: "fullName", label: "Your full name", placeholder: "Enter your name" },
      { id: "identityReference", label: "Identity check reference", hint: "Use the reference you would provide for account verification.", placeholder: "Enter your reference" },
      { id: "area", label: "Locality or village", placeholder: "For example: Doranda, Ranchi" },
      { id: "postalCode", label: "Postal code", placeholder: "Enter your six-digit postal code" },
      { id: "challenge", label: "What challenge are you facing?", hint: "A short description is enough to open your local workspace.", placeholder: "For example: The community handpump has not provided water this week.", type: "textarea" },
    ],
  },
  university: {
    eyebrow: "University / HEI sign-in",
    heading: "Connect your expertise to local challenges.",
    intro: "Set up an institutional workspace so matching challenges can reach the right academic teams.",
    primaryField: "institutionName",
    fields: [
      { id: "institutionName", label: "Institution name", placeholder: "Enter your university or HEI name" },
      { id: "identityReference", label: "Institution verification reference", hint: "Use an internal reference for the authorised institutional contact.", placeholder: "Enter your verification reference" },
      { id: "serviceArea", label: "Campus or service area", placeholder: "For example: Dhanbad, Jharkhand" },
      { id: "expertise", label: "Specialist disciplines", hint: "Separate fields with commas.", placeholder: "For example: Civil engineering, water systems, data science" },
      { id: "proof", label: "Authorised representative document", hint: "Accepted in this prototype only; no file is uploaded to a server.", type: "file", accept: ".pdf,.png,.jpg,.jpeg" },
    ],
  },
  government: {
    eyebrow: "Government authority sign-in",
    heading: "Keep local priorities moving responsibly.",
    intro: "Use an authorised account profile to review, verify, and monitor challenges in your service area.",
    primaryField: "fullName",
    fields: [
      { id: "fullName", label: "Authorised officer name", placeholder: "Enter your full name" },
      { id: "identityReference", label: "Official verification reference", hint: "Use the reference required for an authorised public-service account.", placeholder: "Enter your official reference" },
      { id: "proof", label: "Official identity document", hint: "Accepted in this prototype only; no file is uploaded to a server.", type: "file", accept: ".pdf,.png,.jpg,.jpeg" },
    ],
  },
  industry: {
    eyebrow: "Industry partner sign-in",
    heading: "Bring practical capability to promising pilots.",
    intro: "A verified partner profile helps universities and local authorities understand how you can contribute.",
    primaryField: "ownerName",
    fields: [
      { id: "ownerName", label: "Primary contact name", placeholder: "Enter the owner or authorised contact" },
      { id: "identityReference", label: "Identity check reference", hint: "Use the reference required for partner verification.", placeholder: "Enter your verification reference" },
      { id: "gstin", label: "GST identification number", placeholder: "Enter your GSTIN" },
      { id: "companyName", label: "Registered organisation name", placeholder: "Enter your company name" },
      { id: "sector", label: "Sector and core expertise", placeholder: "For example: Renewable energy, water systems" },
      { id: "proof", label: "Organisation PAN document", hint: "Accepted in this prototype only; no file is uploaded to a server.", type: "file", accept: ".pdf,.png,.jpg,.jpeg" },
    ],
  },
};

function AccessChooser() {
  const [, setLocation] = useLocation();

  return (
    <main className="access-shell">
      <section className="mx-auto max-w-[1160px] px-4 py-10 sm:px-6 sm:py-14 lg:px-10">
        <Link href="/" className="brand-back"><ArrowLeft className="h-4 w-4" /> Back to Village Signal</Link>
        <div className="mt-10 max-w-2xl">
          <p className="eyebrow">Choose your workspace</p>
          <h1 className="mt-3 font-display text-5xl font-semibold tracking-[-0.05em] text-[#19332b] sm:text-6xl">How will you take part?</h1>
          <p className="mt-5 max-w-xl text-base leading-7 text-[#587066]">Select the role that best describes your connection to a local challenge. You will see only the information and actions that matter to your work.</p>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {(Object.keys(roleDetails) as PortalRole[]).map((role) => {
            const detail = roleDetails[role];
            const Icon = detail.Icon;
            return (
              <button key={role} onClick={() => setLocation(`/access/${role}`)} className="access-role-card text-left">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-[#eaf2e6] text-[#176b4d]"><Icon className="h-6 w-6" /></span>
                <h2 className="mt-6 text-xl font-extrabold text-[#244d40]">{detail.shortTitle}</h2>
                <p className="mt-2 max-w-md text-sm leading-6 text-[#5d7168]">{detail.description}</p>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[#176b4d]">Continue <ArrowRight className="h-4 w-4" /></span>
              </button>
            );
          })}
        </div>
      </section>
    </main>
  );
}

export default function Access() {
  const params = useParams<{ role?: string }>();
  const [, setLocation] = useLocation();
  const role = params.role;

  useEffect(() => {
    if (role !== undefined && !isPortalRole(role)) setLocation("/access");
  }, [role, setLocation]);

  if (!isPortalRole(role)) return <AccessChooser />;

  const detail = roleDetails[role];
  const form = formDetails[role];
  const Icon = detail.Icon;

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const profile: Record<string, string> = {};
    data.forEach((value, key) => {
      if (typeof value === "string") profile[key] = value.trim();
    });

    const session: PortalSession = {
      role,
      displayName: profile[form.primaryField] || detail.shortTitle,
      profile,
      signedInAt: new Date().toISOString(),
    };

    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    toast.success(`${detail.shortTitle} workspace ready`, { description: "This prototype saves your profile details only in this browser." });
    setLocation(`/workspace/${role}`);
  };

  return (
    <main className="access-shell">
      <div className="mx-auto grid min-h-screen max-w-[1440px] lg:grid-cols-[1.03fr_0.97fr]">
        <section className="flex px-4 py-8 sm:px-8 sm:py-10 lg:px-14 lg:py-12">
          <div className="mx-auto flex w-full max-w-[570px] flex-col">
            <Link href="/access" className="brand-back"><ArrowLeft className="h-4 w-4" /> Choose another workspace</Link>
            <div className="mt-10">
              <div className="flex items-center gap-3"><span className="grid h-11 w-11 place-items-center rounded-2xl bg-[#e7f0e4] text-[#176b4d]"><Icon className="h-5 w-5" /></span><p className="eyebrow">{form.eyebrow}</p></div>
              <h1 className="mt-5 font-display text-4xl font-semibold tracking-[-0.05em] text-[#19332b] sm:text-5xl">{form.heading}</h1>
              <p className="mt-4 max-w-xl text-base leading-7 text-[#5a7066]">{form.intro}</p>
            </div>

            <form onSubmit={handleSubmit} className="mt-9 space-y-5 rounded-[26px] border border-[#d7e2d3] bg-[#fffdf6] p-5 shadow-[0_14px_34px_rgba(29,56,44,0.08)] sm:p-7">
              <div className="flex items-start gap-3 border-b border-[#e3eadf] pb-5 text-sm leading-6 text-[#5a6e64]"><LockKeyhole className="mt-0.5 h-5 w-5 shrink-0 text-[#176b4d]" /><p><strong className="text-[#315248]">Prototype privacy note:</strong> Your details are used only to demonstrate role-based routing. Files are not uploaded or retained.</p></div>
              {form.fields.map((field) => (
                <div key={field.id}>
                  <label className="form-label" htmlFor={field.id}>{field.label} <span className="text-[#a3641c]">*</span></label>
                  {field.type === "textarea" ? (
                    <Textarea id={field.id} name={field.id} required rows={4} placeholder={field.placeholder} className="auth-input resize-none" />
                  ) : field.type === "file" ? (
                    <Input id={field.id} name={field.id} required type="file" accept={field.accept} className="auth-file-input" />
                  ) : (
                    <Input id={field.id} name={field.id} required placeholder={field.placeholder} className="auth-input" />
                  )}
                  {field.hint && <p className="mt-2 text-xs leading-5 text-[#718078]">{field.hint}</p>}
                </div>
              ))}
              <Button type="submit" className="mt-2 h-12 w-full rounded-full bg-[#176b4d] text-base font-bold text-white hover:bg-[#0f573d]">{detail.action}<ArrowRight className="ml-2 h-4 w-4" /></Button>
            </form>
          </div>
        </section>

        <aside className="relative hidden overflow-hidden bg-[#e6eee2] lg:block">
          <img src={detail.image} alt={detail.imageAlt} className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-[#153d30]/80 via-[#153d30]/20 to-transparent" />
          <div className="absolute bottom-12 left-12 right-12 max-w-md text-white">
            <div className="mb-4 flex items-center gap-2 text-sm font-bold uppercase tracking-[0.13em] text-[#e7c171]"><ShieldCheck className="h-4 w-4" /> Clear, controlled access</div>
            <p className="font-display text-4xl font-semibold leading-tight tracking-[-0.04em]">The right people see the next responsible action.</p>
          </div>
        </aside>
      </div>
    </main>
  );
}
