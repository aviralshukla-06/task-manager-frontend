import { useState, useEffect } from "react";
import { BACKEND_URL } from "../config";
import axios from "axios";

export default function SliderButton({ contentId }: { contentId: string }) {
    const [enabled, setEnabled] = useState(false);
    const [status, setStatus] = useState(false);

    useEffect(() => {
        setStatus(enabled);
    }, [enabled]);

    // const taskStatusRef = useRef(null);
    useEffect(() => {
        async function setTaskStatus(): Promise<void> {


            try {
                await axios.put(`${BACKEND_URL}/api/tasks/updatetaskStatus`, {
                    taskStatus: status,
                    contentId: contentId
                },
                    {
                        headers: {
                            "Authorization": localStorage.getItem("token")
                        }
                    })
                console.log("Task status updated:", status, contentId);

            } catch (error) {
                alert("failed error" + error)
            }
        }

        setTaskStatus();
    }, [status, contentId])


    return (
        <div
            onClick={() => setEnabled(!enabled)}
            className={`w-9 h-4 flex items-center rounded-full cursor-pointer transition-colors duration-300 ${enabled ? "bg-blue-500" : "bg-gray-300"
                }`}
        >
            <div
                className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${enabled ? "translate-x-6" : ""
                    }`}
            />
        </div>
    );
}








/* 

import { useState } from "react";

export default function SliderButton() {
  const [enabled, setEnabled] = useState(false);

  return (
    <div
      onClick={() => setEnabled(!enabled)}
      className={`w-14 h-8 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 ${
        enabled ? "bg-blue-500" : "bg-gray-300"
      }`}
    >
      <div
        className={`bg-white w-6 h-6 rounded-full shadow-md transform transition-transform duration-300 ${
          enabled ? "translate-x-6" : ""
        }`}
      />
    </div>
  );
}


*/

