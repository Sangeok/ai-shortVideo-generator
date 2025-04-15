type Props = {
  propOne: string;
  propTwo: number;
};

export const MyComponent: React.FC<Props> = ({ propOne, propTwo }) => {
  return (
    <div>
      props: {propOne}, {propTwo}
    </div>
  );
};
