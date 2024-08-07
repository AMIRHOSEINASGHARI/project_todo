"use client";

// next
import Link from "next/link";
import { usePathname } from "next/navigation";
// types
import { SidebarLinkProps } from "@/types/shared";
// cmp
import { Button } from "@/components/ui/button";
import CustomNumberBadge from "../CustomNumberBadge";
// clsx
import clsx from "clsx";

const SidebarLink = ({
  link,
  image,
  title,
  important_todos,
  un_completed_todos,
}: SidebarLinkProps) => {
  const pathname = usePathname();

  return (
    <Button asChild key={link} variant="ghost" className="justify-start pr-2">
      <Link
        href={link}
        className={clsx("flex items-center justify-between w-full relative", {
          "bg-slate-100 text-blue-600": pathname === link,
        })}
      >
        <div className="flex items-center gap-4">
          <div className="icon_size">{image}</div>
          <span className="max-sm:hidden">{title}</span>
        </div>
        {title === "All" && un_completed_todos !== 0 && (
          <CustomNumberBadge title={un_completed_todos} />
        )}
        {title === "Important" && important_todos !== 0 && (
          <CustomNumberBadge title={important_todos} />
        )}
        {pathname === link && (
          <div className="w-[4px] h-[20px] bg-blue-500 rounded-[10px] absolute left-0"></div>
        )}
      </Link>
    </Button>
  );
};

export default SidebarLink;
