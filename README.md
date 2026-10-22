# KaBoom Studios Landingpage

Website von KaBoom Studios: Webdesign, Website-Checks und Automatisierung für
Handwerksbetriebe und lokale Dienstleister im Rhein-Sieg-Kreis.

Die Seite ist eine statische Inhaltsseite, gebaut mit Astro, Tailwind CSS und
TypeScript. Sie liefert fertiges HTML aus, keine JavaScript-Dateien, keine
Cookies, keine Verbindungen zu fremden Servern. Die beiden kleinen Effekte
(Einblenden beim Scrollen, hochzählende Zahl) stecken als Inline-Skript im
HTML. Ohne JavaScript ist jeder Inhalt sichtbar.

## Seiten

| Adresse | Inhalt |
| --- | --- |
| `/` | Kernbotschaft, drei Leistungen, Ablauf, kurz über mich, häufige Fragen, Kontakt |
| `/website-check/` | Prüfumfang, Aufbau des Berichts, Preis, Ablauf |
| `/websites-fuer-handwerker/` | Pakete, Zusatzleistungen, Ablauf, Wartung |
| `/automatisierung/` | Beispiele für Abläufe, Kosten, Ablauf |
| `/webdesign-rhein-sieg-kreis/` | Zusammenarbeit in der Region, Termine vor Ort |
| `/ueber-mich/` | Werdegang aus dem Handwerk, Foto |
| `/impressum/`, `/datenschutz/` | Rechtstexte, `noindex`, nicht in der Sitemap |
| `404.html` | Fehlerseite, `noindex` |

Der Hauptaufruf auf jeder Seite ist ein kostenloses Erstgespräch. Gebucht wird
über die Buchungsseite eines externen Dienstes, verlinkt und nicht
eingebettet. Solange kein Buchungslink eingetragen ist, öffnet der Button eine
vorbereitete E-Mail.

## Voraussetzungen

- Node.js ab 22.22 (Vorgabe von Astro 7), die CI nutzt Node 24
- npm

## Befehle

| Befehl | Wirkung |
| --- | --- |
| `npm ci` | Abhängigkeiten exakt nach `package-lock.json` installieren |
| `npm run dev` | Entwicklungsserver auf http://localhost:4321 |
| `npm run dev -- --host` | Entwicklungsserver auch im lokalen Netz, zum Testen auf dem Handy |
| `npm run check` | TypeScript- und Astro-Diagnose |
| `npm run build` | Produktions-Build nach `dist/` |
| `npm run preview` | `dist/` lokal ausliefern |

Ladezeit und Qualität werden mit Lighthouse am Produktions-Build gemessen
(`npm run build`, dann `npm run preview`), nicht am Entwicklungsserver: Der
liefert absichtlich unoptimierte Dateien aus.

## Aufbau

```
src/
  data/site.ts              Alle Inhalte und Einstellungen, die sich ändern (siehe unten)
  lib/structured-data.ts    Abbildung der Angaben aus site.ts auf schema.org (JSON-LD)
  layouts/
    BaseLayout.astro        HTML-Grundgerüst, Meta-Angaben, Sprunglink zum Inhalt
    PageLayout.astro        Unterseiten: Navigation, Brotkrumen, Inhalt, Footer
  components/               Abschnitte und Bausteine, alles statisches Astro
    Nav, Footer             Navigation mit Mobilmenü, Footer mit allen Seiten
    BookingButton           Buchungsaufruf mit E-Mail-Rückfall
    Hero, Leistungen, ...   Abschnitte der Startseite
    PageIntro, InfoGrid,    Bausteine der Unterseiten
    PackageCard, CrossLinks
    Ablauf, Faq             Ablauf in Schritten, Fragen als <details> ohne JavaScript
    Seo, JsonLd             Meta-Angaben, Open Graph, strukturierte Daten
    Reveal, CountUp         Die beiden Effekte, je ein kleines Inline-Skript
    LightDivider            Lichtstrich als Trenner
  pages/                    Eine Datei pro Seite
  styles/global.css         Design-Tokens, Schrift, Animationen, Grundstile
  assets/                   Bilder, die Astro optimiert (AVIF, WebP)
public/
  fonts/                    Inter als variable woff2, lokal eingebunden
  og-image.png              Vorschaubild beim Teilen (1200 × 630)
  robots.txt
.github/workflows/
  ci.yml                    Prüfung bei Pull Requests und auf main
  deploy.yml                Veröffentlichen auf GitHub Pages
```

## Konfiguration: `src/data/site.ts`

Inhalte stehen zentral in `src/data/site.ts`, nicht in den Komponenten.
Preise, Dauer des Erstgesprächs und Region werden in die Texte eingesetzt und
nur an einer Stelle gepflegt.

| Eintrag | Inhalt |
| --- | --- |
| `site` | Name, Inhaber, Adresse der Seite, Region |
| `contact` | E-Mail-Adresse und Hinweis zur Antwortzeit |
| `booking` | Buchungslink (`url`), Beschriftungen und Dauer des Erstgesprächs |
| `calls` | Gesprächsform: ohne Eintrag in `video` nur Telefon, mit eingetragenem Videodienst Video oder Telefon. Die Satzbausteine in `callTexts` und der Abschnitt in der Datenschutzerklärung richten sich danach |
| `hero` | Überschrift und Unterzeile der Startseite |
| `about`, `onSite` | Angaben für "Über mich" und für Termine vor Ort |
| `imprint` | Anbieterkennzeichnung, erscheint nur im Impressum |
| `features` | Schalter: `showPricing` (Preise zeigen), `referenzen` (Referenzbereich) |
| `pages` | Alle Seiten mit Adresse und Titel; Navigation, Footer und Brotkrumen lesen von hier |
| `services`, `websitePackages`, `maintenance`, `automationCare`, `checkReport` | Leistungen, Pakete und Preise |
| `steps`, `checkSteps`, `automationSteps` | Abläufe in Schritten |
| `faq` | Fragen und Antworten; `showOn` legt fest, auf welchen Seiten eine Frage erscheint |
| `referenzen` | Abgeschlossene Projekte, sichtbar nur mit `features.referenzen` |

Ein paar Angaben hängen außerhalb von `site.ts` an denselben Werten:

- **Domain:** `site.url` in `site.ts`, `site` in `astro.config.mjs` und die
  Sitemap-Zeile in `public/robots.txt`. Davon hängen Canonical-Links,
  Open-Graph-Adressen und die Sitemap ab.
- **E-Mail-Adresse:** Die CI prüft sie fest auf der Startseite
  (`.github/workflows/ci.yml`, Prüfung 2). Wer `contact.email` ändert, ändert
  sie dort mit.

## Prüfungen in der CI

`ci.yml` läuft bei jedem Pull Request auf `main` und auf `main` selbst als
erster Schritt jedes Deploys: `npm ci`, `npm run check`, `npm run build` und
danach Prüfungen am fertigen HTML in `dist/`:

1. Keine Verweise auf Google Fonts (die Schrift bleibt lokal).
2. Die E-Mail-Adresse steht auf der Startseite, damit die Seite nie ohne
   Kontaktweg ist.
3. Keine Gedankenstriche im ausgelieferten HTML.
4. Kein `tel:`-Link außerhalb des Impressums.
5. Genau eine H1 pro Seite.
6. Jeder JSON-LD-Block ist gültiges JSON.

## Deployment

Veröffentlicht wird auf GitHub Pages mit eigener Domain.

- `deploy.yml` läuft bei jedem Push auf `main`, also nach jedem gemergten Pull
  Request, und lässt sich im Actions-Tab von Hand starten ("Run workflow").
  Veröffentlicht wird nur vom Branch `main`. Der Workflow ruft zuerst dieselbe
  Prüfung wie `ci.yml` auf, baut dann mit der offiziellen Action
  `withastro/action` und veröffentlicht mit `actions/deploy-pages`. Schlägt
  die Prüfung fehl, wird nichts veröffentlicht.
- Branch-Schutz für `main` (Settings, Branches): Änderungen nur über einen
  Pull Request, die Statusprüfung "Typpruefung und Build" muss grün sein und
  der Branch auf dem Stand von `main`. Das gilt auch für Administratoren.
  Ohne diesen Schutz ginge ein direkter Push auf `main` ohne vorherige Prüfung
  im Pull Request in den Deploy.
- Einstellungen im Repository: Settings, Pages, Source "GitHub Actions". Die
  eigene Domain wird dort eingetragen. Eine `CNAME`-Datei braucht es bei einem
  eigenen Actions-Workflow nicht, GitHub ignoriert sie dann.
- DNS-Einträge und Verifizierung der Domain beschreibt die GitHub-Doku
  ["Managing a custom domain for your GitHub Pages site"](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site).
  Die Domain vorher im Konto verifizieren, damit kein anderes Konto sie
  belegen kann.
- Im kostenlosen GitHub-Tarif muss das Repository für Pages öffentlich sein.

## Konventionen

- **Keine Verbindungen zu fremden Servern.** Schrift lokal, kein Tracking,
  keine eingebetteten Inhalte, kein Buchungs-Widget. Deshalb braucht die Seite
  keinen Cookie-Banner. Prüfen lässt sich das im Netzwerk-Tab: Am lokalen
  Build darf nur `localhost` erscheinen.
- **Kein UI-Framework.** Die beiden Effekte laufen als Vanilla-JS. Eine
  Framework-Integration kommt erst dazu, wenn eine Funktion sie braucht, weil
  sie eigene Laufzeit in den Build bringt.
- **Bilder** laufen über `astro:assets` (`<Picture>`), damit AVIF und WebP mit
  festen Abmessungen entstehen.
- **Farben, Abstände und Animationen** kommen aus den Tokens in `global.css`.
  Animiert werden nur `transform` und `opacity`, bei
  `prefers-reduced-motion: reduce` steht alles still. Inhalt im ersten
  Bildschirm wird nie per Einblendung versteckt.
- **Textstil:** Sie-Form, kurze Sätze, keine Gedankenstriche, keine
  Werbefloskeln. Jede Aussage muss zum tatsächlichen Angebot passen.
- **Keine Behauptung ohne Beleg.** Keine erfundenen Referenzen, Bewertungen
  oder Kennzahlen, auch nicht als Platzhalter. Messwerte erscheinen erst auf
  der Seite, wenn sie an der veröffentlichten Seite gemessen wurden.
- **Telefonnummer nur im Impressum.** Kontakt läuft über Buchung und E-Mail.
- **Kommentare erklären, warum** etwas so gebaut ist.

## Bekannte Einschränkungen

- **Buchung über einen externen Dienst.** Gebucht wird per Link auf die
  Buchungsseite von zeeg, ohne eingebettetes Widget. Ist `booking.url` leer,
  führt der Button auf eine E-Mail und heißt "Erstgespräch anfragen"; der
  Abschnitt zum Buchungsdienst in der Datenschutzerklärung und das
  Buchungsbeispiel auf der Websites-Seite entfallen dann. Ändern sich Dienst
  oder Felder des Buchungsformulars, müssen beide Texte mitgeprüft werden.
- **Kein Kontaktformular.** Die Seite läuft ohne Server, der Nachrichten
  annehmen könnte. Kontakt läuft über Buchung und E-Mail.
- **Referenzbereich abgeschaltet.** Er erscheint erst, wenn
  `features.referenzen` an ist und in `referenzen` mindestens ein echtes
  Projekt steht.
- **Vorschaubild ist ein festes Bild.** `public/og-image.png` zeigt die
  Überschrift der Startseite. Wird `hero.headline` geändert, muss das Bild neu
  erstellt werden.
- **Rechtstexte sind seitenspezifisch.** `impressum.astro` und
  `datenschutz.astro` beschreiben genau diese Seite und ihre Dienste. Bei
  jeder Änderung an eingesetzten Diensten müssen sie mitgeprüft werden.

## Als Vorlage verwenden

Für eine andere Seite auf dieser Grundlage:

1. `src/data/site.ts` vollständig anpassen (Name, Inhaber, Kontakt,
   Anbieterkennzeichnung, Leistungen, Texte).
2. Domain in `astro.config.mjs` und `public/robots.txt` ändern, E-Mail-Adresse
   in `.github/workflows/ci.yml`.
3. `src/assets/portrait.jpg`, `public/og-image.png` und `public/favicon.svg`
   ersetzen.
4. Impressum und Datenschutzerklärung für den neuen Betreiber und seine
   Dienste neu erstellen lassen.
