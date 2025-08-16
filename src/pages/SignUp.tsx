
import { CardHeader } from "../components/CardHeader"
import { useRef } from "react"
import { useNavigate } from "react-router-dom"
import { InputBox } from "../components/InputBox"
import { PasswordIcon } from "../icons/PasswordIcon"
import { UserIcon } from "../icons/UserIcon"
import { BACKEND_URL } from "../config"
import axios from "axios"
import { InputBoxNoIcon } from "../components/InputBoxNoIcon"
import { AuthSideBar } from "../components/AuthSideBar"

export const SignUp = () => {
    const emailRef = useRef<HTMLInputElement>(null);
    const userNameRef = useRef<HTMLInputElement>(null);
    const fullNameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null)

    const nav = useNavigate();
    async function signup(): Promise<void> {
        const email = emailRef.current?.value
        const userName = userNameRef.current?.value
        const fullName = fullNameRef.current?.value
        const password = passwordRef.current?.value

        console.log(email);
        console.log(userName);
        console.log(fullName);
        console.log(password);

        try {
            const response: any = await axios.post(`${BACKEND_URL}/api/users/register`, {
                email,
                userName,
                fullName,
                password
            })

            const jwt = response.config.token;
            localStorage.setItem("token", jwt);
            nav("/login");
        } catch (error) {
            alert("failed" + error)
        }


        alert("registered")
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
                        <InputBoxNoIcon
                            ref={userNameRef}
                            bgColor="custom"
                            // icon={<UserIcon size="md" />}
                            placeholder="username"
                        // iconPosition="left"
                        />
                        <InputBoxNoIcon
                            ref={fullNameRef}
                            bgColor="custom"
                            icon={<UserIcon size="md" />}
                            placeholder="fullname"
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
                        {/* <Button
                        // className={``}
                        text="Login"
                        onClick={signin}
                    /> */}
                        <button onClick={signup} className="h-10 w-60 bg-blue-600 hover:bg-white rounded-md text-xl font-serif">Register</button>

                    </div>

                </div>

            </div>

            <div className="w-1/2 flex items-center bg-[#A7F3D0] p-4">
                <AuthSideBar message="Already a user " referance={() => nav("/login")} page="Login" />
            </div>
        </div>


    )
}