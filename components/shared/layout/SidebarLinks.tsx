// actions
import { getSidebarTodos } from "@/actions/todo";
// constants
import { sidebarMenuLinks } from "@/constants";
// cmp
import SidebarLink from "./SidebarLink";

const SidebarLinks = async () => {
  const data = await getSidebarTodos();

  return (
    <>
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
    </>
  );
};

export default SidebarLinks;
