import { useEffect, useState } from "react";
import { DeleteIcon } from "../icons/DeleteIcon";
import { DocumentIcon } from "../icons/DocumentIcon";
import { EditIcon } from "../icons/EditIcon";
import SliderButton from "./SliderButton";

interface CardProps {
    _id: string;
    title: string;
    status?: boolean;
    description?: string;
    date: Date;
    onEdit?: () => void;
}

export function Card(props: CardProps) {
    const [filter, setFilter] = useState(false);
    const [colorClass, setColorClass] = useState("");

    useEffect(() => {
        if (props.status !== undefined) setFilter(props.status);
    }, [props.status]);

    useEffect(() => {
        // Choose card background color dynamically
        if (props.status) {
            setColorClass("bg-gradient-to-br from-green-400/30 to-emerald-600/40 border-green-300/30");
        } else {
            const isPastDue = new Date(props.date).getTime() < Date.now();
            if (isPastDue) {
                setColorClass("bg-inherit");
            } else {
                setColorClass("bg-gradient-to-br from-yellow-300/30 to-orange-400/40 border-yellow-300/30");
            }
        }
    }, [props.status, props.date]);

    return (
        <div
            className={`relative rounded-3xl p-5 border ${colorClass} shadow-lg hover:shadow-2xl hover:scale-105 
                  transition-all duration-300 flex flex-col justify-between backdrop-blur-xl`}
        >
            {/* Gradient Accent Top Bar */}
            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-t-3xl"></div>

            {/* Header */}
            <div className="flex justify-between items-center mb-3">
                <div className="flex items-center gap-3">
                    <DocumentIcon size="md" />
                    <h2
                        className={`text-lg font-semibold ${props.status ? "text-green-100 line-through" : "text-white"
                            }`}
                    >
                        {props.title}
                    </h2>
                </div>

                <button className="p-2 hover:bg-red-500/20 rounded-xl transition-all duration-300">
                    <DeleteIcon size="md" contentId={props._id} />
                </button>
            </div>

            {/* Description */}
            <div
                className={`text-sm mb-4 min-h-[60px] ${props.status ? "text-gray-300" : "text-purple-100"
                    }`}
            >
                {props.description || "No description provided."}
            </div>

            {/* Completion Status */}
            <div className="flex justify-between items-center border-t border-white/10 pt-2 text-sm text-gray-200">
                <span>Completion Status</span>
                <SliderButton taskStatus={props.status ?? false} contentId={props._id} />
            </div>

            {/* Footer */}
            <div className="flex justify-between items-center border-t border-white/10 pt-3 mt-3 text-sm text-gray-300">
                <p>
                    <span className="opacity-80">Created: </span>
                    {new Date(props.date).toLocaleDateString()}
                </p>

                <button
                    onClick={props.onEdit}
                    className="flex items-center gap-1 text-purple-300 hover:text-purple-400 transition-colors"
                >
                    <EditIcon size="md" />
                </button>
            </div>

            {/* Subtle overlay for completed tasks */}
            {props.status && (
                <div className="absolute inset-0 bg-green-500/10 rounded-3xl pointer-events-none"></div>
            )}
        </div>
    );
}
