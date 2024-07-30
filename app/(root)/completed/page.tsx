// constants
import { icons } from "@/constants";
// cmp
import PageHeading from "@/components/shared/layout/PageHeading";
import CompletedTodos from "@/components/pages/completed/CompletedTodos";

const Completed = () => {
  return (
    <>
      <PageHeading icon={icons.check} title="Completed" />
      <CompletedTodos />
    </>
  );
};

export default Completed;
