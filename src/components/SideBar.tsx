// import { CalanderIcon } from "../icons/CalanderIcon"
// import { CheckIcon } from "../icons/CheckIcon"
import { DashboardIcon } from "../icons/DashboardIcon"
// import { DueTaskIcon } from "../icons/DueTaskIcon"
import { LogoutIcon } from "../icons/LogoutIcon"
// import { PendingIcon } from "../icons/PendingIcon"
import { PlusIcon } from "../icons/PlusIcon"
import { Button } from "./Button"
import { useNavigate } from "react-router-dom"


type SideBarProps = {
    onAddTask: () => void;
};

export const SideBar = ({ onAddTask }: SideBarProps) => {

    const navigateTo = useNavigate()

    async function logout() {
        await localStorage.removeItem("token")

        navigateTo("/login")

    }


    return (
        <div className="h-screen w-full shadow-lg bg-[#ff6867] rounded-md">
            <div className=" h-[80%]">

                <div className="flex p-3">
                    <Button
                        icon={<PlusIcon size="lg" />}
                        text="Add Task"
                        onClick={onAddTask}
                    />

                </div>

                <div className="flex p-3">
                    <Button
                        icon={<DashboardIcon size="lg" />}
                        text="Home"
                    />

                </div>
                {/* <div className="flex p-3">
                    <Button
                        icon={<CheckIcon size="lg" />}
                        text="Finished"
                    />

                </div>
                <div className="flex p-3">
                    <Button
                        icon={<PendingIcon size="lg" />}
                        text="Upcoming"
                    />

                </div>
                <div className="flex p-3">
                    <Button
                        icon={<DueTaskIcon size="lg" />}
                        text="Missed"
                    />

                </div>
                <div className="flex p-3">
                    <Button
                        icon={<CalanderIcon size="lg" />}
                        text="Today's Task"
                    />

                </div> */}

            </div>
            <div className="flex p-3">
                <Button
                    icon={<LogoutIcon size="lg" />}
                    text="Logout"
                    onClick={logout}
                />
            </div>
        </div>
    )
}