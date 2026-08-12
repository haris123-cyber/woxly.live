import { Mail, MessageCircle, Phone, MapPin, Clock, ChevronDown } from "lucide-react";
import { IconBrandWhatsapp } from "@tabler/icons-react";

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-8 md:py-16 max-w-5xl min-h-[70vh]">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">

        {/* Left Column: Get in touch */}
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold text-[#111827] mb-2">Get in touch</h1>
          <p className="text-gray-500 mb-8 text-[15px]">Reach us directly or use the form below.</p>

          <div className="flex flex-col gap-3">
            {/* Email */}
            <div className="flex items-start gap-4 p-4 bg-[#f9fafb] rounded-md">
              <Mail className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <div className="text-[15px] text-gray-600">info@woxly.in</div>
            </div>

            {/* WhatsApp */}
            <div className="flex items-start gap-4 p-4 bg-[#f9fafb] rounded-md">
              <IconBrandWhatsapp className="w-[25px] h-[25px] text-[#25D366]" stroke={2} />

              <div className="flex flex-col">
                <span className="font-semibold text-gray-800 mb-0.5">WhatsApp</span>
                <span className="text-[15px] text-gray-500">+917306347297</span>
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-start gap-4 p-4 bg-[#f9fafb] rounded-md">
              <Phone className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <div className="flex flex-col">
                <span className="font-semibold text-gray-800 mb-0.5">Phone</span>
                <span className="text-[15px] text-gray-500">+917012802594</span>
              </div>
            </div>

            {/* Address */}
            <div className="flex items-start gap-4 p-4 bg-[#f9fafb] rounded-md">
              <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <div className="flex flex-col">
                <span className="font-semibold text-gray-800 mb-0.5">Address</span>
                <span className="text-[14px] text-gray-500 leading-relaxed">
                  1st Floor, M K Tower, Near Al Thaamar, Thiruvannur, Kozhikode<br />
                  673029, (H) No: 27, Near Liwa, Yashoda Nagar Bangalore,<br />
                  Karnataka - 560064<br />
                  Kozhikode, Kozhikode, IN
                </span>
              </div>
            </div>

            {/* Opening hours */}
            <div className="flex items-start gap-4 p-4 bg-[#f9fafb] rounded-md">
              <Clock className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <div className="flex flex-col">
                <span className="font-semibold text-gray-800 mb-0.5">Opening hours</span>
                <span className="text-[15px] text-gray-500">Mon-Sun, 9:00 AM - 9:00 PM</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Send a message */}
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold text-[#111827] mb-2">Send a message</h1>
          <p className="text-gray-500 mb-8 text-[15px]">Fill in the form. We'll reply soon.</p>

          <form className="flex flex-col gap-5">
            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-semibold text-gray-700">Full name</label>
              <input type="text" placeholder="Your name" className="w-full px-4 py-2.5 rounded border border-gray-200 text-[15px] text-gray-800 focus:outline-none focus:border-gray-400 placeholder:text-gray-400" />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-semibold text-gray-700">Phone</label>
              <div className="flex items-stretch w-full rounded border border-gray-200 overflow-hidden">
                <div className="flex items-center gap-2 px-3 bg-gray-50 border-r border-gray-200">
                  <span className="text-lg leading-none">🇮🇳</span>
                  <ChevronDown className="w-3 h-3 text-gray-500" />
                </div>
                <input type="text" placeholder="+91" className="flex-1 px-4 py-2.5 text-[15px] text-gray-800 focus:outline-none placeholder:text-gray-400" />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-semibold text-gray-700">Email</label>
              <input type="email" placeholder="your@email.com" className="w-full px-4 py-2.5 rounded border border-gray-200 text-[15px] text-gray-800 focus:outline-none focus:border-gray-400 placeholder:text-gray-400" />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-semibold text-gray-700">Topic</label>
              <div className="relative">
                <select className="w-full px-4 py-2.5 rounded border border-gray-200 text-[15px] text-gray-800 focus:outline-none focus:border-gray-400 appearance-none bg-white">
                  <option>General question</option>
                  <option>Support</option>
                  <option>Sales</option>
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-semibold text-gray-700">Message</label>
              <textarea placeholder="Type your message..." rows={4} className="w-full px-4 py-2.5 rounded border border-gray-200 text-[15px] text-gray-800 focus:outline-none focus:border-gray-400 placeholder:text-gray-400 resize-none"></textarea>
            </div>

            <button type="button" className="w-full py-3.5 mt-2 bg-primary hover:bg-[#250d53] text-white font-semibold rounded text-[15px] transition-colors">
              Submit message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}