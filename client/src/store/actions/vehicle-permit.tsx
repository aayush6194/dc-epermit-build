import { ActionTypes, VehiclePermit } from "../reducer/vehicle-permit";
import ErrorModal from "../../components/modal";

export const defaultClients: VehiclePermit[] = [];

const KEY = 'vehicle-permit-standford';
const hasClients = () => {
  const clients = localStorage.getItem(KEY);
  try{
  return clients && typeof clients === 'string' && typeof JSON.parse(clients) === 'object';
  } catch(e){
    return false;
  }
}

export const saveVehiclePermit = (clients: VehiclePermit[]) => {
  localStorage.setItem(KEY, JSON.stringify(clients))
}

const loadVehiclePermit = (): VehiclePermit[] => {
  if (!hasClients()) {
    saveVehiclePermit(defaultClients);
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
    type: ActionTypes.REQUEST_V_PERMIT
  })

  await delayedResponse(() => {
    action();
    dispatch({
      type: ActionTypes.SUCCESS_V_PERMIT
    });

  })
};

export const getVehiclePermit = (modal = ErrorModal) => {
  return async (dispatch: any) => {
    asyncActions(dispatch, () => dispatch({
      type: ActionTypes.LOAD_V_PERMIT,
      payload: { vehiclePermits: loadVehiclePermit() },
    }))
  };
};

export const addVehiclePermit = (vehiclePermit: VehiclePermit, modal = ErrorModal) => {
  return async (dispatch: any) => {
    asyncActions(dispatch, () => dispatch({
      type: ActionTypes.ADD_V_PERMIT,
      payload: { vehiclePermit },
    }));
  };
};
