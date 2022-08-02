import * as React from "react";

export default function useReloadElement() {
  const [, setState] = React.useState<Boolean>(true);

  const reloadElement = () => {
    setTimeout(() => {
      setState((previous) => !previous);
    }, 0);
  };

  return { reloadElement };
}
