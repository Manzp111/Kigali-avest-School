"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Mail, Lock, Eye, EyeOff, LogIn } from "lucide-react";
import Image from "next/image";

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (error) setError(""); // Clear error when typing
  };

const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Invalid credentials");
        return;
      }

      // 1. Store Access Token for API calls
      localStorage.setItem("accessToken", data.accessToken);

      // 2. Store User Profile for UI tracking (Welcome messages, Role checks)
      if (data.user) {
        localStorage.setItem("user", JSON.stringify(data.user));
      }

      router.push("/admin");
    } catch (err) {
      setError("Unable to connect to the server");
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-100 p-6 font-sans">
      <div className="w-full max-w-[500px]">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 md:p-14 rounded-[3rem] shadow-2xl shadow-[#004795]/20 border border-slate-200 space-y-6"
        >
          {/* LOGO SECTION */}
          <div className="flex flex-col items-center text-center mb-4">
            <div className="relative w-28 h-28 mb-4">
              <Image 
                src="/image/logo.jpeg" 
                alt="KHS Logo" 
                fill 
                className="object-contain" 
                priority 
              />
            </div>
            <h1 className="text-3xl font-black text-[#004795] uppercase tracking-tight">KIGALI HARVEST SCHOOL</h1>
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mt-1">Portal Sign In</p>
          </div>

          <div className="space-y-5">
            {/* EMAIL */}
            <InputField 
              label="Email Address" 
              icon={<Mail size={18}/>} 
              type="email" 
              name="email" 
              placeholder="Enter your email"
              value={form.email} 
              onChange={handleChange} 
            />

            {/* PASSWORD */}
            <InputField 
              label="Password" 
              icon={<Lock size={18}/>} 
              type={showPassword ? "text" : "password"} 
              name="password" 
              placeholder="Enter your password"
              value={form.password} 
              onChange={handleChange} 
              toggleShow={() => setShowPassword(!showPassword)}
              isPassword
              showPassword={showPassword}
            />
          </div>

          {/* ERROR MESSAGE */}
          {error && (
            <div className="p-4 rounded-2xl text-[11px] font-black uppercase tracking-widest text-center border-2 bg-red-50 border-[#E31E24] text-[#E31E24]">
              {error}
            </div>
          )}

          {/* SUBMIT BUTTON */}
          <button
            type="submit"
            disabled={loading}
          className="w-full bg-[#E31E24] text-white py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl hover:bg-[#004795] transition-all active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading ? "Authenticating..." : (
              <>
                <LogIn size={16} />
                Sign In
              </>
            )}
          </button>

          {/* FOOTER LINKS */}
          <div className="flex flex-col items-center gap-3 pt-2">
            <p className="text-[11px] font-bold text-slate-500 uppercase">
              New here? <a href="/signup" className="text-[#E31E24] font-black hover:underline">Create an Account</a>
            </p>
            <a href="#" className="text-[10px] font-black text-[#004795] uppercase tracking-tighter opacity-70 hover:opacity-100">
              Forgot Password?
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}

/**
 * Reusable InputField for visual consistency
 */
function InputField({ label, icon, isPassword, showPassword, toggleShow, ...props }: any) {
  return (
    <div className="flex flex-col space-y-1.5">
      <label className="text-[11px] font-black text-[#004795] uppercase tracking-widest ml-1">
        {label}
      </label>
      <div className="relative group">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#004795] transition-colors z-10">
          {icon}
        </div>
        <input
          {...props}
          required
          className="w-full bg-slate-50 border-2 border-slate-200 rounded-2xl py-4 pl-12 pr-12 text-sm font-bold text-black outline-none transition-all focus:border-[#004795] focus:bg-white shadow-sm"
        />
        {isPassword && (
          <button
            type="button"
            onClick={toggleShow}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#004795] z-10"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>
    </div>
  );
}