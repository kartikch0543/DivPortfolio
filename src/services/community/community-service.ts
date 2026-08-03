import type {
  Comment,
  Review,
  GameCollection,
  ActivityFeedItem,
  NotificationItem,
  ReportTicket,
} from "@/types/community";
import { games } from "@/data/games";

const REVIEWS_STORAGE_KEY = "kd_arcade_reviews_v1";
const COMMENTS_STORAGE_KEY = "kd_arcade_comments_v1";
const WISHLIST_STORAGE_KEY = "kd_arcade_wishlist_v1";

// Helper to load reviews from browser localStorage if available
function loadStoredReviews(): Review[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(REVIEWS_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveStoredReviews(reviews: Review[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(REVIEWS_STORAGE_KEY, JSON.stringify(reviews));
  } catch (err) {
    console.error("Failed to persist reviews:", err);
  }
}

function loadStoredComments(): Comment[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(COMMENTS_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveStoredComments(comments: Comment[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(COMMENTS_STORAGE_KEY, JSON.stringify(comments));
  } catch (err) {
    console.error("Failed to persist comments:", err);
  }
}

// Memory fallback store for SSR
let inMemoryReviews: Review[] = [];
const inMemoryComments: Comment[] = [];
const notificationsStore: NotificationItem[] = [];
const reportTicketsStore: ReportTicket[] = [];

export class CommunityService {
  // Reviews & Visitor Rating System
  static async getReviews(gameSlug?: string): Promise<Review[]> {
    const stored = loadStoredReviews();
    const all = stored.length > 0 ? stored : inMemoryReviews;
    if (gameSlug) {
      return all.filter((r) => r.gameSlug === gameSlug);
    }
    return all;
  }

  static async addReview(reviewData: Omit<Review, "id" | "createdAt" | "helpfulCount">): Promise<Review> {
    const newReview: Review = {
      ...reviewData,
      id: `rev-${Date.now()}`,
      createdAt: new Date().toISOString().split("T")[0],
      helpfulCount: 0,
    };
    const current = loadStoredReviews();
    const updated = [newReview, ...current];
    saveStoredReviews(updated);
    inMemoryReviews = [newReview, ...inMemoryReviews];
    return newReview;
  }

  static async likeReview(reviewId: string): Promise<number> {
    const current = loadStoredReviews();
    const target = current.find((r) => r.id === reviewId) || inMemoryReviews.find((r) => r.id === reviewId);
    if (target) {
      target.helpfulCount = (target.helpfulCount || 0) + 1;
      saveStoredReviews(current);
      return target.helpfulCount;
    }
    return 0;
  }

  static async getAverageRating(gameSlug: string): Promise<{ average: number; count: number }> {
    const list = await this.getReviews(gameSlug);
    if (list.length === 0) return { average: 5.0, count: 0 };
    const sum = list.reduce((acc, r) => acc + r.rating, 0);
    return { average: parseFloat((sum / list.length).toFixed(1)), count: list.length };
  }

  static async getTopRatedGames(): Promise<{ gameSlug: string; title: string; averageRating: number; count: number }[]> {
    const results = [];
    for (const g of games) {
      const summary = await this.getAverageRating(g.slug);
      results.push({
        gameSlug: g.slug,
        title: g.title,
        averageRating: summary.average,
        count: summary.count,
      });
    }
    return results.sort((a, b) => b.averageRating - a.averageRating);
  }

  // Comments
  static async getComments(gameSlug: string): Promise<Comment[]> {
    const stored = loadStoredComments();
    const all = stored.length > 0 ? stored : inMemoryComments;
    return all.filter((c) => c.gameSlug === gameSlug && !c.parentId);
  }

  static async addComment(
    gameSlug: string,
    content: string,
    author: Comment["author"],
    parentId?: string | null
  ): Promise<Comment> {
    const newComment: Comment = {
      id: `cmt-${Date.now()}`,
      gameSlug,
      author,
      content,
      createdAt: new Date().toISOString().split("T")[0],
      likesCount: 0,
      parentId: parentId || null,
      replies: [],
    };

    const current = loadStoredComments();
    if (parentId) {
      const parent = current.find((c) => c.id === parentId);
      if (parent) {
        if (!parent.replies) parent.replies = [];
        parent.replies.push(newComment);
      }
    } else {
      current.unshift(newComment);
    }
    saveStoredComments(current);
    inMemoryComments.unshift(newComment);
    return newComment;
  }

  // Wishlist
  static async toggleWishlist(gameSlug: string): Promise<boolean> {
    if (typeof window === "undefined") return false;
    try {
      const raw = localStorage.getItem(WISHLIST_STORAGE_KEY);
      const list: string[] = raw ? JSON.parse(raw) : [];
      const index = list.indexOf(gameSlug);
      let isWishlisted = false;
      if (index >= 0) {
        list.splice(index, 1);
        isWishlisted = false;
      } else {
        list.push(gameSlug);
        isWishlisted = true;
      }
      localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(list));
      return isWishlisted;
    } catch {
      return false;
    }
  }

  static async isWishlisted(gameSlug: string): Promise<boolean> {
    if (typeof window === "undefined") return false;
    try {
      const raw = localStorage.getItem(WISHLIST_STORAGE_KEY);
      const list: string[] = raw ? JSON.parse(raw) : [];
      return list.includes(gameSlug);
    } catch {
      return false;
    }
  }

  // Collections
  static async getCollections(): Promise<GameCollection[]> {
    return [
      {
        id: "col-1",
        userId: "usr-admin-1",
        title: "Official Studio Releases",
        slug: "official-releases",
        description: "Official HTML5/WebGL and desktop games published by KD Arcade.",
        gameSlugs: games.map((g) => g.slug),
        isPublic: true,
        createdAt: "2025-01-01",
        coverImage: "/images/games/tiny-together-cover.svg",
      },
    ];
  }

  // Activity Feed
  static async getActivityFeed(): Promise<ActivityFeedItem[]> {
    const reviews = await this.getReviews();
    return reviews.slice(0, 10).map((r) => ({
      id: `act-${r.id}`,
      userId: r.author.id,
      userName: r.author.name,
      userAvatar: r.author.avatarUrl,
      type: "review",
      title: `Rated ${r.gameSlug}`,
      subtitle: `${r.rating} ⭐ - ${r.headline}`,
      gameSlug: r.gameSlug,
      timestamp: r.createdAt,
    }));
  }

  // Notifications
  static async getNotifications(): Promise<NotificationItem[]> {
    return [...notificationsStore];
  }

  static async markNotificationRead(id: string): Promise<void> {
    const n = notificationsStore.find((item) => item.id === id);
    if (n) n.read = true;
  }

  // Reporting
  static async submitReport(ticket: Omit<ReportTicket, "id" | "createdAt" | "status">): Promise<ReportTicket> {
    const newTicket: ReportTicket = {
      ...ticket,
      id: `rep-${Date.now()}`,
      status: "pending",
      createdAt: new Date().toISOString(),
    };
    reportTicketsStore.unshift(newTicket);
    return newTicket;
  }
}
