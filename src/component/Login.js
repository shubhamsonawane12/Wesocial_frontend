import { useState } from "react";
import "../css/login.css";
import Cookies from "universal-cookie";
import loginImg from "../img/loginimg.avif";
import { Link } from 'react-router-dom';




function Login (){

      const cookies = new Cookies();
  const [formData, setFormData] = useState({
  
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "https://wesocial-backend.onrender.com/api/auth/login ",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      const data = await response.json();
      if (response.ok) {
        console.log("Login Successful:", data);
        cookies.set("token", data.token, { path: "/" });
        window.location.href = '*';

      } else {
        console.error("Login error: ", data.message);
      }
    } catch (error) {
      console.error("Login failed: ", error);
    }
  };
    return (
<>
   <div className="Login_main_container">
      <section className="Login_form-section">
        <div className="Login_form-wrapper">
          <h2 className="Login_title">Welcome Back!</h2>
          <h6 className="Login_title">Please enter your login detail below</h6>
          {/* <p className="title">Please </p> */}

          <form className="Login_form" onSubmit={handleSubmit}>
            <div className="Login_form-row">
              <div className="Login_form-group">
                {/* <label>
                  <span className="sr-only">First Name</span>
                  <input
                    type="text"
                    name="Firstname"
                    placeholder="First Name"
                    className="form-input"
                    required
                    onChange={handleChange}
                    value={formData.Firstname}
                  />
                </label> */}
              </div>
              <div className="Login_form-group">
                {/* <label>
                  <span className="sr-only">Last Name</span>
                  <input
                    id="last-name"
                    type="text"
                    name="Lastname"
                    placeholder="Last Name"
                    className="form-input"
                    required
                    onChange={handleChange}
                    value={formData.Lastname}
                  />
                </label> */}
              </div>
            </div>
            <div className="Login_form-group">
              <label>
                <span className="Login_sr-only">Email address</span>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="form-input" 
                  required
                  onChange={handleChange}
                  value={formData.email}
                />
              </label>
            </div>
            <div className="Login_form-group">
              <label>
                <span className="sr-only">Password</span>
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  className="form-input"
                  required
                  onChange={handleChange}
                  value={formData.password}
                />
              </label>
            </div>
            <div className="Login_form-group">
              <input
                type="submit"
                value="Submit"
                className="Login_form-submit"
              />
            </div>

            <footer className="Login_form-footer">
              <div>
                <a href="#" className="Login_form-link">Forgot password?</a>
              </div>
              <div>
              Don't have an account?
               <Link to="/register"> <a href="#" className="Login_form-link"> Sign Up</a></Link>
              </div>
            </footer>
          </form>
        </div>
      </section>
      <div className="login_img">
      <img src={loginImg} alt="" />

      </div>
    </div>
    
</>
    );
}
export default Login;