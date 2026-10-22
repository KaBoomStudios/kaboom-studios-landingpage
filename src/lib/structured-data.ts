/**
 * Strukturierte Daten (JSON-LD, Vokabular schema.org) fuer Suchmaschinen.
 *
 * Alle Angaben kommen aus src/data/site.ts. Hier steht nur, wie sie auf
 * schema.org abgebildet werden. Jede Seite liefert ihre Knoten als Liste, die
 * Komponente JsonLd.astro fasst sie zu einem `@graph` zusammen. Knoten, die auf
 * mehreren Seiten vorkommen (Unternehmen, Leistungen), tragen eine feste `@id`,
 * damit Suchmaschinen sie als dasselbe Objekt erkennen.
 */
import { contact, imprint, site, type Service } from '../data/site';

export type Node = Record<string, unknown>;

/** Absolute Adresse zu einem Pfad der Seite, passend zu Canonical und Sitemap. */
const absolute = (path: string) => new URL(path, site.url).href;

const ids = {
  business: absolute('/#unternehmen'),
  website: absolute('/#website'),
  service: (service: Service) => `${absolute(service.page.href)}#leistung`,
};

/** Verweis auf das Unternehmen, ohne seine Angaben auf jeder Seite zu wiederholen. */
const businessRef = { '@id': ids.business };

/**
 * Das Unternehmen. Typ `LocalBusiness`: Google verlangt den genauesten
 * Untertyp, fuer Webdesign gibt es keinen. `ProfessionalService` waere
 * naheliegend, ist bei schema.org aber als abgekuendigt markiert.
 *
 * Bewusst ohne `telephone` und ohne Strasse: Nummer und volle Anschrift
 * stehen nur im Impressum, damit Anfragen ueber Buchung und E-Mail kommen und
 * nicht als Anruf oder Besuch vor der Tuer. Ueber die strukturierten Daten
 * landeten sie sonst im Suchergebnis. Fuer die regionale Zuordnung genuegen
 * Postleitzahl und Ort. Google empfiehlt diesen Knoten auf der Startseite
 * oder einer Seite ueber das Unternehmen, nicht auf jeder Seite.
 */
export function businessNode(services: Service[]): Node {
  return {
    '@type': 'LocalBusiness',
    '@id': ids.business,
    name: site.name,
    description: site.tagline,
    url: absolute('/'),
    email: contact.email,
    image: absolute('/og-image.png'),
    founder: { '@type': 'Person', name: site.owner },
    address: {
      '@type': 'PostalAddress',
      postalCode: imprint.postalCode,
      addressLocality: imprint.city,
      addressCountry: 'DE',
    },
    areaServed: { '@type': 'AdministrativeArea', name: site.region },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Leistungen',
      itemListElement: services.map((service) => ({
        '@type': 'Offer',
        itemOffered: serviceRef(service),
        priceSpecification: priceSpecification(service),
      })),
    },
  };
}

/** Die Website selbst. Daraus liest Google unter anderem den Namen der Seite. */
export function websiteNode(): Node {
  return {
    '@type': 'WebSite',
    '@id': ids.website,
    name: site.name,
    url: absolute('/'),
    inLanguage: 'de-DE',
    publisher: businessRef,
  };
}

/** Kurzform einer Leistung fuer den Katalog des Unternehmens. */
function serviceRef(service: Service): Node {
  return {
    '@type': 'Service',
    '@id': ids.service(service),
    name: service.title,
    url: absolute(service.page.href),
  };
}

/**
 * Die Preise sind "ab"-Preise. `minPrice` bildet das ab, ein fester `price`
 * wuerde einen genauen Preis behaupten. Laufende Kosten (etwa die Betreuung
 * einer Automatisierung) kommen als zweite Angabe je Monat dazu: `MON` ist der
 * UN/CEFACT-Code fuer Monat, den schema.org fuer `unitCode` vorsieht.
 */
function priceSpecification(service: Service): Node[] {
  const specs: Node[] = [
    { '@type': 'PriceSpecification', minPrice: service.priceFrom, priceCurrency: 'EUR' },
  ];
  if (service.recurring) {
    specs.push({
      '@type': 'UnitPriceSpecification',
      name: service.recurring.title,
      minPrice: service.recurring.priceFrom,
      priceCurrency: 'EUR',
      referenceQuantity: { '@type': 'QuantitativeValue', value: 1, unitCode: 'MON' },
    });
  }
  return specs;
}

/** Eine Leistung ausfuehrlich, fuer ihre eigene Seite. */
export function serviceNode(service: Service): Node {
  return {
    ...serviceRef(service),
    description: service.description,
    provider: businessRef,
    areaServed: { '@type': 'AdministrativeArea', name: site.region },
    offers: {
      '@type': 'Offer',
      priceSpecification: priceSpecification(service),
    },
  };
}

/**
 * Brotkrumen nach den Vorgaben von Google: Position ab 1, der letzte Eintrag
 * (die aktuelle Seite) darf ohne Adresse stehen.
 */
export function breadcrumbNode(crumbs: { label: string; href?: string }[]): Node {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.label,
      ...(crumb.href ? { item: absolute(crumb.href) } : {}),
    })),
  };
}
