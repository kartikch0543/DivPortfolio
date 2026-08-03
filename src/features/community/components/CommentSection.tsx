"use client";

import React, { useState, useEffect } from "react";
import { CommunityService } from "@/services/community/community-service";
import type { Comment } from "@/types/community";
import { ReportModal } from "./ReportModal";
import { MessageSquare, ThumbsUp, Reply, Flag, Send } from "lucide-react";

interface CommentSectionProps {
  gameSlug: string;
}

export function CommentSection({ gameSlug }: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newCommentText, setNewCommentText] = useState("");
  const [replyingToId, setReplyingToId] = useState<string | null>(null);
  const [replyText, setReplyText] = useState("");

  const [reportTarget, setReportTarget] = useState<{ id: string } | null>(null);

  useEffect(() => {
    let mounted = true;
    void (async () => {
      const list = await CommunityService.getComments(gameSlug);
      if (mounted) setComments(list);
    })();
    return () => {
      mounted = false;
    };
  }, [gameSlug]);

  const refreshComments = async () => {
    const list = await CommunityService.getComments(gameSlug);
    setComments(list);
  };

  const handleAddComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentText.trim()) return;
    await CommunityService.addComment(gameSlug, newCommentText, {
      id: "usr-current",
      name: "Player One",
      username: "player1",
      avatarUrl: "https://api.dicebear.com/7.x/bottts/svg?seed=PlayerOne",
      role: "Player",
    });
    setNewCommentText("");
    await refreshComments();
  };

  const handleAddReply = async (parentId: string) => {
    if (!replyText.trim()) return;
    await CommunityService.addComment(
      gameSlug,
      replyText,
      {
        id: "usr-current",
        name: "Player One",
        username: "player1",
        avatarUrl: "https://api.dicebear.com/7.x/bottts/svg?seed=PlayerOne",
        role: "Player",
      },
      parentId
    );
    setReplyText("");
    setReplyingToId(null);
    await refreshComments();
  };

  return (
    <div className="space-y-6 bg-slate-900/40 border border-slate-800 rounded-xl p-6">
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <h3 className="font-semibold text-lg text-white flex items-center gap-2 font-pixel">
          <MessageSquare className="w-5 h-5 text-emerald-400" /> Community Discussion
        </h3>
        <span className="text-xs font-mono text-slate-400">{comments.length} Comments</span>
      </div>

      {/* Main Comment Input */}
      <form onSubmit={handleAddComment} className="space-y-3">
        <textarea
          rows={3}
          value={newCommentText}
          onChange={(e) => setNewCommentText(e.target.value)}
          className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white focus:border-emerald-500 focus:outline-none"
          placeholder="Share your thoughts on gameplay, puzzles, or mechanics..."
        />
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={!newCommentText.trim()}
            className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-semibold px-4 py-2 rounded-lg text-xs transition disabled:opacity-50"
          >
            <Send className="w-3.5 h-3.5" /> Post Comment
          </button>
        </div>
      </form>

      {/* Comment List */}
      <div className="space-y-4 pt-2">
        {comments.map((comment) => (
          <div key={comment.id} className="p-4 bg-slate-900/70 border border-slate-800 rounded-lg space-y-3">
            {/* Comment Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-slate-800 overflow-hidden flex items-center justify-center text-[10px] font-mono text-emerald-400">
                  {comment.author.name.slice(0, 2)}
                </div>
                <span className="font-medium text-xs text-slate-200">{comment.author.name}</span>
                <span className="px-1.5 py-0.5 rounded text-[9px] font-mono uppercase bg-slate-800 text-slate-400">
                  {comment.author.role}
                </span>
              </div>
              <span className="text-[10px] font-mono text-slate-500">{comment.createdAt}</span>
            </div>

            {/* Content */}
            <p className="text-xs text-slate-300">{comment.content}</p>

            {/* Actions */}
            <div className="flex items-center gap-4 text-xs text-slate-400 pt-1">
              <button className="flex items-center gap-1 hover:text-emerald-400 transition">
                <ThumbsUp className="w-3.5 h-3.5" /> {comment.likesCount}
              </button>
              <button
                onClick={() => setReplyingToId(replyingToId === comment.id ? null : comment.id)}
                className="flex items-center gap-1 hover:text-emerald-400 transition"
              >
                <Reply className="w-3.5 h-3.5" /> Reply
              </button>
              <button
                onClick={() => setReportTarget({ id: comment.id })}
                className="flex items-center gap-1 hover:text-amber-400 transition ml-auto"
                title="Report Comment"
              >
                <Flag className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Reply Form */}
            {replyingToId === comment.id && (
              <div className="pl-4 pt-2 space-y-2 border-l-2 border-emerald-500/40">
                <input
                  type="text"
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="Write a reply..."
                  className="w-full px-3 py-1.5 bg-slate-950 border border-slate-800 rounded text-xs text-white focus:border-emerald-500 focus:outline-none"
                />
                <div className="flex gap-2 justify-end">
                  <button
                    onClick={() => setReplyingToId(null)}
                    className="px-3 py-1 text-[11px] font-mono rounded bg-slate-800 text-slate-300"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleAddReply(comment.id)}
                    className="px-3 py-1 text-[11px] font-mono rounded bg-emerald-600 text-slate-950 font-semibold"
                  >
                    Send Reply
                  </button>
                </div>
              </div>
            )}

            {/* Nested Replies Rendering */}
            {comment.replies && comment.replies.length > 0 && (
              <div className="pl-6 space-y-2 border-l border-slate-800 pt-2">
                {comment.replies.map((reply) => (
                  <div key={reply.id} className="p-3 bg-slate-950/60 border border-slate-800/80 rounded space-y-1">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="font-semibold text-emerald-400">{reply.author.name}</span>
                      <span className="text-[10px] font-mono text-slate-500">{reply.createdAt}</span>
                    </div>
                    <p className="text-xs text-slate-300">{reply.content}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      <ReportModal
        isOpen={!!reportTarget}
        onClose={() => setReportTarget(null)}
        targetType="comment"
        targetId={reportTarget?.id || ""}
      />
    </div>
  );
}
