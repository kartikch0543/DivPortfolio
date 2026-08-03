# Community Platform Guide

## Overview

KD Arcade features an integrated community platform for player engagement, reviews, threaded discussions, wishlists, favorites, curated collections, public profile feeds, and moderation reporting.

## Features

1. **Threaded Comments & Nested Replies**: Supports game page discussions with multi-level nested replies, likes, and moderation flagging (`CommentSection.tsx`).
2. **Ratings & Reviews**: 5-star rating system with average rating breakdown and review submission (`RatingReviewSection.tsx`).
3. **Wishlist & Favorites**: Interactive game bookmarking and favorite lists (`WishlistFavoriteActions.tsx`).
4. **Curated Collections**: Player-created game lists (`/community`).
5. **Public Player Profiles**: `/u/[username]` displaying collections, activity feeds, badges, and follow actions.
6. **Notification System & Moderation**: User notification drawer (`NotificationCenter.tsx`) and report submission system (`ReportModal.tsx`).
7. **Future Forums & Messaging**: Architected extensibility for real-time channels and direct messages.
