# Design exploration — Societal Innovation Collaboration Portal

## Three directions considered

### Theme Name: Civic Field Notes
**Very Brief Intro:** A calm, paper-inspired public-service interface that feels trustworthy and easy to use, even for someone new to digital platforms. Natural green and warm paper tones make community progress feel visible rather than bureaucratic.

**Probability:** 0.07

### Theme Name: Village Signal
**Very Brief Intro:** A warm, high-contrast civic noticeboard with gentle maps, clear status markers, and strong action language. It prioritizes quick reporting and makes every step in the resolution journey easy to understand.

**Probability:** 0.03

### Theme Name: Civic Ledger
**Very Brief Intro:** An understated institutional workspace inspired by government registers and academic field books. It is highly structured and credible, with a restrained palette and dense-but-clear information hierarchy.

**Probability:** 0.08

---

## Chosen direction: Village Signal

### Design Movement
**Human-centered public-service design** informed by Indian civic noticeboards, wayfinding systems, and accessible mobile-first service interfaces.

### Core Principles
1. **One clear action per moment:** The main path—report a challenge—remains visible and understandable without technical language.
2. **Progress earns trust:** Plain-language status markers make it evident what happens after a report is submitted.
3. **Inclusive by default:** Large targets, visible labels, high contrast, language choice, and low-reading-load UI serve citizens alongside institutional users.
4. **Structured collaboration:** Universities, industry, and government receive concise, work-oriented panels without overwhelming the public interface.

### Color Philosophy
The visual language starts from **warm rice-paper white** for safety and familiarity, uses **Jharkhand green** for productive action and confirmed progress, and a small amount of **marigold amber** to call attention to pending steps. The palette should feel grounded and civic—not corporate, clinical, or overly technological.

### Layout Paradigm
Use a **civic noticeboard** structure: a narrow utility header, a confident action band, then offset information panels that read like pinned field updates. The citizen action surface comes first; institutional information recedes into organized side panels and role-specific views.

### Signature Elements
1. A stepped **journey ribbon** showing the current problem-resolution path.
2. A dotted **location pulse** motif that connects the local issue to larger collaboration.
3. Compact **field-note cards** with an offset accent edge instead of uniform, floating rounded rectangles.

### Interaction Philosophy
Interactions should affirm the user’s next action quickly: buttons change state immediately, status filters are obvious, and dialogs use clear completion language. Prototype behavior should rely on understandable choices rather than hidden gestures or dense menus.

### Animation
Use restrained 160–220ms ease-out transitions. Panels may fade upward slightly on load; the journey ribbon can advance with a subtle horizontal fill when a user submits a report. Hover effects are limited to a soft lift and color shift. All non-essential animation respects reduced-motion settings.

### Typography System
Use **Newsreader** for brief, human headline moments and **Noto Sans** for all task-focused copy, form labels, and dashboard information. Headings are medium-weight and sentence case; body copy stays at a comfortable 16px minimum with generous line height. No all-caps paragraphs or overly compressed labels.

### Brand Essence
**A shared civic workspace that turns local challenges into visible, collaborative solutions for Jharkhand.**

Personality: **grounded, transparent, encouraging**.

### Brand Voice
Headlines and CTAs should be direct, respectful, and outcome-led. Avoid institutional jargon and vague encouragement.

Example lines:
- “Start with the problem you see nearby.”
- “Your report is now moving toward a solution.”

### Wordmark & Logo
The symbol is a **four-part rising marker**: four solid forms converge into an upward location pin, representing citizen, university, industry, and government working toward one verified outcome. The logo contains no generated text; the wordmark is set separately in Noto Sans.

### Signature Brand Color
**Jharkhand Green — #176B4D.**

## Prototype scope

The first prototype is frontend-only and demonstrates the primary service experience. It includes an accessible public landing and report flow, a sample local challenge feed with verification actions, a universal resolution tracker, and concise role-view panels for universities, industry partners, and government administrators. All buttons that do not change local prototype state will clearly show a “prototype action” confirmation rather than imply a completed backend process.

## Style Decisions

- The role-specific sign-in experience will use **non-human editorial objects and environments only**. It must not depict people, faces, hands, or silhouettes; the access screens remain warm, grounded, and recognisably civic through objects such as maps, public infrastructure, study tools, and workshop prototypes.
- Every sign-in form will use plain-language field labels and explain that it is a frontend-only prototype. Identity references and selected documents support the demonstration of routing but are neither uploaded nor retained.
