import type { ReactElement } from "react";
import { UserIcon } from "../icons/UserIcon";

interface cardHeader {
    profileIcon: ReactElement,
    headingText: String,
    generalText: String
}

export const CardHeader = (props: cardHeader) => {
    return (
        <div >
            <div className=" h-40 w-80 ">
                <div className="mx-auto flex justify-center h-12 w-12 mt-4 items-center ">
                    <UserIcon size="lg" />
                </div>

                <div className=" flex-col-2 items-center h-16 w-full text-center">
                    <h1 className="font-bold text-2xl">{props.headingText}</h1>
                    <h3 className="text-xl">{props.generalText}</h3>
                </div>
            </div>
        </div>
    )
}

