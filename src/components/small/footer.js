import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
import YouTubeIcon from '@mui/icons-material/YouTube';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import PinterestIcon from '@mui/icons-material/Pinterest';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { IsMobileWidth, IsTabletWidth } from '../utils';
import { useEffect, useState } from 'react';
import { Adsense } from '@ctrl/react-adsense';

const Footer = () => {
    const [closead, setclosead] = useState(false)
    const mobileWidth = IsMobileWidth()
    const tabletWidth = IsTabletWidth()
    // useEffect(() => {
    //     const script1 = document.createElement('script');
    //     const script2 = document.createElement('script');
    //     const script3 = document.createElement('script');

    //     script1.src = 'https://www.googletagmanager.com/gtag/js?id=UA-171020966-1';
    //     script2.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2933454440337038';
    //     script3.src = 'https://www.googletagmanager.com/gtag/js?id=UA-171020966-1';
    //     script1.async = true;
    //     script2.async = true;
    //     script3.async = true;
    //     document.body.appendChild(script1);
    //     document.body.appendChild(script2);
    //     document.body.appendChild(script3);

    //     return () => {
    //         document.body.removeChild(script1);
    //         document.body.removeChild(script2);
    //         document.body.removeChild(script3);
    //     }
    // }, []);
    return (
        <>   {tabletWidth
            ?
            <footer className={mobileWidth ? 'pb-5 mb-4' : ""}>
                <div className="footer-top">
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-4">
                                <img className='logo-img' src="../../assets/images/softliee.png" alt='logo' width="34" height="39" />
                                <p className='bottom-para'>
                                    Softliee is an online mobile phone web where you can discover latest and updated mobile prices in Pakistan.
                                    Softliee team tries to share proper features and specifications along with mobile prices in Pakistan.
                                </p>
                            </div>
                            <div className="col-sm-8">
                                <div className="footer-links-wrap">
                                    <div id="f-first" className="firs-col-fl">
                                        <h3 className="footer-tit">
                                            softliee
                                        </h3>
                                        <ul className="footer-nav">
                                            <li className="single-nav-li">
                                                <a href="/blog" className="single-nav-a"><ChevronRightIcon className="footer-chevron-right" /> Our Blog</a>
                                            </li>
                                            <li className="single-nav-li">
                                                <a href="/contact" className="single-nav-a"><ChevronRightIcon className="footer-chevron-right" /> Contact Us</a>
                                            </li>
                                            <li className="single-nav-li">
                                                <a href="/advertise" className="single-nav-a"><ChevronRightIcon className="footer-chevron-right" /> Advertise with us</a>
                                            </li>
                                            <li className="single-nav-li">
                                                <a href="/privacypolicy" className="single-nav-a"><ChevronRightIcon className="footer-chevron-right" /> Privacy Policy</a>
                                            </li>
                                            <li className="single-nav-li">
                                                <a href="/termsandconditions" className="single-nav-a"><ChevronRightIcon className="footer-chevron-right" /> Terms & Conditions</a>
                                            </li>
                                        </ul>
                                    </div>

                                    <div id="second-col-ft" className="second-col-fl">
                                        <h3 className="footer-tit">
                                            Top Brands
                                        </h3>
                                        <div className="flex justify-content-around">
                                            <ul className="footer-nav for-padd-right">
                                                <li className="single-nav-li">
                                                    <a href="/new-mobile/iphone-mobiles-price" className="single-nav-a"><ChevronRightIcon className="footer-chevron-right" />Apple</a>
                                                </li>
                                                <li className="single-nav-li">
                                                    <a href="/new-mobile/samsung-mobile-phones-prices-in-pakistan" className="single-nav-a"><ChevronRightIcon className="footer-chevron-right" />Samsung</a>
                                                </li>
                                                <li className="single-nav-li">
                                                    <a href="/new-mobile/huawei-mobile-phone-price-in-pakistan" className="single-nav-a"><ChevronRightIcon className="footer-chevron-right" />Huawei</a>
                                                </li>
                                                <li className="single-nav-li">
                                                    <a href="/new-mobile/oppo-mobile-phone-price-in-pakistan" className="single-nav-a"><ChevronRightIcon className="footer-chevron-right" />Oppo</a>
                                                </li>
                                                <li className="single-nav-li">
                                                    <a href="/new-mobile/realme-mobile-phones" className="single-nav-a"><ChevronRightIcon className="footer-chevron-right" /> Realme</a>
                                                </li>
                                            </ul>
                                            <ul className="footer-nav">
                                                <li className="single-nav-li">
                                                    <a href="/new-mobile/infinix-mobile-phones" className="single-nav-a"><ChevronRightIcon className="footer-chevron-right" />Infinix</a>
                                                </li>
                                                <li className="single-nav-li">
                                                    <a href="/new-mobile/honor-mobile-phones" className="single-nav-a"><ChevronRightIcon className="footer-chevron-right" />Honor</a>
                                                </li>
                                                <li className="single-nav-li">
                                                    <a href="/new-mobile/tecno-mobile-phones" className="single-nav-a"><ChevronRightIcon className="footer-chevron-right" /> Techno</a>
                                                </li>
                                                <li className="single-nav-li">
                                                    <a href="/new-mobile/nokia-mobile-phones-price-in-pakistan" className="single-nav-a"><ChevronRightIcon className="footer-chevron-right" /> Nokia</a>
                                                </li>
                                                <li className="single-nav-li">
                                                    <a href="/new-mobile/vivo-mobile-phones-prices-in-pakistan" className="single-nav-a"><ChevronRightIcon className="footer-chevron-right" />Vivo</a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>

                                    <div className="third-col-fl">
                                        <h3 className="footer-tit">
                                            Main Menu
                                        </h3>
                                        <ul className="footer-nav">
                                            <li className="single-nav-li">
                                                <a href="/new-mobile/trending-mobiles" className="single-nav-a"><ChevronRightIcon className="footer-chevron-right" /> Trending Mobiles</a>
                                            </li>
                                            <li className="single-nav-li">
                                                <a href="/top-upcoming-mobile-phones-in-2023" className="single-nav-a"><ChevronRightIcon className="footer-chevron-right" /> Upcoming Mobiles</a>
                                            </li>
                                            <li className="single-nav-li">
                                                <a href="/compare-mobile-phone" className="single-nav-a"><ChevronRightIcon className="footer-chevron-right" /> Compare Mobile</a>
                                            </li>
                                            <li className="single-nav-li">
                                                <a href="/phonefinder" className="single-nav-a"><ChevronRightIcon className="footer-chevron-right" />Phone Finder</a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-2">
                                <h3 className="footer-tit donwload-app">
                                    Download App
                                </h3>
                                <a href="https://play.google.com/store/apps/details?id=com.mobilestore.softliee&hl" target="_blank">  <img className='playstore-img' src="../../assets/images/icons/playstore.png" alt='logo' width="194" height="57" /></a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="footer-bottom">
                    <div className="container">
                        <div className="forborder-top">

                            <div className="row align-items-center">


                                <div className="col-sm-6">
                                    <p className='foot-bottom-txt'>Softliee Pakistan © 2023 All Rights Reserved <span>Softliee.com</span></p>
                                </div>
                                <div className="col-sm-6">
                                    <div className="footer-icons-wrapp">

                                        <div className="foot-icons">
                                            <a href="https://www.facebook.com/softliee/" target="_blank"> <FacebookRoundedIcon /></a>
                                            <a href="https://www.youtube.com/channel/UCui5-jNud8arKsWsbt3WqeQ" target="_blank">  <YouTubeIcon /></a>
                                            <a href="https://pk.linkedin.com/showcase/softliee" target="_blank">  <LinkedInIcon /></a>
                                            <a href="https://www.pinterest.com/softliee/" target="_blank"> <PinterestIcon /></a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>



            </footer>

            :

            <footer className={mobileWidth ? 'pb-5 mb-4' : ""}>
                <div className="footer-top">
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-3">
                                <img className='logo-img' src="../../assets/images/softliee.png" alt='logo' width="34" height="39" />
                                <p className='bottom-para'>
                                    Softliee is an online mobile phone web where you can discover latest and updated mobile prices in Pakistan.
                                    Softliee team tries to share proper features and specifications along with mobile prices in Pakistan.
                                </p>
                            </div>
                            <div className="col-sm-7">
                                <div className="footer-links-wrap">
                                    <div id="f-first" className="firs-col-fl">
                                        <h3 className="footer-tit">
                                            softliee
                                        </h3>
                                        <ul className="footer-nav">
                                            <li className="single-nav-li">
                                                <a href="/blog" className="single-nav-a"><ChevronRightIcon className="footer-chevron-right" /> Our Blog</a>
                                            </li>
                                            <li className="single-nav-li">
                                                <a href="/contact" className="single-nav-a"><ChevronRightIcon className="footer-chevron-right" /> Contact Us</a>
                                            </li>
                                            <li className="single-nav-li">
                                                <a href="/advertise" className="single-nav-a"><ChevronRightIcon className="footer-chevron-right" /> Advertise with us</a>
                                            </li>
                                            <li className="single-nav-li">
                                                <a href="/privacypolicy" className="single-nav-a"><ChevronRightIcon className="footer-chevron-right" /> Privacy Policy</a>
                                            </li>
                                            <li className="single-nav-li">
                                                <a href="/termsandconditions" className="single-nav-a"><ChevronRightIcon className="footer-chevron-right" /> Terms & Conditions</a>
                                            </li>
                                        </ul>
                                    </div>

                                    <div id="second-col-ft" className="second-col-fl">
                                        <h3 className="footer-tit">
                                            Top Brands
                                        </h3>
                                        <div className="flex justify-content-around">
                                            <ul className="footer-nav for-padd-right">
                                                <li className="single-nav-li">
                                                    <a href="/new-mobile/iphone-mobiles-price" className="single-nav-a"><ChevronRightIcon className="footer-chevron-right" />Apple</a>
                                                </li>
                                                <li className="single-nav-li">
                                                    <a href="/new-mobile/samsung-mobile-phones-prices-in-pakistan" className="single-nav-a"><ChevronRightIcon className="footer-chevron-right" />Samsung</a>
                                                </li>
                                                <li className="single-nav-li">
                                                    <a href="/new-mobile/huawei-mobile-phone-price-in-pakistan" className="single-nav-a"><ChevronRightIcon className="footer-chevron-right" />Huawei</a>
                                                </li>
                                                <li className="single-nav-li">
                                                    <a href="/new-mobile/oppo-mobile-phone-price-in-pakistan" className="single-nav-a"><ChevronRightIcon className="footer-chevron-right" />Oppo</a>
                                                </li>
                                                <li className="single-nav-li">
                                                    <a href="/new-mobile/realme-mobile-phones" className="single-nav-a"><ChevronRightIcon className="footer-chevron-right" /> Realme</a>
                                                </li>
                                            </ul>
                                            <ul className="footer-nav">
                                                <li className="single-nav-li">
                                                    <a href="/new-mobile/infinix-mobile-phones" className="single-nav-a"><ChevronRightIcon className="footer-chevron-right" />Infinix</a>
                                                </li>
                                                <li className="single-nav-li">
                                                    <a href="/new-mobile/honor-mobile-phones" className="single-nav-a"><ChevronRightIcon className="footer-chevron-right" />Honor</a>
                                                </li>
                                                <li className="single-nav-li">
                                                    <a href="/new-mobile/tecno-mobile-phones" className="single-nav-a"><ChevronRightIcon className="footer-chevron-right" /> Techno</a>
                                                </li>
                                                <li className="single-nav-li">
                                                    <a href="/new-mobile/nokia-mobile-phones-price-in-pakistan" className="single-nav-a"><ChevronRightIcon className="footer-chevron-right" /> Nokia</a>
                                                </li>
                                                <li className="single-nav-li">
                                                    <a href="/new-mobile/vivo-mobile-phones-prices-in-pakistan" className="single-nav-a"><ChevronRightIcon className="footer-chevron-right" />Vivo</a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>

                                    <div className="third-col-fl">
                                        <h3 className="footer-tit">
                                           Main Menu
                                        </h3>
                                        <ul className="footer-nav">
                                            <li className="single-nav-li">
                                                <a href="/new-mobile/trending-mobiles" className="single-nav-a"><ChevronRightIcon className="footer-chevron-right" /> Trending Mobiles</a>
                                            </li>
                                            <li className="single-nav-li">
                                                <a href="/top-upcoming-mobile-phones-in-2023" className="single-nav-a"><ChevronRightIcon className="footer-chevron-right" /> Upcoming Mobiles</a>
                                            </li>
                                            <li className="single-nav-li">
                                                <a href="/compare-mobile-phone" className="single-nav-a"><ChevronRightIcon className="footer-chevron-right" /> Compare Mobile</a>
                                            </li>
                                            <li className="single-nav-li">
                                                <a href="/phonefinder" className="single-nav-a"><ChevronRightIcon className="footer-chevron-right" />Phone Finder</a>
                                            </li>

                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-2">
                                <h3 className="footer-tit donwload-app">
                                    Download App
                                </h3>
                                <a href="https://play.google.com/store/apps/details/?id=com.mobilestore.softliee&hl" target="_blank">  <img className='playstore-img' src="../../assets/images/icons/playstore.png" alt='logo' width="15" height="50" /></a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="footer-bottom">
                    <div className="container">
                        <div className="forborder-top">

                            <div className="row align-items-center">


                                <div className="col-sm-6">
                                    <p className='foot-bottom-txt'>Softliee Pakistan © 2023 All Rights Reserved <span>Softliee.com</span></p>
                                </div>
                                <div className="col-sm-6">
                                    <div className="footer-icons-wrapp">

                                        <div className="foot-icons">
                                            <a href="https://www.facebook.com/softliee/" target="_blank"> <FacebookRoundedIcon /></a>
                                            <a href="https://www.youtube.com/channel/UCui5-jNud8arKsWsbt3WqeQ" target="_blank">  <YouTubeIcon /></a>
                                            <a href="https://pk.linkedin.com/showcase/softliee" target="_blank">  <LinkedInIcon /></a>
                                            <a href="https://www.pinterest.com/softliee/" target="_blank"> <PinterestIcon /></a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>



            </footer>}

            {
                // closead ? <></> :
                    // <div className="myanother" style={{ height: "280px !important" }}>

                    //     <div className="myfixedad-wrap" style={{ height: "280px !important" }}>
                    //         <div className={closead ? "close-wrap yes" : "close-wrap"}>

                    //             <div className='close-btn-ads' onClick={() => {
                    //                 closead ? setclosead(false) : setclosead(true)
                    //             }
                    //             }><span>x</span> </div>
                    //         </div>
                    //         {
                    //             closead ? <></> : <Adsense
                    //                 client="ca-pub-2933454440337038"
                    //                 slot="6702463586"
                    //                 style={{ display: "block" }}
                    //                 format="auto"
                    //                 className="myFixedAd"


                    //             />
                    //         }

                    //     </div>
                    // </div>
            }



        </>
    )
}
export default Footer