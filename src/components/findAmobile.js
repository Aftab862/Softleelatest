import Slider from "react-slick";
import Footer from "./small/footer";
import Header from "./small/header";
import Dropdown from "react-bootstrap/Dropdown";
import Sliders from "rc-slider";
import AddIcon from "@mui/icons-material/Add";
import Form from "react-bootstrap/Form";
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import ReactPaginate from "react-paginate";
import {
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { formatAmount, IsMobileWidth, IsTabletWidth } from "./utils";
import SearchBar from "./small/searchbar";
import { useDispatch, useSelector } from "react-redux";
import {
  getProductByBrand,
  getTrendingProducts,
  priceWiseProducts,
  filterMobiles,
} from "../redux/actions/app.actions";

import Spinner from 'react-bootstrap/Spinner';

import { Helmet } from "react-helmet";
import { Adsense } from "@ctrl/react-adsense";
import clsx from "clsx";

const FindAMobile = (props) => {
  let navigate = useNavigate();
  const { slug } = useParams();
  const [isSearchBarOpen, setIsSearchBarOpen] = useState(false);
  const [rangePrices, setRangePrices] = useState([10000, 350000]);
  const [searchParams] = useSearchParams();


  const [itemOffset, setItemOffset] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const [myCurrentItems, setCurrentItems] = useState([]);

  const itemsPerPage = 16;
  const mobileWidth = IsMobileWidth();
  const tabletWidth = IsTabletWidth();

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])


  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    arrow: true,
    responsive: [
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
    ],
  };


  const dispatch = useDispatch();

  const [state, setState] = useState({
    ram: "",
    storage: "",
    camera: "",
    battery: "",
    priceRange: "",
  });

  const handleChange = (name, value) => {
    if (name === "ram") {
      dispatch(
        priceWiseProducts({
          from_price: state.priceRange
            ? 0
            : searchParams.get("from")
              ? searchParams.get("from")
              : undefined,
          to_price: state.priceRange
            ? parseInt(state.priceRange)
            : searchParams.get("to")
              ? searchParams.get("to")
              : undefined,
          filters: [
            {
              2: parseInt(value),
              3: state.storage !== "" ? parseInt(state.storage) : undefined,
              4: state.camera !== "" ? parseInt(state.camera) : undefined,
              6: state.battery !== "" ? parseInt(state.battery) : undefined,
            },
          ],
        })
      );
    } else if (name === "storage") {
      dispatch(
        priceWiseProducts({
          from_price: state.priceRange
            ? 0
            : searchParams.get("from")
              ? searchParams.get("from")
              : undefined,
          to_price: state.priceRange
            ? parseInt(state.priceRange)
            : searchParams.get("to")
              ? searchParams.get("to")
              : undefined,
          filters: [
            {
              2: state.ram !== "" ? parseInt(state.ram) : undefined,
              3: parseInt(value),
              4: state.camera !== "" ? parseInt(state.camera) : undefined,
              6: state.battery !== "" ? parseInt(state.battery) : undefined,
            },
          ],
        })
      );
    } else if (name === "camera") {
      dispatch(
        priceWiseProducts({
          from_price: state.priceRange
            ? 0
            : searchParams.get("from")
              ? searchParams.get("from")
              : undefined,
          to_price: state.priceRange
            ? parseInt(state.priceRange)
            : searchParams.get("to")
              ? searchParams.get("to")
              : undefined,
          filters: [
            {
              2: state.ram !== "" ? parseInt(state.ram) : undefined,
              3: state.storage !== "" ? parseInt(state.storage) : undefined,
              4: parseInt(value),
              6: state.battery !== "" ? parseInt(state.battery) : undefined,
            },
          ],
        })
      );
    } else if (name === "battery") {
      dispatch(
        priceWiseProducts({
          from_price: state.priceRange
            ? 0
            : searchParams.get("from")
              ? searchParams.get("from")
              : undefined,
          to_price: state.priceRange
            ? parseInt(state.priceRange)
            : searchParams.get("to")
              ? searchParams.get("to")
              : undefined,
          filters: [
            {
              2: state.ram !== "" ? parseInt(state.ram) : undefined,
              3: state.storage !== "" ? parseInt(state.storage) : undefined,
              4: state.camera !== "" ? parseInt(state.camera) : undefined,
              6: parseInt(value),
            },
          ],
        })
      );
    } else if (name === "priceRange") {
      dispatch(
        priceWiseProducts({
          from_price: value
            ? 0
            : searchParams.get("from")
              ? searchParams.get("from")
              : undefined,
          to_price: value
            ? parseInt(value)
            : searchParams.get("to")
              ? searchParams.get("to")
              : undefined,
          filters: [
            {
              2: state.ram !== "" ? parseInt(state.ram) : undefined,
              3: state.storage !== "" ? parseInt(state.storage) : undefined,
              4: state.camera !== "" ? parseInt(state.camera) : undefined,
              6: state.battery !== "" ? parseInt(state.battery) : undefined,
            },
          ],
        })
      );
    }

    setState({
      ...state,
      [name]: value,
    });
  };
  const {
    filters,
    trendingProducts,
    productByBrand,
    priceWiseProductsResponse,
    advertisement,
    currency,
  } = useSelector((selectSate) => selectSate.app);

  useEffect(() => {
    if (priceWiseProductsResponse && priceWiseProductsResponse.data && priceWiseProductsResponse.data.$price_wise_product) {

      console.log(priceWiseProductsResponse?.data.$price_wise_product);

      const endOffset = itemOffset + itemsPerPage;
      console.log(`Loading items from ${itemOffset} to ${endOffset}`);
      const currentItems = priceWiseProductsResponse?.data.$price_wise_product.slice(itemOffset, endOffset);
      setCurrentItems(currentItems)
      const pageCount1 = Math.ceil(priceWiseProductsResponse?.data.$price_wise_product.length / itemsPerPage);
      setPageCount(pageCount1)
      console.log(currentItems, "Current ITems");


    }
  }, [priceWiseProductsResponse, itemOffset]);


  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % priceWiseProductsResponse?.data.$price_wise_product.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);

    window.scrollTo(0, 0)
  };


  // const ChangeCurrentItems = () => {
  //   if (blogs) {
  //     if (blogs.data) {
  //       console.log("if");
  //       const endOffset = itemOffset + itemsPerPage;
  //       console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  //       const currentItems = blogs?.data?.blogs.slice(itemOffset, endOffset);
  //       setCurrentItems(currentItems)
  //       const pageCount1 = Math.ceil(blogs.data.blogs.length / itemsPerPage);
  //       setPageCount(pageCount1)
  //       console.log(currentItems, "Current ITems");
  //     }

  //   }
  // }

  // useEffect(() => {
  //   ChangeCurrentItems()
  // }, [blogs.data.blogs, itemOffset])

  const handleImgClick = (slug) => {
    navigate(`/${slug}`, { replace: true });
  };



  useEffect(() => {
    if (searchParams.get("under")) {
      dispatch(
        priceWiseProducts({
          under: searchParams.get("under"),
        })
      );
    } else if (
      searchParams.get("from") &&
      searchParams.get("to") &&
      searchParams.get("ram")
    ) {
      dispatch(
        priceWiseProducts({
          from: searchParams.get("from"),
          to: searchParams.get("to"),
          ram: searchParams.get("ram"),
        })
      );
    } else if (slug === "trending-mobiles") {
      if (!trendingProducts?.data && !trendingProducts?.loading) {
        dispatch(getTrendingProducts());
      }
    } else {
      dispatch(getProductByBrand(slug));
    }
  }, []);


  let localSelectedCurrency = localStorage.getItem("selectedCurrency");

  const getItemPrice = (price) => {
    let selectedCurrency =
      currency.data &&
      currency.data?.currency &&
      currency.data?.currency.find(
        (data) => data?.country === localSelectedCurrency
      );
    if (selectedCurrency) {
      return (parseInt(price / selectedCurrency?.price));

    } else {
      return price;
    }
  };

  console.log(state);

  return (
    <>
      {isSearchBarOpen && mobileWidth ? (
        <>
          <SearchBar onGoBack={() => setIsSearchBarOpen(false)} />
        </>
      ) : (
        <>
          <Helmet>
            <title>
              Softliee Phone Finder- Explore the largest mobile database
              {/* {productByBrand?.data?.brands?.meta_title
                ? productByBrand?.data?.brands?.meta_title
                : "Sofliee"} */}
            </title>
            <meta
              name="description"
              content={
                "Explore a wide range of mobile phone options based on price, RAM, specs and more. Softliee Phone Finder covers top trending mobile companies. Mobile price in Pakistan"
                // productByBrand?.data?.brands?.meta_description

                //   ? productByBrand?.data?.brands?.meta_description
                //   : ""
              }
            />
            <meta
              name="keywords"
              content={
                [
                  "phone finder",
                  "search result",
                  "mobile finder",
                  "mobile searcher",
                  "mobile price",
                  "find mobile in Pakistan",
                  "search mobile by ram and storage",
                  "search mobile by price",
                  "Softliee mobile finder"
                ]

                // productByBrand?.data?.brands?.meta_keywords
                //   ? productByBrand?.data?.brands?.meta_keywords
                //   : ""
              }
            />
            <link rel="canonical" href={window.location.href} />

          </Helmet>
          <Header
            hadleSarchBarOpen={() => setIsSearchBarOpen(true)}
            isSearchBarOpen={isSearchBarOpen}
          />

          <section className="brandslides">
            <div className="container">
              <div className="slider-wrapper filter-prod">
                <Slider {...settings}>
                  <div>
                    <img
                      className="slider-image slider1 img-fluid"
                      src="../../assets/images/filterprod/Branding1.png"
                      alt=""
                    />
                  </div>
                  <div>
                    <img
                      className="slider-image slider1 img-fluid"
                      src="../../assets/images/filterprod/Branding2.png"
                      alt=""
                    />
                  </div>
                  <div>
                    <img
                      className="slider-image slider1 img-fluid"
                      src="../../assets/images/filterprod/Branding3.png"
                      alt=""
                    />
                  </div>
                  <div>
                    <img
                      className="slider-image slider1 img-fluid"
                      src="../../assets/images/filterprod/Branding4.png"
                      alt=""
                    />
                  </div>
                  <div>
                    <img
                      className="slider-image slider1 img-fluid"
                      src="../../assets/images/filterprod/Branding5.png"
                      alt=""
                    />
                  </div>
                  <div>
                    <img
                      className="slider-image slider1 img-fluid"
                      src="../../assets/images/filterprod/Branding6.png"
                      alt=""
                    />
                  </div>
                  <div>
                    <img
                      className="slider-image slider1 img-fluid"
                      src="../../assets/images/filterprod/Branding7.png"
                      alt=""
                    />
                  </div>
                </Slider>
              </div>
            </div>
          </section>
          <section className="ads-section margin-bottom-30px margin-top-50px">
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

          <section className="filter-devices d-none">
            <div className="container">
              <h3 className="main-tit filter-devices-tit">Filter Devices</h3>
            </div>
            <div className="container">
              <div className="row">
                <div className="col-sm-12 py-12">
                  <div className="d-flex">
                    <div className="single-filter">
                      <div className="date-filter-a first-filter">
                        <h6 className="filter-tit">Date</h6>

                        <Form.Select
                          aria-label="Default select example"
                          id="dropdown-basic"
                        >
                          <option>Ascending</option>
                          <option value="1">descending</option>
                        </Form.Select>
                      </div>
                    </div>

                    <div className="single-filter">
                      <div className="date-filter-a">
                        <h6 className="filter-tit">Ram</h6>

                        <Form.Select
                          aria-label="Default select example"
                          id="dropdown-basic"
                          onChange={(e) => handleChange("ram", e.target.value)}
                        >
                          <option value={""}>Select</option>
                          <option value="8">8 gb</option>
                          <option value="7">6 gb</option>
                          <option value="6">4 gb</option>
                          <option value="5">3 gb</option>
                          <option value="4">2 gb</option>
                          <option value="9">16 gb</option>
                          <option value="40">12 gb</option>
                        </Form.Select>
                      </div>
                    </div>

                    <div className="single-filter">
                      <div className="date-filter-a">
                        <h6 className="filter-tit">Storage</h6>
                        <Form.Select
                          aria-label="Default select example"
                          id="dropdown-basic"
                          onChange={(e) =>
                            handleChange("storage", e.target.value)
                          }
                        >
                          <option value={""}>Select</option>
                          <option value="12">64 gb</option>
                          <option value="15">512 gb</option>
                          <option value="11">32 gb</option>
                          <option value="14">256 gb</option>
                          <option value="10">16 gb</option>
                          <option value="13">128 gb</option>
                        </Form.Select>
                      </div>
                    </div>

                    <div className="single-filter">
                      <div className="date-filter-a">
                        <h6 className="filter-tit">Camera</h6>
                        <Form.Select
                          aria-label="Default select example"
                          id="dropdown-basic"
                          onChange={(e) =>
                            handleChange("camera", e.target.value)
                          }
                        >
                          <option value={""}>Select</option>
                          <option value="20">64 mp</option>
                          <option value="38">50 mp</option>
                          <option value="19">48 mp</option>
                          <option value="18">20 mp</option>
                          <option value="17">16 mp</option>
                          <option value="16">12 mp</option>
                          <option value="36">108 mp</option>
                        </Form.Select>
                      </div>
                    </div>

                    <div className="single-filter">
                      <div className="date-filter-a">
                        <h6 className="filter-tit">Battery</h6>
                        <Form.Select
                          aria-label="Default select example"
                          id="dropdown-basic"
                          onChange={(e) =>
                            handleChange("battery", e.target.value)
                          }
                        >
                          <option value={""}>Select</option>
                          <option value="29">7000mah</option>
                          <option value="28">6000mah</option>
                          <option value="27">5000mah</option>
                          <option value="26">4500mah</option>
                          <option value="35">4000mah</option>
                          <option value="25">3000mah</option>
                        </Form.Select>
                      </div>
                    </div>

                    <div className="single-filter">
                      <div className="date-filter-a">
                        <h6 className="filter-tit">Price range</h6>
                        <Form.Select
                          aria-label="Default select example"
                          id="dropdown-basic"
                          onChange={(e) =>
                            handleChange("priceRange", e.target.value)
                          }
                        >
                          <option value={""}>Select</option>
                          <option value={15000}>under 15,000</option>
                          <option value={25000}>under 25,000</option>
                          <option value={35000}>under 35,000</option>
                          <option value={45000}>under 45,000</option>
                          <option value={65000}>under 65,000</option>
                          <option value={85000}>under 85,000</option>
                          <option value={115000}>under 115,000</option>
                        </Form.Select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="oppo-mobiles">
            <div className="container">
              <div className="row">
                <div className="col-sm-12">
                  <h3 className="main-tit text-capialize">
                    {searchParams.get("under")
                      ? "Browse By Budget Mobiles"
                      : searchParams.get("from")
                        ? "Filtered Mobiles"
                        : slug?.replaceAll("-", " ")}
                  </h3>
                </div>
              </div>
            </div>

            <div className="container">
              <div className="row px-2">
                {(
                  priceWiseProductsResponse?.loading
                    ? priceWiseProductsResponse?.loading
                    : slug === "trending-mobiles"
                      ? trendingProducts?.loading
                      : productByBrand?.loading
                ) ? (
                  <div className="w-100 d-flex justify-content-center align-items-center h-40vh">
                    <Spinner />
                  </div>
                ) :
                  myCurrentItems.length > 0 ? (
                    myCurrentItems
                      .map((item, index) => {
                        if (index == 7 || (mobileWidth && index == 3) || (mobileWidth && index == 11)) {

                          return (
                            <>
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
                                    src={`https://softliee.com/softlee/public/storage/product/${item.image}`}
                                    alt={item.name}
                                    onClick={() => handleImgClick(item.slug)}
                                  />
                                  <h3
                                    className={clsx(
                                      "",
                                      mobileWidth && "single-mob-tits",
                                      !mobileWidth && "single-mob-tit"
                                    )}
                                    onClick={() => handleImgClick(item.slug)}
                                  >
                                    {item.name}
                                  </h3>
                                  <Link
                                    to={`/compare-mobile-phone/${item?.slug}/change_product`}
                                    className="compair-btn-with-ico"
                                  >
                                    <h4>Compare</h4>
                                    <AddIcon />
                                  </Link>

                                  <div
                                    className={clsx(
                                      "mt-3",
                                      tabletWidth && "deetails-wrap",
                                      !tabletWidth && "details-wrap"
                                    )}
                                  >
                                    <h4
                                      className={clsx(
                                        " p-1",
                                        tabletWidth && "deetails",
                                        !tabletWidth && "details"
                                      )}
                                    >
                                      {item.ram}
                                      {" / "} {item?.storage} | {item.battery}
                                    </h4>
                                  </div>

                                  <div
                                    className={clsx(
                                      "flex align-items-center justify-content-center",
                                      mobileWidth && "price-icon-wraps",
                                      !mobileWidth && "price-icon-wrap"
                                    )}
                                  >
                                    <h3
                                      className={clsx(
                                        "",
                                        mobileWidth && "single-mob-tits",
                                        !mobileWidth && "single-mob-tit"
                                      )}
                                    >
                                      {localSelectedCurrency === "USD" ? "$ " : "RS "}
                                      {item.orignal_price
                                        ? formatAmount(getItemPrice(item.orignal_price))
                                        : "N/A"}
                                    </h3>
                                  </div>
                                </div>
                              </div>
                              <div className="col-12  pt-4 pb-4">


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
                            </>
                          )
                        }
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
                                src={`https://softliee.com/softlee/public/storage/product/${item.image}`}
                                alt={item.name}
                                onClick={() => handleImgClick(item.slug)}
                              />
                              <h3
                                className={clsx(
                                  "",
                                  mobileWidth && "single-mob-tits",
                                  !mobileWidth && "single-mob-tit"
                                )}
                                onClick={() => handleImgClick(item.slug)}
                              >
                                {item.name}
                              </h3>
                              <Link
                                to={`/compare-mobile-phone/${item?.slug}/change_product`}
                                className="compair-btn-with-ico"
                              >
                                <h4>Compare</h4>
                                <AddIcon />
                              </Link>

                              <div
                                className={clsx(
                                  "mt-3",
                                  tabletWidth && "deetails-wrap",
                                  !tabletWidth && "details-wrap"
                                )}
                              >
                                <h4
                                  className={clsx(
                                    " p-1",
                                    tabletWidth && "deetails",
                                    !tabletWidth && "details"
                                  )}
                                >
                                  {item.ram}
                                  {" / "} {item?.storage} | {item.battery}
                                </h4>
                              </div>

                              <div
                                className={clsx(
                                  "flex align-items-center justify-content-center",
                                  mobileWidth && "price-icon-wraps",
                                  !mobileWidth && "price-icon-wrap"
                                )}
                              >
                                <h3
                                  className={clsx(
                                    "",
                                    mobileWidth && "single-mob-tits",
                                    !mobileWidth && "single-mob-tit"
                                  )}
                                >
                                  {localSelectedCurrency === "USD" ? "$ " : "RS "}
                                  {item.orignal_price
                                    ? formatAmount(getItemPrice(item.orignal_price))
                                    : "N/A"}
                                </h3>
                              </div>
                            </div>
                          </div>
                        );
                      })



                  ) : (
                    <div className="w-100 d-flex justify-content-center align-items-center h-40vh text-danger fw-bolder">
                      No Item Found!
                    </div>
                  )}
                < ReactPaginate
                  breakLabel="..."
                  nextLabel=">"
                  onPageChange={handlePageClick}
                  pageRangeDisplayed={2}
                  pageCount={pageCount}
                  previousLabel="<"
                  renderOnZeroPageCount={null}
                  className="react-paginations"
                  marginPagesDisplayed={2}
                />

                {/* <ReactPaginate
                  forcePage={handlePageClick}
                  previousLabel={"previous"}
                  nextLabel={"next"}
                  breakLabel={<a href="">...</a>}
                  pageCount={pageCount}
                  marginPagesDisplayed={2}
                  pageRangeDisplayed={5}

                  containerClassName={"pagination"}
                  subContainerClassName={"pages pagination"}
                  activeClassName={"active"}
                /> */}
              </div>
            </div>
          </section>
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
      )}
    </>
  );
};
export default FindAMobile;
