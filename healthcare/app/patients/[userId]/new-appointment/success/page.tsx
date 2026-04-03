"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { getAppointment } from "@/lib/actions/appointment.actions";
import { getPatient, getUser } from "@/lib/actions/patient.actions";
import { Doctors } from "@/constants";
import { formatDateTime } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import * as Sentry from "@sentry/nextjs";
import { initStorage } from "@/lib/storage";

const RequestSuccess = ({ searchParams, params: { userId } }: SearchParamProps) => {
    const [data, setData] = useState<any>(null);

    useEffect(() => {
        initStorage();
        const fetchData = async () => {
            const appointmentId = (searchParams?.appointmentId as string) || "";
            const [patient, appointment, user] = await Promise.all([
                getPatient(userId),
                getAppointment(appointmentId),
                getUser(userId)
            ]);

            const doctor = Doctors.find(
                (d) => d.name === appointment?.primaryPhysician
            );

            setData({ patient, appointment, user, doctor });
            if (user) {
                Sentry.metrics.set("user_view_appointment-success", user.name);
            }
        };
        fetchData();
    }, [userId, searchParams?.appointmentId]);

    if (!data || !data.appointment) return <div className="flex-center h-screen text-black font-bold">Loading Success Details...</div>;

    const { patient, appointment, doctor } = data;

    return (
        <div className="flex h-screen max-h-screen px-[5%] bg-neo-bg">
            <div className="success-img">
                <Link href="/">
                    <Image
                        src="/assets/icons/logo-full.svg"
                        height={100}
                        width={200}
                        alt="logo"
                        className="h-10 w-fit brightness-0"
                    />
                </Link>

                <section className="flex flex-col items-center">
                    <Image
                        src="/assets/gifs/success.gif"
                        height={300}
                        width={280}
                        alt="success"
                        unoptimized
                        className="grayscale"
                    />
                    <h2 className="header mb-6 max-w-[600px] text-center font-black">
                        Your <span className="text-neo-secondary">appointment request</span> has
                        been successfully submitted!
                    </h2>
                    <p className="font-bold text-lg">We&apos;ll be in touch shortly to confirm.</p>
                </section>

                <section className="request-details">
                    <p className="font-bold">Requested appointment details for <span className="text-neo-accent">{patient.name}:</span> </p>
                    <div className="flex items-center gap-3 bg-neo-primary p-2 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                        <Image
                            src={doctor?.image!}
                            alt="doctor"
                            width={100}
                            height={100}
                            className="size-6"
                        />
                        <p className="whitespace-nowrap font-black">Dr. {doctor?.name}</p>
                    </div>
                    <div className="flex gap-2 bg-white p-2 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                        <Image
                            src="/assets/icons/calendar.svg"
                            height={24}
                            width={24}
                            alt="calendar"
                            className="brightness-0"
                        />
                        <p className="font-bold">{formatDateTime(appointment.schedule).dateTime}</p>
                    </div>
                </section>

                <div className="flex flex-col gap-4 w-full max-w-[300px]">
                    <Button variant="outline" className="shad-primary-btn w-full" asChild>
                        <Link href={`/patients/${userId}/new-appointment`}>
                            New Appointment
                        </Link>
                    </Button>

                    <Button variant="outline" className="shad-gray-btn w-full" asChild>
                        <Link href="/">
                            Back Home
                        </Link>
                    </Button>
                </div>

                <p className="copyright font-bold">© 2024 CarePluse</p>
            </div>
        </div>
    );
}

export default RequestSuccess;