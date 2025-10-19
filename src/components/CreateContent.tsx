import { useRef, useState, useEffect } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { CrossIcon } from "../icons/CrossIcon";

interface CreateContentProps {
    open: boolean;
    onClose: () => void;
    editTask?: {
        id: number;
        taskTitle: string;
        taskDescription: string;
    } | null;
    refreshTasks?: () => void; // Callback to refresh after changes
}

export function CreateContent({
    open,
    onClose,
    editTask,
    refreshTasks,
}: CreateContentProps) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    useEffect(() => {
        if (editTask) {
            setTitle(editTask.taskTitle);
            setDescription(editTask.taskDescription);
        } else {
            setTitle("");
            setDescription("");
        }
    }, [editTask, open]);

    async function handleSave() {
        try {
            if (editTask) {
                // UPDATE existing task
                await axios.put(
                    `${BACKEND_URL}/api/tasks/${editTask.id}`,
                    { taskTitle: title, taskDescription: description },
                    { headers: { Authorization: localStorage.getItem("token") } }
                );
            } else {
                // CREATE new task
                await axios.post(
                    `${BACKEND_URL}/api/tasks/addtasks`,
                    { taskTitle: title, taskDescription: description },
                    { headers: { Authorization: localStorage.getItem("token") } }
                );
            }
            if (refreshTasks) refreshTasks();
            onClose();
        } catch (error) {
            console.error("Error saving task:", error);
        }
    }

    async function handleDelete() {
        if (!editTask) return;
        if (!confirm("Are you sure you want to delete this task?")) return;

        try {
            await axios.delete(`${BACKEND_URL}/api/tasks/${editTask.id}`, {
                headers: { Authorization: localStorage.getItem("token") },
            });
            if (refreshTasks) refreshTasks();
            onClose();
        } catch (error) {
            console.error("Error deleting task:", error);
        }
    }

    if (!open) return null;

    return (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-gradient-to-br from-purple-900/95 to-pink-900/95 backdrop-blur-xl rounded-3xl p-8 max-w-md w-full border border-white/20 shadow-2xl transition-all duration-300 scale-100">
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-3xl font-bold text-white">
                        {editTask ? "Edit Task" : "Create New Task"}
                    </h3>
                    <button
                        onClick={onClose}
                        className="text-white hover:text-pink-300 transition"
                    >
                        <CrossIcon size="lg" />
                    </button>
                </div>

                {/* Inputs */}
                <input
                    type="text"
                    placeholder="Task title..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-6 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-purple-200 mb-4 focus:outline-none focus:ring-2 focus:ring-purple-400"
                />
                <textarea
                    placeholder="Task description..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full px-6 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-purple-200 mb-6 focus:outline-none focus:ring-2 focus:ring-purple-400 min-h-[120px]"
                />

                {/* Buttons */}
                <div className="flex gap-3">
                    <button
                        onClick={handleSave}
                        className="flex-1 bg-white text-purple-600 px-6 py-4 rounded-2xl font-semibold hover:bg-purple-50 transition-all duration-300 hover:scale-105"
                    >
                        {editTask ? "Update" : "Add Task"}
                    </button>

                    {editTask && (
                        <button
                            onClick={handleDelete}
                            className="flex-1 bg-red-500 text-white px-6 py-4 rounded-2xl font-semibold hover:bg-red-600 transition-all duration-300 hover:scale-105"
                        >
                            Delete
                        </button>
                    )}

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
