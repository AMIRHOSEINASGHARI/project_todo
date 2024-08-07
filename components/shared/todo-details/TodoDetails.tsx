"use client";

// react
import { useState } from "react";
// types
import { TodoDetailsProps } from "@/types/todo";
// cmp
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
// clsx
import clsx from "clsx";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";

const TodoDetails = ({ _id, title, completed }: TodoDetailsProps) => {
  const [open, setOpen] = useState(false);

  const onOpenChange = () => {
    setOpen(!open);
  };

  return (
    <>
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetTrigger>
          <span
            className={clsx("text-p1", {
              "line-through": completed,
            })}
          >
            {title}
          </span>
        </SheetTrigger>
        <SheetContent>
          <VisuallyHidden.Root>
            <SheetHeader>
              <SheetTitle></SheetTitle>
              <SheetDescription></SheetDescription>
            </SheetHeader>
          </VisuallyHidden.Root>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default TodoDetails;
