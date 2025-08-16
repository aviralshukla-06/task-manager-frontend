import { useEffect, useState } from 'react';
import axios from 'axios';
// import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { CreateContent } from "../components/CreateContent";
import { SideBar } from '../components/SideBar';
// import { PlusIcon } from '../icons/PlusIcon';
import { BACKEND_URL } from '../config';
import { EditContent } from '../components/EditContent';
import { TopBar } from '../components/TopBar';
// import { UserIcon } from '../icons/UserIcon';


type Content = {
    _id: string,
    taskTitle: string,
    taskDescription: string,
    taskStatus?: Boolean,
    user_id?: number,
    creationdate?: Date
}

type ContentResponse = Content[];

export function Dashboard() {
    const [modalOpen, setModalOpen] = useState(true);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [selectedContent, setSelectedContent] = useState<Content | null>(null);

    const [contents, setContents] = useState<Content[]>([]);

    useEffect(() => {
        console.log("Updated contents", contents);
    }, [contents]);

    useEffect(() => {
        async function refresh() {
            try {
                const response = await axios.get<ContentResponse>(`${BACKEND_URL}/api/tasks/viewtasks`, {
                    headers: {
                        "Authorization": localStorage.getItem("token")
                    }
                });
                console.log("axios res", response);
                // const responseData = JSON.stringify(response.data, null, 2);
                const responseData = response.data as any[];
                console.log("response", responseData);

                // const responseData = response.data;



                setContents(Array.isArray(responseData) ? responseData : [responseData]);
                console.log("contemt", contents);
            } catch (err) {
                console.error("Failed to fetch content", err);
            }
        }

        refresh();
        const interval = setInterval(refresh, 10000);
        return () => clearInterval(interval);
    }, []);


    return (
        <>


            <CreateContent open={modalOpen} onClose={() => setModalOpen(false)} />
            <EditContent open={editModalOpen} onClose={() => setEditModalOpen(false)} initialData={selectedContent} />
            <div className='h-auto w-full flex'>

                <div className='w-[20%] fixed top-0 left-0 h-screen '>
                    <div className='w-full  mr-1 flex'>
                        <SideBar onAddTask={() => setModalOpen(true)} />
                    </div>
                </div>


                <div className=' justify-start w-[80%] ml-[20%]'>
                    <div className='w-full'>

                        <div className='w-full'>
                            <TopBar />
                        </div>

                        <div className='flex flex-wrap gap-6 pl-[6%]'>
                            {contents.length === 0 ? (
                                <div className="text-black font-extrabold text-lg mt-10 ml-4">
                                    Please add some data
                                </div>

                            ) :
                                (contents.map(({ _id, taskTitle, taskStatus, taskDescription, creationdate }, idx) => (
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

                                )))}
                        </div>
                    </div>
                </div>

            </div>
        </>
    );
}

export default Dashboard;
