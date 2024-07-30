// constants
import { sidebarMenuLinks } from "@/constants";
// cmp
import SidebarLink from "./SidebarLink";

const SidebarLinks = () => {
  return (
    <div className="sm:px-5 px-2 flex flex-col">
      {sidebarMenuLinks.map((link) => (
        <SidebarLink
          key={link.link}
          link={link.link}
          image={link.image}
          title={link.title}
        />
      ))}
    </div>
  );
};

export default SidebarLinks;
