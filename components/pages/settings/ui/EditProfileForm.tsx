"use client";

// react
import { useState } from "react";
// utils
import { editProfileFormSchema } from "@/utils/formValidators";
// form
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
// cmp
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import FileUploader from "./FileUploader";
import useServerAction from "@/hooks/callServerAction";
import { editUser } from "@/actions/user";
import toast from "react-hot-toast";
import Loader from "@/components/shared/Loader";
import clsx from "clsx";

type EditProfileFormProps = {
  open: boolean;
  onOpenChange: (value: boolean) => void;
  onClose: () => void;
};

const EditProfileForm = ({
  open,
  onOpenChange,
  onClose,
}: EditProfileFormProps) => {
  const [avatar, setAvatar] = useState<string>("");
  const form = useForm<z.infer<typeof editProfileFormSchema>>({
    resolver: zodResolver(editProfileFormSchema),
    defaultValues: {
      name: "",
      username: "",
      avatar: undefined,
    },
  });
  const { loading, fn } = useServerAction(editUser);

  const onSubmit = async (values: z.infer<typeof editProfileFormSchema>) => {
    console.log(values);
    const result = await fn(values);

    if (result?.code === 200) {
      toast.success(result?.message);
    } else {
      toast.error(result?.message);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="avatar"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <FileUploader
                      avatar={avatar}
                      setAvatar={setAvatar}
                      onFieldChange={(value) => field.onChange(value)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <div className="flex flex-col gap-2">
                      <Input placeholder="Name" {...field} />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <div className="flex flex-col gap-2">
                      <Input placeholder="Username" {...field} />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                disabled={loading}
                onClick={onClose}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={loading}
                className="min-w-[100px]"
              >
                {loading ? <Loader /> : "Save changes"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EditProfileForm;
