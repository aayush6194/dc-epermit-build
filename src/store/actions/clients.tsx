import { ActionTypes, Client } from "../reducer/clients";
import ErrorModal from "../../components/modal";

export const defaultClients: Client[] = [
  {
    id: "1",
    name: "Client A",
    open: true,
    parkingSpace: 65,
    overbooking: true,
    permits: 65,
    vips: 20,
    duration: 1,
    location: 'Parking Lot 1',
    starts: 'Mon, Jan 25, 2021',
    ends: 'Thu, Jun 10, 2021',
    extension: 2,
  },
  {
    id: "2",
    name: "Client B",
    open: false,
    parkingSpace: 120,
    permits: 110,
    vips: 50,
    overbooking: false,
    duration: 2,
    extension: 1,
    location: 'Parking Lot 2',
    starts: 'Tue, Feb 16, 2021',
    ends: 'Wed, Jul 21, 2021',
  },

  {
    id: "3",
    name: "Client C",
    open: false,
    parkingSpace: 100,
    permits: 100,
    vips: 25,
    overbooking: false,
    duration: 1.5,
    location: 'Parking Lot 3',
    extension: 2,
    starts: 'Wed, Jun 30, 2021',
    ends: 'Wed, Dec 8, 2021',
  },
];



const KEY = 'clients';
const hasClients = () => {
  const clients = localStorage.getItem(KEY);
  console.log(clients)
  return typeof clients === 'string' && typeof JSON.parse(clients) === 'object';
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
    asyncActions(dispatch, () => dispatch({
      type: ActionTypes.REMOVE_CLIENT,
      payload: { client },
    }));
  };
};

export const editClient = (client: Client, modal = ErrorModal) => {
  return async (dispatch: any) => {
    asyncActions(dispatch, () => dispatch({
      type: ActionTypes.EDIT_CLIENT,
      payload: { client },
    }));
  };
};