"use client";

import React, { useState, useEffect } from "react";
import { CommunityService } from "@/services/community/community-service";
import { Heart, Bookmark, Check } from "lucide-react";

interface WishlistFavoriteActionsProps {
  gameSlug: string;
}

export function WishlistFavoriteActions({ gameSlug }: WishlistFavoriteActionsProps) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);

  useEffect(() => {
    let mounted = true;
    void (async () => {
      const active = await CommunityService.isWishlisted(gameSlug);
      if (mounted) setIsWishlisted(active);
    })();
    return () => {
      mounted = false;
    };
  }, [gameSlug]);

  const handleWishlistToggle = async () => {
    const active = await CommunityService.toggleWishlist(gameSlug);
    setIsWishlisted(active);
  };

  const handleFavoriteToggle = () => {
    setIsFavorited(!isFavorited);
  };

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={handleWishlistToggle}
        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition border ${
          isWishlisted
            ? "bg-purple-950/80 text-purple-300 border-purple-700"
            : "bg-slate-900 hover:bg-slate-800 text-slate-300 border-slate-800"
        }`}
      >
        {isWishlisted ? <Check className="w-3.5 h-3.5" /> : <Bookmark className="w-3.5 h-3.5" />}
        {isWishlisted ? "Wishlisted" : "+ Wishlist"}
      </button>

      <button
        onClick={handleFavoriteToggle}
        className={`p-2 rounded-lg text-xs transition border ${
          isFavorited
            ? "bg-rose-950/80 text-rose-400 border-rose-700"
            : "bg-slate-900 hover:bg-slate-800 text-slate-400 border-slate-800"
        }`}
        title={isFavorited ? "Remove from Favorites" : "Add to Favorites"}
      >
        <Heart className={`w-4 h-4 ${isFavorited ? "fill-rose-400 text-rose-400" : ""}`} />
      </button>
    </div>
  );
}
