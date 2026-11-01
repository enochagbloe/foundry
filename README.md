# The Foundry

Minimal, responsive one-page React website for The Foundry. Brand colours and gradient direction follow the supplied artwork; content follows the supplied profile. GSAP provides entrance and scroll animations with reduced-motion support.

## Run

```sh
npm install
npm run dev
```

`npm run build` generates `dist/`. Netlify uses the included `netlify.toml`.

## Ticket enquiries

The form uses Netlify Forms. Enable form detection in the Netlify dashboard, deploy, then confirm `ticket-enquiry` appears under Forms and configure submission notifications for the organiser. The hidden HTML form supports build-time detection. Local preview does not submit. No payment is taken and no booking is confirmed. Review the event details and configure form notifications before promoting the website.

The profile did not supply an organiser name, email, social handles, or registration URL, so these have not been invented. Fonts are loaded from Google Fonts, with local sans-serif fallbacks.
