import clsx from "clsx";
import Image from "next/image";

type StatCardProps = {
    type: "appointments" | "pending" | "cancelled";
    count: number;
    label: string;
    icon: string;
};

const StatCard = ({ type, count = 0, label, icon }: StatCardProps) => {
    return (
        <div
            className={clsx("stat-card", {
                "bg-yellow-500": type === "appointments",
                "bg-blue-500": type === "pending",
                "bg-red-500": type === "cancelled",
            })}
        >
            <div className="flex items-center gap-4">
                <Image
                    src={icon}
                    height={32}
                    width={32}
                    alt="appointments"
                    className="size-8 w-fit brightness-0 invert-0"
                />
                <h2 className="text-32-bold text-black">{count}</h2>
            </div>

            <p className="text-18-bold text-black uppercase tracking-tight">{label}</p>
        </div>
    );
}

export default StatCard;