import { useState, useEffect } from "react";
import API from "../api";
import { EnterpriseRole } from "../model/domain/enterprise";
import { asyncHandler } from "../utils";

export const useRole = (eId: string, needRoles = true) => {
  const [state, setter] = useState({
    roles: [] as EnterpriseRole[],
    loading: false,
    error: false,
  });

  const setState = (obj: any) => setter({ ...state, ...obj });

  const getRoles = async (eId: string) => {
  if(needRoles){
    setState({ loading: true, error: false });
    const { enterprise, success = false } = await asyncHandler({
      apiCall: () => API.getEnterprise(eId),
    });
    setState({
      loading: false,
      error: !success,
      roles: enterprise?.roles || [],
    });
  }
  };

  const addRole = async (role: EnterpriseRole): Promise<boolean> => {
    setState({ loading: true, error: false });
    const res = await asyncHandler({
      apiCall: () => API.addRole(eId, role),
      successMessage: "Role was Added",
      errorMessage: "Role was not Added",
    });
    setState({ loading: false, error: res?.success || false });
    getRoles(eId);
    return res?.success || false ;
  };

  const editRole = async (role: EnterpriseRole): Promise<boolean> => {
    setState({ loading: true, error: false });
    const res = await asyncHandler({
      apiCall: () => API.editRole(eId, role),
      successMessage: "Role was Edited",
      errorMessage: "Role was not Edited",
    });
    setState({ loading: false, error: res?.success || false });
    getRoles(eId);
    return res?.success || false ;
  };

  
  const assignRole = async (role: string, userId: string): Promise<boolean> => {
    setState({ loading: true, error: false });
    const res = await asyncHandler({
      apiCall: () => API.assignRole(eId, role, userId),
      successMessage: "Role was Assigned",
      errorMessage: "Role was not Assigned",
    });
    setState({ loading: false, error: res?.success || false });
    getRoles(eId);
    return res?.success || false ;
  };

  const removeRole = async (role: string): Promise<boolean> => {
    setState({ loading: true, error: false });
    const res = await asyncHandler({
      apiCall: () => API.removeRole(eId, role),
      successMessage: "Role was Removed",
      errorMessage: "Role was not Removed",
    });
    setState({ loading: false, error: res?.success || false });
    getRoles(eId);
    return res?.success || false ;
  };

  const refresh = () => getRoles(eId);
  useEffect(() => {
    if (eId) {
      getRoles(eId);
    }
  }, [eId, needRoles]);

  return {
    ...state,
    addRole,
    editRole,
    refresh,
    assignRole,
    removeRole,
  };
};

export default useRole;
