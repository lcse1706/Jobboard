export const Details = (props: any) => {
  console.log(props.details);
  return <p>{props.details[0].title}</p>;
};
