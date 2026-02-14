import db from '../data/db.json';

const STORAGE_KEY = 'spot_data_v3'; // Bumped version to force refresh with new schema

// Business Interface
export interface SubBusiness {
    id: string | number;
    name: string;
    location: string;
    availabilityPercentage: number;
    image: string;
    email?: string;
    password?: string;
    description?: string;
}

// User Interface
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

export const getData = (): DataSchema => {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            return JSON.parse(stored);
        }

        // Initialize from db.json
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

export const getBusinesses = (): SubBusiness[] => {
    return getData().businesses;
};

export const getUsers = (): SubUser[] => {
    return getData().users;
};

export const saveBusinessUpdate = (updatedBusiness: SubBusiness): void => {
    const data = getData();
    const index = data.businesses.findIndex(b => b.id.toString() === updatedBusiness.id.toString());

    if (index !== -1) {
        data.businesses[index] = updatedBusiness;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    }
};

export const registerNewBusiness = (newBusiness: SubBusiness): void => {
    const data = getData();
    // Generate ID
    const newId = data.businesses.length > 0 ? Math.max(...data.businesses.map(b => Number(b.id) || 0)) + 1 : 1;
    const businessWithId = { ...newBusiness, id: newId };

    data.businesses.push(businessWithId);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

export const registerNewUser = (newUser: Omit<SubUser, 'id' | 'role'>): void => {
    const data = getData();
    const newId = Date.now(); // Simple time-based ID for users

    const userWithId: SubUser = {
        ...newUser,
        id: newId,
        role: 'user'
    };

    data.users.push(userWithId);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};
