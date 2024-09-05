// next
import Image from "next/image";
// constants
import { images } from "@/constants";
// cmp
// import Navbar from "@/components/shared/layout/Navbar";
// import Sidebar from "@/components/shared/layout/Sidebar";

const NotFound = () => {
  return (
    <div>
      {/* <Navbar /> */}
      {/* <Sidebar /> */}
      <div className="pages_spaces">
        <div className="flex flex-col items-center">
          <Image
            src={images.notFound}
            priority
            width={300}
            height={300}
            alt="Not Found!"
          />
          <p className="text-darkRose mb-2 mt-5 text-p1">Route Not Found!</p>
          {/* <BackLink
            title="Back to Home"
            icon={<Home size={15} />}
            href="/dashboard"
            classNames="bg-lightGray hover:bg-gray-200 Transition flex items-center gap-3 rounded-xl py-2 px-4"
          /> */}
        </div>
      </div>
    </div>
  );
};

export default NotFound;
