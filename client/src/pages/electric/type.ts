export declare module Event {
    export interface Time {
        startTime: string;
        endTime: string;
    }
    export interface Garage {
        maxOccupancy: number;
        staffOccupancy: number;
        staffExpected: number;
        price: number;
        id: string;
    }
    export interface Event {
        id : string;
        name: string;
        status: 'active' | 'expired';
        location: string;
        type: 'free' | 'paid';
        startTime: string;
        endTime: string;
        launchAt: string;
        garages: Garage[];
    }
}