import EditPostForm from "@/components/marketing/EditPostForm";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditPostPage({
  params,
}: PageProps) {
  const { id } = await params;

  return <EditPostForm postId={id} />;
}