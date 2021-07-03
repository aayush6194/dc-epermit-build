import { ActionTypes, Client } from "../reducer/clients";
import ErrorModal from "../../components/modal";
import { Notification} from 'platyplex_ui';

export enum ParkingLot {
  Lot1 = 'Lot 1',
  Lot2 = 'Lot 2',
  Lot3 = 'Lot 3'
} 

export enum Zone {
  R1 = 'R1',
  R2 = 'R2',
  R3 = 'R3',
  R4 = 'R4'
} 

export const defaultClients: Client[] = [
  {
    id: "1",
    name: "Apple Store",
    open: true,
    parkingSpace: 65,
    overbooking: true,
    communication: true,
    
    parkingLot: [ParkingLot.Lot1],
    zone: [Zone.R1],

    employee: 60,
    handicap: 5,

    employeeFee : 45,
    handicapFee: 45,
    residenceFee: 45
  },
  {
    id: "2",
    name: "Wells Fargo",
    open: false,
    parkingSpace: 120,
    overbooking: true,
    communication: true,
    
    parkingLot: [ParkingLot.Lot1],
    zone: [Zone.R1],

    employee: 105,
    handicap: 15,
    
    employeeFee : 45,
    handicapFee: 45,
    residenceFee: 45
  },

  {
    id: "3",
    name: "Pizza My Heart",
    open: false,
    parkingSpace: 100,
    overbooking: true,
    communication: true,
  
    parkingLot: [ParkingLot.Lot1],
    zone: [Zone.R1],

    employee: 90,
    handicap: 10,
    
    employeeFee : 45,
    handicapFee: 45,
    residenceFee: 45
  },
];

const KEY = 'clients';
const hasClients = () => {
  const clients = localStorage.getItem(KEY);
  try{
  return clients && typeof clients === 'string' && typeof JSON.parse(clients) === 'object';
  } catch(e){
    return false;
  }
}

export const saveClients = (clients: Client[]) => {
  localStorage.setItem(KEY, JSON.stringify(clients))
}

const loadClients = (): Client[] => {
  if (!hasClients()) {
    saveClients(defaultClients);
    return defaultClients;
  }

  return JSON.parse(localStorage.getItem(KEY) || '[]')
}

const DELAY = 2000;

const delay = (f: any) => new Promise(resolve => setTimeout(resolve, f));

const delayedResponse = async (action: any) => {
  await delay(DELAY)
  return action()
};


export const asyncActions = async (dispatch: any, action: () => any) => {
  dispatch({
    type: ActionTypes.REQUEST_CLIENT
  })

  await delayedResponse(() => {
    action();
    dispatch({
      type: ActionTypes.SUCCESS_CLIENT
    });

  })

};

export const getClients = (modal = ErrorModal) => {
  return async (dispatch: any) => {
    asyncActions(dispatch, () => dispatch({
      type: ActionTypes.LOAD_CLIENT,
      payload: { clients: loadClients() },
    }))
  };
};

export const addClient = (client: Client, modal = ErrorModal) => {
  return async (dispatch: any) => {
    asyncActions(dispatch, () => dispatch({
      type: ActionTypes.ADD_CLIENT,
      payload: { client },
    }));
  };
};

export const removeClient = (client: Client, modal = ErrorModal) => {
  return async (dispatch: any) => {
    asyncActions(dispatch, () => {
      dispatch({
      type: ActionTypes.REMOVE_CLIENT,
      payload: { client },
    })
    Notification.success({ title: 'Success', message: "Permit Successfully Deleted"})
  }
    );
  };
};

export const editClient = (client: Client, modal = ErrorModal) => {
  return async (dispatch: any) => {
    asyncActions(dispatch, () => {
      dispatch({
      type: ActionTypes.EDIT_CLIENT,
      payload: { client },
    })
   
  });
  };
};