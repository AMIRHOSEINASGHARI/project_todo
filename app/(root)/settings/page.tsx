// constants
import { icons } from "@/constants";
// cmp
import SettingsPage from "@/components/pages/settings/SettingsPage";
import PageHeading from "@/components/shared/layout/PageHeading";

const Settings = () => {
  return (
    <>
      <PageHeading icon={icons.settings} title="Settings" />
      <SettingsPage />
    </>
  );
};

export default Settings;
