import random from "../../utils/random";
import { saveNotifications } from "../actions/notifications";

export interface Dispatch {
    key: string;
    firstName: string;
    lastName: string;
    email: string;
    liscensePlate: string;
    phone: string;
    time: string;
}

interface State {
  dispatches: Dispatch[];
  error: boolean;
  loading: boolean;
}
export interface Actions {
  type: ActionTypes;
  payload: Partial<State> & { 
    dispatch: Dispatch;
  };
}

const intialState: State = {
  dispatches: [],
  error: false,
  loading: false,
};

export enum ActionTypes {
  ADD_DISPATCH = "ADD_DISPATCH",
  LOAD_DISPATCH = "LOAD_DISPATCH",
}

export default function rootReducer(state = intialState, action: Actions): any {
  let dispatches = [...state.dispatches] as any;
 
  switch (action.type) {

    case ActionTypes.LOAD_DISPATCH:
      return { ...state, dispatches: action.payload.dispatches };

    case ActionTypes.ADD_DISPATCH:
      const dispatch = { ...action.payload.dispatch, key: random(8)};
      dispatches = [...state.dispatches, dispatch];
      saveNotifications(dispatches.filter((i: Notification) => i !== null && i !== undefined));
      return { ...state, dispatches };

    default:
      return state;
  }
}
