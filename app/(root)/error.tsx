"use client";

// react
import { useEffect } from "react";
// next
import Image from "next/image";
// constants
import { images } from "@/constants";
// shadcn ui
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: any;
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="flex h-[40vh] w-full flex-col items-center justify-center">
      <Image
        src={images.error}
        width={150}
        height={150}
        alt="error!"
        className="mb-5 w-[50px]"
      />

      <h1 className="mb-4 text-5xl font-black">Oops!</h1>
      <p className="mb-2 text-p1">
        Cannot fetch data at this time! The above error has occured:
      </p>
      <p className="bg-lightRose text-darkRose mb-6 rounded-lg px-2 py-1 font-bold">
        {error.message}
      </p>
      <Button onClick={() => reset()}>Try again</Button>
    </section>
  );
}
