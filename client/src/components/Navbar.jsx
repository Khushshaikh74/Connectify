import React from 'react'
import { BellIcon, LogOutIcon, GlobeLock, CameraIcon } from "lucide-react";
import { Link,  useLocation } from 'react-router';
import useAuthUser from '../hooks/useAuthUser';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { logout } from '../lib/api.js';
import toast from 'react-hot-toast';
import ThemeSelector from './ThemeSelector.jsx';

const Navbar = () => {
    const { authUser } = useAuthUser()
    const location = useLocation()
    const isChatPage = location.pathname?.startsWith('/chat')

    const queryClient = useQueryClient()

    const { mutate: logoutMutation } = useMutation({
        mutationFn: logout,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["authUser"] })
            toast.success("Logout Successfully...")
        }
    })

    return (
        <>
            <nav className="bg-base-200 border-b border-base-300 sticky top-0 z-30 h-16 flex items-center">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-end w-full">
                        {/* Static Logo only in chat*/}
                        {
                            isChatPage && (
                                <div className="pl-5">
                                    <Link to="/" className="flex items-center gap-2.5">
                                        <GlobeLock className="size-9 text-primary" />
                                        <span className="text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wider">
                                            Connectify
                                        </span>
                                    </Link>
                                </div>
                            )
                        }

                        <div className="flex items-center gap-3 sm:gap-4 ml-auto">
                            <Link to="/notifications">
                                <button className="btn btn-ghost btn-circle">
                                    <BellIcon className="h-6 w-6 text-base-content opacity-70" />
                                </button>
                            </Link>
                        </div>

                        {/* Static ThemeSelector Placeholder */}
                        <ThemeSelector />

                        {/* Static Avatar */}
                        <div className="avatar">
                            <div className="w-9 rounded-full">
                                <img src={authUser?.profilePic || <CameraIcon />} alt="User Avatar" rel='noreferror' />
                            </div>
                        </div>

                        {/* Static Logout Button */}
                        <button onClick={logoutMutation} className="btn btn-ghost btn-circle">
                            <LogOutIcon className="h-6 w-6 text-base-content opacity-70" />
                        </button>
                    </div>
                </div>
            </nav>

        </>
    )
}

export default Navbar