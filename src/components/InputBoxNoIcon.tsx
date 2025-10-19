import type { ReactElement } from "react"

type inputBoxColor = "custom" | "inherited"
type IconPosition = "left" | "right"

interface inputBoxNoIconProps {
    bgColor?: inputBoxColor,
    icon?: ReactElement
    placeholder: string,
    iconPosition?: IconPosition,
    ref: any

}

export const InputBoxNoIcon = ({ bgColor, placeholder, ref }: inputBoxNoIconProps) => {
    const colorClass = bgColor === "custom" ? "bg-[#476468] text-white" : "bg-inherit text-black"

    return (
        <div >
            <div className="flex items-center justify-center bg-inherit">


                <input
                    className={`${colorClass} rounded-3xl z-0 h-10 w-60 text-center text-lg flex justify-center `}
                    placeholder={placeholder}
                    ref={ref}
                />


            </div>
        </div>

    )
}