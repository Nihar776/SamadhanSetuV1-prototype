/**
 * Village Signal design reminder: role vocabulary remains clear, respectful, and action-oriented.
 * These role definitions power simple access paths rather than technical account jargon.
 */
import { Building2, Factory, GraduationCap, Landmark, type LucideIcon } from "lucide-react";

export type PortalRole = "citizen" | "university" | "industry" | "government";

export type PortalSession = {
  role: PortalRole;
  displayName: string;
  profile: Record<string, string>;
  signedInAt: string;
};

export const SESSION_KEY = "village-signal-session";

export const roleDetails: Record<PortalRole, {
  title: string;
  shortTitle: string;
  description: string;
  workspace: string;
  action: string;
  Icon: LucideIcon;
  image: string;
  imageAlt: string;
}> = {
  citizen: {
    title: "Citizen access",
    shortTitle: "Citizen",
    description: "Share a local challenge and follow the progress made in your area.",
    workspace: "My local workspace",
    action: "Continue to my workspace",
    Icon: Building2,
    image: "/manus-storage/village-signal-citizen-access_73b908bb.png",
    imageAlt: "An illustrated village handpump, location signal, and smartphone with a check symbol",
  },
  university: {
    title: "University / HEI access",
    shortTitle: "University / HEI",
    description: "Review matched challenges and organise academic teams around practical solutions.",
    workspace: "University problem board",
    action: "Enter university workspace",
    Icon: GraduationCap,
    image: "/manus-storage/village-signal-university-access_2a4c336e.png",
    imageAlt: "An illustrated study desk with academic notes and a water-quality prototype",
  },
  industry: {
    title: "Industry partner access",
    shortTitle: "Industry partner",
    description: "Find promising pilots where your expertise, resources, or mentorship can help.",
    workspace: "Partner collaboration desk",
    action: "Enter partner workspace",
    Icon: Factory,
    image: "/manus-storage/village-signal-industry-access_ab1180c7.png",
    imageAlt: "An illustrated workshop bench with a solar panel and irrigation prototype",
  },
  government: {
    title: "Government authority access",
    shortTitle: "Government authority",
    description: "Review local priorities, verify reports, and keep implementation accountable.",
    workspace: "Local verification desk",
    action: "Enter verification desk",
    Icon: Landmark,
    image: "/manus-storage/village-signal-government-access_5f48cdd2.png",
    imageAlt: "An illustrated civic planning table with a district map and approval stamp",
  },
};

export const isPortalRole = (value: string | undefined): value is PortalRole =>
  value === "citizen" || value === "university" || value === "industry" || value === "government";
