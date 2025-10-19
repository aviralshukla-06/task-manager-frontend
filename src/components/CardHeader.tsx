import type { ReactElement } from "react";

interface CardHeaderProps {
    headingText: string;
    generalText: string;
    profileIcon?: ReactElement;
}

export const CardHeader = ({
    headingText,
    generalText,
}: CardHeaderProps) => {
    // Get current date details dynamically
    const today = new Date();
    const dayName = today.toLocaleDateString("en-US", { weekday: "long" });
    const dateStr = today.toLocaleDateString("en-GB"); // e.g. 17/10/2025

    return (
        <header
            className="flex flex-col sm:flex-row justify-between items-start sm:items-center 
      mb-10 gap-6 sm:gap-0"
        >
            {/* Left Section — Greeting */}
            <div className="flex items-center gap-4">
                {/* Profile Icon */}
                <div className="hidden sm:flex items-center justify-center w-14 h-14 bg-white/20 rounded-2xl border border-white/30">
                    {/* {profileIcon || <UserIcon className="w-8 h-8 text-white" />} */}
                </div>

                {/* Text Content */}
                <div>
                    <h2 className="text-4xl sm:text-5xl font-bold text-white mb-2 
            bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                        {headingText}
                    </h2>
                    <p className="text-purple-200 text-lg sm:text-xl">{generalText}</p>
                </div>
            </div>

            {/* Right Section — Date Info */}
            <div className="self-end sm:self-auto text-right bg-white/10 backdrop-blur-sm rounded-2xl px-6 py-3 sm:px-8 sm:py-4 border border-white/20">
                <p className="text-purple-200 text-sm font-medium mb-1">Today</p>
                <p className="text-white font-bold text-xl sm:text-2xl">{dayName}</p>
                <p className="text-purple-200 text-base sm:text-lg">{dateStr}</p>
            </div>
        </header>
    );
};
