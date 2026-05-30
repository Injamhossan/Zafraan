"use client";

import { useState } from "react";
import Link from "next/link";
import { SocialButton } from "@/components/base/buttons/social-button";

export default function MyAccountPage() {
  const [activeTab, setActiveTab] = useState<"signin" | "register">("signin");
  
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerName, setRegisterName] = useState("");
  
  const [loginMessage, setLoginMessage] = useState("");
  const [registerMessage, setRegisterMessage] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [loadingProvider, setLoadingProvider] = useState<"google" | "facebook" | null>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginEmail && loginPassword) {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        setLoginMessage("Successfully logged in! (Mock Session)");
        setTimeout(() => setLoginMessage(""), 5000);
      }, 1000);
    }
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (registerName && registerEmail && registerPassword) {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        setRegisterMessage("Account created successfully! Welcome to Zafraan.");
        setTimeout(() => setRegisterMessage(""), 5000);
      }, 1000);
    }
  };

  const handleSocialAuth = (provider: "google" | "facebook", action: "login" | "register") => {
    setIsLoading(true);
    setLoadingProvider(provider);
    
    // Simulate OAuth Redirect and successful callback
    setTimeout(() => {
      setIsLoading(false);
      setLoadingProvider(null);
      if (action === "login") {
        setLoginMessage(`Successfully authenticated via ${provider === "google" ? "Google" : "Facebook"}! Welcome back.`);
        setTimeout(() => setLoginMessage(""), 5000);
      } else {
        setRegisterMessage(`Successfully registered via ${provider === "google" ? "Google" : "Facebook"}! Welcome to Zafraan.`);
        setTimeout(() => setRegisterMessage(""), 5000);
      }
    }, 1500);
  };

  return (
    <div className="bg-[#FFFFFF] min-h-screen pt-20 pb-20">
      <div className="max-w-[500px] mx-auto px-6">
        
        {/* Breadcrumb & Header */}
        <div className="mb-12 text-center">
          <p className="text-[10px] md:text-xs font-bold tracking-[0.2em] text-gray-400 uppercase mb-4">
            <Link href="/" className="hover:text-[#791b29] transition-colors">Home</Link> &nbsp;/&nbsp; <span className="text-[#111111]">My Account</span>
          </p>
          <h1 className="text-4xl font-serif text-[#111111] uppercase tracking-wide">
            My Account
          </h1>
        </div>

        {/* Centered Tabbed Form Card */}
        <div className="bg-white border border-black/5 rounded-md shadow-sm overflow-hidden">
          
          {/* Tabs Selector */}
          <div className="flex border-b border-black/5">
            <button
              onClick={() => {
                setActiveTab("signin");
                setLoginMessage("");
                setRegisterMessage("");
              }}
              className={`flex-1 py-4 text-xs font-bold tracking-widest uppercase transition-all border-b-2 cursor-pointer ${
                activeTab === "signin"
                  ? "border-[#791b29] text-[#791b29] bg-[#FDFCF7]/30"
                  : "border-transparent text-gray-400 hover:text-[#791b29]"
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => {
                setActiveTab("register");
                setLoginMessage("");
                setRegisterMessage("");
              }}
              className={`flex-1 py-4 text-xs font-bold tracking-widest uppercase transition-all border-b-2 cursor-pointer ${
                activeTab === "register"
                  ? "border-[#791b29] text-[#791b29] bg-[#FDFCF7]/30"
                  : "border-transparent text-gray-400 hover:text-[#791b29]"
              }`}
            >
              Register
            </button>
          </div>

          <div className="p-8 md:p-10">
            {/* SIGN IN TAB */}
            {activeTab === "signin" && (
              <div className="flex flex-col animate-fade-in">
                <h2 className="text-lg font-serif text-[#111111] uppercase mb-1">Returning Customer</h2>
                <p className="text-[10px] text-gray-400 mb-6 uppercase tracking-wider font-semibold">Sign in to your Zafraan account</p>

                {loginMessage && (
                  <div className="mb-6 p-4 bg-emerald-50 border border-emerald-500/20 text-emerald-800 text-xs font-semibold rounded-sm">
                    {loginMessage}
                  </div>
                )}

                <form onSubmit={handleLogin} className="flex flex-col gap-5 mb-6">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold tracking-widest text-gray-500 uppercase">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      className="border border-black/10 rounded-sm bg-white px-4 py-3 text-sm focus:outline-none focus:border-[#791b29] transition-colors placeholder-gray-300"
                      required
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <div className="flex justify-between items-center">
                      <label className="text-[10px] font-bold tracking-widest text-gray-500 uppercase">
                        Password *
                      </label>
                      <a href="#" className="text-[9px] font-semibold text-gray-400 hover:text-[#791b29] hover:underline transition-colors uppercase tracking-wider">
                        Forgot?
                      </a>
                    </div>
                    <input
                      type="password"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      className="border border-black/10 rounded-sm bg-white px-4 py-3 text-sm focus:outline-none focus:border-[#791b29] transition-colors placeholder-gray-300"
                      required
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="remember-me"
                      className="accent-[#791b29] h-3.5 w-3.5 border-black/10 rounded-sm cursor-pointer"
                    />
                    <label htmlFor="remember-me" className="text-xs text-gray-500 font-semibold cursor-pointer select-none">
                      Remember me
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-[#5B112B] hover:bg-[#3d0b1d] text-white text-[11px] font-bold tracking-widest uppercase py-3.5 rounded-sm transition-colors shadow-sm cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {isLoading && loadingProvider === null ? (
                      <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                    ) : null}
                    Sign In
                  </button>
                </form>

                {/* Social Authentication Row */}
                <div className="flex flex-col gap-4 border-t border-black/5 pt-5">
                  <div className="text-center relative">
                    <span className="bg-white px-3 text-[9px] font-bold tracking-widest text-gray-400 uppercase relative z-10">
                      Or Continue With
                    </span>
                    <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-[1px] bg-black/5"></div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mt-1">
                    <SocialButton
                      social="google"
                      onClick={() => handleSocialAuth("google", "login")}
                      disabled={isLoading}
                      className="w-full"
                    >
                      {isLoading && loadingProvider === "google" ? "..." : "Google"}
                    </SocialButton>

                    <SocialButton
                      social="facebook"
                      onClick={() => handleSocialAuth("facebook", "login")}
                      disabled={isLoading}
                      className="w-full"
                    >
                      {isLoading && loadingProvider === "facebook" ? "..." : "Facebook"}
                    </SocialButton>
                  </div>
                </div>
              </div>
            )}

            {/* REGISTER TAB */}
            {activeTab === "register" && (
              <div className="flex flex-col animate-fade-in">
                <h2 className="text-lg font-serif text-[#111111] uppercase mb-1">Create An Account</h2>
                <p className="text-[10px] text-gray-400 mb-6 uppercase tracking-wider font-semibold">Join for exclusive Zafraan benefits</p>

                {registerMessage && (
                  <div className="mb-6 p-4 bg-emerald-50 border border-emerald-500/20 text-emerald-800 text-xs font-semibold rounded-sm">
                    {registerMessage}
                  </div>
                )}

                <form onSubmit={handleRegister} className="flex flex-col gap-5 mb-6">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold tracking-widest text-gray-500 uppercase">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={registerName}
                      onChange={(e) => setRegisterName(e.target.value)}
                      placeholder="Your Name"
                      className="border border-black/10 rounded-sm bg-white px-4 py-3 text-sm focus:outline-none focus:border-[#791b29] transition-colors placeholder-gray-300"
                      required
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold tracking-widest text-gray-500 uppercase">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      value={registerEmail}
                      onChange={(e) => setRegisterEmail(e.target.value)}
                      placeholder="hello@example.com"
                      className="border border-black/10 rounded-sm bg-white px-4 py-3 text-sm focus:outline-none focus:border-[#791b29] transition-colors placeholder-gray-300"
                      required
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold tracking-widest text-gray-500 uppercase">
                      Password *
                    </label>
                    <input
                      type="password"
                      value={registerPassword}
                      onChange={(e) => setRegisterPassword(e.target.value)}
                      className="border border-black/10 rounded-sm bg-white px-4 py-3 text-sm focus:outline-none focus:border-[#791b29] transition-colors placeholder-gray-300"
                      required
                    />
                  </div>

                  <p className="text-[10px] text-gray-400 leading-relaxed font-medium">
                    Your personal data will be used to support your experience throughout this website.
                  </p>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-[#FFFFFF] hover:bg-[#5B112B] hover:text-white text-[#5B112B] border border-[#5B112B] text-[11px] font-bold tracking-widest uppercase py-3.5 rounded-sm transition-all shadow-sm cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {isLoading && loadingProvider === null ? (
                      <div className="w-4 h-4 border-2 border-[#5B112B]/20 border-t-[#5B112B] rounded-full animate-spin"></div>
                    ) : null}
                    Register
                  </button>
                </form>

                {/* Social Registration Row */}
                <div className="flex flex-col gap-4 border-t border-black/5 pt-5">
                  <div className="text-center relative">
                    <span className="bg-white px-3 text-[9px] font-bold tracking-widest text-gray-400 uppercase relative z-10">
                      Or Sign Up With
                    </span>
                    <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-[1px] bg-black/5"></div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mt-1">
                    <SocialButton
                      social="google"
                      onClick={() => handleSocialAuth("google", "register")}
                      disabled={isLoading}
                      className="w-full"
                    >
                      {isLoading && loadingProvider === "google" ? "..." : "Google"}
                    </SocialButton>

                    <SocialButton
                      social="facebook"
                      onClick={() => handleSocialAuth("facebook", "register")}
                      disabled={isLoading}
                      className="w-full"
                    >
                      {isLoading && loadingProvider === "facebook" ? "..." : "Facebook"}
                    </SocialButton>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Benefits box (Compact layout) */}
        <div className="mt-8 p-6 bg-[#FDFCF7] border border-black/5 rounded-md max-w-[500px] mx-auto shadow-xs">
          <h4 className="text-xs font-bold uppercase tracking-wider text-[#111111] mb-3 text-center">Exclusive Member Benefits</h4>
          <ul className="grid grid-cols-1 gap-2.5 text-xs text-gray-500 font-semibold max-w-[380px] mx-auto">
            <li className="flex items-start gap-2">
              <svg className="w-4 h-4 text-[#791b29] shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7"/></svg>
              <span>Track your luxury orders in real-time</span>
            </li>
            <li className="flex items-start gap-2">
              <svg className="w-4 h-4 text-[#791b29] shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7"/></svg>
              <span>Save multiple premium shipping addresses</span>
            </li>
            <li className="flex items-start gap-2">
              <svg className="w-4 h-4 text-[#791b29] shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7"/></svg>
              <span>Early access to exclusive VIP collection launches</span>
            </li>
          </ul>
        </div>

      </div>
    </div>
  );
}
