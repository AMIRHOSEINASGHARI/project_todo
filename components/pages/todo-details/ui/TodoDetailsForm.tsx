"use client";

// react
import { Dispatch, FormEvent, Fragment, SetStateAction, useState } from "react";
// next
import { useRouter } from "next/navigation";
// types
import { Todo, TodoMarks, TodoSteps } from "@/types/todo";
// utils
import { shorterText } from "@/utils/functions";
// constants
import { icons } from "@/constants";
// cmp
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import CompleteTodoAction from "@/components/shared/todos/CompleteTodoAction";
import ImportantTodoAction from "@/components/shared/todos/ImportantTodoAction";
// clsx
import clsx from "clsx";
import { marksItems } from "@/constants/ui";

type TodoDetailsFormStateProps = {
  title: string;
  note?: string;
  steps?: TodoSteps[];
  marks?: TodoMarks[];
};

const TodoDetailsForm = ({ todo }: { todo: Todo }) => {
  const [form, setForm] = useState<TodoDetailsFormStateProps>({
    title: todo?.title,
    note: todo?.note,
    steps: todo?.steps,
    marks: todo?.marks,
  });

  return (
    <section className="space-y-4">
      <BackButton _id={todo?._id} />
      <div className="space-y-2 rounded-md bg-white p-2 shadow">
        <div className="flex items-center justify-between gap-2">
          <CompleteTodoAction
            completed={JSON.parse(JSON.stringify(todo?.completed))}
            _id={JSON.parse(JSON.stringify(todo?._id))}
          />
          <Input
            value={form.title}
            onChange={(e) =>
              setForm({
                ...form,
                title: e.target.value,
              })
            }
            className={clsx(
              "w-full border-none text-lg font-bold placeholder:text-p1 placeholder:font-normal",
              {
                "text-gray-400 line-through": todo?.completed,
              },
            )}
            placeholder="Title cannot be empty!"
          />
          <ImportantTodoAction
            important={JSON.parse(JSON.stringify(todo?.important))}
            _id={JSON.parse(JSON.stringify(todo?._id))}
          />
        </div>
        <AddSteps form={form} setForm={setForm} />
      </div>
      <AddNote form={form} setForm={setForm} />
      <AddMarks form={form} setForm={setForm} />
      <div className="flex justify-end">
        <Button type="button">Submit</Button>
      </div>
    </section>
  );
};

export default TodoDetailsForm;

const BackButton = ({ _id }: { _id: string }) => {
  const router = useRouter();

  return (
    <div className="flex items-center gap-2">
      <Button variant="icon" onClick={() => router.back()}>
        {icons.arrowLeft}
      </Button>
      <span className="text-p1">{shorterText(_id, 10)}</span>
    </div>
  );
};

const AddSteps = ({
  form,
  setForm,
}: {
  form: TodoDetailsFormStateProps;
  setForm: Dispatch<SetStateAction<TodoDetailsFormStateProps>>;
}) => {
  const [value, setValue] = useState<string>("");

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (value) {
      setForm({
        ...form,
        steps: [...(form?.steps || []), { title: value, completed: false }],
      });
      setValue("");
    }
  };

  const FormSteps = () => {
    const deleteStep = (index: number) => {
      const newSteps = form?.steps
        ?.slice(0, index)
        .concat(form?.steps?.slice(index + 1));

      setForm({
        ...form,
        steps: newSteps,
      });
    };

    return (
      <div className="mb-2 rounded-lg border bg-slate-50 px-5 py-2">
        {form?.steps?.map((step, index) => (
          <Fragment key={index}>
            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="icon"
                onClick={() => deleteStep(index)}
              >
                {icons.trash}
              </Button>
              <span className="text-p2">{step?.title}</span>
            </div>
            {index < form?.steps?.length! - 1 && (
              <div className="m-2">
                <hr />
              </div>
            )}
          </Fragment>
        ))}
      </div>
    );
  };

  return (
    <form onSubmit={onSubmit}>
      {form?.steps?.length !== 0 && <FormSteps />}
      <div className="flex items-center gap-2">
        <div
          className={clsx("icon_size p-2", {
            "text-blue-500": !value,
          })}
        >
          {!value ? icons.plus : icons.circle}
        </div>
        <Input
          placeholder="Add step"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="border-none placeholder:text-sm placeholder:text-blue-500"
        />
      </div>
    </form>
  );
};

const AddNote = ({
  form,
  setForm,
}: {
  form: TodoDetailsFormStateProps;
  setForm: Dispatch<SetStateAction<TodoDetailsFormStateProps>>;
}) => {
  const [value] = useState(form?.note);

  return (
    <Textarea
      value={value}
      onChange={(e) =>
        setForm({
          ...form,
          note: e.target.value,
        })
      }
      placeholder="Add note"
    />
  );
};

const AddMarks = ({
  form,
  setForm,
}: {
  form: TodoDetailsFormStateProps;
  setForm: Dispatch<SetStateAction<TodoDetailsFormStateProps>>;
}) => {
  return (
    <div className="flex flex-col gap-2 space-y-2 rounded-md bg-white p-4 shadow">
      <span className="text-sm text-blue-500">Add marks</span>
      <div className="mx-5 space-y-3">
        {marksItems.map((item) => (
          <div key={item.id} className="flex items-center gap-3">
            <Checkbox
              id={item.id}
              checked={!!form?.marks?.find((mark) => mark === item?.id)}
              onCheckedChange={(checked) => {
                console.log(checked);
                setForm(
                  !checked
                    ? {
                        ...form,
                        marks: [
                          ...(form?.marks?.filter((mark) => mark !== item.id) ||
                            []),
                        ],
                      }
                    : {
                        ...form,
                        marks: [...(form?.marks || []), item.id],
                      },
                );
              }}
            />
            <label htmlFor={item.id} className="text-p1 capitalize">
              {item.label}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};
