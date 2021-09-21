import { Zone } from "../actions/clients";
import { saveVehiclePermit } from "../actions/vehicle-permit";

export enum PermitType {
  Residential = 'Residential',
  Visitor = 'Visitor'
};

export interface VehiclePermit{
  _id?: string;
  liscensePlate: string;
  starts: string;
  ends: string;
  type: PermitType;
  zone: Zone;
  employer: number;
};

interface State {
  vehiclePermits: any[];
  error: boolean;
  loading: boolean;
};

interface Actions {
  type: ActionTypes;
  payload: Partial<State> & {
    vehiclePermit: VehiclePermit;
  };
};

const intialState: State = {
  vehiclePermits: [],
  error: false,
  loading: false,
};

export enum ActionTypes {
  ADD_V_PERMIT = "ADD_V_PERMIT",
  LOAD_V_PERMIT = "LOAD_V_PERMIT",
  REQUEST_V_PERMIT = "REQUEST_V_PERMIT",
  ERROR_V_PERMIT = "ERROR_V_PERMIT",
  SUCCESS_V_PERMIT = "SUCCESS_V_PERMIT",
}

export default function rootReducer(state = intialState, action: Actions): State {
  let vehiclePermits = [...state.vehiclePermits] as any;

  switch (action.type) {
    case ActionTypes.LOAD_V_PERMIT:
      return { ...state, vehiclePermits: action.payload.vehiclePermits?.filter((i: VehiclePermit) => i !== null && i !== undefined) };

    case ActionTypes.ADD_V_PERMIT:
      const vehiclePermit = action.payload.vehiclePermit;
      vehiclePermits = [...state.vehiclePermits, vehiclePermit];
      saveVehiclePermit(vehiclePermits.filter((i: VehiclePermit) => i !== null && i !== undefined));
      return { ...state, vehiclePermits };
    
    case ActionTypes.ERROR_V_PERMIT:
      return { ...state, error: true, loading: false };

    case ActionTypes.REQUEST_V_PERMIT:
      return { ...state, error: false, loading: true };

    case ActionTypes.SUCCESS_V_PERMIT:
      return { ...state, loading: false };
    default:
      return state;
  }
}
