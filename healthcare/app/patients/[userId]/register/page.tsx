"use client";

import React, { useEffect, useState } from 'react'
import Image from "next/image";
import RegisterForm from "@/components/forms/RegisterForm";
import { getUser } from "@/lib/actions/patient.actions";
import * as Sentry from "@sentry/nextjs";
import { initStorage } from '@/lib/storage';

const Register = ({ params: { userId } }: SearchParamProps) => {
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        initStorage();
        const fetchUser = async () => {
            const userData = await getUser(userId);
            setUser(userData);
            if (userData) {
                Sentry.metrics.set("user_view_register", userData.name);
            }
        };
        fetchUser();
    }, [userId]);

    if (!user) return <div className="flex-center h-screen text-black font-bold">Loading Registration...</div>;

    return (
        <div className="flex h-screen max-h-screen bg-neo-bg">
            <section className="remove-scrollbar container">
                <div className="sub-container max-w-[860px] flex-1 flex-col py-10">
                    <Image
                        src="/assets/icons/logo-full.svg"
                        height={100}
                        width={200}
                        alt="patient"
                        className="mb-12 h-10 w-fit brightness-0"
                    />

                    <RegisterForm user={user} />

                    <p className="copyright py-12">© 2024 CarePluse</p>
                </div>
            </section>

            <Image
                src="/assets/images/register-img.png"
                height={1000}
                width={1000}
                alt="patient"
                className="side-img max-w-[390px] border-l-4 border-black"
            />
        </div>
    );
}

export default Register;