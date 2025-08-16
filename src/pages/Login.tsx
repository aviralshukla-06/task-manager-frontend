
import { CardHeader } from "../components/CardHeader"
import { useRef } from "react"
import { useNavigate } from "react-router-dom"
import { InputBox } from "../components/InputBox"
import { PasswordIcon } from "../icons/PasswordIcon"
import { UserIcon } from "../icons/UserIcon"
import { BACKEND_URL } from "../config"
import axios from "axios"
import { AuthSideBar } from "../components/AuthSideBar"


export const Login = () => {
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null)

    const nav = useNavigate();
    async function signup(): Promise<void> {
        const email = emailRef.current?.value
        const password = passwordRef.current?.value

        console.log(email);
        console.log(password);

        try {
            const response: any = await axios.post(`${BACKEND_URL}/api/users/login`, {
                email,
                password
            })

            const jwt = response.data.token;
            console.log(jwt);
            localStorage.setItem("token", jwt);
            nav("/dashboard");
        } catch (error) {
            alert("failed" + error)
        }


        alert("signind -in")
    }



    return (
        <div className="flex h-screen">
            <div className="h-screen w-1/2 flex items-center bg-[#A7F3D0]">
                <div className="h-full w-full  flex flex-col rounded-md items-center justify-center font-sans bg-blue-500 custom-diagonal-bg p-4">

                    {/* Header */}
                    <CardHeader
                        profileIcon={<UserIcon size="lg" />}
                        headingText="Welcome "
                        generalText="Happy to see you back..."
                    />

                    {/* Inputs */}
                    <div className="mt-6 w-full flex flex-col gap-4">

                        <InputBox
                            ref={emailRef}
                            bgColor="custom"
                            icon={<UserIcon size="md" />}
                            placeholder="email"
                            iconPosition="left"
                        />

                        <InputBox
                            ref={passwordRef}
                            bgColor="custom"
                            icon={<PasswordIcon size="md" />}
                            placeholder="password"
                            iconPosition="right"
                        />
                    </div>
                    <div className="flex pt-4 w-full justify-center">
                        <button onClick={signup} className="h-10 w-60 bg-blue-600 hover:bg-white rounded-md text-xl font-serif">Login</button>

                    </div>

                </div>

            </div>
            <div className="w-1/2 flex items-center bg-[#A7F3D0] p-4">
                <AuthSideBar message="Don't have an account " referance={() => nav("/register")} page="Register" />
            </div>
        </div>

    )
}