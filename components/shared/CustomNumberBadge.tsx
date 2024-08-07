const CustomNumberBadge = ({
  title,
}: {
  title: string | number | undefined;
}) => {
  return (
    <span className="max-sm:absolute max-sm:top-0 max-sm:-right-1 bg-slate-900 text-white rounded-full w-[17px] h-[17px] flex items-center justify-center text-p3 sm:text-p2">
      {title}
    </span>
  );
};

export default CustomNumberBadge;
