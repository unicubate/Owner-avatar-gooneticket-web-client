interface Props {
  title: React.ReactNode;
  image?: React.ReactNode;
  description: React.ReactNode;
}

const EmptyData = ({ title, image, description }: Props) => {
  return (
    <>
      <div className="relative">
        <div className="text-center inset-x-0 top-0 grid place-items-center">
          {image}
          <div className="mt-2 text-lg font-bold">{title}</div>
          <span className="font-medium text-gray-600">{description}</span>
        </div>
      </div>
    </>
  );
};

export { EmptyData };
