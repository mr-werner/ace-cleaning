# Ace Cleaning Modern Redesign

React + Vite starter for a modern Ace Cleaning website.

## Run locally

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
```

## Before publishing

1. Replace the Unsplash demo images with real Ace Cleaning photography.
2. Replace placeholder reviews with verified customer reviews.
3. Verify all current pricing and promotional terms.
4. Wire the request-service form in `src/App.jsx` to a production endpoint such as a Vercel serverless function + Resend.
5. Add dedicated service pages and SEO metadata for the primary services.
6. Add the real Ace logo/brand assets if available.

## Form integration

Search for this comment in `src/App.jsx`:

```js
// Replace this with your Resend/Vercel API request when wiring the production form.
```

That `submit` function is where the frontend should POST the form data to `/api/contact` or your chosen endpoint.

## Live Google Reviews (Places API New)

This starter now includes a Vercel serverless route at:

```text
/api/google-reviews
```

It calls Google Places API (New) Place Details from the server, so the API key is never exposed in the React bundle.

### 1. Google Cloud setup

1. Create or select a Google Cloud project.
2. Enable **Places API (New)**.
3. Make sure billing is enabled for that project.
4. Create an API key and restrict it to the Places API when possible.
5. Find Ace Cleaning's Google Place ID.

### 2. Environment variables

Copy `.env.example` to `.env.local` for local Vercel development, or add these to your Vercel project's Environment Variables:

```env
GOOGLE_PLACES_API_KEY=your_google_places_api_key
GOOGLE_PLACE_ID=your_google_place_id
```

Do **not** prefix the API key with `VITE_`; these values are intended to remain server-side.

### 3. Local testing

The `/api` route is a Vercel serverless function. The most accurate local test is with the Vercel CLI:

```bash
npx vercel dev
```

A normal `npm run dev` runs Vite only and will not execute Vercel's `/api/google-reviews` function unless you configure a local proxy/server for it.

### Google Places display notes

- Place Details can return a maximum of five reviews, and Google orders the returned reviews by relevance.
- The UI displays author attribution and source links for each review.
- The UI identifies the content as coming from Google Maps and explains that Google selects/orders the reviews by relevance.
- Google Maps Platform generally restricts caching/storing Places content, so the serverless response is sent with `Cache-Control: no-store`.
- Review fields are in the Places API's Enterprise + Atmosphere pricing tier. Check current Google Maps Platform pricing before production launch.
