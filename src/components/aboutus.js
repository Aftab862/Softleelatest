import Footer from "./small/footer";
import Header from "./small/header";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";


const Aboutus = () => {

  return (
    <>
      <Header />
      <section className="aboutus">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-sm-6">
              <h3 className="main-tit">Term and Conditions</h3>
              <p className="aboutustext">
                Softliee.com is one of the best mobile phones review website on the internet.
                This site provides the clear information about any mobile phone device that is 100% official and authenticated.
                Softliee.com information is up to date and user can get news related new device that launches in the market as
                early as possible. Softliee.com is the Pakistans most ranked site that provides user all updates related mobiles
                phones of every company like Samsung, Oppo, Xiaomi, Redmi, Realme, Apple etc. with prices.
              </p>

              <Link to="/contact" className="contact-us">
                Contact us
              </Link>
            </div>
            <div className="col-sm-6">
              <img
                className="img-fluid about-us-img"
                src="../../assets/images/blogdetails/features.png"
                alt=""
              />
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};
export default Aboutus;
