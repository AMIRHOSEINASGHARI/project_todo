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
import moment from "moment";
import TodoMarkBadge from "@/components/shared/TodoMarkBadge";
import CustomTooltip from "@/components/shared/CustomTooltip";

const AllTodos = ({ todos }: { todos: [] | [Todo] | undefined }) => {
  if (todos?.length === 0) return null;

  const headerTitls = [
    "ID",
    "Title",
    "Completed",
    "Important",
    "Delete",
    "GroupName",
    "Steps",
    "Marks",
    "Note",
    "CreatedAt",
  ];

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
          {todos?.map((todo) => (
            <TableRow
              key={todo?._id}
              className={clsx(
                "hover:bg-transparent dark:hover:bg-transparent",
                {
                  "hover:bg-bg-slate-100 dark:hover:bg-bg-slate-100 dark:bg-dark3 bg-slate-100":
                    todo?.completed,
                },
              )}
            >
              <TableCell>
                <Button
                  asChild
                  variant="link"
                  className="p-0 text-[14px] hover:text-blue-500 dark:hover:text-blue-500"
                >
                  <Link href={`/todos/${todo?._id}`}>
                    {shorterText(todo?._id, 5)}
                  </Link>
                </Button>
              </TableCell>
              <TableCell
                className={clsx("min-w-[200px] max-w-[300px]", {
                  todo_completed: todo?.completed,
                  "font-bold": !todo?.completed,
                })}
              >
                <div className="overflow-hidden">
                  <Link href={`/todos/${todo?._id}`}>
                    <p className="truncate">{todo?.title}</p>
                  </Link>
                </div>
              </TableCell>
              <TableCell className="w-[20px] text-[17px]">
                <CompleteTodoAction
                  _id={todo?._id}
                  completed={todo?.completed}
                />
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
              <TableCell className="min-w-[100px] overflow-hidden">
                <p className="truncate">
                  {todo?.isGrouped ? todo?.group?.group_name : "-"}
                </p>
              </TableCell>
              <TableCell className="w-[20px]">
                {todo?.steps?.length !== 0 ? (
                  <CustomTooltip
                    trigger={
                      <span className="text-p3 sm:text-p2">
                        {todo?.steps?.filter((s) => s?.completed)?.length} of{" "}
                        {todo?.steps?.length}
                      </span>
                    }
                    content={
                      todo?.steps?.filter((s) => !s?.completed)?.length !==
                      0 ? (
                        <div>
                          <span>Steps left:</span>
                          <div className="flex flex-col gap-1">
                            {todo?.steps
                              ?.filter((s) => !s?.completed)
                              ?.map((item, index) => (
                                <span key={String(item?._id)}>
                                  {index + 1}. {item?.title}
                                </span>
                              ))}
                          </div>
                        </div>
                      ) : (
                        "All steps completed"
                      )
                    }
                  />
                ) : (
                  "_"
                )}
              </TableCell>
              <TableCell className="min-w-[20px] max-w-[120px]">
                <div className="flex gap-1">
                  {todo?.marks?.length !== 0
                    ? todo?.marks?.map((m) => (
                        <TodoMarkBadge key={m} mark={m} />
                      ))
                    : "_"}
                </div>
              </TableCell>
              <TableCell className="min-w-[100px]">
                {todo?.note || "_"}
              </TableCell>
              <TableCell className="w-[100px]">
                <div className="flex flex-col">
                  <span>{moment(todo?.createdAt).format("L")}</span>
                  <span className="text-xs text-slate-500">
                    {moment(todo?.createdAt).format("LT")}
                  </span>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AllTodos;
