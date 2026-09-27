"use client";

import React, { useState } from "react";
import {
  Phone,
  MessageCircle,
  MessageSquare,
  ChevronUp,
  X,
} from "lucide-react";

export function FloatingContact() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end space-y-2.5">
      {/* Expanded contact options */}
      {isOpen && (
        <div className="flex flex-col space-y-2 mb-2 animate-fade-in items-end">
          {/* Hotline Call */}
          <a
            href="tel:19008899"
            className="flex items-center space-x-2 px-3 py-2 rounded-full bg-forest-900 text-warmWhite border border-gold/40 shadow-card hover:scale-105 transition-all text-xs"
            aria-label="Gọi hotline"
          >
            <span className="font-medium">Hotline: 0123 456 789</span>
            <div className="w-7 h-7 rounded-full bg-gold text-forest-900 flex items-center justify-center">
              <Phone className="w-3.5 h-3.5" />
            </div>
          </a>

          {/* Zalo Chat */}
          <a
            href="https://zalo.me"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 px-3 py-2 rounded-full bg-[#0068FF] text-white shadow-card hover:scale-105 transition-all text-xs"
            aria-label="Chat qua Zalo"
          >
            <span className="font-medium">Tư vấn Zalo</span>
            <div className="w-7 h-7 rounded-full bg-white text-[#0068FF] flex items-center justify-center font-bold text-xs">
              Z
            </div>
          </a>

          {/* Messenger Chat */}
          <a
            href="https://m.me"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 px-3 py-2 rounded-full bg-gradient-to-r from-[#00B2FF] to-[#006AFF] text-white shadow-card hover:scale-105 transition-all text-xs"
            aria-label="Chat qua Messenger"
          >
            <span className="font-medium">Messenger</span>
            <div className="w-7 h-7 rounded-full bg-white text-[#006AFF] flex items-center justify-center">
              <MessageCircle className="w-3.5 h-3.5" />
            </div>
          </a>
        </div>
      )}

      {/* Main Floating Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-12 h-12 rounded-full bg-forest-900 text-gold border-2 border-gold shadow-gold flex items-center justify-center hover:scale-110 active:scale-95 transition-all group"
        aria-label="Hỗ trợ & Liên hệ nhanh"
      >
        {isOpen ? (
          <X className="w-5 h-5 text-warmWhite" />
        ) : (
          <MessageSquare className="w-5 h-5 group-hover:rotate-12 transition-transform" />
        )}
      </button>
    </div>
  );
}
