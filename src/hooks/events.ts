import { useState, useEffect } from "react";
import API from "../api";
import { asyncHandler } from "../utils";
import { Event } from "../pages/events/type";
import { moment} from '../utils/time'

const event = (event, location) => ({ 
  id: String(Math.random() * 10000),
  name: event, 
  location,
  type: "free",
  status: "active",
  startTime: moment().hour(8).minute(0).second(0).toISOString(),
  endTime: moment().hour(18).minute(0).second(0).toISOString(),
  launchAt: moment().set('days', -7).toISOString(), 
  garages : [
      {
          maxOccupancy: 1300,
          staffOccupancy: 2,
          staffExpected: 4,
          price: 8,
          id: '4444'
      },
      {
        maxOccupancy: 1300,
        staffOccupancy: 3,
        staffExpected: 3,
        price: 8,
        id: '4444'
    },
      {
        maxOccupancy: 1300,
        staffOccupancy: 2,
        staffExpected: 3,
        price: 8,
        id: '4444'
    }
  ],
})

const events = [event("Taylor Swift Concert", "SJSU Event Center"), event("John Smith", "CEFCU Stadium")];
export const useEvents = ({ eId , refresh = ()=>{}}: any) => {
  const [state, setter ] = useState({
    events: [] as Event.Event[],
    loading: false,
    error: false
  });

  const setState = (obj: any) => setter({ ...state, ...obj });

  const getEvents = async () => {
    setState({ loading: true, error: false });
    setTimeout(() => {
      setState({ loading: false, error: true, events });
    }, 400);
  };

  const removeEvent = async (event: Event.Event) => {
    setState({ loading: true, error: false });
    // const res = await asyncHandler({
    //   apiCall: () => API.removeEnterpriseUser(eId, event.id),
    //   successMessage: "User was Rejected",
    //   errorMessage: "User was not Rejected",
    //   refresh
    // });

    const newEvents = state.events.filter((e: Event.Event)=> e.id !== event.id)
    setState({ loading: false, error: false, events: newEvents });

  };

  const addEvent = async (event: Event.Event) => {

    setState({ loading: true, error: false });
    // const res = await asyncHandler({
    //   apiCall: () => API.removeEnterpriseUser(eId, event),
    //   successMessage: "User was Rejected",
    //   errorMessage: "User was not Rejected",
    //   refresh
    // });

    setState({ loading: false, error: false, events: [...state.events, event] });
  };
  
  const editEvent = async (event: Event.Event) => {
    setState({ loading: true, error: false });


    setState({ loading: false, error: false });
  };


  useEffect(() => {getEvents();}, [eId]);
  return {
    ...state,
    actions: {
      removeEvent,
      refreshEvent: getEvents,
      addEvent,
      editEvent
    }
  };
};

export default {
  useEvents,
};
