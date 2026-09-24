export type WaterBodyType = "ocean" | "mer";

export interface WaterBody {
  id: string;
  name: string;
  type: WaterBodyType;
  description: string;
  coordinates: [number, number];
  funFact?: string;
}

export const WATER_BODIES: WaterBody[] = [
  {
    id: "atlantique",
    name: "Océan Atlantique",
    type: "ocean",
    description: "Sépare l'Amérique de l'Europe et de l'Afrique.",
    coordinates: [0, -30],
    funFact: "Deuxième plus grand océan du monde.",
  },
  {
    id: "pacifique",
    name: "Océan Pacifique",
    type: "ocean",
    description: "S'étend entre l'Asie, l'Océanie et les Amériques.",
    coordinates: [0, -160],
    funFact: "Le plus grand et le plus profond des océans.",
  },
  {
    id: "indien",
    name: "Océan Indien",
    type: "ocean",
    description: "Bordé par l'Afrique, l'Asie et l'Australie.",
    coordinates: [-20, 80],
    funFact: "Le plus chaud des océans.",
  },
  {
    id: "arctique",
    name: "Océan Arctique",
    type: "ocean",
    description: "Situé autour du pôle Nord.",
    coordinates: [80, 0],
    funFact: "Le plus petit et le moins profond des océans.",
  },
  {
    id: "austral",
    name: "Océan Austral",
    type: "ocean",
    description: "Entoure l'Antarctique au sud.",
    coordinates: [-60, 0],
    funFact: "Aussi appelé océan Antarctique.",
  },
  {
    id: "mediterranee",
    name: "Mer Méditerranée",
    type: "mer",
    description: "Entre l'Europe, l'Afrique et l'Asie.",
    coordinates: [35, 18],
    funFact: "Berceau de plusieurs civilisations antiques.",
  },
  {
    id: "caraibes",
    name: "Mer des Caraïbes",
    type: "mer",
    description: "Située entre l'Amérique centrale et les Antilles.",
    coordinates: [15, -75],
  },
  {
    id: "rouge",
    name: "Mer Rouge",
    type: "mer",
    description: "Entre l'Afrique et la péninsule arabique.",
    coordinates: [20, 38],
  },
  {
    id: "noire",
    name: "Mer Noire",
    type: "mer",
    description: "Entre l'Europe de l'Est et l'Asie Mineure.",
    coordinates: [43, 35],
  },
  {
    id: "nord",
    name: "Mer du Nord",
    type: "mer",
    description: "Entre les îles Britanniques et l'Europe du Nord.",
    coordinates: [56, 3],
  },
  {
    id: "baltique",
    name: "Mer Baltique",
    type: "mer",
    description: "Au nord de l'Europe centrale.",
    coordinates: [58, 20],
  },
  {
    id: "chine-meridionale",
    name: "Mer de Chine méridionale",
    type: "mer",
    description: "Au sud-est de l'Asie.",
    coordinates: [12, 113],
  },
  {
    id: "japon",
    name: "Mer du Japon",
    type: "mer",
    description: "Entre le Japon et le continent asiatique.",
    coordinates: [40, 135],
  },
  {
    id: "arabie",
    name: "Mer d'Arabie",
    type: "mer",
    description: "Partie nord-ouest de l'océan Indien.",
    coordinates: [15, 65],
  },
  {
    id: "golfe-persique",
    name: "Golfe Persique",
    type: "mer",
    description: "Entre la péninsule arabique et l'Iran.",
    coordinates: [26, 52],
  },
  {
    id: "caspienne",
    name: "Mer Caspienne",
    type: "mer",
    description: "Plus grande mer fermée du monde, entre Europe et Asie.",
    coordinates: [42, 50],
    funFact: "Techniquement un lac salé géant.",
  },
];

export function getWaterBodyById(id: string): WaterBody | undefined {
  return WATER_BODIES.find((w) => w.id === id);
}
