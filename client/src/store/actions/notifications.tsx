import ErrorModal from "../../components/modal";
import { Notification } from "platyplex_ui";
import {
  Notification as NotificationType,
  ActionTypes,
} from "../reducer/notifications";


export const dataSource: NotificationType[] = [
  {
    key: 'LC4D6',
    firstName: 'Emma'	,
    lastName: 'Doe',
    email:	'emma.doe@gmail.com',
    phone:	'612-982-6192',
    liscensePlate:	'L3CCZ80D'
  }
];

const KEY = "notifications";

const hasNotification = () => {
  const permits = localStorage.getItem(KEY);
  try {
    return (
      permits &&
      typeof permits === "string" &&
      typeof JSON.parse(permits) === "object"
    );
  } catch (e) {
    return false;
  }
};

export const saveNotifications = (notifications: NotificationType[]) => {
  localStorage.setItem(KEY, JSON.stringify(notifications));
};

const loadNotifications = (): NotificationType[] => {
  if (!hasNotification()) {
    saveNotifications(dataSource);
    return dataSource;
  }

  return JSON.parse(localStorage.getItem(KEY) || "[]");
};

export const getNotifications = (modal = ErrorModal) => {
  return async (dispatch: any) => {
    dispatch({
      type: ActionTypes.LOAD_NOTIFICATION,
      payload: { notifications: loadNotifications() },
    });
  };
};
export const addNotification = (
  notification: Partial<NotificationType>,
  modal = ErrorModal
) => {
  return async (dispatch: any) => {
    dispatch({
      type: ActionTypes.ADD_NOTIFICATION,
      payload: { notification },
    });
  };
};

export const removeNotification = (
  notification: NotificationType,
  modal = ErrorModal
) => {
  return async (dispatch: any) => {
    Notification.success({
      title: "Success",
      message: "Notification Successfully Deleted",
    });
    dispatch({
      type: ActionTypes.REMOVE_NOTIFICATION,
      payload: { notification },
    });
  };
};
