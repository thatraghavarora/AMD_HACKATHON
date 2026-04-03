import PatientForm from "@/components/forms/PatientForm";
import PasskeyModal from "@/components/PasskeyModal";
import Image from "next/image";
import Link from "next/link";

const Home = ({ searchParams }: SearchParamProps) => {
    const isAdmin = searchParams.admin === "true";

    return (
        <div className="flex h-screen max-h-screen bg-neo-bg text-black">
            {isAdmin && <PasskeyModal />}

            <section className="remove-scrollbar container my-auto">
                <div className="sub-container max-w-[496px]">
                    <Image
                        src="/assets/icons/logo-full.svg"
                        height={100}
                        width={200}
                        alt="patient"
                        className="mb-12 h-10 w-fit brightness-0"
                    />

                    <PatientForm />

                    <div className="text-14-medium mt-20 flex justify-between">
                        <p className="justify-items-end text-black xl:text-left font-bold">
                            © 2024 CarePluse
                        </p>
                        <Link href="/?admin=true" className="text-neo-secondary font-black underline uppercase">
                            Admin
                        </Link>
                    </div>
                </div>
            </section>

            <Image
                src="/assets/images/onboarding-img.png"
                height={1000}
                width={1000}
                alt="patient"
                className="side-img max-w-[50%] border-l-8 border-black grayscale contrast-125"
            />
        </div>
    );
}

export default Home;