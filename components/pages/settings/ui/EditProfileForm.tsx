"use client";

// react
import { useEffect, useState } from "react";
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
import { useQuery } from "@tanstack/react-query";
import { fetchUserInfo } from "@/services/queries";

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
  const { isLoading, data, error, isError } = useQuery({
    queryKey: ["user"],
    queryFn: fetchUserInfo,
  });
  const [avatar, setAvatar] = useState<string | undefined>(data?.avatar);
  const form = useForm<z.infer<typeof editProfileFormSchema>>({
    resolver: zodResolver(editProfileFormSchema),
    defaultValues: {
      name: data?.name,
      username: data?.username,
      avatar: data?.avatar,
    },
  });
  const { loading, fn } = useServerAction(editUser);

  const onSubmit = async (values: z.infer<typeof editProfileFormSchema>) => {
    console.log(values);
    const result = await fn(values);

    if (result?.code === 200) {
      toast.success(result?.message);
      onClose();
    } else {
      toast.error(result?.message);
    }
  };

  // Update form values when data is loaded
  useEffect(() => {
    if (data) {
      form.reset({
        name: data.name,
        username: data.username,
        avatar: data.avatar,
      });
      setAvatar(data.avatar); // Update avatar state
    }
  }, [data, form]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        {isLoading ? (
          <div className="flex items-center justify-center min-h-[400px]">
            <Loader />
          </div>
        ) : isError ? (
          <p>Error!</p>
        ) : (
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
        )}
      </DialogContent>
    </Dialog>
  );
};

export default EditProfileForm;
