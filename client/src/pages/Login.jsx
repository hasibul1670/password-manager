import { motion } from "framer-motion";
import Lottie from "lottie-react";
import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import welcomeAnimation from "../assets/animations/Animation - 1743005982427.json";
import Layout from "../components/Layout";
import { setEmail, setOtpSent, setOtpVerified } from "../store/authSlice";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { email, otpSent } = useSelector((state) => state.auth);
  const [emailInput, setEmailInput] = useState("");
  const [otpValues, setOtpValues] = useState(["", "", "", ""]);
  const otpRefs = [useRef(), useRef(), useRef(), useRef()];

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    dispatch(setEmail(emailInput));
    // TODO: Implement actual OTP sending logic here
    dispatch(setOtpSent(true));
  };

  const handleOtpChange = (index, value) => {
    if (value.length > 1) return;
    const newOtpValues = [...otpValues];
    newOtpValues[index] = value;
    setOtpValues(newOtpValues);

    if (value && index < 3) {
      otpRefs[index + 1].current.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otpValues[index] && index > 0) {
      otpRefs[index - 1].current.focus();
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    const otpString = otpValues.join("");
    if (otpString.length === 4) {
      // TODO: Implement actual OTP verification logic here
      dispatch(setOtpVerified(true));
      navigate("/passwords");
    }
  };

  return (
    <Layout>
      <div className="grid md:grid-cols-2 gap-8 h-full items-center px-4 md:px-8">
        <div className="hidden md:flex justify-center items-center h-full">
          <Lottie
            animationData={welcomeAnimation}
            loop={true}
            style={{ width: "100%", maxWidth: 400, height: "auto" }}
          />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md mx-auto bg-white/90 backdrop-blur-lg p-6 sm:p-8 rounded-2xl shadow-2xl border border-white/20 relative overflow-hidden"
        >
          <div className="md:hidden flex justify-center mb-6">
            <Lottie
              animationData={welcomeAnimation}
              loop={true}
              style={{ width: 200, height: 200 }}
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 z-0" />
          <div className="relative z-10">
            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-poppins"
            >
              Welcome Back
            </motion.h2>
            {!otpSent ? (
              <form onSubmit={handleEmailSubmit} className="space-y-6">
                <div className="relative">
                  <label className="block text-gray-700 text-sm font-medium mb-2 font-inter">
                    Email Address
                  </label>
                  <motion.input
                    whileFocus={{ scale: 1.02 }}
                    type="email"
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    className="w-full p-4 border border-gray-300 rounded-xl bg-white/50 backdrop-blur-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-800 placeholder-gray-500 font-inter"
                    placeholder="Enter your email"
                    required
                  />
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-xl font-medium shadow-lg hover:shadow-blue-500/25 transition-all duration-200 font-inter"
                >
                  Send OTP
                </motion.button>
              </form>
            ) : (
              <form onSubmit={handleOtpSubmit} className="space-y-6">
                <p className="text-gray-600 text-center mb-6">
                  We've sent a verification code to
                  <br />
                  <span className="font-medium text-gray-800">{email}</span>
                </p>
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-4">
                    Enter Verification Code
                  </label>
                  <div className="flex justify-between gap-2">
                    {otpValues.map((value, index) => (
                      <input
                        key={index}
                        ref={otpRefs[index]}
                        type="text"
                        value={value}
                        onChange={(e) => handleOtpChange(index, e.target.value)}
                        onKeyDown={(e) => handleKeyDown(index, e)}
                        className="w-14 h-14 text-center text-2xl font-bold border border-gray-300 rounded-xl bg-white/50 backdrop-blur-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 shadow-inner"
                        maxLength="1"
                        pattern="[0-9]"
                        inputMode="numeric"
                        required
                      />
                    ))}
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-xl font-medium shadow-lg hover:shadow-blue-500/25 transition-all duration-200 font-inter"
                >
                  Verify Code
                </motion.button>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </Layout>
  );
};

export default Login;
