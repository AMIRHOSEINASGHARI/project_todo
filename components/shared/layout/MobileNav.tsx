import { Separator } from "@/components/ui/separator";
import SidebarLinks from "./SidebarLinks";
import SidebarTodoGroups from "./SidebarTodoGroups";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import { DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { RiMenu5Fill } from "react-icons/ri";
import { Button } from "@/components/ui/button";
import { getServerSession } from "@/utils/session";
import Link from "next/link";
import Image from "next/image";
import { images } from "@/constants";
import DarkModeToggle from "../DarkModeToggle";

const HiddenTags = () => (
  <VisuallyHidden.Root>
    <DialogDescription></DialogDescription>
    <DialogTitle></DialogTitle>
  </VisuallyHidden.Root>
);

const MobileNav = () => {
  const session = getServerSession();

  return (
    <div className="flex items-center justify-between w-full">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="icon">
            <RiMenu5Fill />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" rootClassName="pt-5" closeClassName="text-xl">
          <HiddenTags />
          <div className="mb-2">
            <DarkModeToggle />
          </div>
          <SidebarLinks />
          <Separator className="my-3" />
          <SidebarTodoGroups />
        </SheetContent>
      </Sheet>
      <Button asChild variant="ghost" className="rounded-full">
        <Link href="/settings" className="flex gap-2 overflow-hidden">
          <span className="text-xs uppercase truncate">
            {session?.name?.split(" ")[0]}
          </span>
          <Image
            src={session?.avatar || images.person}
            width={300}
            height={300}
            alt="user"
            priority
            className="h-[20px] w-[20px] rounded-full"
          />
        </Link>
      </Button>
    </div>
  );
};

export default MobileNav;
