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
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>All</TableHead>
          <TableHead>Completed</TableHead>
          <TableHead>UnCompleted</TableHead>
          <TableHead>Important</TableHead>
          <TableHead>Groups</TableHead>
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
