import Footer from "./small/footer";
import Header from "./small/header";
import React, { useEffect, useState } from "react";
import SearchBar from "./small/searchbar";
import { IsMobileWidth, IsTabletWidth } from "./utils";
import { Helmet } from "react-helmet";
import axios from "axios";
const Advertisewithus = () => {
  const tabletWidth = IsTabletWidth();
  const mobileWidth = IsMobileWidth();
  const [isSearchBarOpen, setIsSearchBarOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = () => {

    axios.post(`https://softliee.com/softlee/public/api/send_message?name=${name}&email=${email}&description=${message}`).then((res) => {

      setStatus(res.data.message)

    })
  }
  return (
    <>

      <Helmet>
        <title>Advertise With Us- Softliee.com</title>
        <meta
          name="description"
          content="Advertising with us is a unique opportunity to reach a huge global audience in a creative and compelling way. We present your brand’s message in a bigger, bolder and more beautiful way like any other online platform."
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
          <section className="advertise-with-us">
            <div className="container">
              <div className="row">
                <div className="col-sm-12">
                  <div className="row g-3">
                    <h3 className="main-tit">Advertise us</h3>
                    <p>
                      Place your business message in front of the world! We
                      offer effective, very low cost website advertising
                      solutions that enable advertisers to place their banners
                      or text links on our site in various key locations. We can
                      also answer any technical support questions you might
                      have.
                    </p>
                    <div className="col-md-6">
                      <input
                        type="text"
                        className="form-control form-control-custom"
                        placeholder="Full Name*"
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>

                    <div className="col-md-6">
                      <input
                        type="email"
                        className="form-control form-control-custom"
                        placeholder="Email Address*"
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    {/* <div className="col-md-12">
                  <input
                    type="text"
                    className="form-control form-control-custom"
                    placeholder="Phone"
                  />
                </div> */}

                    <div className="col--md-12">
                      <textarea
                        className="form-control form-control-custom txt-arr"
                        placeholder="Message"
                        onChange={(e) => setMessage(e.target.value)}
                      ></textarea>
                    </div>
                    <div className="col-md-12 text-end">
                      <button className="btn-form-submit" onClick={handleSubmit}>
                        Submit Details
                      </button>
                    </div>

                    <div className="text-center advertiseUs ">
                      <div className="text-success">{status}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <Footer />
        </>
      )
      }
    </>
  );
};
export default Advertisewithus;
