"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Search, ChevronDown } from "lucide-react";

const blogPosts = [
  {
    title: "10 Superfoods to Boost Your Immunity",
    category: "HEALTHY LIVING",
    date: "May 10, 2025",
    readTime: "5 min read",
    image: "/images/blog-health.png",
  },
  {
    title: "Top 5 Bag Trends You'll Love in 2025",
    category: "FASHION",
    date: "May 8, 2025",
    readTime: "4 min read",
    image: "/images/blog-fashion.png",
  },
  {
    title: "Easy & Healthy Breakfast Ideas",
    category: "RECIPES",
    date: "May 6, 2025",
    readTime: "6 min read",
    image: "/images/blog-recipe.png",
  }
];

const categories = ["ALL", ...Array.from(new Set(blogPosts.map(post => post.category)))];

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("newest");

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === "ALL" || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const sortedPosts = [...filteredPosts].sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    return sortBy === "newest" ? dateB - dateA : dateA - dateB;
  });

  return (
    <div className="container mx-auto px-4 py-8 md:py-16 max-w-4xl min-h-[60vh]">
      <div className="flex flex-col mb-8">
        <h1 className="font-heading text-[28px] md:text-3xl font-bold text-[#111827] mb-6">Latest from Our Blog</h1>

        {/* Full-width Search */}
        <div className="relative w-full mb-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search posts"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-11 pl-11 pr-4 rounded-full border border-gray-200 bg-white focus:border-[#2563eb] focus:ring-1 focus:ring-[#2563eb] outline-none transition-all text-[14.5px] text-gray-900 placeholder:text-gray-400 shadow-sm"
          />
        </div>

        <div className="flex items-center justify-between gap-3 mb-5">          {/* Category Filter */}
          <div className="flex gap-2 overflow-x-auto hide-scrollbar min-w-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`whitespace-nowrap px-4 py-1.5 rounded-full text-[14px] font-medium transition-colors ${selectedCategory === cat
                  ? "bg-[#f3e8ff] text-[#7e22ce]"
                  : "bg-gray-50 text-gray-700 hover:bg-gray-100"
                  }`}
              >
                {cat === "ALL" ? "All" : cat}
              </button>
            ))}
          </div>

          {/* Sort By Dropdown */}
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-[14px] text-gray-500 font-medium">Sort by</span>
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none bg-white border border-gray-200 text-gray-700 py-1.5 pl-4 pr-9 rounded-full text-[14px] font-medium focus:outline-none focus:border-[#2563eb] focus:ring-1 focus:ring-[#2563eb] cursor-pointer shadow-sm"
              >
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
              </select>
              <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Showing X of Y posts */}
        <div className="text-[13.5px] text-gray-500 font-medium">
          Showing {sortedPosts.length} of {blogPosts.length} posts
        </div>
      </div>

      <div className="flex flex-col gap-6">
        {sortedPosts.map((post, idx) => (
          <div key={idx} className="flex flex-col sm:flex-row gap-5 items-start sm:items-center bg-white p-3 rounded-2xl shadow-sm border border-gray-100 transition-all hover:shadow-md">
            <div className="relative w-full sm:w-[240px] md:w-[320px] lg:w-[380px] h-[160px] sm:h-[180px] md:h-[220px] shrink-0 rounded-xl overflow-hidden bg-gray-100">
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="flex flex-col py-2 sm:px-2">
              <span className="text-[10px] font-bold tracking-wider text-[#2563eb] bg-[#2563eb]/10 px-2 py-1 rounded-sm w-fit mb-3">
                {post.category}
              </span>
              <h2 className="text-lg sm:text-xl font-bold text-[#111827] mb-3 leading-tight max-w-[400px]">
                {post.title}
              </h2>
              <p className="text-[13px] font-medium text-gray-500">
                {post.date} &bull; {post.readTime}
              </p>
            </div>
          </div>
        ))}
        {sortedPosts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 font-medium">No posts found.</p>
          </div>
        )}
      </div>
    </div>
  );
}