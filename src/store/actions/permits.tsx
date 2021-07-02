import { ActionTypes, Permit, PermitType, RootPermit } from "../reducer/permit";
import ErrorModal from "../../components/modal";
import { Notification } from "platyplex_ui";
import { moment } from "../../utils/time";
import { ParkingLot, Zone } from "./clients";
import random from "../../utils/random";

function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

const getTime = () => {
  let t1 = moment().set("dayOfYear", getRandom(1, 120));
  let t2 = moment(t1).add("year", 2);
  const remainder = 15 - (t1.minute() % 15);
  t1.add(remainder, "minutes");
  t2.add(remainder, "minutes");
  const starts = t1.format("ddd, MMM DD, YYYY @ hh:mm A");
  const ends = t2.format("ddd, MMM DD, YYYY @ hh:mm A");
  return {
    starts,
    ends,
  };
};

export const dataSource: RootPermit[] = [
  {
    key: "1",
    ePermit: "4GH68943",
    firstName: "Hooman",
    lastName: "Bolandi",
    email: "hooman.bolandi@gmail.com",
    liscensePlate: "32TTY678",
    phone: "408-859-8128",
    zone: Zone.R1,
    parkingLot: ParkingLot.Lot1,
    type: PermitType.Residential,
    employer: 0,
    ...getTime(),
    residential: [
      {
        key: "3",
        ePermit: "5EA7895",
        firstName: "Emma",
        lastName: "Doe",
        email: "emma@yahoo.com",
        liscensePlate: "13DEF543",
        phone: "412-671-1235",
        zone: Zone.R2,
        parkingLot: ParkingLot.Lot1,
        type: PermitType.Residential,
        employer: 0,
        ...getTime(),
      },
    ],
    visitor: [],
  },
  {
    key: "2",
    ePermit: "2NE3605",
    firstName: "Lisa",
    lastName: "Vu",
    email: "lisa@gmail.com",
    liscensePlate: "12ABC567",
    phone: "344-137-700",
    zone: Zone.R3,
    parkingLot: ParkingLot.Lot2,
    type: PermitType.Residential,
    employer: 0,
    ...getTime(),
    residential: [],
    visitor: [],
  },
];

const KEY = "permits";
const hasPermits = () => {
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

export const savePermits = (permits: RootPermit[]) => {
  localStorage.setItem(KEY, JSON.stringify(permits));
};

const loadPermits = (): RootPermit[] => {
  if (!hasPermits()) {
    savePermits(dataSource);
    return dataSource;
  }

  return JSON.parse(localStorage.getItem(KEY) || "[]");
};

const DELAY = 2000;

const delay = (f: any) => new Promise((resolve) => setTimeout(resolve, f));

const delayedResponse = async (action: any) => {
  await delay(DELAY);
  return action();
};

export const asyncActions = async (dispatch: any, action: () => any) => {
  dispatch({
    type: ActionTypes.REQUEST_PERMIT,
  });

  await delayedResponse(() => {
    action();
    dispatch({
      type: ActionTypes.SUCCESS_PERMIT,
    });
  });
};

export const getPermits = (modal = ErrorModal) => {
  return async (dispatch: any) => {
    asyncActions(dispatch, () =>
      dispatch({
        type: ActionTypes.LOAD_PERMIT,
        payload: { permits: loadPermits() },
      })
    );
  };
};

export const addPermit = (permit: Partial<RootPermit>, modal = ErrorModal) => {
  return async (dispatch: any) => {
    asyncActions(dispatch, () =>
      dispatch({
        type: ActionTypes.ADD_PERMIT,
        payload: { permit: { ...permit, residential: [], visitor: [] } },
      })
    );
  };
};

export const removePermit = (permit: RootPermit, modal = ErrorModal) => {
  return async (dispatch: any) => {
    asyncActions(dispatch, () => {
      Notification.success({
        title: "Success",
        message: "Permit Successfully Deleted",
      });
      dispatch({
        type: ActionTypes.REMOVE_PERMIT,
        payload: { permit },
      });
    });
  };
};

export const editPermit = (permit: RootPermit, modal = ErrorModal) => {
  return async (dispatch: any) => {
    asyncActions(dispatch, () => {
      dispatch({
        type: ActionTypes.EDIT_PERMIT,
        payload: { permit },
      });
    });
  };
};

export const addResidence = (
  p: Permit,
  rootPermit: RootPermit,
  type: PermitType
) => {

  return async (dispatch: any) => {
   const permit = {...p, ePermit: random(8)}
    asyncActions(dispatch, () =>{
      if (type === PermitType.Residential) {
        rootPermit = {
          ...rootPermit,
          residential: [...rootPermit.residential, permit],
        };
      } else {
        rootPermit = {
          ...rootPermit,
          visitor: [...rootPermit.visitor, permit],
        };
      }

      dispatch(editPermit(rootPermit));
    }
  );

    
  };
};
