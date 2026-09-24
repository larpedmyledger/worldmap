# WorldMap

Plateforme d'apprentissage de géographie mondiale pour élèves du secondaire (Québec).  
Apprends les pays progressivement : découverte → drapeaux → carte → capitales → révision espacée.

## Stack

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- Lucide React
- D3 + TopoJSON (carte interactive)
- Recharts (statistiques)
- localStorage (progression)

## Fonctionnalités

- Onboarding + parcours examen
- 6 continents, ~197 pays en français
- Niveaux 0 à 6 (découverte → carte → écriture)
- Océans et mers
- Quiz adaptatif (10 / 20 / 50)
- Mode examen (30 questions, feedback à la fin)
- Carte SVG interactive (zoom, pan, clic)
- XP, niveaux, séries, achievements
- Répétition espacée et page « À revoir »
- Interface 100 % en français, dark mode

## Démarrage local

```bash
npm install
npm run dev
```

Ouvre [http://localhost:3000](http://localhost:3000).

## Build de production

```bash
npm run build
npm start
```

## Déploiement sur Vercel

1. Pousse le projet sur GitHub (ou importe le dossier dans Vercel).
2. Sur [vercel.com](https://vercel.com) → **Add New Project**.
3. Sélectionne le dépôt.
4. Framework : **Next.js** (détecté automatiquement).
5. Clique sur **Deploy**.

Aucune variable d'environnement ni base de données n'est requise.

CLI :

```bash
npm i -g vercel
vercel
```

## Structure

```
src/
  app/              # Pages (Accueil, Apprendre, Quiz, Carte…)
  components/       # UI, carte, quiz, layout
  data/             # Pays, océans, achievements
  lib/              # XP, SRS, quiz, storage
  types/            # Types partagés
public/data/        # TopoJSON world-atlas (carte offline)
```

## Progression

Tout est sauvegardé dans `localStorage` sous la clé `worldmap-progress-v1` :
pays connus, maîtrise, XP, séries, quiz, préférences.

Tu peux tout effacer dans **Paramètres**.
