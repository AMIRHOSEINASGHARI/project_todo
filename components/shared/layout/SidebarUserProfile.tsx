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
      className="flex items-center gap-4 p-2 pb-0 pt-[20px]"
    >
      <Image
        src={images.person}
        width={150}
        height={150}
        alt="user"
        priority
        className="h-[40px] w-[40px]"
      />
      <div>
        <p className="-mb-1 font-bold">{session?.username}</p>
        <p className="text-p1 capitalize">{session?.name}</p>
      </div>
    </Link>
  );
};

export default SidebarUserProfile;
