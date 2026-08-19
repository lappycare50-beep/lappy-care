"use client";

import { useEffect, useState } from "react";

import EditHeader from "./EditHeader";
import LivePreview from "./LivePreview";
import PostEditor from "./PostEditor";
import SaveBar from "./SaveBar";

import {
  getGeneratedPost,
  updateGeneratedPost,
} from "@/services/generatedPostsService";

import { GeneratedPost } from "@/types/generatedPost";
import { PostStatus } from "@/types/marketing";

interface Props {
  postId: string;
}

export default function EditPostForm({
  postId,
}: Props) {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [dirty, setDirty] = useState(false);

  const [post, setPost] =
    useState<GeneratedPost | null>(null);

  const [title, setTitle] =
    useState("");

  const [primaryText, setPrimaryText] =
    useState("");

  const [caption, setCaption] =
    useState("");

  const [callToAction, setCallToAction] =
    useState("");

  const [hashtags, setHashtags] =
    useState("");

  const [imagePrompt, setImagePrompt] =
    useState("");

  const [status, setStatus] =
    useState<PostStatus>("Generated");

  useEffect(() => {
    async function loadPost() {
      try {
        const data =
          await getGeneratedPost(postId);

        if (!data) {
          setLoading(false);
          return;
        }

        setPost(data);

        setTitle(data.title);
        setPrimaryText(data.primaryText);
        setCaption(data.caption);
        setCallToAction(data.callToAction);
        setImagePrompt(data.imagePrompt);
        setHashtags(
          data.hashtags.join(" ")
        );
        setStatus(data.status);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadPost();
  }, [postId]);
    async function handleSave() {
    if (!post) return;

    try {
      setSaving(true);

      await updateGeneratedPost(post.id, {
        title,
        primaryText,
        caption,
        callToAction,
        imagePrompt,
        status,
        hashtags: hashtags
          .split(" ")
          .map((tag) => tag.trim())
          .filter(Boolean),
      });

      setPost({
        ...post,
        title,
        primaryText,
        caption,
        callToAction,
        imagePrompt,
        hashtags: hashtags
          .split(" ")
          .map((tag) => tag.trim())
          .filter(Boolean),
        status,
      });

      setDirty(false);

      alert("Post updated successfully.");
    } catch (error) {
      console.error(error);
      alert("Failed to update post.");
    } finally {
      setSaving(false);
    }
  }

  useEffect(() => {
    const beforeUnload = (
      e: BeforeUnloadEvent
    ) => {
      if (!dirty) return;

      e.preventDefault();
      e.returnValue = "";
    };

    window.addEventListener(
      "beforeunload",
      beforeUnload
    );

    return () => {
      window.removeEventListener(
        "beforeunload",
        beforeUnload
      );
    };
  }, [dirty]);

  if (loading) {
    return (
      <div className="p-8 text-white">
        Loading...
      </div>
    );
  }

  if (!post) {
    return (
      <div className="p-8 text-red-500">
        Post not found.
      </div>
    );
  }
  return (
  <div className="mx-auto max-w-7xl p-8 text-white">

    <EditHeader status={status} />

    <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">

      {/* Left Panel */}

      <div className="lg:col-span-2">

        <PostEditor
          title={title}
          setTitle={(value) => {
            setTitle(value);
            setDirty(true);
          }}

          primaryText={primaryText}
          setPrimaryText={(value) => {
            setPrimaryText(value);
            setDirty(true);
          }}

          caption={caption}
          setCaption={(value) => {
            setCaption(value);
            setDirty(true);
          }}

          callToAction={callToAction}
          setCallToAction={(value) => {
            setCallToAction(value);
            setDirty(true);
          }}

          hashtags={hashtags}
          setHashtags={(value) => {
            setHashtags(value);
            setDirty(true);
          }}

          imagePrompt={imagePrompt}
          setImagePrompt={(value) => {
            setImagePrompt(value);
            setDirty(true);
          }}

          status={status}
          setStatus={(value) => {
            setStatus(value);
            setDirty(true);
          }}

          platform={post.platform}
          category={post.category}
        />

      </div>

      {/* Right Panel */}

      <LivePreview
        title={title}
        primaryText={primaryText}
        caption={caption}
        callToAction={callToAction}
        hashtags={hashtags}
      />

    </div>

    <SaveBar
      saving={saving}
      onSave={handleSave}
    />

  </div>
);
}