import { useState, useEffect } from "react";
import API from "../api";
import { asyncHandler } from "../utils";
import { GarageOccupancyTable } from "../model/domain/garage";

interface State {
    tables?: GarageOccupancyTable[] | any;
    loading?: boolean;
    error?: boolean;
}

export const useOccupanyTable = ({ eId }: any) => {
    const [state, setter] = useState<State>({
        tables: [],
        loading: false,
        error: false,
    });

    const setState = (obj: State) => setter({ ...state, ...obj });

    const getTables = async (eId: string) => {
        setState({ loading: true, error: false });
        const res = await asyncHandler({
            apiCall: () => API.getOccupancyTables(eId),
            errorMessage: "Failed: Loading Table",
        });

        setState({
            loading: false,
            tables: res?.garageOccupancyTables || [],
            error: !(res?.success || true)
        });
    };

    const addTable = async (table : any) => {
        setState({ loading: true, error: false });
        const res = await asyncHandler({
            apiCall: () => API.addOccupancyTable(eId, table),
            errorMessage: "Could not Edit Table",
            successMessage: "Table was Edited",
        });
        let tables : GarageOccupancyTable[] = state.tables;

        if(res?.success)
            tables = [...state.tables, {...table, id: res.garageOccupancyTableId}];

        setState({
            loading: false,
            tables,
            error: !(res?.success || true),
        });
    }


    const removeTable = async (tId: string) => {
        setState({ loading: true, error: false });
        const res = await asyncHandler({
            apiCall: () => API.removeOccupancyTable(eId, tId),
            errorMessage: "Could not Delete Table",
            successMessage: "Table was Deleted",
        });
        let tables = [...state.tables];

        if(res?.success)
            tables = tables.filter((table : any)=> table.id !== tId)

        setState({
            loading: false,
            tables,
            error: !(res?.success || true),

        });
    }
    const getTableById = async (id : string) =>{
        return await asyncHandler({
            apiCall: () => API.getOccupancyTableById(eId, id),
            errorMessage: "Failed: Loading Table",
        });
    }

    const editTable = async (table: GarageOccupancyTable) => {
        setState({ loading: true, error: false });
        const res = await asyncHandler({
            apiCall: () => API.editOccupancyTable(eId, table.id, table),
            errorMessage: "Could not Edit Table",
            successMessage: "Table was Edited",
        });
        let tables : GarageOccupancyTable[] = [...state.tables];

        const index = tables.reduce((acc: number, item: GarageOccupancyTable, i: number)=> table.id === item.id? i : acc, -1)

        if(res?.success && index > -1){
            tables[index] = table;
        }
           
        setState({
            loading: false,
            tables,
            error: !(res?.success || true),
        });
    }

    useEffect(() => {getTables(eId)}, [eId]);
    return {
        ...state,
        getTables,
        removeTable,
        addTable,
        editTable,
        getTableById
    };
};

export default {
    useOccupanyTable
};
