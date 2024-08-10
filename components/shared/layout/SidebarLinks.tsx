// actions
import { getSidebarTodos } from "@/actions/todo";
// constants
import { sidebarMenuLinks } from "@/constants";
// cmp
import SidebarLink from "./SidebarLink";

const SidebarLinks = async () => {
  const data = await getSidebarTodos();

  return (
    <div className="flex flex-col gap-2 px-2 sm:px-5">
      {sidebarMenuLinks.map((link) => (
        <SidebarLink
          key={link.link}
          link={link.link}
          image={link.image}
          title={link.title}
          un_completed_todos={data?.un_completed_todos}
          important_todos={data?.important_todos}
        />
      ))}
    </div>
  );
};

export default SidebarLinks;
