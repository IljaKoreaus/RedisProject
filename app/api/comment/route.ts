import { NextRequest } from "next/server";
import { nanoid } from "nanoid";
import { redis } from "@/app/lib/redis";

export const POST = async (req: NextRequest) => {
    try {

        const body = await req.json();
        const {text, tags} = body;

        const commentId = nanoid();

        // Add Comment To List
        await redis.rpush("comments", commentId);

        return Response.json(
            { success: true, commentId},
            { status: 201}
        );
    } catch (error) {
        console.log(error);

        return Response.json(
            { success: false, error: "Failed to Create Comment"},
            { status: 500 }
        );
    }
}