// Section ids double as scroll targets and scrollspy keys
export const NAV_ITEMS = [
  { id: 'hero', label: 'HOME' },
  { id: 'methodology', label: 'PHILOSOPHY' },
  { id: 'services', label: 'CAPABILITIES' },
];

export const NAV_SECTION_IDS = NAV_ITEMS.map((item) => item.id);
