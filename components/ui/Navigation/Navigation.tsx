import Link from 'next/link';
import { Button } from '../Button';

interface NavProps {
  nav: Array<{ label: string; link: string }>;
}

export const Navigation = (props: NavProps) => {
  return (
    <nav className="flex w-2/5 justify-end items-end">
      <ul className="flex flex-row space-x-2">
        {props.nav.map((item, index) => (
          <li key={index} className="grow text-center py-2 px-4 m-1">
            <Link href={item.link}>{item.label}</Link>
          </li>
        ))}
        <Button label="Log In"></Button>
      </ul>
    </nav>
  );
};
