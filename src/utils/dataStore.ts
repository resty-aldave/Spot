import db from '../data/db.json';

const STORAGE_KEY = 'spot_data_v4'; // Bumped version for new schema

// Core Types
export interface Pricing {
    perHead: number;
    wholePlace: number;
}

export interface Space {
    id: string;
    name: string;
    currentOccupancy: number;
    maxCapacity: number;
}

export interface Booking {
    id: string;
    businessId: string | number;
    userName: string;
    contact?: string;
    type: 'individual' | 'wholePlace';
    spaceId?: string; // Optional if wholePlace
    date: string;
    time: string;
    estimatedFee: number;
    status: 'pending' | 'confirmed' | 'cancelled';
}

export interface SubBusiness {
    id: string | number;
    name: string;
    location: string;
    availabilityPercentage: number;
    image: string;
    email?: string;
    password?: string;
    description?: string;
    pricing?: Pricing;
    spaces?: Space[];
    bookings?: Booking[];
}

export interface SubUser {
    id: string | number;
    name: string;
    email: string;
    password: string;
    role: 'user';
}

interface DataSchema {
    businesses: SubBusiness[];
    users: SubUser[];
}

// -- Data Access --

export const getData = (): DataSchema => {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            return JSON.parse(stored);
        }

        const initialData: DataSchema = {
            businesses: (db as any).businesses as SubBusiness[],
            users: (db as any).users as SubUser[] || []
        };

        localStorage.setItem(STORAGE_KEY, JSON.stringify(initialData));
        return initialData;
    } catch (e) {
        console.error("Error loading data", e);
        return { businesses: [], users: [] };
    }
};

const saveData = (data: DataSchema) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

export const getBusinesses = (): SubBusiness[] => {
    return getData().businesses;
};

export const getUsers = (): SubUser[] => {
    return getData().users;
};

// -- Business Updates --

export const saveBusinessUpdate = (updatedBusiness: SubBusiness): void => {
    const data = getData();
    const index = data.businesses.findIndex(b => b.id.toString() === updatedBusiness.id.toString());

    if (index !== -1) {
        data.businesses[index] = updatedBusiness;
        saveData(data);
    }
};

export const registerNewBusiness = (newBusiness: SubBusiness): void => {
    const data = getData();
    const newId = data.businesses.length > 0 ? Math.max(...data.businesses.map(b => Number(b.id) || 0)) + 1 : 1;
    const businessWithId = {
        ...newBusiness,
        id: newId,
        // Default structure for new businesses
        pricing: { perHead: 200, wholePlace: 10000 },
        spaces: [],
        bookings: []
    };

    data.businesses.push(businessWithId);
    saveData(data);
};

// -- User --

export const registerNewUser = (newUser: Omit<SubUser, 'id' | 'role'>): void => {
    const data = getData();
    const newId = Date.now();

    const userWithId: SubUser = {
        ...newUser,
        id: newId,
        role: 'user'
    };

    data.users.push(userWithId);
    saveData(data);
};

// -- Advanced Features: Spaces & Bookings --

export const addSpace = (businessId: string | number, newSpace: Omit<Space, 'id'>): void => {
    const data = getData();
    const business = data.businesses.find(b => b.id.toString() === businessId.toString());

    if (business) {
        if (!business.spaces) business.spaces = [];
        const spaceId = Date.now().toString(36); // Simple unique ID
        business.spaces.push({ ...newSpace, id: spaceId });
        saveData(data);
    }
};

export const updateSpaceOccupancy = (businessId: string | number, spaceId: string, delta: number): void => {
    const data = getData();
    const business = data.businesses.find(b => b.id.toString() === businessId.toString());

    if (business && business.spaces) {
        const space = business.spaces.find(s => s.id === spaceId);
        if (space) {
            const newOccupancy = Math.max(0, Math.min(space.maxCapacity, space.currentOccupancy + delta));
            space.currentOccupancy = newOccupancy;

            // Recalculate total availability
            const totalCapacity = business.spaces.reduce((acc, s) => acc + s.maxCapacity, 0);
            const totalOccupancy = business.spaces.reduce((acc, s) => acc + s.currentOccupancy, 0);
            business.availabilityPercentage = totalCapacity > 0
                ? Math.round(100 - ((totalOccupancy / totalCapacity) * 100))
                : 0;

            saveData(data);
        }
    }
};

export const deleteSpace = (businessId: string | number, spaceId: string): void => {
    const data = getData();
    const business = data.businesses.find(b => b.id.toString() === businessId.toString());

    if (business && business.spaces) {
        business.spaces = business.spaces.filter(s => s.id !== spaceId);
        saveData(data);
    }
};

export const addBooking = (businessId: string | number, booking: Omit<Booking, 'id' | 'businessId' | 'status'>): void => {
    const data = getData();
    const business = data.businesses.find(b => b.id.toString() === businessId.toString());

    if (business) {
        if (!business.bookings) business.bookings = [];
        const newBooking: Booking = {
            ...booking,
            id: Date.now().toString(),
            businessId: businessId,
            status: 'confirmed'
        };
        business.bookings.push(newBooking);
        saveData(data);
    }
};
