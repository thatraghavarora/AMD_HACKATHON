import { getLocalStorage, setLocalStorage, MOCK_DB } from "../storage";
import { formatDateTime, parseStringify } from "../utils";
import { Appointment } from "@/types/appwrite.types";
import { getPatient } from "./patient.actions";

//  CREATE APPOINTMENT
export const createAppointment = async (appointmentData: CreateAppointmentParams) => {
    try {
        const appointments = getLocalStorage(MOCK_DB.appointments) || [];
        
        const newAppointment = {
            ...appointmentData,
            $id: Math.random().toString(36).substr(2, 9),
            $createdAt: new Date().toISOString(),
        };

        const updatedAppointments = [...appointments, newAppointment];
        setLocalStorage(MOCK_DB.appointments, updatedAppointments);

        return parseStringify(newAppointment);

    } catch (error) {
        console.error("An error occurred while creating a new appointment:", error);
    }
}

// GET APPOINTMENT
export const getAppointment = async (appointmentId: string) => {
    try {
        const appointments = getLocalStorage(MOCK_DB.appointments) || [];
        const appointment = appointments.find((a: any) => a.$id === appointmentId);
        return parseStringify(appointment);
    } catch (error) {
        console.error("An error occurred while retrieving the appointment:", error);
    }
}

// GET RECENT APPOINTMENTS
export const getRecentAppointmentList = async () => {
    try {
        const appointments = getLocalStorage(MOCK_DB.appointments) || [];

        const initialCounts = {
            scheduledCount: 0,
            pendingCount: 0,
            cancelledCount: 0,
        };

        const counts = (appointments as Appointment[]).reduce(
            (accumulate, appointment) => {
                switch (appointment.status) {
                    case "scheduled":
                        accumulate.scheduledCount++;
                        break;
                    case "pending":
                        accumulate.pendingCount++;
                        break;
                    case "cancelled":
                        accumulate.cancelledCount++;
                        break;
                }
                return accumulate;
            },
            initialCounts
        );

        const data = {
            totalCount: appointments.length,
            ...counts,
            documents: appointments,
        }

        return parseStringify(data);

    } catch (error) {
        console.error("An error occurred while retrieving the recent appointments:", error);
    }
}

// UPDATE APPOINTMENT
export const updateAppointment = async ({
    userId,
    appointmentId,
    appointment,
    type,
}: UpdateAppointmentParams) => {
    try {
        const appointments = getLocalStorage(MOCK_DB.appointments) || [];
        const index = appointments.findIndex((a: any) => a.$id === appointmentId);
        
        if (index === -1) {
            throw new Error("Appointment not found");
        }

        const updatedAppointment = {
            ...appointments[index],
            ...appointment,
            $updatedAt: new Date().toISOString(),
        };

        appointments[index] = updatedAppointment;
        setLocalStorage(MOCK_DB.appointments, appointments);

        // Simulated SMS notification
        const patient = await getPatient(userId);
        const smsMessage = `
                Hello ${patient?.name?.split(" ")[0] || "Patient"}, Greetings from CarePulse. ${type === "schedule" ? `Your appointment is confirmed for ${formatDateTime(appointment.schedule!).dateTime} with Dr. ${appointment.primaryPhysician}`
                :
                `We regret to inform that your appointment for ${formatDateTime(appointment.schedule!).dateTime} is cancelled. Reason:  ${appointment.cancellationReason}`}.
            `;

        console.log("SIMULATED SMS:", smsMessage);

        return parseStringify(updatedAppointment);

    } catch (error) {
        console.error("An error occurred while scheduling an appointment:", error);
    }
}

// SEND SMS NOTIFICATION (Simulated)
export const sendSMSNotification = async (userId: string, content: string) => {
    console.log("SIMULATED SMS SENDER:", { userId, content });
    return parseStringify({ status: "sent", content });
}