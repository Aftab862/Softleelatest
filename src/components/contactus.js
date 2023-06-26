import Footer from "./small/footer";
import Header from "./small/header";
import { IsMobileWidth, IsTabletWidth } from "./utils";
import React, { useEffect, useState } from "react";
import SearchBar from "./small/searchbar";
import { sentContactUsMessage } from "../redux/actions/app.actions";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { isValidMessage } from "./validator";
import { Helmet } from "react-helmet";


const PageContact = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const { sentContactUsMessageResponse, advertisement } = useSelector(
    (selectSate) => selectSate.app
  );

  const tabletWidth = IsTabletWidth();
  const mobileWidth = IsMobileWidth();
  const [isSearchBarOpen, setIsSearchBarOpen] = useState(false);

  const [state, setState] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleChange = (name, value) => {
    setState({
      ...state,
      [name]: value,
    });
  };



  const handleSentMessage = (e) => {
    e.preventDefault();
    let form = new FormData();
    form.append("name", state.firstName + " " + state.lastName);
    form.append("email", state.email);
    form.append("phone", state.phone);
    form.append("title", state.subject);
    form.append("description", state.message);
    dispatch(sentContactUsMessage(form));
  };

  return (
    <>
      <Helmet>
        <title>Contact Us - Softliee.com</title>
        <meta
          name="description"
          content="We do appreciate your feedback. We will be glad to hear from you if: - You have found a mistake in our phone specifications."
        />
      </Helmet>
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
          <div className="container">
            <h3 className="main-tit contact-us-main-tit">Contact us</h3>
          </div>
          <div className="container ">
            <p className=" text-center p-0 lsadjnkad">
              For a timely response to your question or concern, use the
              following contact information to find a point of contact or report
              an issue.
            </p>
            <p className="text-center p-0 pt-3 ddsdada">
              <i className="fa fa-info-circle"></i> Note: Softliee doesn't sell
              any mobiles. Softliee provides mobile prices, specs and reviews
              only.
            </p>
            <form className="row g-3" onSubmit={handleSentMessage}>
              <div className="col-md-6">
                <input
                  type="text"
                  className="form-control form-control-custom"
                  value={state.firstName}
                  onChange={(e) => handleChange("firstName", e.target.value)}
                  placeholder="First Name*"
                />
              </div>
              <div className="col-md-6">
                <input
                  type="text"
                  className="form-control form-control-custom"
                  value={state.lastName}
                  onChange={(e) => handleChange("lastName", e.target.value)}
                  placeholder="Last Name*"
                />
              </div>
              <div className="col-md-6">
                <input
                  type="email"
                  className="form-control form-control-custom"
                  value={state.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  placeholder="Email Address*"
                />
              </div>
              <div className="col-md-6">
                <input
                  type="text"
                  className="form-control form-control-custom"
                  value={state.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                  placeholder="Phone"
                />
              </div>
              <div className="col--md-12">
                <input
                  type="text"
                  className="form-control form-control-custom"
                  value={state.subject}
                  onChange={(e) => handleChange("subject", e.target.value)}
                  placeholder="Subject*"
                />
              </div>
              <div className="col--md-12">
                <textarea
                  className="form-control form-control-custom txt-arr"
                  value={state.message}
                  onChange={(e) => handleChange("message", e.target.value)}
                  placeholder="Message"
                ></textarea>
              </div>
              <div className="col-md-12 text-end">
                <button
                  type="submit"
                  className="btn-form-submit"
                  disabled={sentContactUsMessageResponse?.loading}
                >
                  {sentContactUsMessageResponse?.loading
                    ? "loading..."
                    : "Submit Details"}
                </button>
              </div>
            </form>
          </div>
          <div
            className="text-center contact-us-response-message "

          >
            {sentContactUsMessageResponse?.data ? (
              <div className="text-success">
                {sentContactUsMessageResponse?.data?.message}
              </div>
            ) : null}
          </div>

          {/* <section className="ad-placements">
                <div className="container">
                    <div className="row">
                        <div className="whitesd-bg">
                            <h3 className="addasd-title">
                                Ad Placement
                            </h3>
                        </div>
                    </div>
                </div>
            </section> */}
          <Footer />
        </>
      )}
    </>
  );
};
export default PageContact;
