"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { Eye, Mail, Lock, User, ShieldCheck, ArrowRight } from "lucide-react";
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
    <div className="relative min-h-screen bg-[#fcfdff] flex flex-col items-center justify-center py-12 px-4 overflow-hidden">

      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-purple-100/60 rounded-full mix-blend-multiply filter blur-[80px] opacity-70 -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
      <div className="absolute top-1/4 right-0 w-[400px] h-[400px] bg-blue-100/60 rounded-full mix-blend-multiply filter blur-[80px] opacity-70 translate-x-1/3 pointer-events-none"></div>
      <div className="absolute top-12 right-12 opacity-[0.15] pointer-events-none">
        <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
          <pattern id="dots1" x="0" y="0" width="16" height="16" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="2" fill="#1809e6ff" />
          </pattern>
          <rect width="80" height="80" fill="url(#dots1)" />
        </svg>
      </div>
      <div className="absolute bottom-1/4 left-10 opacity-[0.15] pointer-events-none">
        <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
          <pattern id="dots2" x="0" y="0" width="16" height="16" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="2" fill="#2136f0ff" />
          </pattern>
          <rect width="60" height="60" fill="url(#dots2)" />
        </svg>
      </div>

      <div className="z-10 w-full max-w-[440px] flex flex-col items-center">

        {/* Logo */}
        <div className="mb-6">
          <h2 className="text-2xl font-black tracking-tight text-gray-900">Woxly</h2>
        </div>

        {/* Headings */}
        <div className="text-center mb-6">
          <h1 className="text-3xl sm:text-[2rem] font-extrabold text-gray-900 mb-2 tracking-tight">
            Create an account
          </h1>
          <p className="text-gray-500 text-[14px]">
            Sign up to start shopping with Woxly
          </p>
          <p className="text-gray-500 text-[13px] mt-4">
            Already have an account? <Link href="/login" className="text-primary font-semibold hover:underline transition-all">Sign in →</Link>
          </p>
        </div>

        {/* Main Card */}
        <div className="w-full bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 p-8 sm:p-10">

          {/* Google Button */}
          <button
            type="button"
            className="w-full h-[52px] bg-[#18181b] hover:bg-[#09090b] text-white rounded-2xl text-[14px] font-semibold shadow-sm flex items-center justify-center gap-3 transition-all"
          >
            <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
            </svg>
            Continue with Google
          </button>

          {/* First OR divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-100"></div>
            </div>
            <div className="relative flex justify-center text-[10px] uppercase font-bold tracking-widest text-gray-400">
              <span className="bg-white px-4">OR</span>
            </div>
          </div>

          {/* Guest Button */}
          <button
            type="button"
            onClick={() => router.push("/shop")}
            className="w-full h-[52px] bg-white border border-gray-200 hover:bg-gray-50 text-gray-800 rounded-2xl text-[14px] font-semibold transition-all flex items-center justify-center gap-3"
          >
            <User className="w-4 h-4 text-primary" />
            Continue as a guest
          </button>

          {/* Second OR divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-100"></div>
            </div>
            <div className="relative flex justify-center text-[10px] uppercase font-bold tracking-widest text-gray-400">
              <span className="bg-white px-4">OR SIGN UP WITH EMAIL</span>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="name" className="text-[13px] font-bold text-gray-900">Full name</Label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  id="name"
                  type="text"
                  placeholder="Your name"
                  className="h-[52px] rounded-2xl border-gray-200 focus-visible:ring-1 focus-visible:ring-primary focus-visible:border-primary text-[14px] pl-11 pr-4 placeholder:text-gray-400"
                  {...form.register("name")}
                />
              </div>
              {form.formState.errors.name && (
                <span className="text-xs text-red-500 font-medium">{form.formState.errors.name.message}</span>
              )}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-[13px] font-bold text-gray-900">Email address</Label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  className="h-[52px] rounded-2xl border-gray-200 focus-visible:ring-1 focus-visible:ring-primary focus-visible:border-primary text-[14px] pl-11 pr-4 placeholder:text-gray-400"
                  {...form.register("email")}
                />
              </div>
              {form.formState.errors.email && (
                <span className="text-xs text-red-500 font-medium">{form.formState.errors.email.message}</span>
              )}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="password" className="text-[13px] font-bold text-gray-900">Password</Label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Min 8 chars, uppercase, symbol"
                  className="h-[52px] rounded-2xl border-gray-200 focus-visible:ring-1 focus-visible:ring-primary focus-visible:border-primary text-[14px] pl-11 pr-12 placeholder:text-gray-400"
                  {...form.register("password")}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors focus:outline-none"
                >
                  <Eye className="w-4 h-4" />
                </button>
              </div>
              {form.formState.errors.password && (
                <span className="text-xs text-red-500 font-medium">{form.formState.errors.password.message}</span>
              )}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="confirmPassword" className="text-[13px] font-bold text-gray-900">Confirm password</Label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Re-enter password"
                  className="h-[52px] rounded-2xl border-gray-200 focus-visible:ring-1 focus-visible:ring-primary focus-visible:border-primary text-[14px] pl-11 pr-12 placeholder:text-gray-400"
                  {...form.register("confirmPassword")}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors focus:outline-none"
                >
                  <Eye className="w-4 h-4" />
                </button>
              </div>
              {form.formState.errors.confirmPassword && (
                <span className="text-xs text-red-500 font-medium">{form.formState.errors.confirmPassword.message}</span>
              )}
            </div>

            <button
              type="submit"
              className="w-full h-[52px] bg-primary hover:bg-primary/90 text-white rounded-2xl text-[14px] font-semibold transition-all mt-6 flex items-center justify-center gap-2"
            >
              Sign Up
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Secure footer */}
          <div className="mt-8 flex items-center justify-center gap-2 text-gray-500">

            <span className="text-[10px] font-medium">
              By signing in, you agree to our Terms and Privacy Policy.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
