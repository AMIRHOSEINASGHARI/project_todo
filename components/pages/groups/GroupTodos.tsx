// actions
import { getGroups } from "@/actions/group";
// cmp
import GroupCard from "@/components/shared/groups/GroupCard";
import ZeroTodosText from "@/components/shared/ZeroTodosText";

const GroupTodos = async () => {
  const data = await getGroups();

  if (data?.code !== 200) throw new Error(data.message);

  const groups = data.groups;

  if (groups?.length === 0) return <ZeroTodosText text="groups" />;

  return (
    <section className="Grid">
      {groups?.map((group) => (
        <GroupCard
          key={group?._id}
          _id={group?._id}
          group_name={group?.group_name}
          todos={group?.todos?.length}
          createdAt={group?.createdAt}
        />
      ))}
    </section>
  );
};

export default GroupTodos;
