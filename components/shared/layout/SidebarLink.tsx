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
  group_todos,
}: SidebarLinkProps) => {
  const pathname = usePathname();

  return (
    <Button
      asChild
      key={link}
      variant="ghost"
      className="justify-start max-sm:h-fit max-sm:w-fit max-sm:rounded-xl max-sm:p-2 max-sm:hover:bg-slate-900 max-sm:hover:text-white"
    >
      <Link
        href={link}
        className={clsx("relative flex w-full items-center justify-between", {
          "bg-slate-900 text-white sm:bg-slate-100 sm:text-blue-600":
            pathname === link,
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
        {link.includes("/groups/") && group_todos !== 0 && (
          <CustomNumberBadge title={group_todos} />
        )}
        {pathname === link && (
          <div className="absolute left-0 h-[20px] w-[4px] rounded-[10px] bg-blue-500 max-sm:hidden"></div>
        )}
      </Link>
    </Button>
  );
};

export default SidebarLink;
