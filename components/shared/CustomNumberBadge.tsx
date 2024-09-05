const CustomNumberBadge = ({
  title,
}: {
  title: string | number | undefined;
}) => {
  return (
    <span className="flex h-[17px] w-[17px] items-center justify-center rounded-full bg-slate-900 text-p3 font-bold text-white dark:bg-white dark:text-slate-900 max-sm:absolute max-sm:-right-1 max-sm:top-0 sm:text-p2">
      {title}
    </span>
  );
};

export default CustomNumberBadge;
