"use client";

// react
import { useState } from "react";
// next
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
// z - hook-form
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
// actions
import { login } from "@/actions/auth";
// hooks
import useServerAction from "@/hooks/callServerAction";
// constants
import { icons, images } from "@/constants";
import { btn_icon_variant } from "@/constants/ui";
// cmp
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import Loader from "@/components/shared/Loader";
// clsx
import clsx from "clsx";

// form schema
const formSchema = z.object({
  username: z
    .string()
    .min(4, { message: "Username must be between 4 and 10 characters" })
    .max(10, { message: "َUsername must be between 4 and 10 characters" }),
  password: z
    .string()
    .min(4, { message: "Password must be between 4 and 10 characters" })
    .max(10, { message: "Password must be between 4 and 10 characters" }),
});

const Login = () => {
  const { replace } = useRouter();
  const [passwordType, setPasswordType] = useState<"password" | "text">(
    "password"
  );
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });
  const { fn, loading } = useServerAction(login);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const result = await fn(values);

    if (result?.code === 200) {
      toast.success(result.message);
      replace("/all");
    } else {
      toast.error(result.message);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="dark:bg-dark1 flex h-screen w-full items-center justify-center gap-[150px] bg-white p-[30px]"
      >
        <div className="max-xl:mt-16 max-xl:flex max-xl:w-full max-xl:justify-center">
          <div className="sm:w-[400px]">
            <div className="mb-[20px]">
              <h1 className="h1 mb-[10px] text-teal-500">Login</h1>
              <p className="tracking-tight text-gray-500">
                Please sign-in to your account and start the adventure
              </p>
            </div>
            <div className="mb-5 space-y-5">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input
                        className="Transition"
                        placeholder="Enter your username..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <div className="relative">
                      <FormControl>
                        <Input
                          className="Transition"
                          placeholder="Enter your password..."
                          type={passwordType}
                          {...field}
                        />
                      </FormControl>
                      <Button
                        type="button"
                        onClick={() =>
                          setPasswordType(
                            passwordType === "password" ? "text" : "password"
                          )
                        }
                        variant={btn_icon_variant}
                        className="btn_icon absolute bottom-1 right-1 top-1"
                      >
                        {passwordType === "text"
                          ? icons.eye_open
                          : icons.eye_close}
                      </Button>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                disabled={loading}
                className="w-full rounded-full"
              >
                {loading ? <Loader text="Sending data..." /> : "Submit"}
              </Button>
            </div>
            <div className="flex items-center justify-center gap-2">
              <p className="text-p1">Dont have an account?</p>
              <Button asChild variant="link">
                <Link href="/register">Sign Up</Link>
              </Button>
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default Login;
