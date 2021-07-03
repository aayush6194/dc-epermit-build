import { ActionTypes, Permit, PermitType } from "../reducer/permit";
import ErrorModal from "../../components/modal";
import { Notification } from 'platyplex_ui';
import { moment } from "../../utils/time";
import { ParkingLot, Zone } from "./clients";

let t1 = moment();
let t2 = moment().add('day', 1);
const remainder = 15 - (t1.minute() % 15);
t1.add(remainder, "minutes"); 
t2.add(remainder, "minutes"); 
const  starts = t2.format('ddd, MMM DD, YYYY @ hh:mm A');
const ends = t2.add('hours', 2).format('ddd, MMM DD, YYYY @ hh:mm A')

export const dataSource: Permit[] = [
  {
    key: "1",
    ePermit: "4GH68943",
    firstName: "Hooman",
    lastName: "Bolandi",
    email: "hooman.bolandi@gmail.com",
    liscensePlate: "32TTY678",
   starts: t1.format('ddd, MMM DD, YYYY @ hh:mm A'),
   ends: t1.add('hours', 2).format('ddd, MMM DD, YYYY @ hh:mm A'),
    phone: '318-236-3390',

    zone: Zone.R1,
    parkingLot: ParkingLot.Lot1,
    type: PermitType.Employee,
    employer: 0,
  },
  {
    key: "2",
    ePermit: "2NE3605",
    firstName: "Lisa",
    lastName: "Vu",
    email: "lisa@gmail.com",
    liscensePlate: "12ABC567",
    starts,
    ends,
    phone: '344-137-700',

    zone: Zone.R3,
    parkingLot: ParkingLot.Lot2,
    type: PermitType.Employee,
    employer: 0,
  },
  {
    key: "3",
    ePermit: "5EA7895",
    firstName: "Emma",
    lastName: "Doe",
    email: "emma@yahoo.com",
    liscensePlate: "13DEF543",
    starts,
    ends,
    phone: '412-671-1235',

    zone: Zone.R2,
    parkingLot: ParkingLot.Lot1,
    type: PermitType.Employee,
    employer: 0,
  },
  {
    key: "4",
    ePermit: "7RT6774",
    firstName: "Harry",
    lastName: "Chiala",
    email: "harry@hotmail.com",
    liscensePlate: "14EAF332",
    starts,
    ends,
    phone: '412-671-1235',

    zone: Zone.R3,
    parkingLot: ParkingLot.Lot2,
    type: PermitType.Employee,
    employer: 0,
  },
  {
    key: "4",
    ePermit: "2NE3605",
    firstName: "John",
    lastName: "Master",
    email: "johnmc@gmail.com",
    liscensePlate: "45FRT789",
    starts,
    ends,
    phone: '412-671-1235',
    employer: 0,

    zone: Zone.R1,
    parkingLot: ParkingLot.Lot3,
    type: PermitType.Employee,
  },
  {
    key: "5",
    ePermit: "KGS6LL19",
    firstName: "Nick",
    lastName: "Roman",
    email: "roman@gmail.com",
    liscensePlate: "22EFS64",
    starts,
   ends,
    phone: '412-671-1235',

    zone: Zone.R1,
    parkingLot: ParkingLot.Lot1,
    type: PermitType.Employee,
    employer: 0,
  },
  {
    key: "6",
    ePermit: "2NE3605",
    firstName: "Lisa",
    lastName: "Vu",
    email: "lisa@gmail.com",
    liscensePlate: "52VBQW8",
    starts,
    ends,
    phone: '412-671-1235',

    zone: Zone.R1,
    parkingLot: ParkingLot.Lot1,
    type: PermitType.Employee,
    employer: 0,
  },

  {
    key: "7",
    ePermit: "16UY090R",
    firstName: "Sammy",
    lastName: "Owens",
    email: "sammy@yahoo.com",
    liscensePlate: "D2IO98",
    starts,
    ends,
    phone: '412-671-1235',

    zone: Zone.R1,
    parkingLot: ParkingLot.Lot1,
    type: PermitType.Employee,
    employer: 0,
  },

  {
    key: "7",
    ePermit: "47UBUR28",
    firstName: "Josua",
    lastName: "John",
    email: "john@yahoo.com",
    liscensePlate: "C5L613",
    starts,
    ends,
    phone: '616-551-3270',

    zone: Zone.R1,
    parkingLot: ParkingLot.Lot1,
    type: PermitType.Employee,
    employer: 0,
  },
];


const KEY = 'permits';
const hasPermits = () => {
  const permits = localStorage.getItem(KEY);
  try{
  return permits && typeof permits === 'string' && typeof JSON.parse(permits) === 'object';
  } catch(e){
    return false;
  }
}

export const savePermits = (permits: Permit[]) => {
  localStorage.setItem(KEY, JSON.stringify(permits))
}

const loadPermits= (): Permit[] => {
  if (!hasPermits()) {
    savePermits(dataSource);
    return dataSource;
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
    type: ActionTypes.REQUEST_PERMIT
  })

  await delayedResponse(() => {
    action();

    dispatch({
      type: ActionTypes.SUCCESS_PERMIT
    });

  })

};


export const getPermits = (modal = ErrorModal) => {
  return async (dispatch: any) => {
    asyncActions(dispatch, () => dispatch({
      type: ActionTypes.LOAD_PERMIT,
      payload: { permits : loadPermits() },
    }))
  };
};

export const addPermit = (permit: Partial <Permit>, modal = ErrorModal) => {
  return async (dispatch: any) => {
    asyncActions(dispatch, () => dispatch({
      type: ActionTypes.ADD_PERMIT,
      payload: {permit },
    }));
  };
};

export const removePermit = (permit: Permit, modal = ErrorModal) => {
  return async (dispatch: any) => {
    asyncActions(dispatch, () => {
      Notification.success({ title: 'Success', message: "Permit Successfully Deleted"})
      dispatch({
      type: ActionTypes.REMOVE_PERMIT,
      payload: { permit },
    })});
  };
};

export const editPermit = (permit: Permit, modal = ErrorModal) => {
  return async (dispatch: any) => {
    asyncActions(dispatch, () => {
      dispatch({
      type: ActionTypes.EDIT_PERMIT,
      payload: { permit },
    })});
  };
};