export interface Achievement {
  id: string;
  name: string;
  description: string;
  emoji: string;
  condition:
    | { type: "countries_learned"; value: number }
    | { type: "correct_answers"; value: number }
    | { type: "streak"; value: number }
    | { type: "continent_complete"; value: string }
    | { type: "mastered"; value: number }
    | { type: "quiz_completed"; value: number }
    | { type: "oceans_learned"; value: number }
    | { type: "level"; value: number };
}

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: "premier-pays",
    name: "Premier pays",
    description: "Apprends ton premier pays.",
    emoji: "🌍",
    condition: { type: "countries_learned", value: 1 },
  },
  {
    id: "dix-bonnes",
    name: "En forme",
    description: "Obtiens 10 bonnes réponses.",
    emoji: "🎯",
    condition: { type: "correct_answers", value: 10 },
  },
  {
    id: "serie-10",
    name: "Série de 10",
    description: "Réussis 10 réponses d'affilée.",
    emoji: "🔥",
    condition: { type: "streak", value: 10 },
  },
  {
    id: "serie-25",
    name: "Inarrêtable",
    description: "Réussis 25 réponses d'affilée.",
    emoji: "⚡",
    condition: { type: "streak", value: 25 },
  },
  {
    id: "europe-completee",
    name: "Explorateur européen",
    description: "Maîtrise tous les pays d'Europe.",
    emoji: "🇪🇺",
    condition: { type: "continent_complete", value: "europe" },
  },
  {
    id: "ameriques-completees",
    name: "Amériques conquises",
    description: "Maîtrise l'Amérique du Nord et du Sud.",
    emoji: "🌎",
    condition: { type: "continent_complete", value: "ameriques" },
  },
  {
    id: "asie-completee",
    name: "Voyageur asiatique",
    description: "Maîtrise tous les pays d'Asie.",
    emoji: "🌏",
    condition: { type: "continent_complete", value: "asie" },
  },
  {
    id: "afrique-completee",
    name: "Expert africain",
    description: "Maîtrise tous les pays d'Afrique.",
    emoji: "🦁",
    condition: { type: "continent_complete", value: "afrique" },
  },
  {
    id: "oceanie-completee",
    name: "Navigateur pacifique",
    description: "Maîtrise tous les pays d'Océanie.",
    emoji: "🏝️",
    condition: { type: "continent_complete", value: "oceanie" },
  },
  {
    id: "cinquante-maitrises",
    name: "50 pays maîtrisés",
    description: "Atteins 80 % de maîtrise sur 50 pays.",
    emoji: "🏆",
    condition: { type: "mastered", value: 50 },
  },
  {
    id: "premier-quiz",
    name: "Quizzer",
    description: "Termine ton premier quiz.",
    emoji: "📝",
    condition: { type: "quiz_completed", value: 1 },
  },
  {
    id: "oceans-decouverts",
    name: "Marin",
    description: "Apprends les 5 océans.",
    emoji: "🌊",
    condition: { type: "oceans_learned", value: 5 },
  },
  {
    id: "niveau-avance",
    name: "Avancé",
    description: "Atteins le niveau Avancé.",
    emoji: "⭐",
    condition: { type: "level", value: 4 },
  },
  {
    id: "maitre-du-monde",
    name: "Maître du monde",
    description: "Maîtrise 150 pays ou plus.",
    emoji: "👑",
    condition: { type: "mastered", value: 150 },
  },
];
