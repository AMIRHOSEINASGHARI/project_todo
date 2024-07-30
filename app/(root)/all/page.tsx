// constants
import { icons } from "@/constants";
// cmp
import AllTodos from "@/components/pages/all/AllTodos";
import PageHeading from "@/components/shared/layout/PageHeading";

const AllTodosPage = () => {
  return (
    <>
      <PageHeading icon={icons.infinity} title="All" />
      <AllTodos />
    </>
  );
};

export default AllTodosPage;
