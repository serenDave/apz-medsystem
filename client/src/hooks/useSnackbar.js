import { useState } from "react";

const useSnackbar = () => {
  const [opened, setOpened] = useState();

  const open = () => {
    setOpened(true);
  };

  const close = () => {
    setOpened(false);
  };

  return { opened, open, close };
};

export default useSnackbar;