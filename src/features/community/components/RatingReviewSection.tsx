"use client";

import React, { useState, useEffect } from "react";
import { CommunityService } from "@/services/community/community-service";
import type { Review } from "@/types/community";
import { Star, ThumbsUp, Plus, X } from "lucide-react";

interface RatingReviewSectionProps {
  gameSlug: string;
}

export function RatingReviewSection({ gameSlug }: RatingReviewSectionProps) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [ratingSummary, setRatingSummary] = useState({ average: 5.0, count: 1 });
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Review Form State
  const [userRating, setUserRating] = useState(5);
  const [headline, setHeadline] = useState("");
  const [body, setBody] = useState("");

  useEffect(() => {
    let mounted = true;
    void (async () => {
      const list = await CommunityService.getReviews(gameSlug);
      const summary = await CommunityService.getAverageRating(gameSlug);
      if (mounted) {
        setReviews(list);
        setRatingSummary(summary);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [gameSlug]);

  const refreshReviews = async () => {
    const list = await CommunityService.getReviews(gameSlug);
    const summary = await CommunityService.getAverageRating(gameSlug);
    setReviews(list);
    setRatingSummary(summary);
  };

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!headline || !body) return;
    await CommunityService.addReview({
      gameSlug,
      author: {
        id: "usr-current",
        name: "Player One",
        username: "player1",
        avatarUrl: "https://api.dicebear.com/7.x/bottts/svg?seed=PlayerOne",
        role: "Player",
      },
      rating: userRating,
      headline,
      body,
    });
    setHeadline("");
    setBody("");
    setIsDialogOpen(false);
    await refreshReviews();
  };

  return (
    <div className="space-y-6 bg-slate-900/40 border border-slate-800 rounded-xl p-6">
      {/* Header & Rating Summary */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-4">
          <div className="text-center bg-slate-950 p-3.5 border border-slate-800 rounded-xl">
            <div className="text-3xl font-bold font-mono text-amber-400">{ratingSummary.average}</div>
            <div className="flex items-center justify-center gap-0.5 mt-1 text-amber-400">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} className="w-3 h-3 fill-amber-400" />
              ))}
            </div>
            <div className="text-[10px] font-mono text-slate-500 mt-1">{ratingSummary.count} Reviews</div>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-white font-pixel">Player Ratings & Reviews</h3>
            <p className="text-xs text-slate-400 mt-1">Read honest feedback from KD Arcade players</p>
          </div>
        </div>

        <button
          onClick={() => setIsDialogOpen(true)}
          className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold px-4 py-2 rounded-lg text-xs transition"
        >
          <Plus className="w-4 h-4" /> Write a Review
        </button>
      </div>

      {/* Review Dialog Modal */}
      {isDialogOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-xl max-w-md w-full p-6 space-y-4 relative text-slate-100 shadow-2xl">
            <button
              onClick={() => setIsDialogOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded hover:bg-slate-800"
            >
              <X className="w-4 h-4" />
            </button>

            <h3 className="font-semibold font-pixel text-base text-white">Write Your Review</h3>

            <form onSubmit={handleReviewSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Your Rating</label>
                <div className="flex gap-2 text-amber-400">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setUserRating(star)}
                      className="p-1 hover:scale-110 transition"
                    >
                      <Star className={`w-6 h-6 ${star <= userRating ? "fill-amber-400 text-amber-400" : "text-slate-700"}`} />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Headline</label>
                <input
                  type="text"
                  required
                  value={headline}
                  onChange={(e) => setHeadline(e.target.value)}
                  placeholder="Summarize your experience..."
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white focus:border-amber-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Review Body</label>
                <textarea
                  rows={4}
                  required
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  placeholder="What did you think of the controls, mechanics, artwork, and session length?"
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white focus:border-amber-500 focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsDialogOpen(false)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-xs font-medium text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-amber-500 hover:bg-amber-400 rounded-lg text-xs font-semibold text-slate-950 transition"
                >
                  Publish Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Review List */}
      <div className="space-y-4">
        {reviews.map((rev) => (
          <div key={rev.id} className="p-4 bg-slate-900/70 border border-slate-800 rounded-lg space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-xs text-white">{rev.headline}</span>
                <div className="flex text-amber-400">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-amber-400" />
                  ))}
                </div>
              </div>
              <span className="text-[10px] font-mono text-slate-500">{rev.createdAt}</span>
            </div>

            <p className="text-xs text-slate-300">{rev.body}</p>

            <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 pt-2 border-t border-slate-800/60">
              <span>By @{rev.author.username}</span>
              <button className="flex items-center gap-1 hover:text-emerald-400 transition">
                <ThumbsUp className="w-3 h-3" /> Helpful ({rev.helpfulCount})
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
