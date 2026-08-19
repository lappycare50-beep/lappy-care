import { notFound } from "next/navigation";

import MarketingSidebar from "@/components/marketing/MarketingSidebar";

import PostHeader from "@/components/marketing/posts/PostHeader";
import PostContentCard from "@/components/marketing/posts/PostContentCard";
import PostMetaCard from "@/components/marketing/posts/PostMetaCard";
import HashtagsCard from "@/components/marketing/posts/HashtagsCard";
import ActionButtons from "@/components/marketing/posts/ActionButtons";

import { getGeneratedPost } from "@/services/generatedPostsService";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function GeneratedPostPage({
  params,
}: Props) {
  const { id } = await params;

  const post = await getGeneratedPost(id);

  if (!post) {
    notFound();
  }

  return (
    <div className="flex min-h-screen bg-zinc-950">
      <MarketingSidebar />

      <main className="flex-1 space-y-8 p-8">
        <PostHeader post={post} />

        <PostContentCard post={post} />

        <HashtagsCard hashtags={post.hashtags} />

        <PostMetaCard post={post} />

        <ActionButtons post={post} />
      </main>
    </div>
  );
}