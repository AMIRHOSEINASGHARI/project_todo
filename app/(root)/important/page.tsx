// constants
import { icons } from "@/constants";
// cmp
import PageHeading from "@/components/shared/layout/PageHeading";
import ImportantTodos from "@/components/pages/important/ImportantTodos";

const Important = () => {
  return (
    <>
      <PageHeading icon={icons.star} title="Important" />
      <ImportantTodos />
    </>
  );
};

export default Important;
