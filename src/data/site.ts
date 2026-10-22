/**
 * Zentrale Inhalts- und Konfigurationsquelle der Seite.
 *
 * Alles, was sich erfahrungsgemaess aendert (Preise, Kontaktdaten,
 * Buchungslink, Seitenliste, Texte der Leistungskarten), steht hier und nicht
 * verstreut in den Komponenten. Wer das Projekt als Vorlage fuer eine andere
 * Seite nutzt, passt zuerst diese Datei an.
 */

export const site = {
  name: 'KaBoom Studios',
  owner: 'Kai Boomgaarden',
  tagline: 'Webdesign für Handwerksbetriebe',
  /** Muss zur `site`-Angabe in astro.config.mjs und zu public/robots.txt passen. */
  url: 'https://kaboom-dev.de',
  locale: 'de_DE',
  /** Region, in der die Anfahrt zum Termin vor Ort im Preis enthalten ist (siehe `onSite`). */
  region: 'Rhein-Sieg-Kreis',
} as const;

export const contact = {
  /** Anzeigeform */
  email: 'kontakt@kaboom-dev.de',
  /** Ziel des mailto:-Links */
  emailHref: 'mailto:kontakt@kaboom-dev.de',
  /** Zusage zur Antwortzeit. Nur so formulieren, wie sie sich halten laesst. */
  replyNote: 'Ich antworte in der Regel innerhalb von zwei Werktagen.',
} as const;

/**
 * Das kostenlose Erstgespraech ist der Hauptaufruf auf jeder Seite.
 *
 * Gebucht wird ueber die Buchungsseite eines externen Dienstes, verlinkt und
 * nicht eingebettet: so laedt kein fremdes Skript auf dieser Seite, es braucht
 * keinen Cookie-Banner und die Ladezeit bleibt unberuehrt.
 */
export const booking = {
  /**
   * Adresse der Buchungsseite. Solange sie leer ist, fuehrt der Button auf
   * eine vorbereitete E-Mail: die Seite ist nie ohne Kontaktweg.
   */
  url: 'https://zeeg.me/kaboom-studios/erstgespraech-mit-kurz-check',
  label: 'Erstgespräch buchen',
  /**
   * Beschriftung, solange der Button auf die E-Mail fuehrt. "Buchen" waere
   * dann irrefuehrend: es oeffnet sich das Mailprogramm, kein Kalender.
   */
  fallbackLabel: 'Erstgespräch anfragen',
  durationMinutes: 15,
  /** Betreff der E-Mail, wenn noch kein Buchungslink eingetragen ist. */
  mailSubject: 'Anfrage Erstgespräch',
} as const;

/** Ein Dienst fuer Videogespraeche, siehe `calls`. */
export type VideoService = {
  /** Name des Dienstes, so wie er in der Datenschutzerklaerung steht. */
  name: string;
  /** Firma und Anschrift des Anbieters. */
  company: string;
  /**
   * Was der Anbieter mit den Daten macht: Vertrag zur Auftragsverarbeitung,
   * Serverstandort, gegebenenfalls Uebermittlung in ein Drittland. Steht
   * woertlich in der Datenschutzerklaerung und ist damit Rechtstext.
   */
  processing: string;
};

/**
 * Wie Erstgespraech und Abstimmung laufen. Beim Telefonat ruft der Anbieter
 * zur gebuchten Zeit an, die eigene Nummer muss dafuer nicht auf der Seite
 * stehen.
 *
 * Videogespraeche gibt es nur, wenn `video` einen Dienst nennt. Dann bieten
 * alle Seitentexte Video oder Telefon an, und die Datenschutzerklaerung
 * bekommt einen Absatz zu diesem Dienst. Ein Dienst kommt erst hierher, wenn
 * der Vertrag zur Auftragsverarbeitung steht und der Absatz freigegeben ist.
 */
export const calls: { video: VideoService | null } = {
  video: null,
};

/**
 * Satzbausteine zur Gespraechsform, erzeugt aus `calls`. Mit eingetragenem
 * Videodienst ergeben sie wieder die frueheren Texte mit Video.
 */
const withVideo = calls.video !== null;

export const callTexts = {
  /** Im laufenden Satz: "Abstimmung per Telefon". */
  via: withVideo ? 'per Video oder Telefon' : 'per Telefon',
  /** Kurzform nach Dauer und Preis ("15 Minuten, ich rufe Sie an"), beantwortet "wie laeuft das". */
  hint: withVideo ? 'per Video oder Telefon' : 'ich rufe Sie an',
  /** Folgt auf einen Satz, der die Gespraechsform schon nennt. */
  callback: withVideo
    ? 'Beim Telefonat rufe ich Sie zur gebuchten Zeit an.'
    : 'Ich rufe Sie zur gebuchten Zeit an.',
  /** Steht allein und nennt die Gespraechsform selbst. */
  modes: withVideo
    ? 'Wahlweise als Videogespräch oder als Telefonat, bei dem ich Sie zur gebuchten Zeit anrufe.'
    : 'Ich rufe Sie zur gebuchten Zeit an.',
} as const;

/**
 * Kernbotschaft der Startseite. Die H1 nennt Leistung und Zielgruppe in den
 * Worten, nach denen gesucht wird; der Gedanke "die Website arbeitet mit"
 * steht in der Unterzeile.
 */
export const hero = {
  headline: 'Websites für das Handwerk, gebaut von einem Handwerker.',
  subline:
    '22 Jahre habe ich selbst im Handwerk gearbeitet. Ich baue Ihnen eine Website, über die Kunden Sie finden und Anfragen schicken, auf Wunsch auch Termine buchen. Auch dann, wenn Sie gerade auf der Baustelle stehen.',
  /**
   * Zeile unter Foto und Name. Beschreibt, was der Anbieter macht, und nennt
   * bewusst keine Berufsbezeichnung.
   */
  portraitCaption: 'Webdesign · 22 Jahre im Handwerk',
} as const;

/**
 * Angaben zur Person fuer die Seite "Ueber mich". Wie Name und Foto bewusst
 * Seiteninhalt, deshalb hier gebuendelt: eine Kopie als Vorlage ersetzt sie an
 * dieser einen Stelle. Nur Angaben, die der Betreiber freigegeben hat; keine
 * Arbeitgeber, keine Berufsbezeichnungen, keine Ausbildung.
 */
export const about = {
  years: 22,
  /** Die Gewerke aus diesen Jahren, die haeufigsten zuerst. */
  trades: [
    'Fassaden- und Fensterbau',
    'Montage von Bauelementen',
    'Metallverarbeitung',
    'Schreinerei',
  ],
  craft: [
    'Die meiste Zeit habe ich im Fassaden- und Fensterbau gearbeitet und Bauelemente montiert: Fenster, Garagentore, Fertigteile. Dazu kamen Metallverarbeitung und eine kurze Zeit in einer Schreinerei.',
    'Fast immer waren es kleine Betriebe, einmal ein Betrieb mit rund 200 Mitarbeitenden. In den letzten Betrieben war ich der Allrounder und für alles Mögliche zuständig.',
  ],
  tech: [
    'Technik und Rechner waren schon immer mein Ding. Neben dem Handwerk habe ich mir über Jahre viel selbst beigebracht, auch Datenbanken und alles, was dazugehört.',
    'Seit es gute KI-Werkzeuge gibt, kann ich das beruflich nutzen. Ich arbeite mit modernen KI-Werkzeugen und verstehe genug von der Technik dahinter, um zu prüfen, was sie bauen.',
  ],
} as const;

/**
 * Termine vor Ort, so wie sie im Angebot geregelt sind. Abstimmung laeuft
 * aus der Ferne (siehe `calls`), damit Termine kurz und planbar bleiben; vor
 * Ort gibt es hoechstens einen Termin pro Projekt.
 */
export const onSite = {
  remote: `Erstgespräch und Abstimmung ${callTexts.via}`,
  visit: 'Ein Termin bei Ihnen vor Ort pro Projekt',
  purpose: 'für Übergabe und Einweisung oder um Fotos und Unterlagen gemeinsam durchzusehen',
  travel: `Anfahrt im ${site.region} im Festpreis enthalten`,
  travelOutside: 'Außerhalb sprechen wir die Anfahrt vorher ab',
} as const;

/**
 * Anbieterkennzeichnung nach § 5 DDG. Erscheint ausschliesslich im Impressum.
 *
 * Die Angaben stammen vom Betreiber und werden hier nicht generiert oder
 * ergaenzt. Die Steuernummer gehoert nicht ins Impressum.
 */
export const imprint = {
  name: 'Kai Boomgaarden',
  street: 'Leinstraße 21',
  postalCode: '51570',
  city: 'Windeck',
  /**
   * Steht ausschliesslich im Impressum. Alle anderen Seiten fuehren ueber
   * Buchung und E-Mail, damit Anfragen planbar bleiben; die CI bricht ab, wenn
   * ein tel:-Link ausserhalb des Impressums auftaucht. Die Nummer hier erfuellt
   * die Anforderung an eine unmittelbare Kontaktmoeglichkeit nach § 5 DDG.
   */
  phone: '0177 3402838',
  phoneHref: 'tel:+491773402838',
  /**
   * Umsatzsteuer-Identifikationsnummer (§ 27a UStG) und
   * Wirtschafts-Identifikationsnummer (§ 139c AO). § 5 Abs. 1 Nr. 6 DDG
   * verlangt sie im Impressum, sobald eine davon zugeteilt ist. Leer bleibt
   * die Zeile unsichtbar; zugeteilte Nummer hier eintragen, sonst nichts.
   */
  vatId: '',
  businessId: '',
} as const;

export const features = {
  /** Preise auf den Leistungskarten anzeigen. */
  showPricing: true,
  /**
   * Referenzen auf der Startseite samt Navigationseintrag. Erscheinen nur,
   * wenn dieses Flag an ist UND in `referenzen` mindestens ein echtes Projekt
   * steht. Leere Platzhalter-Karten gibt es nicht.
   */
  referenzen: false,
} as const;

/**
 * Alle Seiten an einer Stelle. Navigation, Footer, Brotkrumen und
 * Querverweise lesen von hier, damit eine geaenderte Adresse nicht an
 * mehreren Stellen nachgezogen werden muss.
 *
 * `label` ist die kurze Form fuer die Navigation, `title` die ausfuehrliche
 * fuer Footer und Brotkrumen. Alle Adressen enden mit `/`, passend zu
 * `trailingSlash: 'always'` in astro.config.mjs.
 */
export const pages = {
  home: { href: '/', label: 'Startseite', title: 'Startseite' },
  websiteCheck: {
    href: '/website-check/',
    label: 'Website-Check',
    title: 'Website-Check',
  },
  websites: {
    href: '/websites-fuer-handwerker/',
    label: 'Websites',
    title: 'Websites für Handwerksbetriebe',
  },
  automatisierung: {
    href: '/automatisierung/',
    label: 'Automatisierung',
    title: 'Automatisierung',
  },
  rheinSieg: {
    href: '/webdesign-rhein-sieg-kreis/',
    label: 'Rhein-Sieg-Kreis',
    title: 'Webdesign im Rhein-Sieg-Kreis',
  },
  ueberMich: { href: '/ueber-mich/', label: 'Über mich', title: 'Über mich' },
  impressum: { href: '/impressum/', label: 'Impressum', title: 'Impressum' },
  datenschutz: {
    href: '/datenschutz/',
    label: 'Datenschutz',
    title: 'Datenschutzerklärung',
  },
} as const;

export type Page = (typeof pages)[keyof typeof pages];

/**
 * Dauer einer Website bis zum Start. Gerechnet ab Eingang aller Unterlagen,
 * weil die Wartezeit auf Fotos und Angaben sonst in die Zusage faellt.
 */
export const websiteLeadTime = 'etwa vier Wochen ab Eingang aller Unterlagen';

/**
 * Lieferung des Website-Checks. Steht so auf der Seite, also nur aendern,
 * wenn sich der tatsaechliche Ablauf aendert.
 */
export const checkReport = {
  format: 'PDF',
  /** Frist ab Auftrag, so formuliert, wie sie im Satz steht. */
  delivery: 'innerhalb von fünf Werktagen',
  /** Betreff, wenn jemand den Check direkt per E-Mail beauftragt. */
  mailSubject: 'Auftrag Website-Check',
  /**
   * Vorausgefuellter Text dieser E-Mail, eine Zeile pro Eintrag. Ohne die
   * Adresse der Website kann die Pruefung nicht beginnen, deshalb steht das
   * Feld dafuer schon bereit.
   */
  mailBody: [
    'Guten Tag,',
    '',
    'ich möchte den Website-Check beauftragen.',
    '',
    'Name:',
    'Betrieb:',
    'Adresse der Website:',
    '',
    'Anmerkung (optional):',
    '',
    'Viele Grüße',
  ],
  /**
   * Punkte der Preiskarte im Wortlaut des Angebots. Die Prueffelder selbst
   * stehen ausfuehrlich auf der Seite, deshalb hier nur Form und Bedingungen.
   */
  highlights: [
    'Schriftlicher Prüfbericht als PDF',
    'Fertig innerhalb von fünf Werktagen, mit Gespräch zum Bericht',
    'Keine Zugangsdaten nötig',
    'Wird bei einem Website-Auftrag voll angerechnet',
  ],
} as const;

/**
 * Einstiegspreise als Zahl und als Satzbaustein. Die Zahl braucht der
 * Preisteil der strukturierten Daten, der Text steht auf der Seite. Beides aus
 * einem Wert, damit sie nicht auseinanderlaufen.
 */
const from = (amount: number) => ({ priceFrom: amount, price: `ab ${amount} €` });
const monthlyFrom = (amount: number) => ({
  priceFrom: amount,
  price: `ab ${amount} € im Monat`,
});

/**
 * Laufende Betreuung automatischer Ablaeufe. Anders als die Wartung der
 * Website ist sie Pflicht: die Ablaeufe haengen an fremden Diensten, die sich
 * aendern, und ein still ausgefallener Ablauf schadet mehr als keiner.
 * Gebuehren der Dienste selbst zahlt der Betrieb direkt beim Anbieter.
 */
export const automationCare = {
  title: 'Betreuung',
  ...monthlyFrom(29),
} as const;

/** Steht ueberall dort, wo Preise genannt werden. */
export const pricing = {
  taxNote:
    'Alle Preise sind Endpreise. Als Kleinunternehmer nach § 19 UStG berechne ich keine Umsatzsteuer.',
} as const;

/**
 * Die beiden Website-Pakete im Wortlaut des Angebots, damit Website und
 * Angebot dasselbe sagen. Auf der Seite steht nur der Einstiegspreis; der
 * Preis fuer Standard steht im Angebot.
 */
export type Package = {
  name: string;
  price?: string;
  /** Einleitung vor der Liste, etwa "Alles aus Basis, dazu". */
  lead?: string;
  points: string[];
};

export const websitePackages: Package[] = [
  {
    name: 'Basis',
    price: 'ab 900 €',
    points: [
      'Onepager oder bis zu 3 Unterseiten',
      'Für Handy und PC, schnell und barrierearm',
      'Kontakt, Anfahrt und Öffnungszeiten',
      'Gestaltet mit Ihrem Logo und Ihren Farben',
      'Ihre Fotos für die Website aufbereitet (Größe, schnelles Laden)',
      'Google-Unternehmensprofil angelegt oder überarbeitet und verknüpft',
      'Einrichtung für Google: Meta-Angaben, Sitemap, Search Console',
      'Impressum und Datenschutz eingebunden',
      'Einweisung und 1 Korrekturrunde',
    ],
  },
  {
    name: 'Standard',
    lead: 'Alles aus Basis, dazu',
    points: [
      'Bis zu 6 Unterseiten, eine Seite je Leistung',
      'Eigenes Design statt Baukasten',
      'Texte nach einem gemeinsamen Gespräch',
      'Bearbeitung Ihrer Fotos',
      'Ausgerichtet auf die Suche nach Gewerk und Ort',
      'Projekt- oder Referenzbereich',
      'Karriereseite für Bewerber',
      '2 Korrekturrunden',
    ],
  },
];

export type Service = {
  id: string;
  title: string;
  description: string;
  /** Einstiegspreis als Text, etwa "ab 149 €". */
  price: string;
  /** Derselbe Einstiegspreis in Euro, fuer die strukturierten Daten. */
  priceFrom: number;
  /** Laufende Kosten, die zum Preis dazugehoeren und direkt daneben stehen. */
  priceNote?: string;
  /** Dieselben laufenden Kosten als Zahl, fuer die strukturierten Daten. */
  recurring?: { title: string; priceFrom: number };
  /** Unterseite mit allen Details zu dieser Leistung. */
  page: Page;
  /** Hebt die Karte optisch hervor und zeigt das Badge. */
  featured?: boolean;
  badge?: string;
  icon: 'check' | 'browser' | 'flow';
};

export const services: Service[] = [
  {
    id: 'website-check',
    title: 'Website-Check',
    description:
      'Schriftlicher Prüfbericht als PDF: Impressum, Datenschutz, Cookie-Einwilligung, Technik, Handy-Darstellung und Auffindbarkeit bei Google. Wird bei einem Website-Auftrag voll angerechnet.',
    ...from(149),
    page: pages.websiteCheck,
    icon: 'check',
  },
  {
    id: 'website',
    title: 'Website',
    description:
      'Ihre Website zum Festpreis, gestaltet mit Ihrem Logo und Ihren Farben. Für Handy und PC, schnell und barrierearm. Eingerichtet für Google, samt Unternehmensprofil.',
    ...from(900),
    page: pages.websites,
    featured: true,
    // Eine Aussage ueber das eigene Angebot, keine ueber Kundenverhalten:
    // letzteres waere ohne Referenzen nicht belegbar.
    badge: 'Empfehlung',
    icon: 'browser',
  },
  {
    id: 'automatisierung',
    title: 'Automatisierung',
    description:
      'Weniger Büroarbeit nach Feierabend. Anfragen werden sortiert und automatisch per E-Mail bestätigt. Funktioniert auch mit Ihrer bestehenden Website.',
    ...from(500),
    priceNote: `plus ${automationCare.title} ${automationCare.price}`,
    recurring: automationCare,
    page: pages.automatisierung,
    icon: 'flow',
  },
];

/**
 * Betreuung nach dem Start: zwei Wartungspakete oder die Uebergabe an den
 * Betrieb. `price` ist der Einstieg fuer Karten und Saetze, die Pakete stehen
 * mit Namen und Monatspreis im Abschnitt Wartung der Websites-Seite.
 */
export const maintenance = {
  title: 'Wartung',
  price: 'ab 39 € im Monat',
  plans: [
    {
      name: 'Wartung Basis',
      price: '39 € im Monat',
      points: [
        'Hosting, Domain (.de) und SSL-Zertifikat enthalten',
        'Updates, Backups, Prüfung der Erreichbarkeit',
        'Kleine Änderungen bis 30 Minuten im Monat',
        'Laufzeit 12 Monate, jährlich im Voraus',
      ],
    },
    {
      name: 'Wartung Plus',
      price: '69 € im Monat',
      lead: 'Alles aus Wartung Basis, dazu',
      points: [
        'Änderungen bis 2 Stunden im Monat',
        'Pflege Ihrer Inhalte',
        'Jährlicher Check der Seite',
        'Laufzeit 12 Monate, jährlich im Voraus',
      ],
    },
  ] satisfies Package[],
  /** Ohne Wartung uebernimmt der Betrieb die Website selbst. */
  handover: {
    name: 'Übergabe ohne Betreuung',
    points: [
      'Alle Zugänge dokumentiert übergeben',
      'Hosting und Domain laufen auf Ihren Namen und Ihre Kosten',
      'Spätere Änderungen nach Aufwand',
    ],
  } satisfies Package,
};

/** Ueber die Seite statt ueber die Position, wie auf den Leistungsseiten. */
const priceOf = (page: Page) => services.find((s) => s.page === page)?.price;

/**
 * Ablauf einer Zusammenarbeit. Jede Aussage hier ist mit dem Angebot
 * abgestimmt (Kurz-Check im Erstgespraech, Korrekturrunden, Eigentum).
 */
export type Step = { title: string; text: string };

export const steps: Step[] = [
  {
    title: 'Erstgespräch',
    text: `${booking.durationMinutes} Minuten, kostenlos, ${callTexts.via}. ${callTexts.callback} Sie erzählen, was Ihr Betrieb macht und wo es hakt. Haben Sie schon eine Website, gehört ein Kurz-Check dazu: Ich nenne Ihnen die drei wichtigsten Punkte.`,
  },
  {
    title: 'Angebot zum Festpreis',
    text: 'Sie bekommen ein schriftliches Angebot. Darin stehen Umfang und Preis, dazu, was Sie für die Website liefern.',
  },
  {
    title: 'Umsetzung',
    text: 'Ich baue die Website und zeige Ihnen Zwischenstände. Ihre Rückmeldungen arbeite ich ein, je nach Paket in einer oder zwei Korrekturrunden.',
  },
  {
    title: 'Übergabe und Betreuung',
    text: `Die Seite geht online. Website und Domain gehören Ihnen, die Domain wird auf Sie registriert. Auf Wunsch übernehme ich danach die Wartung, ${maintenance.price}.`,
  },
];

/**
 * Ablauf des Website-Checks. Eigene Schritte, weil "Angebot" und "Umsetzung"
 * hier nicht passen: der Check hat einen festen Umfang.
 */
export const checkSteps: Step[] = [
  {
    title: 'Auftrag',
    text: 'Sie beauftragen den Check im Erstgespräch oder per E-Mail. Ich brauche die Adresse Ihrer Website und Antworten auf ein paar kurze Fragen zu Ihrem Betrieb. Zugangsdaten brauche ich nicht.',
  },
  {
    title: 'Prüfung',
    text: 'Ich prüfe Ihre Website im Browser und auf dem Handy, so wie Ihre Kunden sie sehen.',
  },
  {
    title: 'Bericht',
    text: `Sie bekommen den Bericht ${checkReport.delivery} als ${checkReport.format} per E-Mail.`,
  },
  {
    title: 'Gespräch',
    text: 'Ich erkläre Ihnen die Punkte und beantworte Ihre Fragen. Beauftragen Sie danach eine Website bei mir, rechne ich den Preis des Checks voll an.',
  },
];

/** Ablauf einer Automatisierung, von der Frage "wo geht Zeit verloren" bis zum Betrieb. */
export const automationSteps: Step[] = [
  {
    title: 'Erstgespräch',
    text: `${booking.durationMinutes} Minuten, kostenlos, ${callTexts.hint}. Sie erzählen, wo im Alltag Zeit verloren geht: am Telefon, bei Terminen, bei Anfragen.`,
  },
  {
    title: 'Angebot zum Festpreis',
    text: `Sie bekommen ein schriftliches Angebot mit Umfang und Preis. Darin stehen auch die laufenden Kosten: die ${automationCare.title} und die Gebühren der Dienste. Weil die Abläufe Daten Ihrer Kunden verarbeiten, schließen wir dazu einen Vertrag zur Auftragsverarbeitung.`,
  },
  {
    title: 'Einrichtung',
    text: 'Ich richte die Abläufe ein und verbinde sie je nach Ablauf mit Ihrem E-Mail-Postfach, Ihrem Kalender oder Ihrer Website. Bevor es losgeht, teste ich jeden Ablauf.',
  },
  {
    title: 'Start und Betreuung',
    text: `Die Abläufe gehen in Betrieb. Mit der ${automationCare.title} (${automationCare.price}) kümmere ich mich darum, dass sie zuverlässig laufen.`,
  },
];

/**
 * Fragen von Betriebsinhabern. `showOn` legt fest, auf welchen Seiten eine
 * Frage erscheint; die Startseite zeigt davon einen Auszug von fuenf Fragen,
 * in der Reihenfolge dieser Liste. Antworten nur mit
 * Aussagen, die zum Angebot passen. Preise und Dauer kommen aus den Angaben
 * oben, damit sie nicht an zwei Stellen gepflegt werden muessen.
 */
export type Faq = { question: string; answer: string; showOn: Page[] };

export const faq: Faq[] = [
  {
    question: 'Ist das Erstgespräch wirklich kostenlos?',
    answer: `Ja. Es dauert ${booking.durationMinutes} Minuten und läuft ${callTexts.via}. Haben Sie schon eine Website, gehört ein Kurz-Check dazu: Ich nenne Ihnen die drei wichtigsten Punkte, die mir auffallen. Danach entscheiden Sie, ob Sie ein Angebot möchten.`,
    showOn: [
      pages.home,
      pages.websiteCheck,
      pages.websites,
      pages.automatisierung,
      pages.rheinSieg,
    ],
  },
  {
    question: 'Was ist der Unterschied zwischen Kurz-Check und Website-Check?',
    answer: `Der Kurz-Check gehört zum kostenlosen Erstgespräch. Ich nenne Ihnen im Gespräch die drei wichtigsten Punkte an Ihrer Website. Der Website-Check (${priceOf(pages.websiteCheck)}) ist eine ausführliche Prüfung mit schriftlichem Bericht: Impressum und Datenschutzerklärung, Cookie-Einwilligung, Technik, Darstellung auf dem Handy und Auffindbarkeit bei Google. Beauftragen Sie danach eine Website bei mir, rechne ich den Preis des Checks voll an.`,
    showOn: [pages.websiteCheck],
  },
  {
    question: 'Was kostet eine Website?',
    answer: `Eine Website gibt es zum Festpreis ${priceOf(pages.websites)}. Den genauen Preis nennt Ihnen das schriftliche Angebot nach dem Erstgespräch. Dazu kommen laufende Kosten für Domain und Hosting. Mit Wartung sind sie im Monatspreis enthalten, ohne Wartung laufen sie auf Ihren Namen und Ihre Kosten. ${pricing.taxNote}`,
    showOn: [pages.home, pages.websites],
  },
  {
    question: 'Wie lange dauert es, bis meine Website online ist?',
    answer:
      `Bis zum Start dauert es ${websiteLeadTime}, also Ihrer Fotos, Ihres Logos und der Angaben fürs Impressum.`,
    showOn: [pages.home, pages.websites],
  },
  {
    question: 'Was muss ich als Betrieb liefern?',
    answer:
      'Fotos, Ihr Logo und die Angaben fürs Impressum. Ich fotografiere nicht selbst. Ihre Fotos bereite ich für die Website auf, damit sie schnell laden. Im Paket Standard bearbeite ich sie außerdem. Ich lasse mir schriftlich bestätigen, dass ich die Bilder verwenden darf. Die Texte schreibe ich im Paket Standard nach einem Gespräch mit Ihnen, bei Basis gegen Aufpreis.',
    showOn: [pages.websites],
  },
  {
    question: 'Wem gehört die Website?',
    answer:
      'Ihnen. Website und Domain gehören Ihrem Betrieb, die Domain wird auf Sie registriert. Sie können jederzeit zu einem anderen Anbieter wechseln.',
    showOn: [pages.home, pages.websites],
  },
  {
    question: 'Kann ich die Website selbst ändern?',
    answer:
      'Standardmäßig gibt es keinen Bearbeitungszugang, Änderungen erledige ich über die Wartung. Wenn Sie Ihre Seite selbst pflegen möchten, bekommen Sie auf Wunsch ein Redaktionssystem dazu.',
    showOn: [pages.websites],
  },
  {
    question: 'Wer kümmert sich nach dem Start um die Website?',
    answer: `Auf Wunsch übernehme ich das. ${maintenance.plans[0].name} kostet ${maintenance.plans[0].price}: Hosting, Domain (.de) und SSL-Zertifikat, Updates, Backups, Prüfung der Erreichbarkeit und kleine Änderungen bis 30 Minuten im Monat. ${maintenance.plans[1].name} kostet ${maintenance.plans[1].price} und enthält dazu Änderungen bis 2 Stunden im Monat, die Pflege Ihrer Inhalte und einen jährlichen Check der Seite. Beide laufen 12 Monate und werden jährlich im Voraus bezahlt. Ohne Wartung übergebe ich Ihnen alle Zugänge dokumentiert, spätere Änderungen mache ich nach Aufwand.`,
    // Die Websites-Seite hat dafuer einen eigenen Abschnitt.
    showOn: [pages.home],
  },
  {
    question: 'Werde ich damit bei Google gefunden?',
    answer:
      'Bei jeder Website richte ich die Technik für Google ein (Meta-Angaben, Sitemap, Search Console) und lege Ihr Unternehmensprofil an oder überarbeite das bestehende. Im Paket Standard richte ich außerdem Aufbau und Texte auf die Suche nach Ihrem Gewerk und Ihrem Ort aus. Einen bestimmten Platz in den Suchergebnissen kann Ihnen niemand seriös zusagen.',
    showOn: [pages.websites],
  },
  {
    question: 'Brauchen Sie Zugang zu meiner Website?',
    answer:
      'Nein. Ich prüfe die Seite so, wie Ihre Kunden sie sehen. Passwörter oder Zugangsdaten brauche ich dafür nicht.',
    showOn: [pages.websiteCheck],
  },
  {
    question: 'Brauche ich danach eine neue Website?',
    answer:
      'Nicht unbedingt. Ist Ihre Seite technisch in Ordnung und fehlen nur Angaben, reicht oft eine Reparatur. Eine neue Website empfehle ich, wenn die Seite auf dem Handy nicht funktioniert oder die Technik dahinter veraltet ist. Die Empfehlung begründe ich im Bericht. Ob Sie die Punkte selbst angehen, Ihren bisherigen Anbieter beauftragen oder mich, entscheiden Sie.',
    showOn: [pages.websiteCheck],
  },
  {
    question: 'Ist der Website-Check eine Rechtsberatung?',
    answer:
      'Nein. Der Bericht ist eine technische und organisatorische Bestandsaufnahme. Ich zeige, welche Angaben fehlen und was technisch auffällt, und nenne jeweils die Grundlage. Eine rechtsverbindliche Prüfung Ihrer Rechtstexte bekommen Sie bei einem Rechtsanwalt oder bei einem Anbieter für Rechtstexte.',
    showOn: [pages.websiteCheck],
  },
  {
    question: 'Geht das auch mit meiner bestehenden Website?',
    answer:
      'Ja. Die Abläufe funktionieren auch mit einer Website, die nicht von mir ist.',
    showOn: [pages.automatisierung],
  },
  {
    question: 'Welche laufenden Kosten kommen dazu?',
    answer: `Zwei Posten. Die ${automationCare.title} kostet ${automationCare.price}. Dazu kommen Gebühren der Dienste, die der Ablauf nutzt. Die zahlen Sie direkt beim Anbieter. Wie hoch sie sind, steht im Angebot. ${pricing.taxNote}`,
    showOn: [pages.automatisierung],
  },
  {
    question: `Warum ist die ${automationCare.title} Pflicht?`,
    answer:
      'Automatische Abläufe hängen an Diensten wie Ihrem E-Mail-Postfach und Ihrem Kalender. Diese Dienste ändern sich mit der Zeit. Mit der Betreuung kümmere ich mich darum, dass Ihr Ablauf zuverlässig weiterläuft und nicht eines Tages unbemerkt ausfällt.',
    showOn: [pages.automatisierung],
  },
  {
    question: 'Mit welchen Programmen funktioniert das?',
    answer:
      'Mit Ihrem E-Mail-Postfach und mit Online-Kalendern wie Google Kalender oder Outlook. Welche Dienste zu Ihrem Betrieb passen, klären wir im Erstgespräch.',
    showOn: [pages.automatisierung],
  },
  {
    question: 'Wer kümmert sich um Impressum und Datenschutzerklärung?',
    answer:
      'Die Rechtstexte erstellen Sie mit einem Rechtstexte-Generator. Ich liefere Ihnen dafür alle technischen Angaben zur Website, etwa zum Hosting, zu eingesetzten Diensten und zu Cookies. Auf Wunsch gehen wir den Generator gemeinsam durch. Die Angaben fürs Impressum kommen von Ihnen. Rechtstexte verfasse ich nicht.',
    showOn: [pages.websites, pages.websiteCheck],
  },
  {
    question: 'Kommen Sie auch persönlich vorbei?',
    answer: `Ja, einmal pro Projekt. Erstgespräch und Abstimmung laufen ${callTexts.via}, das spart Ihnen Zeit. Den Termin bei Ihnen im Betrieb nutzen wir für die Übergabe mit Einweisung oder um Ihre Fotos und Unterlagen gemeinsam durchzusehen.`,
    showOn: [pages.rheinSieg],
  },
  {
    question: 'Kostet die Anfahrt extra?',
    answer: `Im ${site.region} nicht, dort ist die Anfahrt im Festpreis enthalten. Liegt Ihr Betrieb außerhalb, sprechen wir die Anfahrt vorher ab.`,
    showOn: [pages.rheinSieg],
  },
];

/**
 * Abgeschlossene Kundenprojekte. Nur echte Projekte mit Zustimmung des
 * Kunden eintragen: keine erfundenen Fallstudien, Namen oder Kennzahlen,
 * auch nicht als Platzhalter. Sichtbar erst mit `features.referenzen`.
 */
export type Referenz = {
  /** Name des Betriebs oder kurze Projektbezeichnung */
  title: string;
  /** Was gemacht wurde, in ein bis zwei Saetzen */
  summary: string;
  /** Adresse der fertigen Seite, falls oeffentlich */
  href?: string;
};

export const referenzen: Referenz[] = [];

export const showReferenzen = features.referenzen && referenzen.length > 0;

/** Hauptnavigation. Der Buchungsbutton kommt in Nav.astro dazu. */
export const navLinks: { href: string; label: string }[] = [
  pages.websiteCheck,
  pages.websites,
  pages.automatisierung,
  ...(showReferenzen ? [{ href: '/#referenzen', label: 'Referenzen' }] : []),
  pages.ueberMich,
];
