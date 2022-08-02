import * as React from "react";
import { AlertDialogContext } from "./AlertDialogErrorProvider";

export default function useAlertDialogError() {
  const value = React.useContext(AlertDialogContext);

  return value;
}
