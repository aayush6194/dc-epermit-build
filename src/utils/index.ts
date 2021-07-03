import { Notification } from "platyplex_ui";

export const asyncHandler = async ({
  apiCall,
  successMessage,
  errorMessage,
  defaultMessage,
}: any) => {
  try {
    const res = await apiCall();
    if (res.success === false) throw new Error(res.message);
    if (successMessage) {
      Notification.success({ title: "Succcess", message: successMessage });
    }
    return res;
  } catch (e) {
    if (errorMessage) {
      Notification.error({ title: "Error", message: errorMessage });
    } else if (defaultMessage) {
      Notification.error({
        title: "Error",
        message: e.message || e || "Error",
      });
    }
    return { success: false, message: e.message || e || "Error" };
  }
};

export const toQuery = (query: any): string => {
  return Object.keys(query).reduce((acc: string, curr: string, i: number) => {
    return `${acc ? acc + "&" : ""}${curr}=${query[curr as any]}`;
  }, "");
};

export const toCurrency = (num = 0, decimals = 2): string =>
  `$${(num / 100).toFixed(decimals)}`;
