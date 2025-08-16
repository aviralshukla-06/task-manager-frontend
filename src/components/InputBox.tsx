import type { ReactElement } from "react"

type inputBoxColor = "custom" | "inherited"
type IconPosition = "left" | "right"

interface inputBoxProps {
    bgColor?: inputBoxColor,
    icon?: ReactElement
    placeholder: string,
    iconPosition?: IconPosition
    ref?: any

}

export const InputBox = ({ bgColor, icon, placeholder, iconPosition = "left", ref }: inputBoxProps) => {
    const colorClass = bgColor === "custom" ? "bg-[#476468] text-white" : "bg-inherit text-black"

    return (
        <div >
            <div className="flex items-center  justify-center bg-inherit">
                {iconPosition === "left" && (
                    <span className="border border-black rounded-full flex justify-center items-center z-10  h-12 w-12 bg-white">{icon}</span>
                )}

                <input
                    ref={ref}
                    className={`${colorClass} ${iconPosition === "left" ? "-ml-3 rounded-r-3xl" : " rounded-l-3xl -mr-2 pr-2"} z-0 h-10 text-md flex text-center p-3 justify-center `}
                    placeholder={placeholder}
                />

                {iconPosition === "right" && (
                    <span className="border border-black rounded-full flex justify-center items-center z-10 h-12 w-12 bg-white -ml-2">
                        {icon}
                    </span>
                )}
            </div>
        </div>

    )
}