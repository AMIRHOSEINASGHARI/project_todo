"use client";

// react
import { useState } from "react";
// constants
import { icons } from "@/constants";
// cmp
import EditProfileForm from "./EditProfileForm";
import { Button } from "@/components/ui/button";

const EditProfile = () => {
  const [open, setOpen] = useState(false);

  const onOpenChange = () => {
    setOpen(!open);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button
        variant="ghost"
        type="button"
        className="gap-2"
        onClick={onOpenChange}
      >
        {icons.pen} Edit Profile
      </Button>
      {open && (
        <EditProfileForm
          open={open}
          onOpenChange={onOpenChange}
          onClose={onClose}
        />
      )}
    </>
  );
};

export default EditProfile;
