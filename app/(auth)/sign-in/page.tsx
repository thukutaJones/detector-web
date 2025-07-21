  "use client";

  import React, { useState, useEffect, useRef } from "react";
  import {
    Eye,
    EyeOff,
    Mail,
    Lock,
    Smartphone,
    ArrowRight,
    Shield,
    Zap,
    CheckCircle,
  } from "lucide-react";
  import AnimatedBgElements from "@/components/auth/AnimatedBgEelments";
  import Image from "next/image";
  import axios from "axios";
  import { baseUrl } from "@/constants/baseUrl";

  const DetectorLogin: React.FC = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showOTP, setShowOTP] = useState(false);
    const [otp, setOTP] = useState<string[]>(Array(6).fill(""));
    const otpRefs = useRef<Array<HTMLInputElement | null>>([]);
    const [formError, setFormError] = useState<string>("");
    const [otpFormError, setOtpFormError] = useState<string>("");
    const [isLoading, setIsLoading] = useState(false);
    const [focusedInput, setFocusedInput] = useState<string | null>(null);
    const mousePositionRef = useRef({ x: 0, y: 0 });

    useEffect(() => {
      const handleMouseMove = (e: MouseEvent) => {
        mousePositionRef.current = {
          x: (e.clientX / window.innerWidth) * 2 - 1,
          y: (e.clientY / window.innerHeight) * 2 - 1,
        };
      };
      window.addEventListener("mousemove", handleMouseMove);
      return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    const handleLogin = async () => {
      try {
        setFormError("");
        if (!email || !password) {
          setFormError("Please enter both email and pasword to continue!!");
          return;
        }
        setIsLoading(true);
        const res = await axios.post(`${baseUrl}/users/login`, {
          username: email,
          password,
        });
        // localStorage.setItem("token", res.data?.token);
        // setShowOTP(true);

        localStorage.setItem("token", res.data?.token);
        if (res.data?.user?.role === "admin") {
          location.href = "/admin";
          return;
        }
        if (res.data?.user?.role === "operator") {
          location.href = "/operator";
          return;
        }

        setOtpFormError("Your role is not allowed  here");
      } catch (error: any) {
        setFormError(
          error?.response?.data?.detail ||
            "Something went wrong please try again!!!"
        );
      } finally {
        setIsLoading(false);
      }
    };

    const handleOTPChange = (index: number, value: string) => {
      const sanitized = value.replace(/\D/g, "");

      if (sanitized.length === 0) return;

      const updatedOTP = [...otp];
      let currentIndex = index;

      for (let i = 0; i < sanitized.length && currentIndex < 6; i++) {
        updatedOTP[currentIndex] = sanitized[i];
        currentIndex++;
      }

      setOTP(updatedOTP);

      if (sanitized.length === 1 && index < 5) {
        otpRefs.current[index + 1]?.focus();
      } else if (sanitized.length > 1) {
        const nextEmpty = updatedOTP.findIndex((d, i) => d === "" && i > index);
        if (nextEmpty !== -1) {
          otpRefs.current[nextEmpty]?.focus();
        }
      }
    };

    const handleOTPKeyDown = (
      index: number,
      e: React.KeyboardEvent<HTMLInputElement>
    ) => {
      if (e.key === "Backspace") {
        if (otp[index] === "") {
          otpRefs.current[index - 1]?.focus();
        } else {
          const updatedOTP = [...otp];
          updatedOTP[index] = "";
          setOTP(updatedOTP);
        }
      }
    };

    const handleVerifyOTP = async (e: any) => {
      e.preventDefault();
      try {
        if (otp?.length !== 6) {
          setFormError("Please enter a full otp");
          return;
        }
        setIsLoading(true);
        const res = await axios.post(`${baseUrl}/users/verify-otp`, {
          otp: otp.join(""),
        });

        localStorage.setItem("token", res.data?.token);
        if (res.data?.user?.role === "admin") {
          location.href = "/admin";
          return;
        }
        if (res.data?.user?.role === "operator") {
          location.href = "/operator";
          return;
        }

        setOtpFormError("Your role is not allowed  here");
      } catch (error: any) {
        setOtpFormError(
          error?.response?.data?.detail ||
            "Something went wrong!! Please try again"
        );
      } finally {
        setIsLoading(false);
      }
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-green-50 relative overflow-hidden">
        <AnimatedBgElements />

        <div className="relative z-10 min-h-screen flex items-center justify-center p-6">
          {!showOTP ? (
            <div className="w-full flex flex-col md:flex-row items-center justify-center gap-8">
              {/* Branding / Left Column */}
              <div className="text-center animate-fade-in md:px-16">
                <div className="relative inline-block">
                  <div className="w-20 h-20 p-2 bg-gradient-to-br from-green-500 to-green-600 rounded-3xl flex items-center justify-center mb-6 shadow-2xl transform hover:scale-105 transition-all duration-300">
                    <Image
                      src={"/logoWhite.png"}
                      width={300}
                      height={300}
                      alt="logo"
                      className="h-full w-full"
                    />
                    <div className="absolute -inset-2 rounded-3xl blur opacity-30 animate-pulse" />
                  </div>
                </div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-green-600 bg-clip-text text-transparent mb-2">
                  Detector
                </h1>
                <p className="text-gray-600 text-lg font-medium">
                  Securing Academic Integrity
                </p>
                <div className="hidden md:flex max-w-md  flex-wrap justify-center gap-8 mt-8">
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Trusted by 500+ institutions</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>AI-powered</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Enhances academic integrity</span>
                  </div>
                </div>
              </div>

              {/* Login Form / Right Column */}
              <div className="bg-white/80 w-full max-w-md backdrop-blur-xl rounded-3xl shadow-2xl p-8 transform hover:scale-[1.02] transition-all duration-300">
                <form className="space-y-6" onSubmit={handleLogin}>
                  {!!formError && (
                    <div className="bg-red-900/10 p-4 rounded-xl">
                      <p className="text-sm  text-red-600 font-bold">
                        {formError}
                      </p>
                    </div>
                  )}
                  {/* Email Field */}
                  <div className="relative">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail
                        className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 transition-colors ${
                          focusedInput === "email"
                            ? "text-green-500"
                            : "text-gray-400"
                        }`}
                      />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onFocus={() => setFocusedInput("email")}
                        onBlur={() => setFocusedInput(null)}
                        placeholder="Enter your email"
                        required
                        className="w-full pl-12 pr-4 py-4 bg-gray-50/50 border-2 border-gray-200 rounded-2xl focus:border-green-500 focus:bg-white focus:ring-4 focus:ring-green-100 transition-all duration-300 text-gray-800 placeholder-gray-500"
                      />
                    </div>
                  </div>

                  {/* Password Field */}
                  <div className="relative">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Password
                    </label>
                    <div className="relative">
                      <Lock
                        className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 transition-colors ${
                          focusedInput === "password"
                            ? "text-green-500"
                            : "text-gray-400"
                        }`}
                      />
                      <input
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onFocus={() => setFocusedInput("password")}
                        onBlur={() => setFocusedInput(null)}
                        placeholder="Enter your password"
                        required
                        className="w-full pl-12 pr-12 py-4 bg-gray-50/50 border-2 border-gray-200 rounded-2xl focus:border-green-500 focus:bg-white focus:ring-4 focus:ring-green-100 transition-all duration-300 text-gray-800 placeholder-gray-500"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-green-500 transition-colors"
                      >
                        {showPassword ? (
                          <EyeOff className="w-5 h-5" />
                        ) : (
                          <Eye className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="text-right">
                    <button
                      type="button"
                      className="text-sm text-green-600 hover:text-green-700 font-medium transition-colors"
                    >
                      Forgot Password?
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={handleLogin}
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-4 px-6 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Signing In...</span>
                      </>
                    ) : (
                      <>
                        <span>Sign In</span>
                        <ArrowRight className="w-5 h-5" />
                      </>
                    )}
                  </button>
                </form>
                <p className="text-center text-gray-600 mt-8">
                  Don’t have an account?{" "}
                  <button className="text-green-600 hover:text-green-700 font-semibold transition-colors">
                    Sign up
                  </button>
                </p>
              </div>
            </div>
          ) : (
            <div className="w-full max-w-md animate-fade-in">
              <form
                onSubmit={handleVerifyOTP}
                className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8 text-center"
              >
                {!!otpFormError && (
                  <div className="bg-red-900/10 p-4 rounded-xl mb-4">
                    <p className="text-sm  text-red-600 font-bold">
                      {otpFormError}
                    </p>
                  </div>
                )}
                <div className="relative inline-block mb-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-3xl flex items-center justify-center shadow-2xl">
                    <Smartphone className="w-10 h-10 text-white" />
                  </div>
                  <div className="absolute -inset-2 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-3xl blur opacity-30 animate-pulse" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  Verify Your Identity
                </h2>
                <p className="text-gray-600 mb-8">
                  We’ve sent a 6-digit verification code to your email address.
                </p>
                <div className="flex justify-center gap-3 mb-8">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      type="text"
                      value={digit}
                      onChange={(e) => handleOTPChange(index, e.target.value)}
                      onKeyDown={(e) => handleOTPKeyDown(index, e)}
                      className="w-12 h-12 text-center text-xl font-bold border-2 border-gray-200 rounded-xl focus:border-yellow-500 focus:ring-4 focus:ring-yellow-100 transition-all duration-300"
                      maxLength={1}
                      ref={(el: any) => (otpRefs.current[index] = el)}
                    />
                  ))}
                </div>
                <button
                  type="submit"
                  disabled={isLoading || otp.some((digit) => !digit)}
                  className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white font-semibold py-4 px-6 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed mb-4"
                >
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Verifying...</span>
                    </>
                  ) : (
                    <>
                      <Zap className="w-5 h-5" />
                      <span>Verify Code</span>
                    </>
                  )}
                </button>
                <p className="text-sm text-gray-600">
                  Didn’t receive the code?{" "}
                  <button
                    className="text-yellow-600 hover:text-yellow-700 font-semibold transition-colors"
                    type="button"
                  >
                    Resend
                  </button>
                </p>
              </form>
            </div>
          )}
        </div>
      </div>
    );
  };

  export default DetectorLogin;
