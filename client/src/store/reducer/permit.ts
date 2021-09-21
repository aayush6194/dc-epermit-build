import random from "../../utils/random";
import { Zone } from "../actions/clients";
import { savePermits } from "../actions/permits";

export enum PermitType {
  Residential = 'Residential',
  Visitor = 'Visitor'
}

export interface Permit {
  _id?: string;
  firstName: string;
  lastName: string;
  email: string;
  liscensePlate: string;
  starts: string;
  ends: string;
  phone: string;
  type: PermitType;
  zone: Zone;
  employer: number;
}

export enum ActionTypes {
  ADD_PERMIT = "ADD_PERMIT",
  REMOVE_PERMIT = "REMOVE_PERMIT",
  LOAD_PERMIT = "LOAD_PERMIT",
  EDIT_PERMIT = "EDIT_PERMIT",
  REQUEST_PERMIT = "REQUEST_PERMIT",
  ERROR_PERMIT = "ERROR_PERMIT",
  SUCCESS_PERMIT = "SUCCESS_PERMIT",
}


export interface RootPermit extends Permit {
  residential: Permit[];
  visitor: Permit[];
}

interface State {
  permits: RootPermit[];
  error: boolean;
  loading: boolean;
}
export interface Actions {
  type: ActionTypes;
  payload: Partial<State> & {
    permit: RootPermit;
  };
}

const intialState: State = {
  permits: [],
  error: false,
  loading: false,
};



export default function rootReducer(state = intialState, action: Actions): any {
  let permits = [...state.permits] as any;

  switch (action.type) {
    case ActionTypes.LOAD_PERMIT:
      return { ...state, permits: action.payload.permits?.filter((i: RootPermit) => i !== null && i !== undefined) };

    case ActionTypes.REMOVE_PERMIT:
      permits = state.permits.filter(
        (v: Permit) => v._id !== action.payload.permit._id
      );
      savePermits(permits.filter((i: Permit) => i !== null && i !== undefined));
      return {
        ...state,
        permits,
      };

    case ActionTypes.ADD_PERMIT:
      const permit = action.payload.permit;
      permits = [...state.permits, permit];
      savePermits(permits.filter((i: Permit) => i !== null && i !== undefined));
      return { ...state, permits };

    case ActionTypes.EDIT_PERMIT:

      const index: number = Number(action?.payload?.permit?._id) - 1;
      permits[index] = action?.payload?.permit as Permit;
      savePermits(permits.filter((i: Permit) => i !== null && i !== undefined));
      return {
        ...state,
        permits,
      };

    case ActionTypes.ERROR_PERMIT:
      return { ...state, error: true, loading: false };

    case ActionTypes.REQUEST_PERMIT:
      return { ...state, error: false, loading: true };

    case ActionTypes.SUCCESS_PERMIT:
      return { ...state, loading: false };
    default:
      return state;
  }
}
