/**
 * Header navigation.
 * - Section items (no `to`) scroll to that section id on the home page; ids double as scrollspy keys.
 * - Route items (`to`) navigate to their own page.
 * - `mobileHidden` items are dropped on phones to keep the header on one line (the logo already goes home).
 */
export const NAV_ITEMS = [
  { id: 'hero', label: 'HOME', mobileHidden: true },
  { id: 'methodology', label: 'PHILOSOPHY' },
  { id: 'services', label: 'CAPABILITIES' },
  { id: 'contact', label: 'CONTACT', to: '/contact' },
];

export const NAV_SECTION_IDS = NAV_ITEMS.filter((item) => !item.to).map((item) => item.id);
