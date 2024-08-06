// types
import { UserInformationProps } from "@/types/user";
// cmp
import {
  Table,
  TableBody,
  TableCaption,
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
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Name</TableHead>
            <TableHead>Username</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead className="text-right">Last Modified</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">{name}</TableCell>
            <TableCell>{username}</TableCell>
            <TableCell>{new Date(createdAt!).toLocaleDateString()}</TableCell>
            <TableCell className="text-right">
              {updatedAt ? new Date(updatedAt!).toLocaleDateString() : "-"}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </>
  );
};

export default Information;
