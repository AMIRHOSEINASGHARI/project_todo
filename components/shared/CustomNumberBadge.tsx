const CustomNumberBadge = ({
  title,
}: {
  title: string | number | undefined;
}) => {
  return (
    <span className="flex h-[17px] w-[17px] items-center justify-center rounded-full bg-slate-900 text-p3 text-white sm:text-p2">
      {title}
    </span>
  );
};

export default CustomNumberBadge;
