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
import { register } from "../redux/actions/app.actions";
import { useDispatch, useSelector } from "react-redux";

import Spinner from 'react-bootstrap/Spinner';
import { isValidRegister } from "./validator";
const Register = () => {
  const dispatch = useDispatch();
  const { registerResponse } = useSelector((selectSate) => selectSate.app);
  const [show, setShow] = useState(false);
  const [photo, setPhoto] = useState(false);

  const photoRef = useRef();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const mobileWidth = IsMobileWidth();
  const tabletWidth = IsTabletWidth();
  const navigate = useNavigate();
  const [isSearchBarOpen, setIsSearchBarOpen] = useState(false);

  const handleImageChange = (event) => {
    setPhoto(event.target.files[0]);
  };
  const handleLogin = (e) => {
    e.stopPropagation();
    navigate("/login");
  };



  const [state, setState] = useState({
    userName: "",
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (name, value) => {
    setState({
      ...state,
      [name]: value,
    });
  };

  const handleRegister = () => {
    let form = new FormData();
    form.append("user_name", state.userName);
    form.append("name", state.name);
    form.append("email", state.email);
    form.append("password", state.password);
    form.append("image", photo);
    dispatch(register(form));
  };



  useEffect(() => {
    if (registerResponse.data) {

      localStorage.setItem(
        "softliUserData",
        JSON.stringify(registerResponse.data)
      );
      navigate("/");
    }
  }, [registerResponse.data]);

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
                    value={state.email}
                    onChange={(e) => handleChange("email", e.target.value)}
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
                <h3 className="main-tit">Register with softliee</h3>
                <p>Access to the most powerfull tool in the entire world</p>

                <Tabs
                  defaultActiveKey="register"
                  id="uncontrolled-tab-example"
                  className="mb-3"
                >
                  <Tab
                    eventKey="login"
                    onClick={handleLogin}
                    title={<span onClick={handleLogin}>Login</span>}
                  ></Tab>
                  <Tab eventKey="register" title={<span>Register</span>}>
                    <div id="sign-up-wrapper">
                      <div className="row">
                        <div className="col-sm-12 p-0 w-100 d-flex justify-content-center">
                          <div
                            className="d-flex justify-content-center flex-column align-items-center"
                            onClick={() => photoRef.current.click()}
                          >
                            <Avatar
                              src={photo && URL.createObjectURL(photo)}
                              className="profile_picture"
                            />
                            <p className="overview_details_title-2 mt-2">
                              Upload a image
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-sm-12 p-0">
                          <input
                            className="input-type-text min-range-price bg-transparent"
                            type="text"
                            value={state.userName}
                            onChange={(e) =>
                              handleChange("userName", e.target.value)
                            }
                            placeholder="User Name"
                          />
                          <input
                            className="input-type-text min-range-price bg-transparent"
                            type="text"
                            value={state.name}
                            onChange={(e) =>
                              handleChange("name", e.target.value)
                            }
                            placeholder="Name"
                          />
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
                          <input
                            className="input-type-text min-range-price bg-transparent"
                            type="text"
                            value={state.confirmPassword}
                            onChange={(e) =>
                              handleChange("confirmPassword", e.target.value)
                            }
                            placeholder="Confirm Password"
                          />
                          <label className="iagree mt-3">
                            <input type="checkbox" />I agree to the{" "}
                            <a href="/termsandconditions">
                              Terms & Conditions{" "}
                            </a>{" "}
                            and <a href="/privacypolicy"> Privacy Policy</a>
                          </label>

                          <div className="login-forgot">
                            {registerResponse?.loading ? (
                              <button
                                disabled
                                className="btn-form-submit sign-upbtn"
                              >
                                <Spinner
                                  size={20}
                                  className="text-white"
                                />
                              </button>
                            ) : !isValidRegister(state).isAllValid ? (
                              <button className="btn-form-submit-disabled">
                                Sign Up
                              </button>
                            ) : (
                              <button
                                className="btn-form-submit sign-upbtn"
                                onClick={handleRegister}
                              >
                                Sign Up
                              </button>
                            )}
                            {registerResponse.error && (
                              <div className="mt-2">
                                {registerResponse.error?.message}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    <input
                      accept="image/*"
                      id="contained-button-file"
                      type="file"
                      className="d-none"
                      onChange={handleImageChange}
                      ref={photoRef}
                    />
                  </Tab>
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
export default Register;
