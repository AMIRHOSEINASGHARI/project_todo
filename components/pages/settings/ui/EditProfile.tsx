import { Button } from "@/components/ui/button";
import { icons } from "@/constants";
import React from "react";

const EditProfile = () => {
  return (
    <Button variant="icon" className="flex gap-3 text-blue-500">
      {icons.account} <span className="text-p1">Edit Profile</span>
    </Button>
  );
};

export default EditProfile;
