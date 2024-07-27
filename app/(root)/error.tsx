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
    <section className="h-[40vh] w-full flex flex-col justify-center items-center">
      <Image
        src={images.error}
        width={150}
        height={150}
        alt="error!"
        className="w-[50px] mb-5"
      />

      <h1 className="font-black text-5xl mb-4">Oops!</h1>
      <p className="text-p1 mb-2">
        Cannot fetch data at this time! The above error has occured:
      </p>
      <p className="bg-lightRose text-darkRose rounded-lg px-2 py-1 font-bold mb-6">
        {error.message}
      </p>
      <Button onClick={() => reset()}>Try again</Button>
    </section>
  );
}
