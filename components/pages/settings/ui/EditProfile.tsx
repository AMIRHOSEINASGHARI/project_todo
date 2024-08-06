// constants
import { icons } from "@/constants";
// cmp
import { Button } from "@/components/ui/button";

const EditProfile = () => {
  // todo: server action for editing profile
  return (
    <Button variant="icon" className="flex gap-3 text-blue-500">
      {icons.account} <span className="text-p1">Edit Profile</span>
    </Button>
  );
};

export default EditProfile;
