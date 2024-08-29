import { EnqueueSnackbar, OptionsObject, useSnackbar } from "notistack";

type ShowNotificationParams = {
  message: string;
} & OptionsObject;
export const useNotification = () => {
  const { enqueueSnackbar } = useSnackbar();

  return (params: ShowNotificationParams) =>
    enqueueSnackbar({
      variant: "success",
      autoHideDuration: 3000,
      anchorOrigin: { horizontal: "right", vertical: "top" },
      ...params,
    });
};
