"use client";

import type React from "react";

import Link from "next/link";
import { Star } from "lucide-react";
import { useState } from "react";

interface User {
  id: number;
  name: string;
  role: string;
  description: string;
  skills?: string[];
  location?: string;
}

interface UserCardProps {
  user: User;
}

export default function UserCard({ user }: UserCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  return (
    <Link href={`/users/${user.id}`} className="group block h-full">
      <div className="bg-white rounded-md overflow-hidden border border-gray-300 hover:border-gray-500 hover:shadow-sm transition-all duration-200 h-full">
        <div className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-900 font-medium text-lg mr-4">
                {user.name.substring(0, 2).toUpperCase()}
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900 group-hover:text-gray-700 transition-colors">
                  {user.name}
                </h3>
                <p className="text-sm text-gray-500">{user.role}</p>
              </div>
            </div>
            <button
              onClick={toggleFavorite}
              className={`p-1.5 rounded-full ${
                isFavorite ? "text-gray-900" : "text-gray-300"
              } hover:bg-gray-100`}
              aria-label={
                isFavorite ? "Remove from favorites" : "Add to favorites"
              }
            >
              <Star size={16} fill={isFavorite ? "currentColor" : "none"} />
            </button>
          </div>

          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {user.description}
          </p>

          {user.location && (
            <div className="text-xs text-gray-500 mb-3">
              <span className="inline-flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3.5 w-3.5 mr-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                {user.location}
              </span>
            </div>
          )}

          <div className="flex flex-wrap gap-1.5 mb-4">
            {user.skills?.slice(0, 3).map((skill, index) => (
              <span
                key={index}
                className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-600"
              >
                {skill}
              </span>
            ))}
            {user.skills && user.skills.length > 3 && (
              <span className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-500">
                +{user.skills.length - 3}
              </span>
            )}
          </div>

          <div className="flex justify-end">
            <span className="text-xs font-medium text-gray-500 group-hover:text-gray-900 transition-colors flex items-center">
              View Profile
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3.5 w-3.5 ml-1 transform group-hover:translate-x-0.5 transition-transform"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
