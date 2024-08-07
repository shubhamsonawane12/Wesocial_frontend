import { useState } from "react";
import "../css/register.css";
import Cookies from "universal-cookie";
import registerImg from "../img/registerimg.avif"
import { Link } from 'react-router-dom';

function Register() {
  const cookies = new Cookies();
  const [formData, setFormData] = useState({
    Firstname: "",
    Lastname: "",
    Username: "", 
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
        "https://wesocial-backend.onrender.com/api/auth/register ",
        
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
        console.log("sign_up Successful:", data);
        cookies.set("token", data.token, { path: "/" });
        window.location.href = '/';
      } else {
        console.error("Sign_up error: ", data.message);
      }
    } catch (error) {
      console.error("Sign_up failed: ", error);
    }
  };

  return (
    <div className="main_container">
      <section className="form-section">

        <div className="form-wrapper">
          <h2 className="title">Register or Join Us</h2>
          <h3 className="title">Meet the Future.</h3>
          <p className="title">Write Together</p>

          <form className="form" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label>
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
                </label>
              </div>
              <div className="form-group">
                <label>
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
                </label>
              </div>
            </div>
               <div className="form-group_username">
              <label>
                <span className="sr-only">Username</span>
                <input
                  type="Username"
                  name="Username"
                  placeholder="Username"
                  className="form-input"
                  required
                  onChange={handleChange}
                  value={formData.Username}
                />
              </label>
              </div>
            <div className="form-group">
           
              <label>
                <span className="sr-only">Email address</span>
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
            <div className="form-group">
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
            <div className="form-group">
              <input
                type="submit"
                value="Submit"
                className="form-submit"
              />
            </div>

            <footer className="form-footer">
              <div>
                <a href="#" className="form-link">Forgot password?</a>
              </div>
              <div>
                Already have an account?
               <Link to="/"> <a  className="form-link">Log in</a></Link>
              </div>
            </footer>
          </form>
        </div>
      </section>

      <div className="register_img">
      <img src={registerImg} alt=" " ></img>

      </div>
    </div>
  );
}

export default Register;
