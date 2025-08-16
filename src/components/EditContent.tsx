import { CrossIcon } from "../icons/CrossIcon";
import { useRef, useEffect } from "react";
import { BACKEND_URL } from "../config";
import axios from "axios";



export function EditContent({ open, onClose, initialData }) {
    const { _id, taskTitle = "", taskDescription = "" } = initialData || {};

    const titleRef = useRef<HTMLInputElement>(null);
    const descriptionRef = useRef<HTMLInputElement>(null);

    // Prefill input fields when modal opens
    useEffect(() => {
        if (titleRef.current) titleRef.current.value = taskTitle;
        if (descriptionRef.current) descriptionRef.current.value = taskDescription;
    }, [taskTitle, taskDescription]);

    async function editContent() {
        const updatedTitle = titleRef.current?.value;
        const updatedDescription = descriptionRef.current?.value;

        await axios.put(`${BACKEND_URL}/api/tasks/updatetasks`, {
            contentId: _id,
            taskTitle: updatedTitle,
            taskDescription: updatedDescription
        }, {
            headers: {
                "Authorization": localStorage.getItem("token")
            }
        });

        onClose();
    }

    return open ? (
        <div className="w-screen h-screen bg-black fixed top-0 left-0 opacity-90 flex justify-center">
            <div className="flex flex-col justify-center">
                <span className="bg-[#101624] rounded p-4 h-96 w-80">
                    <div className="flex justify-end cursor-pointer" onClick={onClose}>
                        <CrossIcon size="md" />
                    </div>

                    <div className="flex flex-col items-center justify-start gap-3 py-3">
                        <Input ref={titleRef} placeholder="Title" className="w-64" />
                        <Input ref={descriptionRef} placeholder="Description" className="w-64 h-44 overflow-y-auto text-left align-top" />
                    </div>

                    <div className="flex justify-center mt-8">
                        <button onClick={editContent} className="flex items-center justify-center w-[88%] px-4 py-2 text-white bg-blue-500 rounded">
                            Submit
                        </button>
                    </div>
                </span>
            </div>
        </div>
    ) : null;
}

interface inputProp {
    placeholder: string;
    ref?: any;
    onChange?: () => void;
    className?: string
}

function Input({ onChange, placeholder, ref, className }: inputProp) {
    return (
        <div>
            <input
                ref={ref}
                placeholder={placeholder}
                type="text"
                className={` ${className} px-4 py-2 font-medium text-black border-2 border-black rounded-md`}
                onChange={onChange}
            />
        </div>
    );
}
