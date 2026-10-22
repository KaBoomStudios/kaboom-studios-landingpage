// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// Bewusst ohne UI-Framework (React o. ae.): die Seite liefert fertiges HTML
// aus, Einblendungen und Count-up laufen als knapp 1 kB Vanilla-JS direkt in
// Reveal.astro und CountUp.astro. Eine Framework-Integration kommt erst dazu,
// wenn eine Funktion sie wirklich braucht, denn sie bringt eigene Laufzeit
// in den Build.

export default defineConfig({
  // Davon haengen Canonical-Links, Open-Graph-Adressen und die sitemap.xml ab.
  // Dieselbe Adresse steht in src/data/site.ts (site.url) und in
  // public/robots.txt.
  site: 'https://kaboom-dev.de',
  // Jede Seite wird als Ordner mit index.html gebaut (build.format
  // 'directory', Standard). Astro empfiehlt dazu 'always': dann verhalten sich
  // Entwicklungsserver und Build gleich, und Canonical, Sitemap und interne
  // Links nennen dieselbe Adresse mit Schraegstrich am Ende.
  trailingSlash: 'always',
  integrations: [
    sitemap({
      // Impressum und Datenschutz sind auf noindex gesetzt. Sie gehoeren
      // dann auch nicht in die Sitemap, sonst widersprechen sich die Signale.
      filter: (page) => !/\/(impressum|datenschutz)\/?$/.test(page),
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
  // Astro 7 entfernt Leerraum standardmaessig nach JSX-Regeln ('jsx'). Dabei
  // verschwindet der Abstand zwischen Text und angrenzendem Inline-Element,
  // sodass aus "steht im <a>Impressum</a>" ein "steht imImpressum" werden
  // kann, lautlos und erst im fertigen Build sichtbar. `true` kollabiert
  // Leerraum nach HTML-Regeln, also so, wie man es beim Schreiben erwartet.
  compressHTML: true,

  build: {
    // Ein einzelnes CSS-Bundle statt vieler kleiner Dateien: die Seite ist klein
    // genug, dass ein Request weniger mehr bringt als feingranulares Caching.
    inlineStylesheets: 'auto',
  },
});
