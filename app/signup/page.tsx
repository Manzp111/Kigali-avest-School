"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { User, Mail, Phone, Lock, Eye, EyeOff } from "lucide-react";
import Image from "next/image";

export default function SignupPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [message, setMessage] = useState<{ text: string; type: "error" | "success" } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    // Clear errors as user types
    if (errors[e.target.name]) {
      setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    const { firstName, lastName, email, phone, password, confirmPassword } = form;

    if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    const lowerPass = password.toLowerCase();
    if (password.length > 0) {
      if (lowerPass.includes(firstName.toLowerCase()) && firstName.length > 2) {
        newErrors.password = "Password cannot contain your name";
      } else if (lowerPass.includes(lastName.toLowerCase()) && lastName.length > 2) {
        newErrors.password = "Password cannot contain your name";
      } else if (lowerPass.includes(phone) && phone.length > 4) {
        newErrors.password = "Password cannot contain your phone number";
      } else if (lowerPass.includes(email.split("@")[0]) && email.length > 3) {
        newErrors.password = "Password cannot contain parts of your email";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setMessage(null);

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        // 1. Handle Backend Validation Errors (Zod flatten() structure)
        if (data.errors?.fieldErrors) {
          const backendErrors: Record<string, string> = {};
          Object.keys(data.errors.fieldErrors).forEach((key) => {
            backendErrors[key] = data.errors.fieldErrors[key][0];
          });
          setErrors(backendErrors);
        }
        
        // 2. Throw specific message from backend (e.g., "User already exists")
        throw new Error(data.message || "Signup failed");
      }

      setMessage({ text: "Account created! Redirecting...", type: "success" });
      setTimeout(() => router.push("/auth/login"), 2000);
    } catch (err: any) {
      setMessage({ text: err.message, type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-100 p-6 font-sans">
      <div className="w-full max-w-[580px]">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 md:p-14 rounded-[3rem] shadow-2xl shadow-[#004795]/20 border border-slate-200 space-y-5"
        >
          {/* LOGO SECTION */}
          <div className="flex flex-col items-center text-center mb-4">
            <div className="relative w-28 h-28 mb-4">
              <Image src="/image/logo.jpeg" alt="KHS Logo" fill className="object-contain" priority />
            </div>
            <h1 className="text-3xl font-black text-[#004795] uppercase tracking-tight">KIGALI HARVEST SCHOOL</h1>
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mt-1">Registry Portal</p>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField label="First Name" icon={<User size={18}/>} name="firstName" value={form.firstName} onChange={handleChange} error={errors.firstName} />
              <InputField label="Last Name" icon={<User size={18}/>} name="lastName" value={form.lastName} onChange={handleChange} error={errors.lastName} />
            </div>

            <InputField label="Email Address" icon={<Mail size={18}/>} type="email" name="email" value={form.email} onChange={handleChange} error={errors.email} />
            
            <InputField label="Phone Number" icon={<Phone size={18}/>} name="phone" value={form.phone} onChange={handleChange} error={errors.phone} />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField 
                label="Password" 
                icon={<Lock size={18}/>} 
                type={showPassword ? "text" : "password"} 
                name="password" 
                value={form.password} 
                onChange={handleChange} 
                error={errors.password}
                toggleShow={() => setShowPassword(!showPassword)}
                isPassword
                showPassword={showPassword}
              />
              <InputField 
                label="Confirm Password" 
                icon={<Lock size={18}/>} 
                type={showPassword ? "text" : "password"} 
                name="confirmPassword" 
                value={form.confirmPassword} 
                onChange={handleChange} 
                error={errors.confirmPassword} 
              />
            </div>
          </div>

          {message && (
            <div className={`p-4 rounded-2xl text-[11px] font-black uppercase tracking-widest text-center border-2 ${
              message.type === "success" 
              ? "bg-blue-50 border-[#004795] text-[#004795]" 
              : "bg-red-50 border-[#E31E24] text-[#E31E24]"
            }`}>
              {message.text}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#E31E24] text-white py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl hover:bg-black transition-all active:scale-[0.98] disabled:opacity-50"
          >
            {loading ? "Processing..." : "Create Account"}
          </button>

          <p className="text-center text-[11px] font-bold text-slate-500 uppercase">
            Already registered? <a href="/auth/login" className="text-[#004795] font-black hover:underline">Sign In here</a>
          </p>
        </form>
      </div>
    </div>
  );
}

function InputField({ label, icon, error, isPassword, showPassword, toggleShow, ...props }: any) {
  return (
    <div className="flex flex-col space-y-1.5">
      <label className="text-[11px] font-black text-[#004795] uppercase tracking-widest ml-1">
        {label}
      </label>
      <div className="relative group">
        <div className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors z-10 ${error ? 'text-[#E31E24]' : 'text-slate-400 group-focus-within:text-[#004795]'}`}>
          {icon}
        </div>
        <input
          {...props}
          required
          className={`w-full bg-slate-50 border-2 rounded-2xl py-4 pl-12 pr-12 text-sm font-bold text-black outline-none transition-all ${
            error 
            ? 'border-[#E31E24] bg-red-50/50' 
            : 'border-slate-200 focus:border-[#004795] focus:bg-white shadow-sm'
          }`}
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
      {error && (
        <p className="text-[10px] font-black text-[#E31E24] uppercase ml-2 italic">
          {error}
        </p>
      )}
    </div>
  );
}