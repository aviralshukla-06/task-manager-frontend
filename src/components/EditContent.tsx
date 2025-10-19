import { CrossIcon } from "../icons/CrossIcon";
import { useRef, useEffect } from "react";
import { BACKEND_URL } from "../config";
import axios from "axios";

interface EditContentProps {
    open: boolean;
    onClose: () => void;
    initialData: {
        _id: string;
        taskTitle: string;
        taskDescription: string;
    };
    refreshTasks?: () => void;
}

export function EditContent({ open, onClose, initialData, refreshTasks }: EditContentProps) {
    const { _id, taskTitle = "", taskDescription = "" } = initialData || {};

    const titleRef = useRef<HTMLInputElement>(null);
    const descriptionRef = useRef<HTMLTextAreaElement>(null);

    // Prefill fields when modal opens
    useEffect(() => {
        if (titleRef.current) titleRef.current.value = taskTitle;
        if (descriptionRef.current) descriptionRef.current.value = taskDescription;
    }, [taskTitle, taskDescription, open]);

    async function editContent() {
        const updatedTitle = titleRef.current?.value;
        const updatedDescription = descriptionRef.current?.value;

        try {
            await axios.put(
                `${BACKEND_URL}/api/tasks/updatetasks`,
                {
                    contentId: _id,
                    taskTitle: updatedTitle,
                    taskDescription: updatedDescription,
                },
                {
                    headers: {
                        Authorization: localStorage.getItem("token"),
                    },
                }
            );

            if (refreshTasks) refreshTasks();
            onClose();
        } catch (err) {
            console.error("Error updating task:", err);
        }
    }

    if (!open) return null;

    return (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-gradient-to-br from-purple-900/95 to-pink-900/95 backdrop-blur-xl rounded-3xl p-8 max-w-md w-full border border-white/20 shadow-2xl transition-all duration-300 scale-100">
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-3xl font-bold text-white">Edit Task</h3>
                    <button onClick={onClose} className="text-white hover:text-pink-300 transition">
                        <CrossIcon size="lg" />
                    </button>
                </div>

                {/* Inputs */}
                <input
                    type="text"
                    placeholder="Task title..."
                    ref={titleRef}
                    defaultValue={taskTitle}
                    className="w-full px-6 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-purple-200 mb-4 focus:outline-none focus:ring-2 focus:ring-purple-400"
                />
                <textarea
                    placeholder="Task description..."
                    ref={descriptionRef}
                    defaultValue={taskDescription}
                    className="w-full px-6 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-purple-200 mb-6 focus:outline-none focus:ring-2 focus:ring-purple-400 min-h-[120px]"
                />

                {/* Buttons */}
                <div className="flex gap-3">
                    <button
                        onClick={editContent}
                        className="flex-1 bg-white text-purple-600 px-6 py-4 rounded-2xl font-semibold hover:bg-purple-50 transition-all duration-300 hover:scale-105"
                    >
                        Save Changes
                    </button>
                    <button
                        onClick={onClose}
                        className="flex-1 bg-white/10 backdrop-blur-sm text-white px-6 py-4 rounded-2xl font-semibold hover:bg-white/20 transition-all duration-300 border border-white/20"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
}
