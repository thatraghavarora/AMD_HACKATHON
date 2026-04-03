import { getLocalStorage, setLocalStorage, MOCK_DB } from "../storage";
import { parseStringify } from "../utils";

// CREATE USER
export const createUser = async (user: CreateUserParams) => {
    try {
        const users = getLocalStorage(MOCK_DB.users) || [];
        
        // Check existing user
        const existingUser = users.find((u: any) => u.email === user.email);
        if (existingUser) return existingUser;

        const newUser = {
            ...user,
            $id: Math.random().toString(36).substr(2, 9),
            $createdAt: new Date().toISOString(),
        };

        const updatedUsers = [...users, newUser];
        setLocalStorage(MOCK_DB.users, updatedUsers);

        return parseStringify(newUser);
    } catch (error: any) {
        console.error("An error occurred while creating a new user:", error);
    }
};

// GET USER
export const getUser = async (userId: string) => {
    try {
        const users = getLocalStorage(MOCK_DB.users) || [];
        const user = users.find((u: any) => u.$id === userId);
        return parseStringify(user);
    } catch (error) {
        console.error("An error occurred while retrieving the user details:", error);
    }
}

// GET PATIENT
export const getPatient = async (userId: string) => {
    try {
        const patients = getLocalStorage(MOCK_DB.patients) || [];
        const patient = patients.find((p: any) => p.userId === userId);
        return parseStringify(patient);
    } catch (error) {
        console.error("An error occurred while retrieving the patient details:", error);
    }
}

// REGISTER PATIENT
export const registerPatient = async ({ identificationDocument, ...patient }: RegisterUserParams) => {
    try {
        const patients = getLocalStorage(MOCK_DB.patients) || [];
        
        // Mock file upload (store as a simple mock URL)
        const mockFileId = Math.random().toString(36).substr(2, 9);
        const mockFileUrl = `https://mock-storage.com/${mockFileId}`;

        const newPatient = {
            ...patient,
            $id: Math.random().toString(36).substr(2, 9),
            $createdAt: new Date().toISOString(),
            identificationDocumentId: mockFileId,
            identificationDocumentUrl: mockFileUrl,
        };

        const updatedPatients = [...patients, newPatient];
        setLocalStorage(MOCK_DB.patients, updatedPatients);

        console.log("New Patient:", newPatient);
        return parseStringify(newPatient);

    } catch (error) {
        console.error("An error occurred while creating a new patient:", error);
    }
}