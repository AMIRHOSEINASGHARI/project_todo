// constants
import { icons } from "@/constants";
// cmp
import PageHeading from "@/components/shared/layout/PageHeading";
import GroupTodos from "@/components/pages/groups/GroupTodos";

const Group = () => {
  return (
    <>
      <PageHeading icon={icons.groups} title="Groups" />
      <GroupTodos />
    </>
  );
};

export default Group;
