"use client";

// react
import { Dispatch, FormEvent, Fragment, SetStateAction, useState } from "react";
// next
import { useRouter } from "next/navigation";
// types
import { Todo, TodoDetailsFormStateProps, TodoSteps } from "@/types/todo";
// actions
import { deleteTodo, updateTodo } from "@/actions/todo";
// utils
import { shorterText } from "@/utils/functions";
// hooks
import useServerAction from "@/hooks/callServerAction";
// constants
import { icons } from "@/constants";
import { marksItems } from "@/constants/ui";
// cmp
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import Loader from "@/components/shared/Loader";
import CompleteTodoAction from "@/components/shared/todos/CompleteTodoAction";
import ImportantTodoAction from "@/components/shared/todos/ImportantTodoAction";
import clsx from "clsx";
import toast from "react-hot-toast";
import moment from "moment";
import DeleteTodoAction from "@/components/shared/todos/DeleteTodoAction";

const TodoDetailsForm = ({ todo }: { todo: Todo }) => {
  const [form, setForm] = useState<TodoDetailsFormStateProps>({
    title: todo?.title,
    note: todo?.note,
    steps: todo?.steps,
    marks: todo?.marks,
  });
  const { loading, fn } = useServerAction(updateTodo);

  const updateHandler = async () => {
    const result = await fn({ _id: todo?._id, form });

    if (result?.code === 200) {
      toast.success(result.message);
    } else {
      toast.error(result.message);
    }
  };

  const createdAt = moment(todo?.createdAt).calendar();
  const updatedAt = moment(todo?.updatedAt).calendar() || "";

  return (
    <section className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <BackButton _id={todo?._id} />
        <DeleteTodoAction _id={todo?._id} pushRoute="/all" />
      </div>
      <div className="dark:bg-dark2 space-y-2 rounded-md bg-white p-2 shadow">
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
      <div className="dark:bg-dark2 space-y-2 rounded-md bg-white p-4 shadow">
        <span className="text-sm">More details</span>
        <ul className="ml-10 list-disc">
          <li>
            <span className="text-p3">Created At: {createdAt}</span>
          </li>
          {todo?.updatedAt && (
            <li>
              <span className="text-p3">Updated At: {updatedAt}</span>
            </li>
          )}
        </ul>
      </div>
      <div className="flex justify-end">
        <Button
          type="button"
          disabled={loading || !form.title}
          className={clsx({
            "text-gray- bg-gray-100 text-gray-500 hover:bg-gray-100": loading,
          })}
          onClick={updateHandler}
        >
          {loading ? <Loader text="Sending data..." /> : "Submit"}
        </Button>
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
      setForm(() => ({
        ...form,
        steps: [...(form?.steps || []), { title: value, completed: false }],
      }));
      setValue(() => "");
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

    const completeStep = (index: number) => {
      let steps = form?.steps;
      steps![index] = {
        ...steps![index],
        completed: !steps![index]?.completed,
      };

      setForm({
        ...form,
        steps,
      });
    };

    return (
      <div className="dark:bg-dark3 border-border-light dark:border-border-dark m-5 mb-2 rounded-lg border bg-white p-2">
        {form?.steps?.map((step, index) => (
          <Fragment key={-step?._id! || index}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  variant="icon"
                  onClick={() => completeStep(index)}
                >
                  {step?.completed ? icons.checkFill : icons.circle}
                </Button>
                <span
                  className={clsx("text-p2 text-slate-400", {
                    "line-through": step?.completed,
                  })}
                >
                  {step?.title}
                </span>
              </div>
              <Button
                type="button"
                variant="icon"
                onClick={() => deleteStep(index)}
              >
                {icons.trash}
              </Button>
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
          placeholder={form?.steps?.length !== 0 ? "Next step" : "Add step"}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="border-none placeholder:text-sm placeholder:text-blue-500"
          onBlur={onSubmit}
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
  const [value, setValue] = useState(form?.note);

  return (
    <Textarea
      value={value}
      onChange={(e) => {
        setValue(e.target.value);
        setForm({
          ...form,
          note: e.target.value,
        });
      }}
      placeholder="Add note"
      className="dark:bg-dark2"
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
    <div className="dark:bg-dark2 flex flex-col gap-2 space-y-2 rounded-md bg-white p-4 shadow">
      <span className="text-sm text-blue-500">
        {form?.marks?.length !== 0 ? "Marks" : "Add marks"}
      </span>
      <div className="mx-5 space-y-3">
        {marksItems.map((item) => (
          <div key={item.id} className="flex items-center gap-3">
            <Checkbox
              id={item.id}
              checked={!!form?.marks?.find((mark) => mark === item?.id)}
              onCheckedChange={(checked) => {
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
