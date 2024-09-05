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
    <div className="tableContainer">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent dark:hover:bg-transparent">
            {headerTitls.map((i) => (
              <TableHead key={i}>{i}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow className="hover:bg-transparent dark:hover:bg-transparent">
            <TableCell className="py-2">{name}</TableCell>
            <TableCell className="py-2">{username}</TableCell>
            <TableCell className="py-2">
              {new Date(createdAt!).toLocaleDateString()}
            </TableCell>
            <TableCell className="py-2">
              {updatedAt ? new Date(updatedAt!).toLocaleDateString() : "-"}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default Information;
