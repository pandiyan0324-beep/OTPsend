import React, { useState } from "react";
import axios from "axios";
import { auth, RecaptchaVerifier, signInWithPhoneNumber } from "./firebase";

function App() {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");

  const setupRecaptcha = () => {
  if (!window.recaptchaVerifier) {
    window.recaptchaVerifier = new RecaptchaVerifier(
      auth,
      "recaptcha-container",
      { size: "invisible" }
    );
  }
};





  const handleSendOtp = async () => {
    try {
      if (!phone) {
        setMessage("Enter phone number");
        return;
      }

      setupRecaptcha();
      const phoneNumber = phone.startsWith("+") ? phone : "+91" + phone.trim();
      const appVerifier = window.recaptchaVerifier;

      const confirmationResult = await signInWithPhoneNumber(
        auth,
        phoneNumber,
        appVerifier
      );
      window.confirmationResult = confirmationResult;

      await axios.post("http://localhost:8080/api/otp/send", { phone: phoneNumber });

      setMessage("OTP sent successfully");
    } catch (err) {
      console.error(err);
      setMessage("Error sending OTP");
    }
  };

  const handleVerifyOtp = async () => {
    try {
      if (!otp) {
        setMessage("Enter OTP");
        return;
      }

      const result = await window.confirmationResult.confirm(otp);
      const idToken = await result.user.getIdToken();

      await axios.post("http://localhost:8080/api/otp/verify", { idToken });

      setMessage("OTP verified successfully!");
    } catch (err) {
      console.error(err);
      setMessage("OTP verification failed");
    }
  };

  return (
    <div style={{ marginTop: "80px", textAlign: "center" }}>
      <h1>OTP Verification</h1>

      <input
        placeholder="Enter phone (+91 or full number)"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      /><br /><br />

      <button onClick={handleSendOtp}>Send OTP</button><br /><br />

      <input
        placeholder="Enter OTP"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
      /><br /><br />

      <button onClick={handleVerifyOtp}>Verify OTP</button>

      <p><b>{message}</b></p>
    </div>
  );
}

export default App;
