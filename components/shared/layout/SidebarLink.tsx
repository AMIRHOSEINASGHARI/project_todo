"use client";

// next
import Link from "next/link";
import { usePathname } from "next/navigation";
// types
import { SidebarLinkProps } from "@/types/shared";
// cmp
import { Button } from "@/components/ui/button";
// clsx
import clsx from "clsx";

const SidebarLink = ({ link, image, title }: SidebarLinkProps) => {
  const pathname = usePathname();

  return (
    <Button asChild key={link} variant="ghost" className="justify-start">
      <Link
        href={link}
        className={clsx("flex items-center gap-4 w-full relative", {
          "bg-slate-100 text-blue-600": pathname === link,
        })}
      >
        <div className="icon_size">{image}</div>
        <p className="max-sm:hidden">{title}</p>
        {pathname === link && (
          <div className="w-[4px] h-[20px] bg-blue-500 rounded-[10px] absolute right-0"></div>
        )}
      </Link>
    </Button>
  );
};

export default SidebarLink;
