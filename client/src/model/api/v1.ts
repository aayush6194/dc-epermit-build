import { User, EnterpriseUser, EnterpriseUserRole, UserAuthType  } from '../domain/user';
import { Dashboard, XyChart, ScoreCard } from '../domain/dashboard';
import { Garage, GarageOccupancyTable , GarageOccupancyTableEntries } from '../domain/garage';
import { Announcement } from '../domain/announcements';
import { Enterprise } from '../domain/enterprise';
import { TimeSeries, FlatValue } from '../domain/metrics';
import { Opt } from '../domain/common';
import { BaseRequest, FalseResponse } from './common';

//POST /v1/login
export interface Req_Login_v1 extends BaseRequest {
  body: {
    email: string,
    authType: UserAuthType,
    authSecret: string
  }
}

export type Res_Login_v1 = {
  status: 200,
  body: {
    success: true,
    user: User,
    authToken: string
  }
} | FalseResponse | {
  status: 403,
  body: {
    success: false,
    message: string,
    expectedAuthType: string
  }
};

//POST /v1/signup
export interface Req_Signup_v1 extends BaseRequest {
  body: {
    name: string,
    email: string,
    authType: UserAuthType,
    authSecret: string
  }
}

export type Res_Signup_v1 = {
  status: 200,
  body: {
    success: true,
    user: User,
    authToken: string
  }
} | FalseResponse | {
  status: 403,
  body: {
    success: false,
    message: string,
    expectedAuthType: string
  }
};

//GET /v1/users/me
export interface Req_GetMe_v1 extends BaseRequest {}
export type Res_GetMe_v1 = {
  status: 200,
  body: {
    success: true,
    user: User,
  }
} | FalseResponse;
  
//GET /ep/{epId}/dashboards
export interface Req_ListDashboards extends BaseRequest {
  params: { epId: string }
}

export type Res_ListDashboards = {
  status: 200,
  body: {
    success: true,
    dashboards: Dashboard[]
  }
} | FalseResponse;

//GET /ep/{epId}/dashboards/{dashboardId}
export interface Req_GetDashboard extends BaseRequest {
  params: { epId: string, dashboardId: string }
}

export type  Res_GetDashboard = {
  status: 200,
  body: {
    success: true,
    dashboard: Dashboard
  }
} | FalseResponse;

//POST /ep/{epId}/dashboards/{dashboardId}/edit
export interface Req_EditDashboard extends BaseRequest {
  params: { epId: string, dashboardId: string }
  body: {
    charts?: XyChart[],
    scoreCards?: ScoreCard[],
  }
}

export type Res_EditDashboard = {
  status: 200,
  body: { success: true }
} | FalseResponse;

//GET /ep/{epId}/garages
export interface Req_ListGarages extends BaseRequest {
  params: { epId: string }
}

export type Res_ListGarages = {
  status: 200,
  body: {
    success: true,
    garages: Garage[]
  }
} | FalseResponse;

//GET /ep/{epId}/garages/{garageId}
export interface Req_GetGarage extends BaseRequest {
  params: { epId: string, garageId: string }
}

export type Res_GetGarage = {
  status: 200,
  body: {
    success: true,
    garage: Garage
  }
} | FalseResponse;

//POST /ep/{epId}/garages
export interface Req_AddGarage extends BaseRequest {
  params: { epId: string }
  body: {
    name: string,
    description: Opt<string>,
    address: string,
    geo: [number, number],
    active: boolean,
    maxOccupancy: number,
    occupancyTableId: Opt<string>,
    occupancyUpdateSource: 'table' | 'integration',
  }
}

export type Res_AddGarage = {
  status: 200,
  body: {
    success: true,
    garageId: string
  }
} | FalseResponse;

//POST /ep/{epId}/garages/{garageId}/edit
export interface Req_EditGarage extends BaseRequest {
  params: { epId: string, garageId: string }
  body: {
    name?: string,
    description?: string | null,
    active?: boolean,
    maxOccupancy?: number,
    occupancyTableId?: string | null,
    occupancyUpdateSource?: 'table' | 'integration'
  }
}

export type Res_EditGarage = {
  status: 200,
  body: { success: true }
} | FalseResponse;

//POST /ep/{epId}/garages/{garageId}/remove
export interface Req_RemoveGarage extends BaseRequest {
  params: { epId: string, garageId: string }
}

export type Res_RemoveGarage = {
  status: 200,
  body: { success: true }
} | FalseResponse;

//GET /ep/{epId}/announcements
export interface Req_ListAnnouncements extends BaseRequest {
  params: { epId: string }
}

export type Res_ListAnnouncements = {
  status: 200,
  body: { success: true, announcements: Announcement[] }
} | FalseResponse;


//GET /ep/{epId}/announcements/{announcementId}
export interface Req_GetAnnouncement extends BaseRequest {
  params: { epId: string, announcementId: string }
}

export type Res_GetAnnouncement = {
  status: 200,
  body: { success: true, announcement: Announcement }
} | FalseResponse;


//POST /ep/{epId}/announcements
export interface Req_AddAnnouncement extends BaseRequest {
  params: { epId: string }
  body: {
    title: string,
    body: string,
    launchAt: string,
    expiresAt?: string
  }
}

export type Res_AddAnnouncement = {
  status: 200,
  body: { success: true, announcementId: string }
} | FalseResponse;

//POST /ep/{epId}/announcements/{announcementId}/edit
export interface Req_EditAnnouncement extends BaseRequest {
  params: { epId: string, announcementId: string }
  body: {
    title?: string,
    body?: string,
    expiresAt?: string | null
  }
}

export type Res_EditAnnouncement = {
  status: 200,
  body: { success: true }
} | FalseResponse;

//POST /ep/{id}/announcements/{id}/remove
export interface Req_RemoveAnnouncement extends BaseRequest {
  params: { epId: string, announcementId: string }
}

export type Res_RemoveAnnouncement = {
  status: 200,
  body: { success: true }
} | FalseResponse;

//GET /ep/{epId}/garageOccupancyTables
export interface Req_ListGarageOccupancyTables extends BaseRequest {
  params: { epId: string }
}

export type Res_ListGarageOccupancyTables = {
  status: 200,
  body: {
    success: true,
    garageOccupancyTables: GarageOccupancyTable[]
  }
} | FalseResponse;

//GET /ep/{epId}/garageOccupancyTables/{tableId}
export interface Req_GetGarageOccupancyTable extends BaseRequest {
  params: { epId: string, tableId: string }
}

export type Res_GetGarageOccupancyTable = {
  status: 200,
  body: {
    success: true,
    garageOccupancyTable: GarageOccupancyTable
  }
} | FalseResponse;

//POST /ep/{epId}/garageOccupancyTables
export interface Req_AddGarageOccupancyTable extends BaseRequest {
  params: { epId: string },
  body: {
    title: string,
    table: GarageOccupancyTableEntries
  }
}

export type Res_AddGarageOccupancyTable = {
  status: 200,
  body: {
    success: true,
    garageOccupancyTableId: string
  }
} | FalseResponse;

//POST /ep/{epId}/garageOccupancyTables/{tableId}/remove
export interface Req_RemoveGarageOccupancyTable extends BaseRequest {
  params: { epId: string, tableId: string }
}

export type Res_RemoveGarageOccupancyTable = {
  status: 200,
  body: { success: true }
} | FalseResponse;

//POST /ep/{epId}/garageOccupancyTables/{tableId}/edit
export interface Req_EditGarageOccupancyTable extends BaseRequest {
  params: { epId: string, tableId: string },
  body: {
    title?: string,
    table?: GarageOccupancyTableEntries
  }
}

export type Res_EditGarageOccupancyTable = {
  status: 200,
  body: { success: true }
} | FalseResponse;

//GET /ep/{epId}/users
export interface Req_ListEnterpriseUsers extends BaseRequest {
  params: { epId: string }
}
export type Res_ListEnterpriseUsers = {
  status: 200,
  body: { 
    success: true, 
    enterpriseUsers: EnterpriseUser[] 
  }
} | FalseResponse;


//GET /ep/{epId}/users/{userId}
export interface Req_GetEnterpriseUser extends BaseRequest {
  params: { epId: string, userId: string }
}

export type Res_GetEnterpriseUser = {
  status: 200,
  body: { 
    success: true, 
    enterpriseUser: EnterpriseUser 
  }
} | FalseResponse;

//POST /ep/{epId}/users/{userId}/onboard/request
export interface Req_EnterpriseUserOnboardRequest extends BaseRequest {
  params: { epId: string, userId: string },
  body: { role: EnterpriseUserRole }
}

export type Res_EnterpriseUserOnboardRequest = {
  status: 200,
  body: { success: true }
} | FalseResponse;

//POST /ep/{epId}/users/{userId}/onboard/approve
export interface Req_EnterpriseUserOnboardApprove extends BaseRequest {
  params: { epId: string, userId: string }
}

export type Res_EnterpriseUserOnboardApprove = {
  status: 200,
  body: { success: true }
} | FalseResponse;

//POST /ep/{epId}/users/{userId}/onboard/reject
export interface Req_EnterpriseUserOnboardReject extends BaseRequest {
  params: { epId: string, userId: string }
}

export type Res_EnterpriseUserOnboardReject = {
  status: 200,
  body: { success: true }
} | FalseResponse;

//POST /ep/{epId}/users/{userId}/remove
export interface Req_RemoveEnterpriseUser extends BaseRequest {
  params: { epId: string, userId: string }
}

export type Res_RemoveEnterpriseUser = {
  status: 200,
  body: { success: true }
} | FalseResponse;

//GET /ep/search/by-user?userId=xx
export interface Req_SearchEnterpriseByUser extends BaseRequest {
  query: { userId: string }
}

export type Res_SearchEnterpriseByUser = {
  status: 200,
  body: {
    success: true,
    found: true,
    enterprise: Enterprise
  } | {
    status: 200,
    body: {
      success: true,
      found: false,
      enterprise: null      
    }
  }
} | FalseResponse;

//GET /ep
export type Req_ListEnterprises = BaseRequest

export type Res_ListEnterprises = {
  status: 200,
  body: {
    success: true,
    enterprises: Enterprise[]
  }
} | FalseResponse;

//GET /ep/{epId}
export interface Req_GetEnterprise extends BaseRequest {
  params: { epId: string }
}

export type Res_GetEnterprise = {
  status: 200,
  body: {
    success: true,
    enterprise: Enterprise
  }
} | FalseResponse;

//GET /enterprise/{epId}/metrics/timeSeriesMetricDescriptors
export interface Req_ListTimeSeriesMetricDescriptors extends BaseRequest {
  params: { epId: string }
}

export type Res_ListTimeSeriesMetricDescriptors = {
  status: 200,
  body: {
    success: true,
    metricDescriptors: TimeSeries.MetricDescriptor[]
  }
} | FalseResponse;

//GET /enterprise/{epId}/metrics/timeSeriesMetricDescriptors/{metricDescriptorType}
export interface Req_GetTimeSeriesMetricDescriptor extends BaseRequest {
  params: { epId: string, metricDescriptorType: string }
}

export type Res_GetTimeSeriesMetricDescriptor = {
  status: 200,
  body: {
    success: true,
    metricDescriptor: TimeSeries.MetricDescriptor
  }
} | FalseResponse;

//guaranteed to have one or more timeSeriesResult.timeSeries if timeSeriesResult is not null
//GET /enterprise/{epId}/metrics/timeSeries?q=xx
export interface Req_GetTimeSeries extends BaseRequest {
  query: { timeSeriesQuery: string },
  params: { epId: string }
}

export type Res_GetTimeSeries = {
  status: 200,
  body: {
    success: true;
    timeSeriesResult: TimeSeries.Result | null;
  };
} | FalseResponse;

//GET /enterprise/{epId}/metrics/flatValueMetricDescriptors
export interface Req_ListFlatValueMetricDescriptors extends BaseRequest {
  params: { epId: string }
}

export type Res_ListFlatValueMetricDescriptors = {
  status: 200,
  body: {
    success: true,
    metricDescriptors: FlatValue.MetricDescriptor[]
  }
} | FalseResponse;

//GET /enterprise/{epId}/metrics/flatValueMetricDescriptors/search/by-resourceType?resourceType=xx
export interface Req_SearchFlatValueMetricDescriptorsByResourceType extends BaseRequest {
  params: { epId: string },
  query: { resourceType: string }
}

export type Res_SearchFlatValueMetricDescriptorsByResourceType = {
  status: 200,
  body: {
    success: true,
    metricDescriptors: FlatValue.MetricDescriptor[]
  }
} | FalseResponse;

//GET /enterprise/{epId}/metrics/flatValueMetricDescriptors/{metricDescriptorType}
export interface Req_GetFlatValueMetricDescriptor extends BaseRequest {
  params: { epId: string, metricDescriptorType: string }
}

export type Res_GetFlatValueMetricDescriptor = {
  status: 200,
  body: {
    success: true,
    metricDescriptor: FlatValue.MetricDescriptor
  }
} | FalseResponse;

//GET /enterprise/{epId}/metrics/flatValue?q=xx
export interface Req_GetFlatValue extends BaseRequest {
  query: { flatValueQuery: string };
  params: { epId: string };
}

export type Res_GetFlatValue = {
  status: 200,
  body: {
    success: true,
    flatValueResult: FlatValue.Result
  }
} | FalseResponse;