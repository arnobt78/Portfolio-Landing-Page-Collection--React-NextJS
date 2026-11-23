# Mock Data Setup

## Overview

This project is **React + Vite** (not Create React App). It uses mock data by default so you can run and deploy without a Sanity CMS backend. All data is pre-populated in `src/mockData.js`.

## How It Works

- **Production and development**: Use mock data from `src/mockData.js`; the current frontend does not connect to Sanity.

## Mock Data Includes

### About Section

- 4 about cards showcasing different skills and expertise
- Pre-configured images from Unsplash

### Works/Portfolio Section

- 5 sample projects with descriptions
- Categories: UI/UX, Web App, Mobile App, React JS
- Sample images and links

### Skills Section

- 10 popular technologies (React, JavaScript, TypeScript, etc.)
- Icons from DevIcons CDN

### Experience Section

- Work experience from 2021-2023
- Multiple positions per year
- Detailed descriptions

### Testimonials Section

- 4 client testimonials
- Avatar images from Pravatar

### Brands Section

- 4 major tech company logos
- Google, Microsoft, Amazon, Meta

## Features Preserved

All frontend features remain intact:

- ✅ Contact form clearly indicates that demo submissions are neither sent nor stored
- ✅ All input fields functional
- ✅ All CSS/SCSS styling unchanged
- ✅ All animations and interactions
- ✅ Responsive design
- ✅ Filter functionality in Works section
- ✅ Testimonial navigation

## Connecting Real Sanity Data

The frontend currently uses only the mock client. Connecting the optional Sanity Studio requires a separate implementation and security review; setting environment variables alone will not enable it. Never put a private token in a `VITE_*` variable, because client variables may be exposed in the browser.

## Production (e.g. Vercel)

This project uses **React + Vite** (not Create React App). In production:

- **Mock data is always used** by the current frontend, without a Sanity backend or CORS setup.

No backend or extra config is required for the default production deploy; the built app uses `src/mockData.js` so the portfolio loads correctly.
