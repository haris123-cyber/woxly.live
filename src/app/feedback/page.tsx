import { ChevronDown, Star } from "lucide-react";

export default function FeedbackPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:py-16 max-w-4xl min-h-[70vh]">
      <div className="mb-8 text-center md:text-left">
        <h1 className="text-3xl font-bold text-[#111827] mb-2">Share your feedback</h1>
        <p className="text-gray-500 text-[15px]">Rate your experience and tell us what to improve at <span className="font-semibold text-gray-800">Woxly</span>.</p>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl p-6 md:p-8 shadow-sm">
        <form className="flex flex-col gap-6">
          
          {/* Row 1: Name and Email */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-semibold text-gray-700">Full name</label>
              <input 
                type="text" 
                placeholder="Your name" 
                className="w-full px-4 py-2.5 rounded border border-gray-200 text-[15px] text-gray-800 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary placeholder:text-gray-400 transition-colors" 
              />
            </div>
            
            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-semibold text-gray-700">Email</label>
              <input 
                type="email" 
                placeholder="your@email.com" 
                className="w-full px-4 py-2.5 rounded border border-gray-200 text-[15px] text-gray-800 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary placeholder:text-gray-400 transition-colors" 
              />
            </div>
          </div>

          {/* Row 2: Phone and Order ID */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-semibold text-gray-700">Phone</label>
              <div className="flex items-stretch w-full rounded border border-gray-200 overflow-hidden focus-within:border-primary focus-within:ring-1 focus-within:ring-primary transition-colors">
                <div className="flex items-center gap-2 px-3 bg-gray-50 border-r border-gray-200">
                  <span className="text-lg leading-none">🇮🇳</span>
                  <ChevronDown className="w-3 h-3 text-gray-500" />
                </div>
                <input 
                  type="text" 
                  placeholder="+91" 
                  className="flex-1 px-4 py-2.5 text-[15px] text-gray-800 focus:outline-none placeholder:text-gray-400" 
                />
              </div>
            </div>
            
            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-semibold text-gray-700">Order ID (optional)</label>
              <input 
                type="text" 
                placeholder="#ORD..." 
                className="w-full px-4 py-2.5 rounded border border-gray-200 text-[15px] text-gray-800 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary placeholder:text-gray-400 transition-colors" 
              />
            </div>
          </div>

          {/* Row 3: Category and Rating */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-semibold text-gray-700">Category</label>
              <div className="relative">
                <select className="w-full px-4 py-2.5 rounded border border-gray-200 text-[15px] text-gray-800 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary appearance-none bg-white transition-colors">
                  <option>General experience</option>
                  <option>Product quality</option>
                  <option>Delivery</option>
                  <option>Customer support</option>
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
            </div>
            
            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-semibold text-gray-700">Rating</label>
              <div className="flex items-center justify-between w-full px-4 py-2.5 rounded border border-gray-200 bg-white">
                <div className="flex items-center gap-1.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button type="button" key={star} className="text-gray-300 hover:text-yellow-400 focus:outline-none transition-colors">
                      <Star className="w-5 h-5" strokeWidth={2} />
                    </button>
                  ))}
                </div>
                <span className="text-[13px] text-gray-400">Rate your experience</span>
              </div>
            </div>
          </div>

          {/* Row 4: Your feedback */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[13px] font-semibold text-gray-700">Your feedback</label>
            <textarea 
              placeholder="What went well? What can we do better?" 
              rows={5} 
              className="w-full px-4 py-3 rounded border border-gray-200 text-[15px] text-gray-800 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary placeholder:text-gray-400 resize-none transition-colors"
            ></textarea>
          </div>

          {/* Submit Button */}
          <button 
            type="button" 
            className="w-full py-3.5 mt-2 bg-primary hover:opacity-90 text-white font-semibold rounded text-[15px] transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            Submit feedback
          </button>
          
        </form>
      </div>
    </div>
  );
}
