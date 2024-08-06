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
    <Table>
      <TableHeader>
        <TableRow>
          {headerTitls.map((i) => (
            <TableHead key={i}>{i}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>{all_todos}</TableCell>
          <TableCell>{completed_todos}</TableCell>
          <TableCell>{uncompleted_todos}</TableCell>
          <TableCell>{important_todos}</TableCell>
          <TableCell>{groups}</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};

export default TodosInformation;
