// types
import { TodosInformationProps } from "@/types/user";
// cmp
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const TodosInformation = ({
  all_todos,
  completed_todos,
  uncompleted_todos,
  important_todos,
  groups,
}: TodosInformationProps) => {
  const headerTitls = [
    "All",
    "Completed",
    "UnCompleted",
    "Important",
    "Groups",
  ];

  return (
    <div className="tableContainer">
      <Table>
        <TableHeader>
          <TableRow>
            {headerTitls.map((i) => (
              <TableHead key={i}>{i}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow className="hover:bg-transparent dark:hover:bg-transparent">
            <TableCell className="py-2">{all_todos}</TableCell>
            <TableCell className="py-2">{completed_todos}</TableCell>
            <TableCell className="py-2">{uncompleted_todos}</TableCell>
            <TableCell className="py-2">{important_todos}</TableCell>
            <TableCell className="py-2">{groups}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default TodosInformation;
