"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { Eye } from "lucide-react";
import { useState } from "react";

const signupSchema = z.object({
  name: z.string().min(2, { message: "Name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters" }),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

export default function SignupPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const form = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    defaultValues: { name: "", email: "", password: "", confirmPassword: "" },
  });

  const onSubmit = (data: z.infer<typeof signupSchema>) => {
    router.push("/account");
  };

  return (
    <div className="container mx-auto px-4 py-16 flex flex-col items-center justify-center min-h-[85vh]">
      
      {/* Headings */}
      <div className="text-center mb-8">
        <h1 className="text-3xl sm:text-[2rem] leading-tight font-bold text-gray-900 mb-3 tracking-tight">
          Create your<br />Woxly account
        </h1>
        <p className="text-gray-600 text-[15px]">
          Already have an account? <Link href="/login" className="text-[#8b5cf6] font-medium hover:underline transition-all">Sign in</Link>
        </p>
      </div>

      {/* Main Card */}
      <div className="w-full max-w-[440px] bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-gray-100 p-8 sm:p-10 mx-auto">
        
        {/* Google Button */}
        <button 
          type="button" 
          className="w-full h-14 bg-gradient-to-b from-[#27272a] to-[#18181b] hover:from-[#18181b] hover:to-[#09090b] text-white rounded-xl text-[15px] font-semibold shadow-[0_2px_10px_rgba(0,0,0,0.2)] flex items-center justify-center gap-3 transition-all border border-[#3f3f46]"
        >
          <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
          </svg>
          Continue with Google
        </button>

        <p className="text-center text-[13px] text-gray-500 mt-3 mb-6">
          Quick sign-in. No password needed.
        </p>

        {/* First OR divider */}
        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <div className="relative flex justify-center text-[11px] uppercase">
            <span className="bg-white px-4 text-gray-400 font-medium tracking-widest">OR</span>
          </div>
        </div>

        {/* Guest Button */}
        <button 
          type="button" 
          onClick={() => router.push("/shop")}
          className="w-full h-[52px] bg-[#f5f3ff] hover:bg-[#ede9fe] text-[#7c3aed] rounded-xl text-[15px] font-semibold transition-all mb-6"
        >
          Continue as a guest
        </button>

        {/* Second OR divider */}
        <div className="relative mb-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <div className="relative flex justify-center text-[11px] uppercase">
            <span className="bg-white px-4 text-gray-400 font-medium tracking-widest">OR CONTINUE WITH EMAIL</span>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-[14px] font-bold text-gray-900">Full name</Label>
            <Input 
              id="name" 
              type="text" 
              placeholder="Your name" 
              className="h-[52px] rounded-xl border-gray-200 focus-visible:ring-1 focus-visible:ring-[#8b5cf6] focus-visible:border-[#8b5cf6] text-[15px] px-4 placeholder:text-gray-400" 
              {...form.register("name")} 
            />
            {form.formState.errors.name && (
              <span className="text-xs text-red-500 font-medium">{form.formState.errors.name.message}</span>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-[14px] font-bold text-gray-900">Email address</Label>
            <Input 
              id="email" 
              type="email" 
              placeholder="you@example.com" 
              className="h-[52px] rounded-xl border-gray-200 focus-visible:ring-1 focus-visible:ring-[#8b5cf6] focus-visible:border-[#8b5cf6] text-[15px] px-4 placeholder:text-gray-400" 
              {...form.register("email")} 
            />
            {form.formState.errors.email && (
              <span className="text-xs text-red-500 font-medium">{form.formState.errors.email.message}</span>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password" className="text-[14px] font-bold text-gray-900">Password</Label>
            <div className="relative">
              <Input 
                id="password" 
                type={showPassword ? "text" : "password"} 
                placeholder="Min 8 chars, uppercase, lowercase, special" 
                className="h-[52px] rounded-xl border-gray-200 focus-visible:ring-1 focus-visible:ring-[#8b5cf6] focus-visible:border-[#8b5cf6] text-[15px] px-4 pr-12 placeholder:text-gray-400" 
                {...form.register("password")} 
              />
              <button 
                type="button" 
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors focus:outline-none"
              >
                <Eye className="w-5 h-5" />
              </button>
            </div>
            
            <div className="text-[12px] text-gray-500 mt-2 space-y-1">
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-sm border border-gray-400"></div>
                <span>At least 8 characters</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-sm border border-gray-400"></div>
                <span>At least one capital letter (A-Z)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-sm border border-gray-400"></div>
                <span>At least one lowercase letter (a-z)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-sm border border-gray-400"></div>
                <span>At least one symbol (like ! or @)</span>
              </div>
            </div>

            {form.formState.errors.password && (
              <span className="text-xs text-red-500 font-medium">{form.formState.errors.password.message}</span>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="confirmPassword" className="text-[14px] font-bold text-gray-900">Confirm password</Label>
            <div className="relative">
              <Input 
                id="confirmPassword" 
                type={showConfirmPassword ? "text" : "password"} 
                placeholder="Re-enter password" 
                className="h-[52px] rounded-xl border-gray-200 focus-visible:ring-1 focus-visible:ring-[#8b5cf6] focus-visible:border-[#8b5cf6] text-[15px] px-4 pr-12 placeholder:text-gray-400" 
                {...form.register("confirmPassword")} 
              />
              <button 
                type="button" 
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors focus:outline-none"
              >
                <Eye className="w-5 h-5" />
              </button>
            </div>
            {form.formState.errors.confirmPassword && (
              <span className="text-xs text-red-500 font-medium">{form.formState.errors.confirmPassword.message}</span>
            )}
          </div>

          <button 
            type="submit" 
            className="w-full h-[52px] bg-white border border-gray-200 hover:bg-gray-50 hover:border-gray-300 text-gray-800 rounded-xl text-[15px] font-semibold transition-all mt-6"
          >
            Create account
          </button>
        </form>
      </div>

      {/* Footer text */}
      <p className="text-center text-[13px] text-gray-500 mt-8 max-w-sm">
        By creating an account, you agree to our <Link href="#" className="text-[#8b5cf6] hover:underline font-medium">Terms</Link> and <Link href="#" className="text-[#8b5cf6] hover:underline font-medium">Privacy Policy</Link>.
      </p>

    </div>
  );
}
