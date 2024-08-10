// next
import Link from "next/link";
// types
import { Todo } from "@/types/todo";
// utils
import { shorterText } from "@/utils/functions";
// constants
import { icons } from "@/constants";
// cmp
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import CompleteTodoAction from "@/components/shared/todos/CompleteTodoAction";
import ImportantTodoAction from "@/components/shared/todos/ImportantTodoAction";
import DeleteTodoAction from "@/components/shared/todos/DeleteTodoAction";
// clsx
import clsx from "clsx";

const AllTodos = ({ todos }: { todos: [] | [Todo] | undefined }) => {
  if (todos?.length === 0) return null;

  const headerTitls = [
    "ID",
    "Title",
    "Completed",
    "Important",
    "Delete",
    "IsGrouped",
    "GroupName",
    "Steps",
    "Marks",
    "Note",
    "CreatedAt",
    "UpdatedAt",
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
        {todos?.map((todo) => (
          <TableRow key={todo?._id}>
            <TableCell>
              <Button
                asChild
                variant="link"
                className="p-0 text-[14px] hover:text-blue-500"
              >
                <Link href={`/todos/${todo?._id}`}>
                  {shorterText(todo?._id, 5)}
                </Link>
              </Button>
            </TableCell>
            <TableCell
              className={clsx("min-w-[150px]", {
                "text-gray-400 line-through": todo?.completed,
                "font-bold": !todo?.completed,
              })}
            >
              {shorterText(todo?.title, 20)}
            </TableCell>
            <TableCell className="w-[20px] text-[17px]">
              <CompleteTodoAction _id={todo?._id} completed={todo?.completed} />
            </TableCell>
            <TableCell className="w-[20px] text-[17px]">
              <ImportantTodoAction
                _id={todo?._id}
                important={todo?.important}
              />
            </TableCell>
            <TableCell>
              <DeleteTodoAction _id={todo?._id} />
            </TableCell>
            <TableCell
              className={clsx("w-[20px] text-[21px]", {
                "text-green-500": todo?.isGrouped,
                "text-red-500": !todo?.isGrouped,
              })}
            >
              {todo?.isGrouped ? icons.check : icons.close}
            </TableCell>
            <TableCell className="min-w-[100px]">
              {todo?.isGrouped ? todo?.group?.group_name : "-"}
            </TableCell>
            <TableCell className="w-[20px]">{todo?.steps?.length}</TableCell>
            <TableCell className="w-[20px]">{todo?.marks?.length}</TableCell>
            <TableCell className="min-w-[100px]">{todo?.note || "-"}</TableCell>
            <TableCell className="w-[50px]">
              {new Date(todo?.createdAt!).toLocaleDateString()}
            </TableCell>
            <TableCell className="w-[50px]">
              {todo?.updatedAt
                ? new Date(todo?.updatedAt!).toLocaleDateString()
                : "-"}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default AllTodos;
