import Link from "next/link";
import Image from "next/image";

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

export default function BlogPage() {
  return (
    <div className="container mx-auto px-4 py-8 md:py-16 max-w-4xl min-h-[60vh]">
      <div className="flex justify-between items-center mb-8">
        <h1 className="font-heading text-[28px] md:text-3xl font-bold text-[#111827]">Latest from Our Blog</h1>
        <Link href="/blog" className="text-[#2563eb] font-semibold text-[15px] hover:underline">
          View all
        </Link>
      </div>
      
      <div className="flex flex-col gap-6">
        {blogPosts.map((post, idx) => (
          <div key={idx} className="flex flex-col sm:flex-row gap-5 items-start sm:items-center bg-white p-3 rounded-2xl shadow-sm border border-gray-100">
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
      </div>
    </div>
  );
}