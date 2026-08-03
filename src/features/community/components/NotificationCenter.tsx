"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { CommunityService } from "@/services/community/community-service";
import type { NotificationItem } from "@/types/community";
import { Bell, Check, Sparkles } from "lucide-react";

export function NotificationCenter() {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    let mounted = true;
    void (async () => {
      const list = await CommunityService.getNotifications();
      if (mounted) setNotifications(list);
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleMarkRead = async (id: string) => {
    await CommunityService.markNotificationRead(id);
    const list = await CommunityService.getNotifications();
    setNotifications(list);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white transition relative"
        aria-label="Notifications"
      >
        <Bell className="w-4 h-4" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 text-slate-950 font-mono text-[9px] font-bold flex items-center justify-center animate-pulse">
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl p-4 z-50 space-y-3">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <span className="font-semibold text-xs font-pixel text-white flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" /> Notifications
            </span>
            <span className="text-[10px] font-mono text-slate-400">{unreadCount} unread</span>
          </div>

          <div className="space-y-2 max-h-64 overflow-y-auto">
            {notifications.map((item) => (
              <div
                key={item.id}
                className={`p-3 rounded-lg border text-xs space-y-1 transition ${
                  item.read ? "bg-slate-950/60 border-slate-800/80 text-slate-400" : "bg-slate-800/80 border-slate-700 text-slate-200"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium text-slate-100">{item.title}</span>
                  {!item.read && (
                    <button
                      onClick={() => handleMarkRead(item.id)}
                      className="text-[10px] text-emerald-400 hover:underline flex items-center gap-0.5"
                    >
                      <Check className="w-3 h-3" /> Mark read
                    </button>
                  )}
                </div>
                <p className="text-[11px] text-slate-300">{item.message}</p>
                {item.targetUrl && (
                  <Link
                    href={item.targetUrl}
                    onClick={() => setIsOpen(false)}
                    className="inline-block text-[10px] font-mono text-emerald-400 hover:underline pt-1"
                  >
                    View details →
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
