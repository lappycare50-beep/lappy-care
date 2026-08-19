"use client";

import { useEffect, useMemo, useState } from "react";

import { useRouter } from "next/navigation";

import { Campaign } from "@/types/campaign";
import { GeneratedPost } from "@/types/generatedPost";

import { updateCampaign } from "@/services/campaignService";
import { getGeneratedPosts } from "@/services/generatedPostsService";

import AttachPostsModal from "./AttachPostsModal";
import CampaignInfoCard from "./CampaignInfoCard";
import CampaignAnalyticsCard from "./CampaignAnalyticsCard";
import CampaignPostsCard from "./CampaignPostsCard";
import CampaignQuickActions from "./CampaignQuickActions";

interface Props {
  campaign: Campaign;
}

export default function CampaignDetails({
  campaign,
}: Props) {
  const router = useRouter();

  const [openModal, setOpenModal] =
    useState(false);

  const [saving, setSaving] =
    useState(false);

  const [
    selectedPostIds,
    setSelectedPostIds,
  ] = useState<string[]>(
    campaign.generatedPostIds ?? []
  );

  const [allPosts, setAllPosts] =
    useState<GeneratedPost[]>([]);

  useEffect(() => {
    loadPosts();
  }, []);

  async function loadPosts() {
    try {
      const data =
        await getGeneratedPosts();

      setAllPosts(data);
    } catch (error) {
      console.error(error);
    }
  }

  const attachedPosts =
    useMemo(() => {
      return allPosts.filter((post) =>
        selectedPostIds.includes(post.id)
      );
    }, [
      allPosts,
      selectedPostIds,
    ]);

  async function handleAttachPosts(
    ids: string[]
  ) {
    try {
      setSaving(true);

      await updateCampaign(
        campaign.id,
        {
          generatedPostIds: ids,
        }
      );

      setSelectedPostIds(ids);

      router.refresh();
    } catch (error) {
      console.error(error);

      alert(
        "Failed to attach posts."
      );
    } finally {
      setSaving(false);

      setOpenModal(false);
    }
  }

  async function handleRemovePost(
    postId: string
  ) {
    const updated =
      selectedPostIds.filter(
        (id) => id !== postId
      );

    try {
      setSaving(true);

      await updateCampaign(
        campaign.id,
        {
          generatedPostIds: updated,
        }
      );

      setSelectedPostIds(updated);

      router.refresh();
    } catch (error) {
      console.error(error);

      alert(
        "Failed to remove post."
      );
    } finally {
      setSaving(false);
    }
  }

  function openManagePosts() {
    setOpenModal(true);
  }

  return (
    <>
      <AttachPostsModal
        open={openModal}
        selectedPostIds={
          selectedPostIds
        }
        onClose={() =>
          setOpenModal(false)
        }
        onSave={handleAttachPosts}
      />
            <div className="grid gap-8 lg:grid-cols-3">

        {/* Left */}

        <div className="space-y-8 lg:col-span-2">

          <CampaignInfoCard
            campaign={campaign}
          />

          <CampaignAnalyticsCard
            campaign={campaign}
          />

        </div>

        {/* Right */}

        <div className="space-y-8">

          <CampaignPostsCard
            posts={attachedPosts}
            onManagePosts={openManagePosts}
            onRemovePost={handleRemovePost}
          />

          <CampaignQuickActions
            campaignId={campaign.id}
            onManagePosts={openManagePosts}
          />

          {saving && (

            <div className="rounded-2xl border border-yellow-500/30 bg-yellow-500/10 p-4">

              <p className="text-center text-sm font-medium text-yellow-400">
                Saving changes...
              </p>

            </div>

          )}

        </div>

      </div>

    </>
  );
}