"use client";

import React, { useEffect, useState } from 'react'
import Image from "next/image";
import { getPatient } from "@/lib/actions/patient.actions";
import AppointmentForm from "@/components/forms/AppointmentForm";
import * as Sentry from "@sentry/nextjs";
import { initStorage } from "@/lib/storage";

const Appointment = ({ params: { userId } }: SearchParamProps) => {
    const [patient, setPatient] = useState<any>(null);

    useEffect(() => {
        initStorage();
        const fetchPatient = async () => {
            const data = await getPatient(userId);
            setPatient(data);
            if (data) {
                Sentry.metrics.set("user_view_new-appointment", data.name);
            }
        };
        fetchPatient();
    }, [userId]);

    if (!patient) return <div className="flex-center h-screen text-black font-bold">Loading Appointment...</div>;

    return (
        <div className="flex h-screen max-h-screen bg-neo-bg">
            <section className="remove-scrollbar container my-auto">
                <div className="sub-container max-w-[860px] flex-1 justify-normal">
                    <Image
                        src="/assets/icons/logo-full.svg"
                        height={100}
                        width={200}
                        alt="patient"
                        className="mb-12 h-10 w-fit brightness-0"
                    />

                    <AppointmentForm
                        type="create"
                        userId={userId}
                        patientId={patient.$id}
                        patientName={patient.name}
                    />

                    <p className="copyright mt-10 py-12">© 2024 CarePluse</p>
                </div>
            </section>

            <Image
                src="/assets/images/appointment-img.png"
                height={1000}
                width={1000}
                alt="appointment"
                className="side-img max-w-[390px] bg-bottom border-l-4 border-black"
            />
        </div>
    );
}

export default Appointment;


