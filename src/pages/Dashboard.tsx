import { useEffect, useState } from "react";
import axios from "axios";
import { useContext, createContext } from "react";
import { Card } from "../components/Card";
import { CreateContent } from "../components/CreateContent";
import { EditContent } from "../components/EditContent";
import { SideBar } from "../components/SideBar";
import { CardHeader } from "../components/CardHeader";
import { BACKEND_URL } from "../config";

type Content = {
    _id: string;
    taskTitle: string;
    taskDescription: string;
    taskStatus?: boolean;
    creationdate?: Date;
    dueDate?: string;
};

type ContentResponse = Content[];

export function Dashboard() {
    const [modalOpen, setModalOpen] = useState(false);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [selectedContent, setSelectedContent] = useState<Content | null>(null);
    const [contents, setContents] = useState<Content[]>([]);

    // Fetch all tasks
    async function refresh() {

        try {
            const response = await axios.get<ContentResponse>(
                `${BACKEND_URL}/api/tasks/viewtasks`,
                {
                    headers: {
                        Authorization: localStorage.getItem("token"),
                    },
                }
            );
            const responseData = response.data;

            setContents(Array.isArray(responseData) ? responseData : [responseData]);
        } catch (err) {
            console.error("Failed to fetch content", err);
        }
    }


    useEffect(() => {

        refresh();
        const interval = setInterval(refresh, 10000);
        return () => clearInterval(interval);
    }, []);

    return (
        <>

            {/* Modals */}
            <CreateContent open={modalOpen} onClose={() => setModalOpen(false)} />
            <EditContent
                open={editModalOpen}
                onClose={() => setEditModalOpen(false)}
                initialData={selectedContent}
            />


            <div className="relative h-screen w-full flex bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden">
                {/* Animated blurred background orbs */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
                    <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-1000"></div>
                    <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-500"></div>
                </div>

                {/* Sidebar */}
                <SideBar onAddTask={() => setModalOpen(true)} />


                {/* Main Section */}
                <div className="flex-1 ml-[20%] relative overflow-y-auto">
                    <div className="p-12">
                        {/* Header */}
                        <CardHeader
                            headingText="Welcome Back!"
                            generalText="Let's make today productive ✨"
                        />

                        {/* Task Grid */}
                        {/* Tasks Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
                            {contents.length === 0 ? (
                                <div className="text-purple-200 font-bold text-lg mt-10 mx-20">
                                    Please add some data
                                </div>
                            ) : (
                                contents.map(({ _id, taskTitle, taskStatus, taskDescription, creationdate }, idx) => (
                                    <Card
                                        key={_id || idx}
                                        _id={_id}
                                        title={taskTitle}
                                        status={taskStatus}
                                        description={taskDescription}
                                        date={creationdate || new Date()}
                                        onEdit={() => {
                                            setSelectedContent({ _id, taskTitle, taskDescription });
                                            setEditModalOpen(true);
                                        }}
                                    />
                                ))
                            )}
                        </div>

                        {/* Add New Task Button (Full Width) */}
                        <div className="w-full flex justify-center">
                            <button
                                onClick={() => setModalOpen(true)}
                                className="w-full sm:w-[90%] lg:w-[85%] py-4 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 
               text-white font-semibold text-lg rounded-2xl shadow-lg hover:shadow-2xl hover:scale-[1.02] 
               transition-all duration-300 focus:outline-none"
                            >
                                + Add New Task
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
}

export default Dashboard;
