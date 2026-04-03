// lib/storage.ts

const IS_BROWSER = typeof window !== "undefined";

export const getLocalStorage = (key: string) => {
    if (!IS_BROWSER) return null;
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
};

export const setLocalStorage = (key: string, data: any) => {
    if (!IS_BROWSER) return;
    localStorage.setItem(key, JSON.stringify(data));
};

export const MOCK_DB = {
    users: "mock_users",
    patients: "mock_patients",
    appointments: "mock_appointments",
};

// Initial data to make the app look populated
const INITIAL_APPOINTMENTS = [
    {
        $id: "1",
        $createdAt: new Date().toISOString(),
        $updatedAt: new Date().toISOString(),
        userId: "user123",
        patient: { name: "Adrian Hajdin", $id: "p1" },
        schedule: new Date(),
        status: "scheduled",
        primaryPhysician: "Dr. Green",
        reason: "Annual checkup",
        note: "Patient is healthy",
    },
    {
        $id: "2",
        $createdAt: new Date().toISOString(),
        $updatedAt: new Date().toISOString(),
        userId: "user456",
        patient: { name: "John Doe", $id: "p2" },
        schedule: new Date(),
        status: "pending",
        primaryPhysician: "Dr. Smith",
        reason: "Fever and cold",
        note: "Needs rest",
    }
];

export const initStorage = () => {
    if (!IS_BROWSER) return;
    if (!localStorage.getItem(MOCK_DB.users)) setLocalStorage(MOCK_DB.users, []);
    if (!localStorage.getItem(MOCK_DB.patients)) setLocalStorage(MOCK_DB.patients, []);
    if (!localStorage.getItem(MOCK_DB.appointments)) {
        setLocalStorage(MOCK_DB.appointments, []);
    }
};
