"use client";

import { useState } from "react";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import { SocialButton } from "@/components/base/buttons/social-button";

export default function MyAccountPage() {
  const { data: session, status } = useSession();

  const [activeTab, setActiveTab] = useState<"signin" | "register">("signin");
  
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerName, setRegisterName] = useState("");
  
  const [loginMessage, setLoginMessage] = useState("");
  const [registerMessage, setRegisterMessage] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [loadingProvider, setLoadingProvider] = useState<"google" | "facebook" | "credentials" | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginMessage("");
    if (loginEmail && loginPassword) {
      setIsLoading(true);
      setLoadingProvider("credentials");
      
      const res = await signIn("credentials", {
        redirect: false,
        username: loginEmail,
        password: loginPassword,
      });

      setIsLoading(false);
      setLoadingProvider(null);

      if (res?.error) {
        setLoginMessage("Authentication failed. Please verify credentials.");
      } else {
        setLoginMessage("Successfully logged in! Redirecting...");
      }
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setRegisterMessage("");
    if (registerName && registerEmail && registerPassword) {
      setIsLoading(true);
      setLoadingProvider("credentials");

      // Auto-authenticate registration as a mock credential
      const res = await signIn("credentials", {
        redirect: false,
        username: registerEmail,
        password: registerPassword,
      });

      setIsLoading(false);
      setLoadingProvider(null);

      if (res?.error) {
        setRegisterMessage("Registration failed. Please try again.");
      } else {
        setRegisterMessage(`Welcome to Zafraan, ${registerName}! Account created.`);
      }
    }
  };

  const handleSocialAuth = async (provider: "google" | "facebook") => {
    setIsLoading(true);
    setLoadingProvider(provider);
    
    // Trigger real NextAuth authentication redirect
    await signIn(provider, { callbackUrl: "/my-account" });
    
    setIsLoading(false);
    setLoadingProvider(null);
  };

  // --- STOREFRONT MEMBER DASHBOARD ---
  if (status === "authenticated" && session) {
    return (
      <div className="bg-[#FFFFFF] min-h-screen pt-20 pb-20 text-[#111111] animate-fade-in">
        <div className="max-w-[800px] mx-auto px-6">
          
          {/* Header */}
          <div className="mb-12 text-center border-b border-black/5 pb-8">
            <p className="text-[10px] md:text-xs font-bold tracking-[0.2em] text-[#D4AF37] uppercase mb-4">
              Customer Portal
            </p>
            <h1 className="text-4xl font-serif uppercase tracking-wide mb-3">
              My Profile
            </h1>
            <p className="text-sm text-gray-500 font-medium">
              Logged in as <span className="text-[#791b29] font-bold">{session.user?.email}</span>
            </p>
          </div>

          {/* Admin Access Notice Banner */}
          {(session as any)?.user?.role === "admin" && (
            <div className="mb-8 p-4 bg-[#FDFCF7] border border-[#D4AF37]/30 rounded flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs">
              <div className="flex items-center gap-3">
                <span className="text-xl">🔑</span>
                <div className="text-left">
                  <p className="text-xs font-bold uppercase tracking-wider text-[#111111]">
                    Administrator Session Active
                  </p>
                  <p className="text-[10px] text-gray-500 font-medium">
                    You are logged in with the super administrator email.
                  </p>
                </div>
              </div>
              <Link
                href="/admin/dashboard"
                className="bg-[#5B112B] hover:bg-[#3d0b1d] text-white text-[10px] font-bold tracking-widest uppercase px-6 py-2.5 rounded-sm transition-colors shadow-xs cursor-pointer whitespace-nowrap"
              >
                Enter Control Panel
              </Link>
            </div>
          )}

          {/* Dashboard Panel Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            
            <div className="bg-[#FDFCF7] border border-black/5 rounded p-6 shadow-xs flex flex-col gap-2">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Membership Tier</span>
              <span className="text-xl font-serif text-[#791b29] font-bold">Oud VIP Club</span>
              <span className="text-[9.5px] text-gray-400 font-semibold uppercase">Earn points with every bottle</span>
            </div>

            <div className="bg-[#FDFCF7] border border-black/5 rounded p-6 shadow-xs flex flex-col gap-2">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Total Scent Points</span>
              <span className="text-xl font-serif text-[#111111] font-bold">450 PTS</span>
              <span className="text-[9.5px] text-emerald-600 font-semibold">150 PTS until next reward</span>
            </div>

            <div className="bg-[#FDFCF7] border border-black/5 rounded p-6 shadow-xs flex flex-col gap-2">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Recent Purchases</span>
              <span className="text-xl font-serif text-[#111111] font-bold">1 Order</span>
              <span className="text-[9.5px] text-[#791b29] font-bold uppercase hover:underline">
                <Link href="/track-order">Track shipment</Link>
              </span>
            </div>

          </div>

          {/* Account details panel */}
          <div className="bg-white border border-black/5 rounded-md p-8 shadow-sm flex flex-col gap-6">
            <h3 className="text-md font-serif uppercase tracking-widest border-b border-black/5 pb-4">Personal Details</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs text-gray-600 font-semibold">
              <div>
                <span className="text-[10px] text-gray-400 block mb-1 uppercase tracking-wider">Account Name</span>
                <span className="text-sm text-[#111111]">{session.user?.name || "Valued Customer"}</span>
              </div>
              <div>
                <span className="text-[10px] text-gray-400 block mb-1 uppercase tracking-wider">Associated Email</span>
                <span className="text-sm text-[#111111]">{session.user?.email}</span>
              </div>
            </div>

            <div className="border-t border-black/5 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
              <p className="text-xs text-gray-400 font-medium">To modify your credentials or delete your records, contact support.</p>
              <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
                {(session as any)?.user?.role === "admin" && (
                  <Link
                    href="/admin/dashboard"
                    className="w-full sm:w-auto bg-[#D4AF37] hover:bg-[#c59f28] text-[#111111] text-[10.5px] font-bold tracking-widest uppercase px-8 py-3 rounded-sm transition-colors shadow-sm cursor-pointer whitespace-nowrap text-center"
                  >
                    Go to Admin Dashboard
                  </Link>
                )}
                <button
                  onClick={() => signOut({ callbackUrl: "/my-account" })}
                  className="w-full sm:w-auto bg-[#5B112B] hover:bg-[#3d0b1d] text-white text-[10.5px] font-bold tracking-widest uppercase px-8 py-3 rounded-sm transition-colors shadow-sm cursor-pointer whitespace-nowrap"
                >
                  Sign Out
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    );
  }

  // --- STOREFRONT LOGIN & REGISTRATION FORMS ---
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
                  <div className={`mb-6 p-4 text-xs font-semibold rounded-sm text-center border ${
                    loginMessage.includes("failed") 
                      ? "bg-red-50 border-red-500/20 text-red-800" 
                      : "bg-emerald-50 border-emerald-500/20 text-emerald-800"
                  }`}>
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
                      placeholder="hello@example.com"
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
                      placeholder="••••••••"
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
                    {isLoading && loadingProvider === "credentials" ? (
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
                      onClick={() => handleSocialAuth("google")}
                      disabled={isLoading}
                      className="w-full"
                    >
                      {isLoading && loadingProvider === "google" ? "..." : "Google"}
                    </SocialButton>

                    <SocialButton
                      social="facebook"
                      onClick={() => handleSocialAuth("facebook")}
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
                  <div className={`mb-6 p-4 text-xs font-semibold rounded-sm text-center border ${
                    registerMessage.includes("failed") 
                      ? "bg-red-50 border-red-500/20 text-red-800" 
                      : "bg-emerald-50 border-emerald-500/20 text-emerald-800"
                  }`}>
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
                      placeholder="••••••••"
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
                    {isLoading && loadingProvider === "credentials" ? (
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
                      onClick={() => handleSocialAuth("google")}
                      disabled={isLoading}
                      className="w-full"
                    >
                      {isLoading && loadingProvider === "google" ? "..." : "Google"}
                    </SocialButton>

                    <SocialButton
                      social="facebook"
                      onClick={() => handleSocialAuth("facebook")}
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
