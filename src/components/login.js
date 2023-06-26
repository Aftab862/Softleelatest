import Footer from "./small/footer";
import Header from "./small/header";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { Avatar, Icon } from "@mui/material";
import { Modal } from "react-bootstrap";
import { useEffect, useRef, useState } from "react";
import SearchBar from "./small/searchbar";
import { IsMobileWidth, IsTabletWidth } from "./utils";
import { useNavigate } from "react-router";
import { login, resetLogin, resetLogot } from "../redux/actions/app.actions";
import { useDispatch, useSelector } from "react-redux";
import Spinner from 'react-bootstrap/Spinner';
import { isValidlogin } from "./validator";
import axios from "axios";
const Login = () => {
  const dispatch = useDispatch();
  const { loginResponse } = useSelector((selectSate) => selectSate.app);
  const [show, setShow] = useState(false);
  const [photo, setPhoto] = useState(false);
  const photoRef = useRef();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const mobileWidth = IsMobileWidth();
  const tabletWidth = IsTabletWidth();
  const [isSearchBarOpen, setIsSearchBarOpen] = useState(false);
  const navigate = useNavigate();

  const handleImageChange = (event) => {
    setPhoto(event.target.files[0]);
  };

  const handleRegister = (e) => {
    e.stopPropagation();
    navigate("/register");
  };

  const [state, setState] = useState({
    email: "",
    password: "",
  });

  const handleChange = (name, value) => {
    setState({
      ...state,
      [name]: value,
    });
  };

  const handleLogin = () => {
    let form = new FormData();


    // axios.post("https://softliee.com/softlee/public/api/login", {
    //   "email": state.email, "password": state.password

    // }).then(function (response) {
    //   
    // })
    //   .catch(function (error) {
    //     
    //   });
    form.append("email", state.email);
    form.append("password", state.password);
    const abc = dispatch(login(form));

  };

  useEffect(() => {
    if (loginResponse.data) {
      localStorage.setItem(
        "softliUserData",
        JSON.stringify(loginResponse.data)
      );
      navigate("/");
    }
  }, [loginResponse.data]);

  useEffect(() => {
    dispatch(resetLogot({
      loading: false,
      error: false,
      data: false,
    }))
    return () => {
      dispatch(resetLogin({
        loading: false,
        error: false,
        data: false,
      }))
    }
  }, [])


  return (
    <>
      {isSearchBarOpen && mobileWidth ? (
        <>
          <SearchBar onGoBack={() => setIsSearchBarOpen(false)} />
        </>
      ) : (
        <>
          <Header
            hadleSarchBarOpen={() => setIsSearchBarOpen(true)}
            isSearchBarOpen={isSearchBarOpen}
          />

          <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
              <Modal.Title>Enter Your Email </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="row">
                <div className="col-sm-12">
                  <input
                    className="input-type-text min-range-price bg-transparent"
                    type="text"
                    placeholder="Email"
                  />
                </div>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <div className="login-forgot">
                <button className="btn-form-submit forgot-btn">
                  Fogot Password
                </button>
              </div>
            </Modal.Footer>
          </Modal>

          <section className="login-page">
            <div className="container">
              <div className="row">
                <h3 className="main-tit">Login with softliee</h3>
                <p>Access to the most powerfull tool in the entire world</p>

                <Tabs
                  defaultActiveKey="login"
                  id="uncontrolled-tab-example"
                  className="mb-3"
                >
                  <Tab eventKey="login" title={<span>Login</span>}>
                    <div id="login-wrapper">
                      <div className="row">
                        <div className="col-sm-12 p-0">
                          <input
                            className="input-type-text min-range-price bg-transparent"
                            type="text"
                            value={state.email}
                            onChange={(e) =>
                              handleChange("email", e.target.value)
                            }
                            placeholder="Email Address"
                          />
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-sm-12 p-0">
                          <input
                            className="input-type-text min-range-price bg-transparent"
                            type="text"
                            value={state.password}
                            onChange={(e) =>
                              handleChange("password", e.target.value)
                            }
                            placeholder="Password"
                          />
                          <div className="login-forgot">
                            {loginResponse?.loading ? (
                              <button
                                disabled
                                className="btn-form-submit login-btn"
                              >
                                <Spinner
                                  className="text-white"
                                />
                              </button>
                            ) : !isValidlogin(state).isAllValid ? (
                              <button className="btn-form-submit-disabled">
                                Login
                              </button>
                            ) : (
                              <button
                                className="btn-form-submit login-btn"
                                onClick={handleLogin}
                              >
                                Login
                              </button>
                            )}

                            {loginResponse.error && (
                              <div className="mt-2 text-red-600">
                                {loginResponse.error}
                              </div>
                            )}

                            {/* <div className="forgot-pass" onClick={handleShow}>
                              Forgot Password
                            </div> */}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Tab>
                  <Tab
                    eventKey="register"
                    onClick={handleRegister}
                    title={<span onClick={handleRegister}>Register</span>}
                  ></Tab>
                </Tabs>
              </div>
            </div>
          </section>
          <Footer />
        </>
      )}
    </>
  );
};
export default Login;
