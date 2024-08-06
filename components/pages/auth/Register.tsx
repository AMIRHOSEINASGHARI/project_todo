"use client";

// react
import { useState } from "react";
// next
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
// z - hook-form
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
// actions
import { createUser } from "@/actions/auth";
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
    .max(10, { message: "Username must be between 4 and 10 characters" }),
  name: z
    .string()
    .min(4, { message: "Name must be between 8 and 15 characters" })
    .max(10, { message: "Name must be between 8 and 15 characters" }),
  password: z
    .string()
    .min(4, { message: "Password must be between 4 and 10 characters" })
    .max(10, { message: "Password must be between 4 and 10 characters" }),
});

const Register = () => {
  const { replace } = useRouter();
  const [passwordType, setPasswordType] = useState<"password" | "text">(
    "password"
  );
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      name: "",
      password: "",
    },
  });
  const { fn, loading } = useServerAction(createUser);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const result = await fn(values);

    if (result?.code === 200) {
      toast.success(result.message);
      replace("/login");
    } else {
      toast.error(result.message);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex items-center gap-[150px] bg-white p-[30px]"
      >
        <div className="max-xl:hidden bg-gray-100 rounded-3xl h-screen w-1/2 flex items-center justify-center">
          <Image
            src={images.authRegister}
            priority
            width={450}
            height={450}
            alt="auth-login"
          />
        </div>
        <div className="max-xl:flex max-xl:justify-center max-xl:mt-16 max-xl:w-full">
          <div className="sm:w-[400px]">
            <div className="mb-[20px]">
              <h1 className="h1 text-gray-600  mb-[10px]">Welcome! 👋🏻</h1>
              <p className="text-gray-500 tracking-tight">
                Please register your account and start the adventure
              </p>
            </div>
            <div className="space-y-5 mb-5">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        className="Transition"
                        placeholder="Enter your name..."
                        {...field}
                      />
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
                        className="btn_icon absolute top-1 right-1 bottom-1"
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
                className={clsx("w-full", {
                  "bg-gray-100": loading,
                })}
              >
                {loading ? <Loader text="Sending data..." /> : "Submit"}
              </Button>
            </div>
            <div className="flex items-center gap-2 justify-center">
              <p className="text-p1">Already have an account?</p>
              <Button asChild variant="link">
                <Link href="/login">Sign In</Link>
              </Button>
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default Register;
