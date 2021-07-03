import { ActionTypes, Permit, PermitType, RootPermit } from "../reducer/permit";
import ErrorModal from "../../components/modal";
import { Notification } from "platyplex_ui";
import { moment } from "../../utils/time";
import random from "../../utils/random";
import api from "../../api";

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


export const dataSource: RootPermit[] = [];

const KEY = "permits";

export const savePermits = (permits: RootPermit[]) => {
  localStorage.setItem(KEY, JSON.stringify(permits));
};

const loadPermits = (): Promise<RootPermit[]> => {
    return api.getAllPermits().then((res)=>{
      console.log(res)
      if(res.success)
        return res.epermits;
      else 
        throw new Error(res.message)
    })
    .catch((e)=>[])
};

const DELAY = 1000;

const delay = (f: any) => new Promise((resolve) => setTimeout(resolve, f));

const delayedResponse = async (action: any) => {
  await delay(DELAY);
  return action();
};

export const asyncActions = async (dispatch: any, action: () => any) => {
  try{
    dispatch({
      type: ActionTypes.REQUEST_PERMIT,
    });
  
    await delayedResponse(async() => {
      await action();
      dispatch({
        type: ActionTypes.SUCCESS_PERMIT,
      });
    });
  }
  catch(e){
    Notification.error({ title: 'Error', message: e?.message || JSON.stringify(e)})
  }
 
};

export const getPermits = () => {
  return async (dispatch: any) => {
    asyncActions(dispatch, async () =>
      dispatch({
        type: ActionTypes.LOAD_PERMIT,
        payload: { permits: await loadPermits() },
      })
    );
  };
};

export const addPermit = (permit: Partial<RootPermit>) => {
  return async (dispatch: any) => {
    asyncActions(dispatch, async() =>{
      const res =  await api.addEpermit(permit);
      if(!res?.success) throw new Error('Error Adding');

      dispatch(getPermits())
     // const { epermit } = res

      // dispatch({
      //   type: ActionTypes.ADD_PERMIT,
      //   payload: { permit: epermit },
      // })
    }
    );
  };
};

export const removePermit = (permit: RootPermit) => {
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
    asyncActions(dispatch, async () =>{
      
      const res = await api.addResidence(p, rootPermit._id);
      if(!res?.success) throw new Error('Error Adding');

     // const { epermit } = res;
      //dispatch(editPermit(epermit));
      dispatch(getPermits())
    }
  );
  };
};
