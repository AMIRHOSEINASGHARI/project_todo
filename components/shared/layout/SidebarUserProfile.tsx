// next
import Image from "next/image";
import Link from "next/link";
// utils
import { getServerSession } from "@/utils/session";
// constants
import { images } from "@/constants";
import DarkModeToggle from "../DarkModeToggle";

const SidebarUserProfile = () => {
  const session = getServerSession();

  return (
    <div className="flex items-center justify-between p-2 pb-0 pt-[20px]">
      <Link href="/settings" className="flex w-fit items-center gap-4">
        <Image
          src={session?.avatar || images.person}
          width={150}
          height={150}
          alt="user"
          priority
          className="h-[40px] w-[40px] rounded-full"
        />
        <div>
          <p className="-mb-1 font-bold">{session?.username}</p>
          <p className="text-p1 capitalize">{session?.name}</p>
        </div>
      </Link>
      <DarkModeToggle />
    </div>
  );
};

export default SidebarUserProfile;
