import { AddressCardInfos } from './types/AddressCardInfos';

import img1 from 'src/assets/images/guedelon.png';
import img2 from 'src/assets/images/colette.jpg';

export const ACTIVITIES_INFORMATIONS: AddressCardInfos[] = [
  {
    id: 0,
    image: img1,
    title: 'Guédelon',
    description:
      "Une quarantaine d'œuvriers relèvent un défi hors-norme : construire aujourd'hui un château fort selon les techniques et avec les matériaux utilisés au Moyen Âge.",
    link: 'https://www.guedelon.fr/fr',
    address: 'Guédelon, D955, 89520 Treigny-Perreuse-Sainte-Colombe',
  },
  {
    id: 1,
    image: img2,
    title: 'La maison de Colette',
    description: "Découvrez l'auteure au travers de son patrimoine.",
    link: 'http://www.maisondecolette.fr/',
    address:
      'La Maison de Colette 8-10 rue Colette 89520 Saint-Sauveur en Puisaye',
  },
  // {
  //   id: 2,
  //   image:
  //     'https://lh3.googleusercontent.com/gps-proxy/AFm_dcQVZw6cIFXGILd9Wt0T-hUE5iGYfAE_z8bK_LwhDsj8dC96J8ZkOSPk_X6lK2xnUQVZZlZ-N8jnjk6OZ1kY-rfFPnJWxgEBZRdVHuD4fQfqikvkZ-KEeJ-SmJ9xUduRBQViZrXXU_uNr427C4QbJdbiAws4dI69mh1VWXdOWcEv4MQ2Hdgx2g=w437-h240-k-no',
  //   title: "Chambre d'Hôtes l'Escalier des Rêves",
  //   description: "Chambre d'Escalier des Rêves",
  //   link: null,
  //   address: '9 Rue du Bourg Gelé, 89520 Saint-Sauveur-en-Puisaye, France',
  // },
];
