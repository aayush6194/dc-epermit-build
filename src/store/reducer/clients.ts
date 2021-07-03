import { saveClients } from "../actions/clients";

export enum Zone {
  R1 = 'R1',
  R2 = 'R2',
  R3 = 'R3',
  R4 = 'R4'
} 

export enum ParkingLot {
  Lot1 = 'Lot 1',
  Lot2 = 'Lot 2',
  Lot3 = 'Lot 3'
} 

export interface Client {
  id: string;
  name: string;
  open: boolean;
  parkingLot: ParkingLot[],
  parkingSpace: number;
  overbooking: boolean;
  employee: number;
  handicap: number;
  zone: Zone[];
  communication: boolean;
  employeeFee : number,
  handicapFee: number,
  residenceFee: number;
}

interface State {
  clients: Client[];
  error: boolean;
  loading: boolean;
}
interface Actions {
  type: ActionTypes;
  payload: Partial<State> & {
    client: Client;
  };
}

const intialState: State = {
  clients: [],
  error: false,
  loading: false,
};

export enum ActionTypes {
  ADD_CLIENT = "ADD_CLIENT",
  REMOVE_CLIENT = "REMOVE_CLIENT",
  LOAD_CLIENT = "LOAD_CLIENT",
  EDIT_CLIENT = "EDIT_CLIENT",
  REQUEST_CLIENT = "REQUEST_CLIENT",
  ERROR_CLIENT = "ERROR_CLIENT",
  SUCCESS_CLIENT = "SUCCESS_CLIENT",
}

export default function rootReducer(state = intialState, action: Actions): any {
  let clients = [...state.clients] as any;

  switch (action.type) {
    case ActionTypes.LOAD_CLIENT:
      return { ...state, clients: action.payload.clients?.filter((i: Client) => i !== null && i !== undefined) };

    case ActionTypes.REMOVE_CLIENT:
      clients = state.clients.filter(
        (v: Client) => v.id !== action.payload.client.id
      );
      saveClients(clients.filter((i: Client) => i !== null && i !== undefined));
      return {
        ...state,
        clients,
      };

    case ActionTypes.ADD_CLIENT:
      const client = { ...action.payload.client, id: String(clients.length + 1) };
      clients = [...state.clients, client];
      saveClients(clients.filter((i: Client) => i !== null && i !== undefined));
      return { ...state, clients };

    case ActionTypes.EDIT_CLIENT:
      const index: number = Number(action?.payload?.client?.id) - 1;
      clients[index] = action?.payload?.client as Client;
      saveClients(clients.filter((i: Client) => i !== null && i !== undefined));
      return {
        ...state,
        clients,
      };

    case ActionTypes.ERROR_CLIENT:
      return { ...state, error: true, loading: false };

    case ActionTypes.REQUEST_CLIENT:
      return { ...state, error: false, loading: true };

    case ActionTypes.SUCCESS_CLIENT:
      return { ...state, loading: false };
    default:
      return state;
  }
}
