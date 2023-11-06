import { AddressCardInfos } from './types/AddressCardInfos';
import img1 from 'src/assets/images/masilie-chambre.png';
import img2 from 'src/assets/images/gite-les-tendres-annees-1950.jpg';
import img3 from 'src/assets/images/petites barres.jpg';
import img4 from 'src/assets/images/poetrie.jpg';

export const HOTELS_INFORMATIONS: AddressCardInfos[] = [
  {
    id: 0,
    image: img1,
    title: "Chambres d'hôtes Masilie",
    description:
      "Chambres de 2 ou 4 personnes. Une maison à l'ancienne dans une ruelle, au calme, à 100 m de la maison natale de l'écrivaine Colette. Deux chambres d'hôtes en plein cœur de Saint-Sauveur-en-Puisaye.",
    link: 'https://www.masilie.fr/?utm_source=OT_Puisaye_Forterre&utm_medium=OT_Puisaye_Forterre&utm_campaign=OT_Puisaye_Forterre',
    address: 'Pass. des Boulangers, 89520 Saint-Sauveur-en-Puisaye',
  },
  {
    id: 1,
    image: img2,
    title: '1950 - les tendres années',
    description:
      "Chambres de 2 ou 4 personnes. Daniel et Béatrice vous accueillent dans une ancienne ferme entourée de bocages et vous font découvrir leurs chambres d'hôtes dédiées aux années 50.",
    link: 'https://www.1950-lestendresannees.fr/?utm_source=OT_Puisaye_Forterre&utm_medium=OT_Puisaye_Forterre&utm_campaign=OT_Puisaye_Forterre',
    address:
      "Chambre d'Hôtes Les Tendres Années 1950, 406 Les Perreux, 89520 Saint-Sauveur-en-Puisaye",
  },
  {
    id: 2,
    image: img3,
    title: "Chambres d'hôtes des Petites Barres",
    description:
      "Chambre de 2 personnes. Hameau situé à 3 km de St Sauveur. La maison, longère de charme aux façades fleuries, est entourée d'un grand parc arboré. La chambre d'hôtes, située à l'étage avec accès indépendant.",
    link: 'https://www.petitesbarres-puisaye.fr/?utm_source=OT_Puisaye_Forterre&utm_medium=OT_Puisaye_Forterre&utm_campaign=OT_Puisaye_Forterre',
    address: '6 Lieu-dit Les Petites Barres 89520 SAINT-SAUVEUR-EN-PUISAYE',
  },
  {
    id: 3,
    image: img4,
    title: 'Gîtes de la Poèterie',
    description:
      "Le village d'artistes La Poèterie vous accueille dans son univers atypique post-industriel et artistique avec deux gîtes de 14 et 16 places ainsi qu'une grande salle de réception.",
    link: 'https://www.gitesdelapoeterie.com/?utm_source=OT_Puisaye_Forterre&utm_medium=OT_Puisaye_Forterre&utm_campaign=OT_Puisaye_Forterre',
    address:
      'La Poèterie - Village Culturel, 4 Rte des Janets, 89520 Saint-Sauveur-en-Puisaye',
  },
];
