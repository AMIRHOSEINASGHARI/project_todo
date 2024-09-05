"use client";

// constants
import { icons } from "@/constants";
// providers
import { useDarkMode } from "@/providers/ThemeProvider";
// cmp
import { Button } from "../ui/button";
import CustomTooltip from "./CustomTooltip";

const DarkModeToggle = () => {
  const { darkMode, toggleDarkMode } = useDarkMode();

  return (
    <CustomTooltip
      trigger={
        <Button onClick={toggleDarkMode} variant="icon" type="button">
          {darkMode ? icons.sun : icons.moon}
        </Button>
      }
      content={darkMode ? "Switch to light" : "Switch to dark"}
    />
  );
};

export default DarkModeToggle;
