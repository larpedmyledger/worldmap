export function normalizeAnswer(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[''`]/g, "'")
    .replace(/[^a-z0-9'\s-]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

const ALIASES: Record<string, string[]> = {
  "etats-unis": ["usa", "us", "amerique", "etats unis d amerique", "united states"],
  "royaume-uni": ["uk", "grande bretagne", "angleterre", "britain"],
  "pays-bas": ["hollande", "netherlands"],
  "coree du sud": ["sud coree", "republique de coree"],
  "coree du nord": ["nord coree", "rdpn"],
  "republique tcheque": ["tchequie", "tchequie"],
  "cote d ivoire": ["cote divoire", "ivory coast"],
  "republique democratique du congo": ["rdc", "congo kinshasa"],
  congo: ["congo brazzaville", "republique du congo"],
  russie: ["federation de russie"],
  "viet nam": ["vietnam"],
  "emirats arabes unis": ["eau", "uae", "emirats"],
  "arabie saoudite": ["arabie"],
  birmanie: ["myanmar"],
  "saint-marin": ["san marin"],
  vatican: ["saint siege", "cite du vatican"],
};

export function answersMatch(input: string, expected: string): boolean {
  const a = normalizeAnswer(input);
  const b = normalizeAnswer(expected);
  if (!a || !b) return false;
  if (a === b) return true;
  if (a.includes(b) || b.includes(a)) return true;

  const expectedKey = b.replace(/ /g, "-");
  const aliases = ALIASES[expectedKey] ?? ALIASES[b] ?? [];
  return aliases.some((alias) => normalizeAnswer(alias) === a);
}

export function shuffle<T>(items: T[]): T[] {
  const arr = [...items];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export function pickRandom<T>(items: T[], count: number): T[] {
  return shuffle(items).slice(0, count);
}
