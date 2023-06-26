import Footer from "./small/footer";
import Header from "./small/header";
import React, { useEffect, useState } from "react";
import SearchBar from "./small/searchbar";
import { IsMobileWidth, IsTabletWidth } from "./utils";
import { useSelector } from "react-redux";
import { Helmet } from "react-helmet";

const PageTerms = () => {
  const tabletWidth = IsTabletWidth();
  const mobileWidth = IsMobileWidth();
  const [isSearchBarOpen, setIsSearchBarOpen] = useState(false);
  const { advertisement } = useSelector((selectSate) => selectSate.app);
  return (
    <>
      <Helmet>
        <title>Terms & Conditions - Softliee.com</title>
        <meta
          name="description"
          content="At Softliee, accessible from Https://Softliee.com/, one of our vital priorities is the privacy of our visitors. This Privacy Policy document contains types of information and data that is collected and recorded by Softliee and how we use it."
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
                <h3 className="main-tit terms">Softliee Terms & Conditions</h3>
              </div>
            </div>
          </div>

          <>
            {mobileWidth ? (
              <div className="container">
                <h3 className="border_less_heading">Personal Data</h3>
                <p className="normal_paragraphs">
                  At Softliee, accessible from{" "}
                  <a href="#" className="mylinkcolor" >
                    Https://Softliee.com/
                  </a>
                  , one of our vital priorities is the privacy of our visitors.
                  This Privacy Policy document contains types of information and
                  data that is collected and recorded by Softliee and how we use
                  it.
                  <br />
                  If you have additional questions or require more information
                  about our Privacy Policy, do not hesitate to Contact through
                  email at Softliee123@gmail.com
                </p>
                <h3 className="border_less_heading">Cookies and Web Beacons</h3>
                <p className="normal_paragraphs">
                  Like any other websites, Softliee uses “cookies”. These
                  cookies are used to store information including visitors’
                  preferences, and the pages on the website that the visitor
                  accessed or visited. The information is used to optimize the
                  users’ experience by customizing our web page content based on
                  visitors’ browser type and/or other information.
                </p>
                <h3 className="border_less_heading">Log Files</h3>
                <p className="normal_paragraphs">
                  Softliee follows a standard procedure of using log files.
                  These files log visitors when they visit websites. All hosting
                  companies do this and a part of hosting services’ analytics.
                  The information collected by log files include internet
                  protocol (IP) addresses, browser type, Internet Service
                  Provider (ISP), date and time stamp, referring/exit pages, and
                  possibly the number of clicks. These are not linked to any
                  information that is personally identifiable. The purpose of
                  the information is for analyzing trends, administering the
                  site, tracking users’ movement on the website, and gathering
                  demographic information.
                </p>
                <h3 className="border_less_heading">
                  Google DoubleClick DART Cookiee
                </h3>
                <p className="normal_paragraphs">
                  Google is one of a third-party vendor on our site. It also
                  uses cookies, known as DART cookies, to serve ads to our site
                  visitors based upon their visit to www.softliee.com and other
                  sites on the internet. However, visitors may choose to decline
                  the use of DART cookies by visiting the Google ad and content
                  network Privacy Policy at the following URL
                  <a href="#" className="mylinkcolor">
                    – https://policies.google.com/technologies/ads
                  </a>
                </p>

                <div className="spacer_custom_10"></div>
              </div>
            ) : (
              <div className="container">
                <h3 className="border_less_heading">Personal Data</h3>
                <p className="normal_paragraph">
                  At Softliee, accessible from{" "}
                  <a href="#" className="mylinkcolor">
                    Https://Softliee.com/
                  </a>
                  , one of our vital priorities is the privacy of our visitors.
                  This Privacy Policy document contains types of information and
                  data that is collected and recorded by Softliee and how we use
                  it.
                  <br />
                  If you have additional questions or require more information
                  about our Privacy Policy, do not hesitate to Contact through
                  email at Softliee123@gmail.com
                </p>
                <h3 className="border_less_heading">Cookies and Web Beacons</h3>
                <p className="normal_paragraph">
                  Like any other websites, Softliee uses “cookies”. These
                  cookies are used to store information including visitors’
                  preferences, and the pages on the website that the visitor
                  accessed or visited. The information is used to optimize the
                  users’ experience by customizing our web page content based on
                  visitors’ browser type and/or other information.
                </p>
                <h3 className="border_less_heading">Log Files</h3>
                <p className="normal_paragraph">
                  Softliee follows a standard procedure of using log files.
                  These files log visitors when they visit websites. All hosting
                  companies do this and a part of hosting services’ analytics.
                  The information collected by log files include internet
                  protocol (IP) addresses, browser type, Internet Service
                  Provider (ISP), date and time stamp, referring/exit pages, and
                  possibly the number of clicks. These are not linked to any
                  information that is personally identifiable. The purpose of
                  the information is for analyzing trends, administering the
                  site, tracking users’ movement on the website, and gathering
                  demographic information.
                </p>
                <h3 className="border_less_heading">
                  Google DoubleClick DART Cookiee
                </h3>
                <p className="normal_paragraph">
                  Google is one of a third-party vendor on our site. It also
                  uses cookies, known as DART cookies, to serve ads to our site
                  visitors based upon their visit to www.softliee.com and other
                  sites on the internet. However, visitors may choose to decline
                  the use of DART cookies by visiting the Google ad and content
                  network Privacy Policy at the following URL
                  <a href="#" className="mylinkcolor">
                    – https://policies.google.com/technologies/ads
                  </a>
                </p>

                <div className="spacer_custom_10"></div>
              </div>
            )}
          </>
          {/* <section>
            <div className="container">
              <div className="row">
                {advertisement.data?.ads &&
                  advertisement.data?.ads[0] &&
                  advertisement.data?.ads[0]?.image && (
                    <img
                      className="single-mob-imgss"
                      src={`https://softliee.com/softlee/public/storage/adds/${advertisement.data?.ads[0]?.image}`}
                      alt=""
                    />
                  )}
              </div>
            </div>
          </section> */}
          <Footer />
        </>
      )}
    </>
  );
};
export default PageTerms;
