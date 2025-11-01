"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import { Mail, Lock, Sparkles, ArrowRight, Check, CircleAlert as AlertCircle } from "lucide-react";

export default function AuthPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);

    try {
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
        setMessage("✅ Account created successfully! Please verify your email and sign in.");
        setIsSignUp(false);
        setPassword("");
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        setMessage("Signed in successfully!");
        router.push("/dashboard");
      }
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f5f7ff] via-[#eef2ff] to-[#e5e9ff] flex items-center justify-center p-4 relative overflow-hidden font-sans">

      {/* Background decorative circles */}
      <div className="absolute top-[10%] left-[5%] w-72 h-72 bg-[#7c3aed]/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute top-[60%] right-[10%] w-96 h-96 bg-[#a855f7]/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      <div className="absolute bottom-[10%] left-[30%] w-80 h-80 bg-[#8b5cf6]/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />

      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-center relative z-10">

        {/* Left Side - Hero Floating Cards */}
        <div className="hidden lg:block relative">
          {/* Floating Card 1 */}
          <div className="absolute top-0 right-0 w-72 bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-2xl border border-white/60 animate-float" style={{ animationDelay: '0s' }}>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#10b981] to-[#34d399] flex items-center justify-center flex-shrink-0">
                <Check className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="font-semibold text-[#1f2937] mb-1">Task Completed</div>
                <div className="text-sm text-[#6b7280]">Design new dashboard</div>
                <div className="text-xs text-[#9ca3af] mt-2">2 mins ago</div>
              </div>
            </div>
          </div>

          {/* Floating Card 2 */}
          <div className="absolute top-48 left-0 w-80 bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-2xl border border-white/60 animate-float" style={{ animationDelay: '1s' }}>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#7c3aed] to-[#a855f7] flex items-center justify-center text-white font-semibold">J</div>
              <div>
                <div className="font-semibold text-[#1f2937]">John Doe</div>
                <div className="text-xs text-[#6b7280]">Product Manager</div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#10b981]" />
                <div className="text-sm text-[#6b7280]">15 tasks completed</div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#f59e0b]" />
                <div className="text-sm text-[#6b7280]">3 tasks pending</div>
              </div>
            </div>
          </div>

          {/* Floating Card 3 */}
          <div className="absolute top-96 right-10 w-64 bg-gradient-to-br from-[#7c3aed] to-[#a855f7] rounded-2xl p-6 shadow-2xl text-white animate-float" style={{ animationDelay: '2s' }}>
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-5 h-5" />
              <div className="text-sm font-semibold">Productivity Boost</div>
            </div>
            <div className="text-3xl font-bold mb-2">+250%</div>
            <div className="text-sm text-white/80">This week vs last week</div>
          </div>

          {/* Hero Text */}
          <div className="pt-12 pl-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-white/60 mb-6">
              <Sparkles className="w-4 h-4 text-[#7c3aed]" />
              <span className="text-sm font-semibold text-[#7c3aed]">Task Management</span>
            </div>

            <h1 className="text-5xl font-bold text-[#1f2937] mb-6 leading-tight">
              Maximize Your<br />
              <span className="bg-gradient-to-r from-[#7c3aed] to-[#a855f7] bg-clip-text text-transparent">
                Productivity
              </span>
            </h1>
            <p className="text-lg text-[#6b7280] mb-8 leading-relaxed max-w-md">
              Organize your tasks and stay focused with our powerful task manager app. Simple, elegant, and effective.
            </p>

            <div className="flex items-center gap-8">
              <div>
                <div className="text-3xl font-bold text-[#1f2937]">10K+</div>
                <div className="text-sm text-[#6b7280]">Active Users</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-[#1f2937]">99%</div>
                <div className="text-sm text-[#6b7280]">Satisfaction</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-[#1f2937]">24/7</div>
                <div className="text-sm text-[#6b7280]">Support</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Auth Form */}
        <div className="w-full max-w-md mx-auto lg:mx-0 relative">
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/60 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-[#7c3aed]/10 to-[#a855f7]/10 rounded-full blur-3xl" />

            <div className="relative">
              {/* Logo */}
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-[#7c3aed] to-[#a855f7] mb-4 shadow-lg">
                  <Sparkles className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-[#1f2937] mb-2">
                  {isSignUp ? 'Create Account' : 'Welcome Back'}
                </h2>
                <p className="text-[#6b7280]">{isSignUp ? 'Sign up to get started' : 'Sign in to continue'}</p>
              </div>

              <form onSubmit={handleAuth} className="space-y-5">
                {/* Email */}
                <div>
                  <label className="block text-sm font-semibold text-[#1f2937] mb-2">Email Address</label>
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9ca3af]">
                      <Mail className="w-5 h-5" />
                    </div>
                    <input
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-white border border-white/60 focus:border-[#7c3aed] focus:ring-2 focus:ring-[#7c3aed]/20 outline-none transition-all text-[#1f2937] placeholder:text-[#9ca3af]"
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label className="block text-sm font-semibold text-[#1f2937] mb-2">Password</label>
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9ca3af]">
                      <Lock className="w-5 h-5" />
                    </div>
                    <input
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-white border border-white/60 focus:border-[#7c3aed] focus:ring-2 focus:ring-[#7c3aed]/20 outline-none transition-all text-[#1f2937] placeholder:text-[#9ca3af]"
                    />
                  </div>
                </div>

                {/* Error */}
                {error && (
                  <div className="flex items-start gap-3 p-4 rounded-xl bg-[#fee2e2] border border-[#fecaca]">
                    <AlertCircle className="w-5 h-5 text-[#ef4444] flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-[#991b1b]">{error}</p>
                  </div>
                )}

                {/* Success */}
                {message && (
                  <div className="flex items-start gap-3 p-4 rounded-xl bg-[#d1fae5] border border-[#a7f3d0]">
                    <Check className="w-5 h-5 text-[#10b981] flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-[#065f46]">{message}</p>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-[#7c3aed] to-[#a855f7] text-white font-semibold text-base hover:shadow-xl hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2 shadow-lg"
                >
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <span>{isSignUp ? 'Create Account' : 'Sign In'}</span>
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>
              </form>

              {/* Toggle Sign Up / Sign In */}
              <div className="mt-6 text-center">
                <p className="text-sm text-[#6b7280]">
                  {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
                  <button
                    onClick={() => {
                      setIsSignUp(!isSignUp);
                      setError('');
                      setMessage('');
                    }}
                    className="font-semibold text-[#7c3aed] hover:text-[#a855f7] transition-colors"
                  >
                    {isSignUp ? 'Sign in' : 'Sign up'}
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
