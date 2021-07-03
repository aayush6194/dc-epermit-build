import {
  Dispatch,
  ActionTypes,
} from "../reducer/dispatches";

export const dataSource: Dispatch[] = [{
  key: '111',
  time: 'Wed, May 19, 2021 @ 09:04 PM',
  firstName: 'Hooman'	,
  lastName: 'Bolandi',
  email:	'hooman.bolandi@gmail.com',
  phone:	'318-236-3390',
  liscensePlate:	'32TTY678'
}];

const KEY = "dispatches";

const hasDispatches = () => {
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

export const saveDispatches = (dispatches: Dispatch[]) => {
  localStorage.setItem(KEY, JSON.stringify(dispatches));
};

const loadDispatches = (): Dispatch[] => {
  if (!hasDispatches()) {
    saveDispatches(dataSource);
    return dataSource;
  }

  return JSON.parse(localStorage.getItem(KEY) || "[]");
};

export const getDispatches = () => {
  return async (dispatch: any) => {
    dispatch({
      type: ActionTypes.LOAD_DISPATCH,
      payload: { dispatches: loadDispatches() },
    });
  };
};
export const addDispatch = (
  d: Partial<Dispatch>
) => {
  return async (dispatch: any) => {
    dispatch({
      type: ActionTypes.ADD_DISPATCH,
      payload: { dispatch : d},
    });
  };
};