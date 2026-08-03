import type {
  Comment,
  Review,
  GameCollection,
  ActivityFeedItem,
  NotificationItem,
  ReportTicket,
} from "@/types/community";

const commentsStore: Comment[] = [
  {
    id: "cmt-1",
    gameSlug: "tiny-together",
    author: {
      id: "usr-2",
      name: "Alex Dev",
      username: "alexdev",
      avatarUrl: "https://api.dicebear.com/7.x/bottts/svg?seed=Alex",
      role: "Player",
    },
    content: "The level 2 puzzle mechanic was so clever! Loved playing this co-op with my brother.",
    createdAt: "2025-01-20",
    likesCount: 14,
    parentId: null,
    replies: [
      {
        id: "cmt-1-1",
        gameSlug: "tiny-together",
        author: {
          id: "usr-admin-1",
          name: "Kartik Choudhary",
          username: "kdivyanshu",
          avatarUrl: "https://api.dicebear.com/7.x/bottts/svg?seed=Kartik",
          role: "Admin",
        },
        content: "Thanks Alex! Glad you enjoyed the shared momentum physics in level 2!",
        createdAt: "2025-01-21",
        likesCount: 8,
        parentId: "cmt-1",
      },
    ],
  },
  {
    id: "cmt-2",
    gameSlug: "ulta-he-krega",
    author: {
      id: "usr-3",
      name: "Rohan Pixel",
      username: "rohanp",
      avatarUrl: "https://api.dicebear.com/7.x/bottts/svg?seed=Rohan",
      role: "Player",
    },
    content: "Subverting controls made me laugh so hard on run 3! Instant arcade classic.",
    createdAt: "2025-04-14",
    likesCount: 9,
    parentId: null,
    replies: [],
  },
];

const reviewsStore: Review[] = [
  {
    id: "rev-1",
    gameSlug: "tiny-together",
    author: {
      id: "usr-2",
      name: "Alex Dev",
      username: "alexdev",
      avatarUrl: "https://api.dicebear.com/7.x/bottts/svg?seed=Alex",
      role: "Player",
    },
    rating: 5,
    headline: "Pure cooperative magic!",
    body: "Tiny Together delivers compact, delightful sessions. The movement feels tight and the art style is super cozy.",
    createdAt: "2025-01-22",
    helpfulCount: 23,
  },
  {
    id: "rev-2",
    gameSlug: "ulta-he-krega",
    author: {
      id: "usr-3",
      name: "Rohan Pixel",
      username: "rohanp",
      avatarUrl: "https://api.dicebear.com/7.x/bottts/svg?seed=Rohan",
      role: "Player",
    },
    rating: 5,
    headline: "Unpredictable arcade comedy!",
    body: "Every level subverts player expectations in the best way possible. Highly recommended for quick breaks.",
    createdAt: "2025-04-16",
    helpfulCount: 17,
  },
];

const collectionsStore: GameCollection[] = [
  {
    id: "col-1",
    userId: "usr-admin-1",
    title: "Best Indie Co-op Gems",
    slug: "indie-coop-gems",
    description: "Hand-picked cooperative adventures designed for shared discovery.",
    gameSlugs: ["tiny-together"],
    isPublic: true,
    createdAt: "2025-01-25",
    coverImage: "/images/games/tiny-together-cover.svg",
  },
  {
    id: "col-2",
    userId: "usr-admin-1",
    title: "Quick Arcade Blast",
    slug: "quick-arcade-blast",
    description: "Fast-paced arcade games you can jump into instantly.",
    gameSlugs: ["ulta-he-krega"],
    isPublic: true,
    createdAt: "2025-04-20",
    coverImage: "/images/games/ulta-he-krega-cover.svg",
  },
];

const activityStore: ActivityFeedItem[] = [
  {
    id: "act-1",
    userId: "usr-admin-1",
    userName: "Kartik Choudhary",
    userAvatar: "https://api.dicebear.com/7.x/bottts/svg?seed=Kartik",
    type: "review",
    title: "Reviewed Tiny Together",
    subtitle: "Rated 5 stars - Pure cooperative magic!",
    gameSlug: "tiny-together",
    timestamp: "2 hours ago",
  },
  {
    id: "act-2",
    userId: "usr-2",
    userName: "Alex Dev",
    userAvatar: "https://api.dicebear.com/7.x/bottts/svg?seed=Alex",
    type: "favorite",
    title: "Favorited Ulta He Krega",
    subtitle: "Added to favorites collection",
    gameSlug: "ulta-he-krega",
    timestamp: "5 hours ago",
  },
];

const notificationsStore: NotificationItem[] = [
  {
    id: "notif-1",
    userId: "usr-admin-1",
    title: "New Comment Reply",
    message: "Alex Dev replied to your comment on Tiny Together",
    read: false,
    createdAt: "2025-01-21",
    targetUrl: "/games/tiny-together#comments",
  },
  {
    id: "notif-2",
    userId: "usr-admin-1",
    title: "Game Milestone Reached",
    message: "Tiny Together reached 1,000+ plays on KD Arcade!",
    read: true,
    createdAt: "2025-02-01",
    targetUrl: "/cms",
  },
];

const reportTicketsStore: ReportTicket[] = [];
const wishlistStore = new Set<string>(["tiny-together"]);

export class CommunityService {
  // Comments & Replies
  static async getComments(gameSlug: string): Promise<Comment[]> {
    return commentsStore.filter((c) => c.gameSlug === gameSlug && !c.parentId);
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

    if (parentId) {
      const parent = commentsStore.find((c) => c.id === parentId);
      if (parent) {
        if (!parent.replies) parent.replies = [];
        parent.replies.push(newComment);
      }
    } else {
      commentsStore.unshift(newComment);
    }
    return newComment;
  }

  // Ratings & Reviews
  static async getReviews(gameSlug: string): Promise<Review[]> {
    return reviewsStore.filter((r) => r.gameSlug === gameSlug);
  }

  static async addReview(review: Omit<Review, "id" | "createdAt" | "helpfulCount">): Promise<Review> {
    const newReview: Review = {
      ...review,
      id: `rev-${Date.now()}`,
      createdAt: new Date().toISOString().split("T")[0],
      helpfulCount: 0,
    };
    reviewsStore.unshift(newReview);
    return newReview;
  }

  static async getAverageRating(gameSlug: string): Promise<{ average: number; count: number }> {
    const list = reviewsStore.filter((r) => r.gameSlug === gameSlug);
    if (list.length === 0) return { average: 5.0, count: 1 };
    const sum = list.reduce((acc, r) => acc + r.rating, 0);
    return { average: parseFloat((sum / list.length).toFixed(1)), count: list.length };
  }

  // Wishlist
  static async toggleWishlist(gameSlug: string): Promise<boolean> {
    if (wishlistStore.has(gameSlug)) {
      wishlistStore.delete(gameSlug);
      return false;
    } else {
      wishlistStore.add(gameSlug);
      return true;
    }
  }

  static async isWishlisted(gameSlug: string): Promise<boolean> {
    return wishlistStore.has(gameSlug);
  }

  // Collections
  static async getCollections(): Promise<GameCollection[]> {
    return [...collectionsStore];
  }

  // Activity Feed
  static async getActivityFeed(): Promise<ActivityFeedItem[]> {
    return [...activityStore];
  }

  // Notifications
  static async getNotifications(): Promise<NotificationItem[]> {
    return [...notificationsStore];
  }

  static async markNotificationRead(id: string): Promise<void> {
    const n = notificationsStore.find((item) => item.id === id);
    if (n) n.read = true;
  }

  // Reporting & Moderation Architecture
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

  static async getReports(): Promise<ReportTicket[]> {
    return [...reportTicketsStore];
  }
}
