import { LineChart } from "lucide-react";
import { ReactNode } from "react";

export function IconsButton({
    icon, onClick, activated
}: {
    icon: ReactNode,
    onClick: ()=> void,
    activated: boolean
}) {
    return <div className={`pointer rounded-full border p-2 bg-black hover:bg-gray ${activated ? "text-green-400" : "text-white" }`} onClick={onClick}>
        {icon}
    </div>
} 