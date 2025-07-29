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
import { useParams } from "next/navigation";
import axios from "axios";
import { baseUrl } from "@/constants/baseUrl";

const DetectorLogin: React.FC = () => {
  const parms = useParams();
  const token = parms?.token;
  const [showPassword, setShowPassword] = useState<{
    setPassword: boolean;
    comfirmPassword: boolean;
  }>({
    setPassword: false,
    comfirmPassword: false,
  });
  const [password, setPassword] = useState<{
    setPassword: string;
    comfirmPassword: string;
  }>({
    setPassword: "",
    comfirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [focusedInput, setFocusedInput] = useState<string | null>(null);
  const [formError, setFormError] = useState<string>("");
  const otpRefs = useRef<any>([]);
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

  const handleSetPassword = async () => {
    if (!password) return;
    if (password?.setPassword?.length < 8) {
      setFormError("Password can not be less than 8 characters");
      return;
    }
    if (password?.comfirmPassword !== password?.setPassword) {
      setFormError("Passwords does not match");
      return;
    }
    setIsLoading(true);
    try {
      const res = await axios.post(`${baseUrl}/api/v1/auth/set-password`, {
        token,
        password: password?.comfirmPassword,
      });

      console.log(res?.data)

      localStorage.setItem("token", res.data?.token);
      if (res.data?.user?.role === "admin") {
        location.href = "/admin";
        return;
      }
      if (res.data?.user?.role === "operator") {
        location.href = "/operator";
        return;
      }

      setFormError("Your role is not allowed  here");
    } catch (error: any) {
      setFormError(
        error?.response?.data?.detail ||
          "Something went wrong!! Please try again..."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-green-50 relative overflow-hidden">
      <AnimatedBgElements />

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
                  <p className="text-sm  text-red-600 font-bold">{formError}</p>
                </div>
              )}
              <div className="relative">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Set Password
                </label>
                <div className="relative">
                  <Lock
                    className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 transition-colors ${
                      focusedInput === "setPassword"
                        ? "text-green-500"
                        : "text-gray-400"
                    }`}
                  />
                  <input
                    type={showPassword?.setPassword ? "text" : "password"}
                    value={password?.setPassword}
                    onChange={(e) =>
                      setPassword({ ...password, setPassword: e.target.value })
                    }
                    onFocus={() => setFocusedInput("setPassword")}
                    onBlur={() => setFocusedInput(null)}
                    placeholder="Enter your password"
                    required
                    className="w-full pl-12 pr-12 py-4 bg-gray-50/50 border-2 border-gray-200 rounded-2xl focus:border-green-500 focus:bg-white focus:ring-4 focus:ring-green-100 transition-all duration-300 text-gray-800 placeholder-gray-500"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword({
                        ...showPassword,
                        setPassword: !showPassword?.setPassword,
                      })
                    }
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-green-500 transition-colors"
                  >
                    {!showPassword?.setPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              <div className="relative">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Comfirm Password
                </label>
                <div className="relative">
                  <Lock
                    className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 transition-colors ${
                      focusedInput === "comfirmPassword"
                        ? "text-green-500"
                        : "text-gray-400"
                    }`}
                  />
                  <input
                    type={showPassword?.comfirmPassword ? "text" : "password"}
                    value={password?.comfirmPassword}
                    onChange={(e) =>
                      setPassword({
                        ...password,
                        comfirmPassword: e.target.value,
                      })
                    }
                    onFocus={() => setFocusedInput("comfirmPassword")}
                    onBlur={() => setFocusedInput(null)}
                    placeholder="Comfirm your password"
                    required
                    className="w-full pl-12 pr-12 py-4 bg-gray-50/50 border-2 border-gray-200 rounded-2xl focus:border-green-500 focus:bg-white focus:ring-4 focus:ring-green-100 transition-all duration-300 text-gray-800 placeholder-gray-500"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword({
                        ...showPassword,
                        comfirmPassword: !showPassword?.comfirmPassword,
                      })
                    }
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-green-500 transition-colors"
                  >
                    {!showPassword?.comfirmPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>
              <button
                type="button"
                onClick={handleSetPassword}
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-4 px-6 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Setting password...</span>
                  </>
                ) : (
                  <>
                    <span>Set Password</span>
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetectorLogin;
