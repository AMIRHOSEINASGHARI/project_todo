"use client";

import { icons } from "@/constants";
import { Button } from "../ui/button";
import { signOut } from "@/actions/auth";

const SignoutButton = () => {
  return (
    <Button variant="icon" onClick={() => signOut()}>
      {icons.power}
    </Button>
  );
};

export default SignoutButton;
