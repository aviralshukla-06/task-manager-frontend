import type { ReactElement } from "react";

interface buttonInterface {
    icon?: ReactElement,
    text: string,
    onClick?: () => void
}

export const Button = ({ icon, text, onClick }: buttonInterface) => {
    return (
        <div
            onClick={onClick}
            className="bg-inherit h-12  text-current text-white w-60 flex justify-start pl-6 items-center rounded-md cursor-pointer hover:bg-white hover:text-black transform transition-transform duration-300">
            <div >
                {icon}
            </div>
            <div className="font-serif text-xl pl-2">
                {text}
            </div>
        </div>
    )
}