interface HeaderProps {
  titel: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}

export const Header = (props: HeaderProps) => {
  return (
    <header
      className="flex flex-row h-20 bg-gray-300 items-center justify-between p-4"
      style={props.style}
    >
      <h1 className="w-1/4 text-center">{props.titel}</h1>
      {props.children}
    </header>
  );
};
