import { Adsense } from "@ctrl/react-adsense";
import clsx from "clsx";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import Footer from "./small/footer";
import Header from "./small/header";
import { IsMobileWidth, IsTabletWidth } from "./utils";
import AddIcon from "@mui/icons-material/Add";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";


const SearchResultPage = () => {
    const { searchProduct } = useSelector((selectSate) => selectSate.app);
    const tabletWidth = IsTabletWidth();
    const mobileWidth = IsMobileWidth();
    const navigate = useNavigate()
    const handleImgClick = (slug) => {
        navigate(`/${slug}`, { replace: true });
    };


    return (
        <>



            <Helmet>
                <title>
                    Search all Mobile brands and variants on Softliee Mobile Phone database
                    {/* {productByBrand?.data?.brands?.meta_title
                ? productByBrand?.data?.brands?.meta_title
                : "Sofliee"} */}
                </title>
                <meta
                    name="description"
                    content={

                        "Find mobiles at Softliee's Search result. Get a wide range of latest mobile phones, top trending mobiles,upcoming mobiles with prices in Pakistan"
                        // productByBrand?.data?.brands?.meta_description

                        //   ? productByBrand?.data?.brands?.meta_description
                        //   : ""
                    }
                />
                <meta
                    name="keywords"
                    content={

                        [
                            "Search mobile",
                            "search upcoming mobile",
                            "mobile phone in Pakistan"
                        ]



                        // productByBrand?.data?.brands?.meta_keywords
                        //   ? productByBrand?.data?.brands?.meta_keywords
                        //   : ""
                    }
                />
                <link rel="canonical" href={window.location.href} />
            </Helmet>

            <Header />

            <section className="ads-section margin-top-50px margin-bottom-30px">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-12">

                            <p className="ads-text">ADS</p>
                            <Adsense
                                client="ca-pub-2933454440337038"
                                slot="6702463586"
                                style={{ display: "block" }}
                                format="auto"
                                layout="in-article"
                                responsive="true"
                            />
                        </div>


                    </div>
                </div>
            </section>



            <div className="container ram-filter-content">
                <div className="row px-2">
                    <div className="section-head-ram">
                        <h1>Search Results</h1>
                    </div>
                </div>
                <div className="row px-2">
                    {searchProduct ? (
                        searchProduct?.data?.search_Product &&
                        searchProduct?.data?.search_Product.map((items, index) => {

                            return (
                                <div className="col-sm-3 col-6 bg-sm-danger px-2">
                                    <div
                                        className={clsx(
                                            "",
                                            mobileWidth && "single-m-wraps",
                                            !mobileWidth && "single-m-wrap"
                                        )}

                                    >
                                        <img
                                            className="single-mob-img"
                                            //   src="\assets\images\mobiles\image1.png"
                                            src={`https://softliee.com/softlee/public/storage/product/${items.image}`}
                                            alt={items.alt_imag}
                                            onClick={() => handleImgClick(items.slug)}
                                        />
                                        <h3
                                            className={clsx(
                                                "",
                                                mobileWidth && "single-mob-tits",
                                                !mobileWidth && "single-mob-tit"
                                            )} onClick={() => handleImgClick(items.slug)}>{items.name}</h3>

                                        <Link
                                            to={`/compare-mobile-phone/${items?.slug}/change_product`}
                                            className="compair-btn-with-ico"
                                        >
                                            <h4>Compare</h4>
                                            <AddIcon />
                                        </Link>


                                        <div
                                            className={clsx(
                                                "flex align-items-center justify-content-center",
                                                mobileWidth && "price-icon-wraps",
                                                !mobileWidth && "price-icon-wrap"
                                            )}
                                        >
                                            <h3
                                                className={clsx(
                                                    "margin-top-7px",
                                                    mobileWidth && "single-mob-tits",
                                                    !mobileWidth && "single-mob-tit"
                                                )}

                                            >
                                                RS {items.orignal_price}
                                            </h3>
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <></>
                    )}

                </div>
            </div>

            <section className="ads-section margin-bottom-50px">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-12">

                            <p className="ads-text">ADS</p>
                            <Adsense
                                client="ca-pub-2933454440337038"
                                slot="6702463586"
                                style={{ display: "block" }}
                                format="auto"
                                layout="in-article"
                                responsive="true"
                            />
                        </div>


                    </div>
                </div>
            </section>


            <Footer />

        </>
    )
}
export default SearchResultPage