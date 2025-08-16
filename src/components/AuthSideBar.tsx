// import type { ReactElement } from "react"
import { UserIcon } from "../icons/UserIcon"
import { CardHeader } from "./CardHeader"
// import { useNavigate } from "react-router-dom"

interface authSideBarProps {
    message: string,
    referance: () => void,
    page: string
}

export const AuthSideBar = (props: authSideBarProps) => {

    // const myNavigate = useNavigate()
    return (
        <div className="h-full w-full flex flex-col rounded-md items-center justify-center font-sans bg-blue-500  p-4">
            {/* Header */}
            <CardHeader
                profileIcon={<UserIcon size="lg" />}
                headingText="Welcome "
                generalText="Happy to see you back..."
            />

            <div className="mt-4 flex gap-2">
                <span>{props.message}?</span>
                <button
                    onClick={props.referance}
                    className="text-white underline hover:text-gray-200"
                >
                    {props.page}
                </button>
            </div>



            {/* Inputs (add here if needed later) */}
            <div className="mt-6 w-full flex flex-col gap-4"></div>
        </div>
    )
}
