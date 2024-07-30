// next
import Image from "next/image";
import Link from "next/link";
// utils
import { getServerSession } from "@/utils/session";
// constants
import { images } from "@/constants";

const SidebarUserProfile = () => {
  const session = getServerSession();

  return (
    <Link
      href="/settings"
      className="sm:px-5 sm:pt-5 p-2 pt-[20px] pb-0 flex items-center max-sm:justify-center gap-4"
    >
      <Image
        src={images.person}
        width={150}
        height={150}
        alt="user"
        priority
        className="w-[40px] h-[40px]"
      />
      <div className="max-sm:hidden">
        <p className="font-bold -mb-1">{session?.username}</p>
        <p className="text-p1 capitalize">{session?.name}</p>
      </div>
    </Link>
  );
};

export default SidebarUserProfile;
