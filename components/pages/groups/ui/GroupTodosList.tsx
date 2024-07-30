import { getGroups } from "@/actions/group";
import GroupCard from "@/components/shared/groups/GroupCard";
import ZeroTodosText from "@/components/shared/ZeroTodosText";
import React from "react";

const GroupTodosList = async () => {
  const data = await getGroups();

  if (data?.code !== 200) throw new Error(data.message);

  const groups = data.groups;

  if (groups?.length === 0) return <ZeroTodosText text="groups" />;

  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
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

export default GroupTodosList;
