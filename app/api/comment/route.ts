import { NextRequest } from "next/server";
import { nanoid } from "nanoid";

export const POST = async (req: NextRequest) => {
    try {

        const body = await req.json();
        const {text, tags} = body;

        const commentId = nanoid();

        // Add Comment To List

        return new Response("OK");
    } catch (error) {
        console.log(error);
    }
}