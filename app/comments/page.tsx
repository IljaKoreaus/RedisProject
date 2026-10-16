import Link from "next/link";
import { redis } from "../lib/redis";

export const Page = async () => {

    const commentIds = await redis.lrange("comments", 0, 3);
    const comments = await Promise.all(
        commentIds.map(async (commentId) => {
            const details: any = await redis.hgetall(`comment_details:${commentId}`);
            const tags = await redis.smembers(`tags:${commentId}`);

            return {
                commentId,
                details,
                tags
            }
        })
    );

    return (
        <div className="flex flex-col gap-8">
            <Link href="/">Homepage</Link>
            {comments.map((comment) => (
                <div className="flex flex-col gap-2">
                    <h1>{comment.details?.author ?? "Anonymous"}</h1>
                    <p>{comment.details?.text ?? "Comment not found"}</p>
                </div>
            ))}
        </div>
    );
}

export default Page;