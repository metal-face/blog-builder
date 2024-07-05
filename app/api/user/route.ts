import { supabase } from "@/lib/supabase";
import { NextRequest } from "next/server";
import { UserResponse } from "@supabase/gotrue-js";

export async function POST(req: NextRequest): Promise<Response> {
    const token: string | undefined = req.headers.get("authorization")?.split(" ")[1];

    if (!token) {
        return Response.json({}, { status: 400, statusText: "Bad Request" });
    }

    try {
        const { data, error }: UserResponse = await supabase.auth.getUser(token);

        if (error) {
            console.error("Error validating user token", error);
            return Response.json({ data: error }, { status: 401, statusText: "Unauthorized" });
        }

        return Response.json({ data: data }, { status: 200, statusText: "Success" });
    } catch (err: any) {
        return Response.json({}, { status: 500, statusText: "Internal Server Error" });
    }
}
