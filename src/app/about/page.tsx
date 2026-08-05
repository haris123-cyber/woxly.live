import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8 md:py-16 max-w-4xl min-h-[60vh]">
      <h1 className="font-heading text-[28px] md:text-3xl font-bold text-[#111827] mb-6">About Woxly</h1>
      
      <div className="relative w-full h-[220px] md:h-[450px] lg:h-[550px] rounded-2xl overflow-hidden mb-8 bg-gray-100 shadow-sm">
        <Image 
          src="/images/about-store.png"
          alt="About Woxly Store"
          fill
          className="object-cover"
        />
      </div>
      
      <div className="mb-12">
        <h2 className="text-[22px] font-bold text-[#111827] mb-4">Our Mission</h2>
        <p className="text-gray-600 leading-relaxed text-[15px] sm:text-base">
          At Woxly, our mission is to make everyday living easier by delivering the best quality products across groceries, fashion, electronics and more. We focus on quality, affordability and customer satisfaction.
        </p>
      </div>
      
      <div className="flex flex-row items-center justify-between gap-4 border-t border-gray-100 pt-8">
        <div className="text-center flex-1">
          <p className="text-2xl sm:text-3xl font-bold text-[#2563eb] mb-1">10K+</p>
          <p className="text-[12px] sm:text-sm text-gray-500 font-medium">Happy Customers</p>
        </div>
        <div className="text-center flex-1 border-x border-gray-100">
          <p className="text-2xl sm:text-3xl font-bold text-[#2563eb] mb-1">500+</p>
          <p className="text-[12px] sm:text-sm text-gray-500 font-medium">Products</p>
        </div>
        <div className="text-center flex-1">
          <p className="text-2xl sm:text-3xl font-bold text-[#2563eb] mb-1">50+</p>
          <p className="text-[12px] sm:text-sm text-gray-500 font-medium">Cities Served</p>
        </div>
      </div>
    </div>
  );
}