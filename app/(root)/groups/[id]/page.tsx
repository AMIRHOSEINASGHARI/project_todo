// cmp
import GroupDetails from "@/components/pages/group/GroupDetails";

const Group = ({ params: { id } }: { params: { id: string } }) => {
  return <GroupDetails id={id} />;
};

export default Group;
