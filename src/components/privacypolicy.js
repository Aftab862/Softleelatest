import Footer from "./small/footer";
import Header from "./small/header";
import { IsMobileWidth, IsTabletWidth } from "./utils";
import React, { useEffect, useState } from "react";
import SearchBar from "./small/searchbar";
import { useSelector } from "react-redux";
import { Helmet } from "react-helmet";
const PagePrivacy = () => {
  const mobileWidth = IsMobileWidth();
  const tabletWidth = IsTabletWidth();
  const [isSearchBarOpen, setIsSearchBarOpen] = useState(false);
  const { advertisement } = useSelector((selectSate) => selectSate.app);

  return (
    <>
      <Helmet>
        <title>Privacy Policy - Softliee.com</title>
        <meta
          name="description"
          content="Softliee.com take privacy very seriously. We would never disclose your personal information to third parties or use it for bulk mail lists or newsletters."
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
            <div className="row">
              <div className="col-sm-12 margin-top-50px">
                <h3 className="main-tit">Softliee Privacy Policy</h3>

                <h3 className="border_less_heading">Personal Data</h3>
                <div className="spacer_custom_10"></div>
                <p className="normal_paragraph">
                  Softliee may collect personal information from users in
                  various ways, including, but not limited to, when Users fill
                  out our Daily email form and in connection with other
                  operations, services, functionalities, or funds made available
                  on our Site. We will only collect personal data from Users if
                  they spontaneously provide it to us. Personal information may
                  include Name and Email Addresses. Users have the right to
                  refuse to provide personally identifying information, but
                  doing so may prevent them from participating in certain Server
                  activities.
                </p>
                <h3 className="border_less_heading">
                  Non-Personal Information
                </h3>
                <h3 className="border_less_heading">Mobile</h3>
                <p className="normal_paragraph">
                  When users interact with our Site, we may collect non-personal
                  information about them. Non-personal information may include:
                  The browser name. The type of computer/mobile device.
                  Technical information about the Person's mode of link to our
                  Site.
                </p>

                <h3 className="border_less_heading">Cookies</h3>
                <p className="normal_paragraph">
                  To improve the User experience, our Site may employ "cookies."
                  Cookies will be placed on the hard drive of the user's web
                  browser for record-keeping reasons and to track user behavior
                  on our Site. Users can have their web browser settings, refuse
                  cookies, or receive notifications when cookies are sent. If
                  they do, some functions on our website may not function
                  properly.
                </p>
                <h3 className="border_less_heading">Data Utilization</h3>
                <p className="normal_paragraph">
                  Softliee may collect and use both personal and non-personal
                  information from Users for the specified objectives:
                </p>

                <p className="normal_paragraph">
                  To enhance our website's user experience. We may use user
                  feedback to enhance the features and services on our website.
                  Sending out periodic mailings We may use the email address
                  provided by the user to give a response to their inquiries,
                  questions, surveys, and other demands.
                </p>
                <h3 className="border_less_heading">Data Security</h3>
                <p className="normal_paragraph">
                  We use a suitable sophisticated collection of data,
                  stockpiling, and processing practices, as well as other safety
                  precautions, to prevent access, alteration, disclosure, or
                  destruction of consumer information data stored on our Sites,
                  such as usernames, emails, passwords, messages, transaction
                  data, and other data.
                </p>

                <p className="normal_paragraph">
                  This Privacy Policy applies only to our online activities and
                  is valid for visitors to our website with regards to the
                  information that they shared and/or collect in Softliee. This
                  policy is not applicable to any information collected offline
                  or via channels other than this website.
                </p>
                <h3 className="border_less_heading">Data Exchange</h3>
                <p className="normal_paragraph">
                  We do not sell, trade, or rent User data to third parties. We
                  may share generic accumulated statistical profiles about
                  visitors and users that are not linked to personal information
                  with our business associates, trustable members, and
                  advertisers for the purposes highlighted above.
                </p>
                <div className="spacer_custom_10"></div>
              </div>
            </div>
          </div>
          {/* <section className="ad-placements">
        <div className="container">
          <div className="row">
            <div className="whitesd-bg">
              <h3 className="addasd-title">Ad Placement</h3>
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
export default PagePrivacy;
