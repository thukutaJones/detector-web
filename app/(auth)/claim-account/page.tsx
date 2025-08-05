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
import { useRouter } from "next/navigation";
import { decodeToken } from "@/utils/decodeToken";

const DetectorSignUp: React.FC = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [focusedInput, setFocusedInput] = useState<string | null>(null);
  const [formError, setFormError] = useState<string>("");
  const mousePositionRef = useRef({ x: 0, y: 0 });
  const [showOTP, setShowOTP] = useState(false);
  const [otp, setOTP] = useState<string[]>(Array(6).fill(""));
  const [otpFormError, setOtpFormError] = useState<string>("");
  const otpRefs = useRef<Array<HTMLInputElement | null>>([]);
  const [isResendingOTP, setIsResendingOTP] = useState<boolean>(false);
  const [infoMsg, setInfoMsg] = useState<string>("");

  const router = useRouter();

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

  const handleClaimAccount = async () => {
    if (!email) {
      setFormError("Please enter your email");
      return;
    }

    setFormError("");
    setIsLoading(true);

    try {
      await axios.post(`${baseUrl}/api/v1/auth/claim-account`, { email });
      setShowOTP(true);
      setOTP(Array(6).fill(""));
      otpRefs.current[0]?.focus();
    } catch (error: any) {
      setFormError(
        error?.response?.data?.detail ||
          "Something went wrong. Please try again."
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
    const updatedOTP = [...otp];

    if (e.key === "Backspace") {
      if (otp[index] === "" && index > 0) {
        updatedOTP[index - 1] = "";
        otpRefs.current[index - 1]?.focus();
      } else {
        updatedOTP[index] = "";
      }
      setOTP(updatedOTP);
    } else if (e.key === "ArrowLeft" && index > 0) {
      otpRefs.current[index - 1]?.focus();
    } else if (e.key === "ArrowRight" && index < otp.length - 1) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();

    if (otp.some((d) => d.trim() === "")) {
      setOtpFormError("Please enter all 6 digits");
      return;
    }

    setOtpFormError("");
    setInfoMsg("");
    setIsLoading(true);

    try {
      const res = await axios.post(`${baseUrl}/api/v1/auth/verify-token`, {
        email,
        otp: otp.join(""),
      });

      router.push(`/claim-account/${res.data?.token}`);
    } catch (error: any) {
      setOtpFormError(
        error?.response?.data?.detail || "Invalid or expired code"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOTP = async () => {
    setIsResendingOTP(true);
    setOtpFormError("");
    setInfoMsg("");

    try {
      await axios.post(`${baseUrl}/api/v1/auth/resend-otp`, { email });
      setInfoMsg("A new OTP has been sent to your email.");
      setOTP(Array(6).fill(""));
      otpRefs.current[0]?.focus();
    } catch (error: any) {
      setOtpFormError(
        error?.response?.data?.detail || "Failed to resend OTP. Try again."
      );
    } finally {
      setIsResendingOTP(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-green-50 relative overflow-hidden">
      <AnimatedBgElements />

      {!showOTP ? (
        <div className="relative z-10 min-h-screen flex items-center justify-center p-6">
          <div className="w-full flex flex-col md:flex-row items-center justify-center gap-8">
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

            <div className="bg-white/80 w-full max-w-md backdrop-blur-xl rounded-3xl shadow-2xl p-8 transform hover:scale-[1.02] transition-all duration-300">
              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                {!!formError && (
                  <div className="bg-red-900/10 p-4 rounded-xl">
                    <p className="text-sm  text-red-600 font-bold">
                      {formError}
                    </p>
                  </div>
                )}
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

                <button
                  type="button"
                  onClick={handleClaimAccount}
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-4 px-6 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Checking Account...</span>
                    </>
                  ) : (
                    <>
                      <span>Claim Account</span>
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>
              </form>
              <p className="text-center text-gray-600 mt-8">
                Already have an account?{" "}
                <button
                  className="text-green-600 hover:text-green-700 font-semibold transition-colors"
                  type="button"
                  onClick={() => (location.href = "/sign-in")}
                >
                  Sign in
                </button>
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full animate-fade-in flex items-center justify-center min-h-screen">
          <form
            onSubmit={handleVerifyOTP}
            className="bg-white/90 backdrop-blur-xl w-[95%] md:w-[35%] rounded-3xl shadow-2xl border border-white/20 p-8 text-center"
          >
            {!!otpFormError && (
              <div className="bg-red-900/10 p-4 rounded-xl mb-4">
                <p className="text-sm  text-red-600 font-bold">
                  {otpFormError}
                </p>
              </div>
            )}
            {!!infoMsg && (
              <div className="bg-red-900/10 p-4 rounded-xl mb-4">
                <p className="text-sm  text-orange-600 font-bold">{infoMsg}</p>
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
                  className="w-12 h-12 text-center text-xl font-bold border-2 text-black border-gray-200 rounded-xl focus:border-yellow-500 focus:ring-4 focus:ring-yellow-100 transition-all duration-300"
                  maxLength={1}
                  autoFocus={index === 0}
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
                disabled={isResendingOTP}
                onClick={handleResendOTP}
              >
                {isResendingOTP ? <p>Resening...</p> : <p>Resend</p>}
              </button>
            </p>
          </form>
        </div>
      )}
    </div>
  );
};

export default DetectorSignUp;
