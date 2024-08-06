// types
import { UserInformationProps } from "@/types/user";
// cmp
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const Information = ({
  username,
  name,
  createdAt,
  updatedAt,
}: UserInformationProps) => {
  const headerTitls = ["Name", "Username", "Created At", "Last Modified"];

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
          <TableCell>{name}</TableCell>
          <TableCell>{username}</TableCell>
          <TableCell>{new Date(createdAt!).toLocaleDateString()}</TableCell>
          <TableCell>
            {updatedAt ? new Date(updatedAt!).toLocaleDateString() : "-"}
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};

export default Information;
