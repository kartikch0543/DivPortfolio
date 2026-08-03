export interface CommunityAuthor {
  id: string;
  name: string;
  username: string;
  avatarUrl: string;
  role: "Guest" | "Player" | "Developer" | "Admin";
}

export interface Comment {
  id: string;
  gameSlug: string;
  author: CommunityAuthor;
  content: string;
  createdAt: string;
  likesCount: number;
  parentId?: string | null;
  replies?: Comment[];
}

export interface Review {
  id: string;
  gameSlug: string;
  author: CommunityAuthor;
  rating: number; // 1 to 5
  headline: string;
  body: string;
  createdAt: string;
  helpfulCount: number;
}

export interface GameCollection {
  id: string;
  userId: string;
  title: string;
  slug: string;
  description: string;
  gameSlugs: string[];
  isPublic: boolean;
  createdAt: string;
  coverImage?: string;
}

export interface ActivityFeedItem {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  type: "review" | "favorite" | "collection" | "comment" | "game_played";
  title: string;
  subtitle: string;
  gameSlug?: string;
  timestamp: string;
}

export interface NotificationItem {
  id: string;
  userId: string;
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
  targetUrl?: string;
}

export interface ReportTicket {
  id: string;
  reporterId: string;
  targetType: "comment" | "review" | "user";
  targetId: string;
  reason: string;
  details?: string;
  status: "pending" | "reviewed" | "dismissed";
  createdAt: string;
}
