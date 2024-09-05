"use client";

// constants
import { icons } from "@/constants";
// providers
import { useDarkMode } from "@/providers/ThemeProvider";
// cmp
import { Button } from "../ui/button";

const MobileDarkMode = () => {
  const { darkMode, toggleDarkMode } = useDarkMode();

  return (
    <div className="fixed bottom-[80px] right-0 z-50 sm:hidden">
      <div className="bg-light3 dark:bg-dark3 rounded-l-xl">
        <Button
          onClick={toggleDarkMode}
          variant="icon"
          type="button"
          className="text-blue-500 dark:text-blue-500"
        >
          {darkMode ? icons.sun : icons.moon}
        </Button>
      </div>
    </div>
  );
};

export default MobileDarkMode;
