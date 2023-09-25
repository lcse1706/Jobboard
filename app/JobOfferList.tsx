import { OfferListForm } from '@/components/OfferList.Form';

const JobOffers: any = [
  {
    imgSrc: '/favicon.ico',
    title: 'JS Developer',
    salary: '20k-30k',
    technologies: ['JS', 'CSS', 'React', 'StoryBook'],
    localization: 'Gdansk',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate dolore ad iste expedita eaque natus excepturi beatae aut, maxime dolor!',
  },
  {
    imgSrc: '/favicon.ico',
    title: 'Python Developer',
    salary: '25k-35k',
    technologies: ['Python', 'Django', 'SQL', 'REST API'],
    localization: 'Warsaw',
    description:
      'Poszukujemy doświadczonego programisty Python, który będzie odpowiedzialny za rozwijanie aplikacji webowych w oparciu o Django oraz tworzenie i zarządzanie bazami danych SQL.',
  },
  {
    imgSrc: '/favicon.ico',
    title: 'Frontend Developer',
    salary: '22k-32k',
    technologies: ['HTML', 'CSS', 'JavaScript', 'Vue.js'],
    localization: 'Krakow',
    description:
      'Jesteśmy zespołem Frontend Developerów poszukującym kreatywnego i ambitnego programisty, który będzie odpowiedzialny za tworzenie atrakcyjnych i responsywnych interfejsów użytkownika.',
  },
];

export const JobOfferList = () => {
  return (
    <section className="w-2/3">
      <OfferListForm offers={JobOffers} />
    </section>
  );
};
