import { useEffect, useState } from "react";

// utils
import StorageUtil from "../utils/StorageUtil";

const storageUtil = new StorageUtil(localStorage);
const useThemeToggle = () => {
  const [isDark, setIsDark] = useState(() => {
    return storageUtil.getFromStorage("theme") === "dark";
  });

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add("dark");
      storageUtil.saveToStorage("theme", "dark");
    } else {
      root.classList.remove("dark");
      storageUtil.saveToStorage("theme", "light");
    }
  }, [isDark]);

  return [isDark, setIsDark];
};

export default useThemeToggle;
