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
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Username</TableHead>
          <TableHead>Created At</TableHead>
          <TableHead>Last Modified</TableHead>
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
