import random from "../../utils/random";
import { saveNotifications } from "../actions/notifications";

export interface Notification {
    key: string;
    firstName: string;
    lastName: string;
    email: string;
    liscensePlate: string;
    phone: string;
}

interface State {
  notifications: Notification[];
  error: boolean;
  loading: boolean;
}

export enum ActionTypes {
  ADD_NOTIFICATION = "ADD_NOTIFICATION",
  REMOVE_NOTIFICATION = "REMOVE_NOTIFICATIONT",
  LOAD_NOTIFICATION = "LOAD_NOTIFICATION",
}

export interface Actions {
  type: ActionTypes;
  payload: Partial<State> & {
    notification: Notification;
  };
}

const intialState: State = {
  notifications: [],
  error: false,
  loading: false,
};


export default function rootReducer(state = intialState, action: Actions): any {
  let notifications = [...state.notifications] as any;
 
  switch (action.type) {

    case ActionTypes.LOAD_NOTIFICATION:
      return { ...state, notifications: action.payload.notifications };

    case ActionTypes.REMOVE_NOTIFICATION:
      notifications = state.notifications.filter(
        (v: Notification) => v.key !== action.payload.notification.key
      );
      saveNotifications(notifications.filter((i: Notification) => i !== null && i !== undefined));
      return {
        ...state,
        notifications,
      };

    case ActionTypes.ADD_NOTIFICATION:
      const notification = { ...action.payload.notification, key: random(8)};
      notifications = [...state.notifications, notification];
      saveNotifications(notifications.filter((i: Notification) => i !== null && i !== undefined));
      return { ...state, notifications };

    default:
      return state;
  }
}
