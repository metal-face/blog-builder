"use client";
import dynamic from "next/dynamic";

const ClientClock = dynamic(() => import("@/components/app-bar/clock"), { ssr: false });

export default ClientClock;
