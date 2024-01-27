import { EnterIcon } from "@radix-ui/react-icons";
import { ThemeToggle } from "@/components/app-bar/theme-toggle";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { IoIosConstruct } from "react-icons/io";
import { FaHome } from "react-icons/fa";
import React from "react";
import ConditionalButton from "@/components/app-bar/conditional-button";
import Link from "next/link";
import ProfileCard from "@/components/app-bar/profile-card";
import Clock from "@/components/app-bar/clock";

export async function MainNav() {
    const session = await getServerSession(authOptions);

    return (
        <div className="h-20 sticky top-0 z-40 inset-x-0 backdrop-blur transition-colors duration-500 lg:border-b lg:border-slate-900/10 dark:border-slate-50[0.06] bg-white/95 supports-backdrop-blur:bg-white/60 dark:bg-transparent w-full  border-b ">
            <div className="py-4 h-full flex justify-between items-center border-slate-900/10 lg:px-8 lg:border-0 dark:border-slate-300/10 px-4">
                <div className="h-full flex justify-start align-middle">
                    <Clock />
                </div>
                <div className="h-full flex items-center">
                    {session ? (
                        <Link href="/builder">
                            <ConditionalButton
                                classes="ml-1"
                                name="Blog "
                                path="/builder"
                            >
                                <IoIosConstruct className="ml-2" />
                            </ConditionalButton>
                        </Link>
                    ) : null}

                    <Link href="/">
                        <ConditionalButton classes="ml-1" name="Home" path="/">
                            <FaHome className="ml-2" />
                        </ConditionalButton>
                    </Link>

                    {!session ? (
                        <Link href="/login">
                            <ConditionalButton
                                classes="ml-1"
                                name="Login"
                                path="/login"
                            >
                                <EnterIcon className="ml-2" />
                            </ConditionalButton>
                        </Link>
                    ) : null}

                    <div className="flex align-middle mx-1">
                        <ThemeToggle />
                    </div>
                    {session ? <ProfileCard session={session} /> : null}
                </div>
            </div>
        </div>
    );
}
