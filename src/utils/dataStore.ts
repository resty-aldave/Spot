import db from '../data/db.json';

const STORAGE_KEY = 'spot_data_v2';

// Initial data type derived from db.json structure
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

export const getBusinesses = (): SubBusiness[] => {
    try {
        // Try to get from local storage
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            return JSON.parse(stored);
        }

        // Fallback to db.json and initialize
        // We cast this to ensure TS is happy
        const initialData = (db as any).businesses as SubBusiness[];
        localStorage.setItem(STORAGE_KEY, JSON.stringify(initialData));
        return initialData;
    } catch (e) {
        console.error("Error loading businesses", e);
        return [];
    }
};

export const saveBusinessUpdate = (updatedBusiness: SubBusiness): void => {
    const businesses = getBusinesses();
    const index = businesses.findIndex(b => b.id.toString() === updatedBusiness.id.toString());

    if (index !== -1) {
        businesses[index] = updatedBusiness;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(businesses));
    }
};

export const registerNewBusiness = (newBusiness: SubBusiness): void => {
    const businesses = getBusinesses();
    // Generate a simple numeric ID if possible, or string
    const newId = businesses.length > 0 ? Math.max(...businesses.map(b => Number(b.id) || 0)) + 1 : 1;
    const businessWithId = { ...newBusiness, id: newId };

    businesses.push(businessWithId);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(businesses));
};
