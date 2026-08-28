# Role-based sign-in prototype update

- [x] Define clear registration fields and flow for each of the four user roles.
- [x] Create a non-human sign-in visual that matches the Village Signal design system.
- [x] Add four tailored sign-in pages with accessible, clearly labeled forms.
- [x] Persist prototype user details and route each completed sign-in to the relevant workspace.
- [x] Test desktop and mobile registration, role routing, and return navigation.
- [ ] Save the revised prototype as a checkpoint and deliver it to the user.

## Validation notes

- Direct navigation to `/workspace/citizen` correctly routed an unauthenticated browser session to `/access/citizen`.
- The citizen sign-in form accepted complete prototype test details. The final submit interaction still requires browser-level confirmation and is being checked before delivery.
- A direct browser-console submission call was rejected by the browser expression parser, so the final navigation test will use a supported interaction path instead.
- Keyboard activation correctly moved focus to the citizen submission control, but the browser test harness did not yet show a location change; no runtime application error was reported.
- The supported form-submission test successfully redirected the saved citizen profile to `/workspace/citizen`, where the workspace correctly displayed the saved name and locality.
- A university test session successfully redirected to `/workspace/university`, displaying the institution name, campus area, and university-specific problem board.
- The citizen access form was checked on a mobile viewport. Labels, fields, required-state cues, and the main continuation action stayed visible, readable, and comfortably spaced.
- The clarified build passes TypeScript and production build checks.
- An industry session successfully opened `/workspace/industry` as the Industry Solution Marketplace with six university-authored solution summaries, categories, locations, concise summaries, and meeting/NDA actions.
- The industry marketplace CTA opened the collaboration request modal and the simulated meeting confirmation state displayed the confidentiality limitation clearly.

## Current requested update

- [x] Resolve the citizen identity-field conflict: use mobile number and email verification with simulated OTPs; do not use Aadhaar or government ID.
- [x] Confirm evidence upload is required for citizen issue submission.
- [x] Confirm the industry sign-in route opens a marketplace of problems and concise university solution ideas.
- [x] Apply the landing-page and issue-submission UI changes.
- [x] Build and test the Industry Dashboard with simulated meeting and confidentiality actions.
- The first solution-card CTA was activated in the browser; the modal state is being checked separately because the browser click harness does not always emit a visible state update on the first click.
