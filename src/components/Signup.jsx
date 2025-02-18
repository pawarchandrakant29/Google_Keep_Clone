import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authenticate } from "../redux/actions/noteActions";
import "./bg.css";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      const errMsg = "Passwords do not match";
      setError(errMsg);
      return;
    }
    dispatch(authenticate(email, password, "signup"))
      .then((user) => {
        localStorage.setItem("loggedIn", "true");
        localStorage.setItem("userId", user.uid);
        navigate("/");
      })
      .catch((error) => {
        setError("Email is already in use.");
      });
  };

  return (
    <div className="bg-clr">
      <div className="wrapper center">
        <div className="title-text">
          <div className="title signup">Signup</div>
        </div>
        <div className="form-container">
          <form onSubmit={handleSubmit} className="signup">
            <div className="field">
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="field">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="field">
              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            <div className="field btn">
              <div className="btn-layer"></div>
              <input type="submit" value="Signup" />
            </div>
            {error && (
              <div style={{ color: "red", padding: "5px 0px" }}>{error}</div>
            )}
            <div className="signup-link">
              Already a member?{" "}
              <a href="#" onClick={() => navigate("/")}>
                Login now
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
