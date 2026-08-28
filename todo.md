# SamadhanSetu visual edit verification

- [x] Verify the SamadhanSetu brand update in the landing header and visible app navigation.
- [x] Remove the citizen-only community confirmation module from the landing page.
- [x] Move the community confirmation module into the citizen dashboard.
- [x] Preserve the confirmation and share-detail interactions in the dashboard.
- [x] Run the frontend type check.
- [ ] Save a new checkpoint after final validation.

## Findings

- The landing header, footer, access page, workspace header, and industry marketplace now use SamadhanSetu for visible branding.
- The community confirmation section is no longer rendered by Home.tsx.
- The citizen workspace renders the moved section conditionally for the citizen role only.
- The citizen dashboard uses the existing non-human community illustration and retains confirmation feedback actions.
- The requested edit had previously been represented only by a JSX comment; it is now implemented structurally.
- The latest TypeScript check passed.
- The landing and citizen access pages were visually reviewed after the changes.

## Notes

- Internal design-reminder comments may still refer to the original Village Signal direction; visible user-facing branding has been updated to SamadhanSetu.
- The project remains a static prototype; the citizen confirmation action is simulated.

## Latest section relocation request

- [x] Verify whether the journey section remains on the landing page.
- [x] Verify whether the citizen reporting section remains on the landing page.
- [x] Move both requested sections into the citizen dashboard if they are still present.
- [x] Validate the landing page and citizen dashboard, then create a checkpoint.

The user’s latest visual intent applies to the sections previously targeted near lines 235 and 265 in Home.tsx.
