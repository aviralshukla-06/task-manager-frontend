import { TargetIcon } from "../icons/TargerIcon";
import { LogoutIcon } from "../icons/LogoutIcon";
import { PlusIcon } from "../icons/PlusIcon";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

type SideBarProps = {
    onAddTask?: () => void;
    totalTasks?: number;
    completedTasks?: number;
};

export const SideBar = ({
    onAddTask,
    totalTasks = 0,
    completedTasks = 0,
}: SideBarProps) => {




    const navigateTo = useNavigate();
    const [isOpen, setIsOpen] = useState(false);

    const completionRate =
        totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

    async function logout() {
        localStorage.removeItem("token");
        navigateTo("/login");
    }

    return (
        <>
            {/* Mobile Menu Toggle */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="lg:hidden fixed top-4 left-4 z-[9999] p-3  rounded-xl shadow-md"
            >
                <svg
                    className="w-6 h-6 bg-inherit text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    {isOpen ? (
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                        />
                    ) : (
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 6h16M4 12h16M4 18h16"
                        />
                    )}
                </svg>
            </button>

            {/* Overlay for Mobile */}
            {isOpen && (
                <div
                    className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`fixed top-0 left-0 h-full w-72 lg:w-80 
        bg-gradient-to-b from-purple-600/90 to-pink-600/90 
        backdrop-blur-xl shadow-2xl border-r border-white/10
        flex flex-col justify-between
        transition-transform duration-300 ease-in-out z-50
        ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
            >
                {/* Sidebar content */}
                <div className="flex flex-col h-full p-8 overflow-y-auto">
                    {/* Header */}
                    <div className="flex ml-10 items-center gap-3 mb-10">
                        <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-lg">
                            <TargetIcon className="w-7 h-7 text-purple-600" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-white tracking-wide">
                                INFINITY
                            </h1>
                            <p className="text-purple-100 text-sm">Task Manager</p>
                        </div>
                    </div>

                    {/* Stats Section */}
                    <div className="space-y-4 mb-10">
                        {/* Total Tasks */}
                        <div className="bg-white/20 rounded-2xl p-5 border border-white/30 hover:bg-white/30 transition-all duration-300 hover:scale-[1.02]">
                            <div className="flex items-center justify-between mb-2">
                                <svg
                                    className="w-8 h-8 text-white"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                                    />
                                </svg>
                                <span className="text-3xl font-bold text-white">
                                    {totalTasks}
                                </span>
                            </div>
                            <p className="text-purple-100 font-medium text-sm">
                                Total Tasks
                            </p>
                        </div>

                        {/* Completed Tasks */}
                        <div className="bg-white/20 rounded-2xl p-5 border border-white/30 hover:bg-white/30 transition-all duration-300 hover:scale-[1.02]">
                            <div className="flex items-center justify-between mb-2">
                                <svg
                                    className="w-8 h-8 text-white"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                </svg>
                                <span className="text-3xl font-bold text-white">
                                    {completedTasks}
                                </span>
                            </div>
                            <p className="text-purple-100 font-medium text-sm">Completed</p>
                        </div>

                        {/* Success Rate */}
                        <div className="bg-white/20 rounded-2xl p-5 border border-white/30 hover:bg-white/30 transition-all duration-300 hover:scale-[1.02]">
                            <div className="flex items-center justify-between mb-2">
                                <svg
                                    className="w-8 h-8 text-white"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                                    />
                                </svg>
                                <span className="text-3xl font-bold text-white">
                                    {completionRate}%
                                </span>
                            </div>
                            <p className="text-purple-100 font-medium text-sm">
                                Success Rate
                            </p>
                        </div>
                    </div>

                    {/* Add Task Button */}
                    <button
                        onClick={() => {
                            onAddTask?.();
                            setIsOpen(false);
                        }}
                        className="flex items-center justify-center gap-3 px-6 py-4 
              bg-white text-purple-600 rounded-2xl font-semibold
              hover:bg-purple-50 transition-all duration-300
              shadow-md hover:shadow-xl hover:scale-[1.03]"
                    >
                        <PlusIcon className="w-6 h-6" />
                        <span>Add Task</span>
                    </button>

                    {/* Spacer to push logout to bottom */}
                    <div className="flex-1" />
                </div>

                {/* Logout Button */}
                <div className="p-6 border-t border-white/20">
                    <button
                        onClick={logout}
                        className="w-full flex items-center justify-center gap-2 px-5 py-3 
                                     bg-white/10 text-white rounded-xl font-medium
                                         hover:bg-red-500/50 transition-all duration-300 border border-white/20"
                    >
                        <LogoutIcon className="w-5 h-5" />
                        <span className="text-sm">Logout</span>
                    </button>
                </div>
            </aside>

            {/* Spacer for desktop layout */}
            <div className="hidden lg:block w-80 flex-shrink-0" />
        </>
    );
};
