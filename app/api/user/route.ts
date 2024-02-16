import { supabase } from "@/lib/supabase";
import { ok } from "assert";
import { NextRequest, NextResponse } from "next/server";

export async function validateUser(req: NextRequest) {
    const token = req.headers.get("authorization")?.split(" ")[1];
    if (!token) {
        return null;
    }

    const { data, error } = await supabase.auth.getUser(token);

    if (error) {
        console.error("Error validating user token", error);
        return null;
    }

    return data;
}

export async function POST(req: NextRequest, res: NextResponse) {
    try {
        const user = await validateUser(req);
        res.status(200).json(user);
    } catch (error) {
        console.error(error);
        res.status(401).json({ error: "Unauthorized" });
    }
}
