import { useState, useEffect } from "react";
import API from "../api";
import { asyncHandler } from "../utils";
import { XyChart, ScoreCard, ScoreCardDescriptor, ScoreCardRenderDataItem } from "../model/domain/dashboard";

interface State {
  charts?: XyChart[] | any;
  dId?: string;
  scoreCardOptions?: any;
  scoreCards?: ScoreCard[] | any;
  loading?: boolean,
  error?: boolean,
}

export const useWidgets = ({  eId, screen, resource = "" }:  any) => {
  const [state, setter] = useState({
    charts: [],
    scoreCards: [],
    scoreCardOptions: [],
    dId: "",
    loading: false,
    error: false,
  });

  const setState = (obj: State) => setter({ ...state, ...obj });

  const getWidgets = async (eId : string) => {
    // setState({ loading: true, error: false });
    // const res = await asyncHandler({
    //   apiCall: () => API.getWidgets(eId),
    //   errorMessage: "Failed: Loading Charts",
    // });

    // const res2 = await asyncHandler({
    //   apiCall: () => API.getScoreCardOptions(eId, resource),
    //   errorMessage: "Failed: Loading Score Cards",
    // });
 
    // const dashboards = res?.dashboards?.filter((dashboard: any)=> dashboard?.screen === screen) || [];
    // const { scoreCards, charts, id: dId } = dashboards[0] || { scoreCards : [], charts : [], id: '' };

    // setState({
    //   loading: false,
    //   error: !(res?.success || true),
    //   scoreCards,
    //   scoreCardOptions: res2?.metricDescriptors || [],
    //   dId,
    //   charts
    // });
  };

  const saveWidgets = async (props : any) => {

  };

  const addWidget = (chart: XyChart) => {
    const charts = [...state.charts, chart];
    setState({ charts });
    saveWidgets({...{ charts }});
  }

  const editScoreCards = (scoreCards: ScoreCard []) => {
   if(scoreCards !== state.scoreCards){
    setState({ scoreCards });
    saveWidgets({ scoreCards });
   }
  }

  const removeScoreCard = (index: number) => {
    const scoreCards = state.scoreCards.filter((_: ScoreCard, i: number) => i !== index)
    setState({ scoreCards });
    saveWidgets({ scoreCards });
  }

  const removeChart = (index: number) => {
    const charts = state.charts.filter((_: XyChart, i: number) => i !== index)
    setState({ charts });
    saveWidgets({...{charts }});
  }

  useEffect(() => {
      getWidgets(eId);
  }, [eId]);

  return {
    ...state,
    getWidgets,
    removeChart,
    removeScoreCard,
    addWidget,
    editScoreCards,
    saveWidgets
  };
};

const listScoreCardDescriptors_memoized = (() => {
  const memo: any = {};
  const cacheKey = 'result';

  return async function () {    
    if (memo[cacheKey]) {
      return memo[cacheKey];
    }
    return API.listScoreCardDescriptors()
      .then(res => {
        memo[cacheKey] = res;
        return res;
      });
  }
})()


export const useScoreCards = (enterpriseId: string, userId: string, scoreCardNames: string[]) => {
  const [state, setState] = useState<{ scoreCardRenderData: ScoreCardRenderDataItem[], loading: boolean }>({ loading: true, scoreCardRenderData: [] });

  useEffect(() => {
    (Promise.all([
      asyncHandler({
        apiCall: () => listScoreCardDescriptors_memoized(),
        errorMessage: "Failed: Loading Score Cards",
      }),
      asyncHandler({
        apiCall: () => API.getScoreCardValues(enterpriseId, userId, scoreCardNames),
        errorMessage: "Failed: Loading Score Cards",
      })      
    ])).then(([res1, res2]) => {

      const scoreCardRenderData: ScoreCardRenderDataItem [] = [];
      if (res1.success && res2.success) {
        const descriptors = res1.scoreCardDescriptors;
        const scoreCardValues = res2.scoreCardValues;

        scoreCardNames.reduce<ScoreCardRenderDataItem []>((arr, key) => {
          const descriptor = descriptors.find(desc => desc.name == key) as ScoreCardDescriptor;
          const value = scoreCardValues[key] as any;
          const isAvailable = value !== null && value !== undefined;
          
          arr.push({ descriptor, value, isAvailable });

          return scoreCardRenderData;
        }, scoreCardRenderData);        
      }

      setState({ loading: false, scoreCardRenderData });
    });
    
  }, [enterpriseId, userId, ...scoreCardNames]);

  return state;
}

export default {
  useWidgets,
  useScoreCards
};