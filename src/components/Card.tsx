import { DeleteIcon } from "../icons/DeleteIcon";
import { DocumentIcon } from "../icons/DocumentIcon";
import { EditIcon } from "../icons/EditIcon";
import SliderButton from "./SliderButton";

interface CardProps {
    _id: string;
    title: string;
    status?: Boolean,
    description?: string;
    date: Date;
    onEdit?: () => void;
}

export function Card(props: CardProps) {
    return (
        <div className="bg-white rounded-md shadow-md w-72 h-96 mx-4 mt-6 border border-black flex flex-col">
            {/* Header */}
            <div className="flex justify-between h-[15%] shadow-md items-center px-2">
                <div className="flex items-center space-x-2">
                    <DocumentIcon size="md" />
                    <div className="font-serif font-bold text-sm">{props.title}</div>
                </div>
                <DeleteIcon size="md" contentId={props._id} />
            </div>

            {/* Description */}
            <div className="flex-grow px-3 py-2 font-serif text-sm leading-4">
                {props.description}
            </div>

            <div className="font-serif text-[14px] flex justify-between items-center px-3 py-2 border-t border-gray-200">
                <p>
                    <span>Completion Status </span>
                </p>
                <SliderButton contentId={props._id} />
            </div>

            {/* Footer */}
            <div className="font-serif text-[14px] flex justify-between items-center px-3 py-2 border-t border-gray-200">
                <p>
                    <span>Created on: </span>
                    {new Date(props.date).toLocaleDateString()}
                </p>

                <button
                    onClick={props.onEdit}
                    className="flex items-center text-sm font-bold underline cursor-pointer"
                >
                    <EditIcon size="md" />
                </button>

            </div>
        </div>
    );
}
