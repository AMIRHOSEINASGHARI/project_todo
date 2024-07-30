type PageHeadingProps = {
  icon: JSX.Element;
  title: string;
};

const PageHeading = ({ icon, title }: PageHeadingProps) => {
  return (
    <div className="flex items-center gap-4 mb-5">
      <div className="text-[30px]">{icon}</div>
      <h1 className="h2">{title}</h1>
    </div>
  );
};

export default PageHeading;
