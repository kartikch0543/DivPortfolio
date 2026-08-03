"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Container } from "@/components/layout/container";
import { games } from "@/data/games";
import { CommunityService } from "@/services/community/community-service";
import type { Review } from "@/types/community";
import {
  Star,
  Trophy,
  Flame,
  ThumbsUp,
  MessageSquare,
  Sparkles,
  Plus,
  X,
  Send,
} from "lucide-react";

export default function CommunityPage() {
  const [selectedGameSlug, setSelectedGameSlug] = useState(games[0]?.slug || "tiny-together");
  const [reviews, setReviews] = useState<Review[]>([]);
  const [ratingSummary, setRatingSummary] = useState({ average: 5.0, count: 0 });
  const [topGames, setTopGames] = useState<{ gameSlug: string; title: string; averageRating: number; count: number }[]>([]);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

  // New Review Form State
  const [visitorName, setVisitorName] = useState("");
  const [userRating, setUserRating] = useState(5);
  const [headline, setHeadline] = useState("");
  const [body, setBody] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    let mounted = true;
    void (async () => {
      const list = await CommunityService.getReviews(selectedGameSlug);
      const summary = await CommunityService.getAverageRating(selectedGameSlug);
      const top = await CommunityService.getTopRatedGames();
      if (mounted) {
        setReviews(list);
        setRatingSummary(summary);
        setTopGames(top);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [selectedGameSlug]);

  const refreshData = async () => {
    const list = await CommunityService.getReviews(selectedGameSlug);
    const summary = await CommunityService.getAverageRating(selectedGameSlug);
    const top = await CommunityService.getTopRatedGames();
    setReviews(list);
    setRatingSummary(summary);
    setTopGames(top);
  };

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!headline || !body) return;
    setSubmitting(true);
    try {
      const authorName = visitorName.trim() || "Arcade Player";
      await CommunityService.addReview({
        gameSlug: selectedGameSlug,
        author: {
          id: `usr-${Date.now()}`,
          name: authorName,
          username: authorName.toLowerCase().replace(/\s+/g, ""),
          avatarUrl: `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(authorName)}`,
          role: "Player",
        },
        rating: userRating,
        headline,
        body,
      });
      setHeadline("");
      setBody("");
      setIsReviewModalOpen(false);
      await refreshData();
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleLikeReview = async (reviewId: string) => {
    await CommunityService.likeReview(reviewId);
    await refreshData();
  };

  const activeGame = games.find((g) => g.slug === selectedGameSlug) || games[0];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-10">
      <Container className="max-w-6xl space-y-8 px-4">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div>
            <h1 className="text-2xl font-bold font-pixel text-white flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-purple-400" /> KD Arcade Game Hub & Reviews
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Rate studio games, leave visitor feedback, see top-rated titles, and share reviews
            </p>
          </div>

          <button
            onClick={() => setIsReviewModalOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-semibold text-xs shadow-lg transition"
          >
            <Plus className="w-4 h-4" /> Rate & Review Game
          </button>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Review Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* Game Selector Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-800">
              {games.map((g) => (
                <button
                  key={g.slug}
                  onClick={() => setSelectedGameSlug(g.slug)}
                  className={`px-4 py-2 rounded-lg text-xs font-mono font-medium transition whitespace-nowrap ${
                    selectedGameSlug === g.slug
                      ? "bg-purple-950 text-purple-300 border border-purple-700"
                      : "bg-slate-900 text-slate-400 border border-slate-800 hover:text-white"
                  }`}
                >
                  🎮 {g.title}
                </button>
              ))}
            </div>

            {/* Selected Game Rating Summary Banner */}
            <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 backdrop-blur">
              <div className="flex items-center gap-4">
                <div className="text-center bg-slate-950 p-4 border border-slate-800 rounded-xl min-w-[90px]">
                  <div className="text-3xl font-bold font-mono text-amber-400">{ratingSummary.average}</div>
                  <div className="flex items-center justify-center gap-0.5 mt-1 text-amber-400">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} className="w-3 h-3 fill-amber-400" />
                    ))}
                  </div>
                  <div className="text-[10px] font-mono text-slate-400 mt-1">{ratingSummary.count} Reviews</div>
                </div>
                <div>
                  <h2 className="text-lg font-bold font-pixel text-white">{activeGame.title}</h2>
                  <p className="text-xs text-slate-400 mt-1">{activeGame.description}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                      {activeGame.engine} Engine
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-800">
                      {activeGame.genre.join(" · ")}
                    </span>
                  </div>
                </div>
              </div>

              <Link
                href={`/games/${activeGame.slug}`}
                className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold text-xs transition flex-shrink-0"
              >
                Play Now →
              </Link>
            </div>

            {/* Reviews List */}
            <div className="space-y-4">
              <h3 className="text-sm font-mono uppercase text-purple-400 tracking-wider flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-purple-400" /> Visitor Reviews ({reviews.length})
              </h3>

              {reviews.length === 0 ? (
                <div className="p-8 text-center bg-slate-900/30 border border-slate-800 rounded-xl space-y-3">
                  <Star className="w-8 h-8 text-amber-400/50 mx-auto" />
                  <p className="text-xs font-mono text-slate-400">No visitor reviews yet for {activeGame.title}. Be the first to rate!</p>
                  <button
                    onClick={() => setIsReviewModalOpen(true)}
                    className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-lg text-xs font-medium"
                  >
                    ⭐ Submit First Review
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
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
                        <span className="text-[10px] font-mono text-slate-400">{rev.createdAt}</span>
                      </div>

                      <p className="text-xs text-slate-300 leading-relaxed">{rev.body}</p>

                      <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 pt-2 border-t border-slate-800/80">
                        <span className="text-slate-400 font-medium">By @{rev.author.name}</span>
                        <button
                          onClick={() => handleLikeReview(rev.id)}
                          className="flex items-center gap-1 hover:text-emerald-400 transition"
                        >
                          <ThumbsUp className="w-3.5 h-3.5" /> Helpful ({rev.helpfulCount})
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Top-Rated Games */}
            <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-6 space-y-4">
              <h2 className="font-semibold text-sm text-white font-pixel flex items-center gap-2">
                <Trophy className="w-4 h-4 text-amber-400" /> Top-Rated Games
              </h2>
              <div className="space-y-3">
                {topGames.map((tg, idx) => (
                  <div key={tg.gameSlug} className="flex items-center justify-between p-3 bg-slate-900/70 border border-slate-800 rounded-lg text-xs">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs text-amber-400 font-bold">#{idx + 1}</span>
                      <span className="font-semibold text-slate-200">{tg.title}</span>
                    </div>
                    <div className="flex items-center gap-1 text-amber-400 font-mono text-xs font-bold">
                      <Star className="w-3 h-3 fill-amber-400" /> {tg.averageRating}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recently Published Releases */}
            <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-6 space-y-4">
              <h2 className="font-semibold text-sm text-white font-pixel flex items-center gap-2">
                <Flame className="w-4 h-4 text-rose-400" /> Recently Published Games
              </h2>
              <div className="space-y-3">
                {games.map((g) => (
                  <div key={g.slug} className="p-3 bg-slate-900/70 border border-slate-800 rounded-lg space-y-1 text-xs">
                    <div className="flex justify-between font-semibold text-slate-100">
                      <span>{g.title}</span>
                      <span className="text-[10px] font-mono text-emerald-400">{g.status}</span>
                    </div>
                    <p className="text-[11px] text-slate-400">{g.tagline}</p>
                    <Link
                      href={`/games/${g.slug}`}
                      className="inline-block text-[10px] font-mono text-purple-400 hover:underline pt-1"
                    >
                      Play Game →
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>

      {/* Write Review Dialog Modal */}
      {isReviewModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-xl max-w-md w-full p-6 space-y-4 relative text-slate-100 shadow-2xl">
            <button
              onClick={() => setIsReviewModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded hover:bg-slate-800"
            >
              <X className="w-4 h-4" />
            </button>

            <h3 className="font-semibold font-pixel text-base text-white flex items-center gap-2">
              <Star className="w-4 h-4 text-amber-400 fill-amber-400" /> Rate & Review {activeGame.title}
            </h3>

            <form onSubmit={handleReviewSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Your Name / Handle</label>
                <input
                  type="text"
                  value={visitorName}
                  onChange={(e) => setVisitorName(e.target.value)}
                  placeholder="e.g. IndieGamer"
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white focus:border-purple-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Rating (1 to 5 Stars)</label>
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
                  placeholder="Summarize your gameplay experience..."
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white focus:border-purple-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Feedback / Review Details</label>
                <textarea
                  rows={4}
                  required
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  placeholder="What did you think of physics, puzzle mechanics, audio, or game feel?"
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white focus:border-purple-500 focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsReviewModalOpen(false)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-xs font-medium text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white rounded-lg text-xs font-semibold transition flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" /> {submitting ? "Publishing..." : "Submit Review"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
