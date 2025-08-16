import { CrossIcon } from "../icons/CrossIcon";
import { useRef } from "react";
import { BACKEND_URL } from "../config";
import axios from "axios";


export function CreateContent({ open, onClose }) {

    const taskTitleRef = useRef<HTMLInputElement>(null);
    // const taskStatusRef = useRef<HTMLInputElement>(null);
    const taskDescriptionRef = useRef<HTMLInputElement>(null);
    // const taskCreatedAtRef = useRef<HTMLInputElement>(null);

    async function addTasks() {
        const taskTitle = taskTitleRef.current?.value;
        // const taskStatus = taskStatusRef.current?.value;
        const taskDescription = taskDescriptionRef.current?.value;
        // const taskCreatedAt = taskCreatedAtRef.current?.value;

        console.log(taskTitle);
        console.log(taskDescription);
        // console.log(taskStatus);
        // console.log(taskCreatedAt);

        const response: any = await axios.post(BACKEND_URL + "/api/tasks/addtasks", {
            taskTitle,
            taskDescription,
            // taskStatus
        }, {
            headers: {
                "Authorization": localStorage.getItem("token")
            }
        })

        console.log(response);

        onClose();

    }

    return (
        <div>
            {open && <div className="w-screen h-screen bg-black fixed top-0 left-0 opacity-90 flex justify-center">

                <div className="flex flex-col justify-center">

                    <span className="bg-[#101624] rounded p-4 h-96 w-80">
                        <div className="flex justify-end cursor-pointer" onClick={onClose}>
                            <CrossIcon size="md" />
                        </div>

                        <div className="flex flex-col items-center justify-start gap-4 ">
                            <Input ref={taskTitleRef} placeholder="Title" className="w-64 text-center " />
                            {/* <Input ref={taskStatusRef} placeholder="status" className="w-64" /> */}
                            <Input ref={taskDescriptionRef} placeholder="Description" className="w-64 h-44 overflow-y-auto text-left align-top" />
                        </div>
                        <div className="flex justify-center mt-4">
                            <button onClick={addTasks} className="flex items-center justify-center w-[88%] px-4 py-2 text-white bg-blue-500 rounded">
                                Submit
                            </button>
                        </div>

                    </span>


                </div>
            </div>}
        </div>
    )

}

interface inputProp {
    placeholder: string,
    ref?: any
    onChange?: () => void
    className?: string
}

function Input({ onChange, placeholder, ref, className }: inputProp) {
    return <div>
        <input ref={ref} placeholder={placeholder} type={"text"} className={`${className} px-4 py-2 font-medium text-black border-2 border-black rounded-md flex justify-center items-center`} onChange={onChange}></input>
    </div>
}
