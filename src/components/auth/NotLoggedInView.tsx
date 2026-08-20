import { Plug, User } from "lucide-react";
import Link from "next/link";
import { useAuthStore } from "@/store/useAuthStore";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock } from "@fortawesome/free-solid-svg-icons";

interface NotLoggedInViewProps {
  message?: string;
}

export function NotLoggedInView({ message = "Sign in to view your account and enjoy a personalized experience." }: NotLoggedInViewProps) {
  const { login } = useAuthStore();

  return (
    <div className="min-h-[80vh] bg-white flex flex-col items-center justify-center px-4 py-12 text-center">
      {/* Illustration */}
      <div className="relative w-56 h-56 mb-8 flex items-center justify-center">
        {/* Main large circle */}
        <div className="absolute inset-0 m-auto w-48 h-48 bg-[#f5f3ff] rounded-full"></div>

        {/* Decorative elements */}
        {/* Top left star / cross */}
        <div className="absolute top-4 left-6 text-[#c4b5fd] text-lg font-bold">×</div>
        {/* Bottom right cross */}
        <div className="absolute bottom-12 right-0 text-[#c4b5fd] text-lg font-bold">×</div>
        {/* Tiny circles */}
        <div className="absolute top-1/2 left-2 w-1.5 h-1.5 bg-[#ddd6fe] rounded-full"></div>
        <div className="absolute top-10 right-10 w-1.5 h-1.5 bg-[#ddd6fe] rounded-full"></div>

        {/* Central Padlock */}
        <div className="relative z-10 mt-6">
          <FontAwesomeIcon icon={faLock} className="text-[120px] text-[#c4b5fd]" />
        </div>

        {/* User icon circle (bottom right) */}
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          className="absolute -bottom-2 right-4 w-[72px] h-[72px] bg-[#ddd6fe] rounded-full border-4 border-white flex items-center justify-center z-20 shadow-sm"
        >
          <User className="w-[38px] h-[38px] text-[#a78bfa] fill-[#a78bfa]" strokeWidth={1} />
        </motion.div>

        {/* Plug icon (bottom left) */}
        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0 }}
          className="absolute bottom-6 -left-6 w-12 h-12 bg-transparent flex items-center justify-center z-10"
        >
          <div className="relative flex items-center justify-center w-10 h-10 bg-[#f5f3ff] rounded-full shadow-sm">
            <Plug className="w-5 h-5 text-[#8b5cf6] -rotate-45" />
            <div className="absolute -bottom-1 -right-1 w-[18px] h-[18px] bg-[#8b5cf6] rounded-full flex items-center justify-center text-white text-[12px] font-bold leading-none border-2 border-white">
              ×
            </div>
          </div>
        </motion.div>

        {/* Wifi icon (top right) */}
        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute top-2 -right-2 flex items-center justify-center z-10"
        >
          <div className="relative flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.55a11 11 0 0 1 14.08 0" /><path d="M1.42 9a16 16 0 0 1 21.16 0" /><path d="M8.53 16.11a6 6 0 0 1 6.95 0" /><line x1="12" y1="20" x2="12.01" y2="20" /></svg>
            <div className="absolute -bottom-1 -right-2 w-[18px] h-[18px] bg-[#8b5cf6] rounded-full flex items-center justify-center text-white text-[12px] font-bold leading-none border-2 border-white">
              ×
            </div>
          </div>
        </motion.div>
      </div>

      <h2 className="text-[22px] sm:text-2xl font-bold text-gray-900 mb-2 mt-4">You're not logged in</h2>
      <p className="text-[#5f6368] mb-8 text-[14px] sm:text-[15px] max-w-xs leading-relaxed">
        {message}
      </p>

      <Link
        href="/login"
        className="bg-primary hover:bg-primary/90 text-white px-10 py-2.5 rounded-full text-[15px] font-medium transition-colors mb-6 shadow-sm"
      >
        Sign in
      </Link>


    </div>
  );
}
