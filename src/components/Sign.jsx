import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./comp.css";

const Sign = () => {
  const [check, setCheck] = useState(false); 
  const [otp, setOtp] = useState(["", "", "", "", "", ""]); 
  const navigate = useNavigate();
  const otpRefs = useRef([]); 

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const rep1 = await fetch(`${import.meta.env.VITE_BACKEND}/auth/sign`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials:'include',
        body: JSON.stringify(formData),
      });
      if (rep1.ok) {
        setCheck(true); 
      } else {
        console.log("Sign-up failed:", rep1.statusText);
      }
    } catch (error) {
      console.log("Error during sign-up:", error);
    }
  };

  const handleOtpChange = (index, value) => {
    if (/^\d?$/.test(value)) { 
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value && index < 5) {
        otpRefs.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpRefs.current[index - 1].focus(); 
    }
  };

  const otpSubmit = async (e) => {
    e.preventDefault();
    const otpValue = otp.join("");
    const otpNumber = parseInt(otpValue, 10);
    console.log("OTP Value:", otpValue); 

    if (otpValue.length !== 6) {
      alert("Please enter a 6-digit OTP.");
      return;
    }

    try {
      const rep2 = await fetch(`${import.meta.env.VITE_BACKEND}/auth/verify-otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ email: formData.email, otp: otpNumber }),
      });
      if (rep2.ok) {
        navigate("/dashboard"); 
      } else {
        const text = await rep2.text();
        console.log("OTP verification failed:", text);
      }
    } catch (error) {
      console.log("Error during OTP verification:", error);
    }
  };

  return !check ? (
    <div className="signup-container">
      <div className="signup-box">
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button type="submit">Sign Up</button>
        </form>
      </div>
    </div>
  ) : (
    <div className="otp-container">
      <h2>Enter OTP</h2>
      <form onSubmit={otpSubmit}>
        <div className="otp-inputs">
          {otp.map((digit, index) => (
            <input
              key={index}
              type="text"
              value={digit}
              maxLength={1}
              onChange={(e) => handleOtpChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              ref={(el) => (otpRefs.current[index] = el)}
              className="otp-box"
            />
          ))}
        </div>
        <button type="submit">Verify OTP</button>
      </form>
    </div>
  );
};

export default Sign;