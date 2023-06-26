import Footer from "./small/footer";
import Header from "./small/header";
import Slider from "rc-slider";
import clsx from "clsx";
import { useEffect, useState } from "react";
import Popularcomp from "./small/popularcomp";
import PopularMobiles from "./small/popularmobiles";
import SearchBar from "./small/searchbar";
import { IsMobileWidth, selectThemeColors, formatAmount } from "./utils";
import { useNavigate, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
  filterMobiles,
  getFilters,
  resetFilterMobiles,
} from "../redux/actions/app.actions";
import Select from "react-select";
import { getBrands } from "../redux/actions/app.actions";
import Spinner from 'react-bootstrap/Spinner';
import { Helmet } from "react-helmet";
import { Adsense } from "@ctrl/react-adsense";

const PhoneFinder = () => {
  const [rangePrices, setRangePrices] = useState([1000, 500000]);
  const mobileWidth = IsMobileWidth();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { filters, brands, filterMobilesResponse, advertisement, currency } = useSelector(
    (selectSate) => selectSate.app
  );
  const [isSearchBarOpen, setIsSearchBarOpen] = useState(false);
  const [state, setState] = useState({
    brand: "",
    status: "",
    ram: "",
    storage: "",
    backCamera: "",
    frontCamera: "",
    battery: "",
    os: "",
  });

  const handleChange = (name, value) => {
    setState({
      ...state,
      [name]: value,
    });
  };

  useEffect(() => {
    if (!filters?.data) {
      dispatch(getFilters());
    }
    if (!brands?.data) {
      dispatch(getBrands());
    }
    return () => {
      dispatch(
        resetFilterMobiles({
          loading: false,
          error: false,
          data: false,
        })
      );
    };
  }, []);

  const brandList =
    brands &&
    brands?.data &&
    brands?.data?.brands &&
    brands?.data.brands.map((brand) => ({
      label: brand.brand_name,
      value: brand.id,
      ...brand,
    }));

  const search = () => {
    dispatch(
      filterMobiles({
        brand_id: state.brand?.value,
        from_price: rangePrices[0],
        to_price: rangePrices[1],
        filters: [
          {
            1: state.status !== "" ? state.status : undefined,
            2: state.ram !== "" ? state.ram : undefined,
            3: state.storage !== "" ? state.storage : undefined,
            4: state.backCamera !== "" ? state.backCamera : undefined,
            5: state.frontCamera !== "" ? state.frontCamera : undefined,
            6: state.battery !== "" ? state.battery : undefined,
            7: state.os !== "" ? state.os : undefined,
          },
        ],
      })
    );
  };

  const handleImgClick1 = (slug) => {
    navigate(`/${slug}`, { replace: true });
  };

  const resetData = () => {
    setState({
      ...state,
      brand: "",
      status: "",
      ram: "",
      storage: "",
      backCamera: "",
      frontCamera: "",
      battery: "",
      os: "",
    });
    setRangePrices([1000, 500000]);
    dispatch(
      resetFilterMobiles({
        loading: false,
        error: false,
        data: false,
      })
    );
  };

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
          <Helmet>
            <title>Mobile phone finder 2023 - Sofliee.com</title>
            <meta
              name="description"
              content="Phone Finder - Finder Mobile phones Prices, Brand, Display, Cpu, Storage, Camera, Bbattey, Rating and more."
            />
          </Helmet>
          <section className="ads-section margin-top-30px">
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

          <section>
            <div className="container">
              <div className="row">
                <div className="col-sm-12">
                  <h3 className="main-tit phone-finder">
                    Softliee Phone Finder
                  </h3>
                </div>
              </div>
            </div>
          </section>

          <section className="chooserange">
            <div className="container">
              <div className="row">
                <div className="col-sm-12">
                  <div className="all-range-wtap">
                    <h3 className="withoudborder-tit text-center">
                      Choose a Price Range to Search In
                    </h3>

                    <div className="range-button range-area-wrapper">
                      <div className="range-values-wrap">
                        <div className="row align-items-center">
                          <div className="col-sm-5 col-6">
                            <div className="flex  align-items-center">
                              <h4 className="rs-sign">RS</h4>
                              <input
                                className="min-range-price"
                                type="text"
                                placeholder="10000"
                                value={rangePrices[0]}
                              />
                            </div>
                          </div>
                          {mobileWidth ? (
                            ""
                          ) : (
                            <div className="col-sm-2">
                              <h4 className="to-sign">TO</h4>
                            </div>
                          )}
                          <div className="col-sm-5 col-6">
                            <div className="flex align-items-center">
                              {" "}
                              <h4 className="rs-sign">RS</h4>
                              <input
                                className="min-range-price"
                                type="text"
                                placeholder="350,000"
                                value={rangePrices[1]}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="range-area flex">
                        <Slider
                          range
                          className="text-red-400"
                          min={1000}
                          max={500000}
                          defaultValue={[rangePrices[0], rangePrices[1]]}
                          allowCross={false}
                          step={0.01}
                          onChange={(test) => {
                            setRangePrices(test);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="phone-finder-sec">
            <div className="container">
              <div className="row">
                <div className="col-sm-6">
                  <div className="for-light-bg">
                    <h4 className="phone-finder-tit">Select Brand</h4>
                    <Select
                      theme={selectThemeColors}
                      value={state.brand}
                      onChange={(e) => handleChange("brand", e)}
                      id="Brand"
                      options={brandList}
                      isClearable={false}
                      placeholder="Select Brand"
                      noOptionsMessage={() => "No Brand Found"}
                      isLoading={brands?.loading}
                    />
                  </div>
                </div>

                {/* select market status */}
                <div className="col-sm-6">
                  <div className="for-light-bg">
                    <h4 className="phone-finder-tit">
                      {filters?.data?.$filters &&
                        filters?.data?.$filters[0]?.filter_name}
                    </h4>
                    <div className="market-status-wrap">
                      {filters?.data?.$filters &&
                        filters?.data?.$filters[0]?.filter_value &&
                        filters?.data?.$filters[0]?.filter_value.map((data) => (
                          <h3
                            onClick={() => handleChange("status", data?.id)}
                            className={clsx(
                              "ram-single market-status",
                              data?.id === state.status && "active"
                            )}
                          >
                            {data?.filter_value}
                          </h3>
                        ))}
                    </div>
                  </div>
                </div>
                <div className="col-12 mt-3 mb-3">

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
                {/* ram */}
                <div className="col-sm-12">
                  <div className="for-light-bg ram-wrap">
                    <h4 className="phone-finder-tit">
                      {" "}
                      {filters?.data?.$filters &&
                        filters?.data?.$filters[1]?.filter_name}
                    </h4>
                    <div className="ram-phonefinder">
                      {filters?.data?.$filters &&
                        filters?.data?.$filters[1]?.filter_value &&
                        filters?.data?.$filters[1]?.filter_value.map((data, index) => (
                          <h3
                            onClick={() => handleChange("ram", data?.id)}
                            className={clsx(
                              "ram-single phone-finder",
                              data?.id === state.ram && "active"
                            )}
                            key={index}
                          >
                            {data?.filter_value}

                          </h3>
                        ))}
                    </div>
                  </div>
                </div>
                {/* storage */}
                <div className="col-sm-12">
                  <div className="for-light-bg ram-wrap">
                    <h4 className="phone-finder-tit">
                      {" "}
                      {filters?.data?.$filters &&
                        filters?.data?.$filters[2]?.filter_name}
                    </h4>
                    <div className="ram-phonefinder">
                      {filters?.data?.$filters &&
                        filters?.data?.$filters[2]?.filter_value &&
                        filters?.data?.$filters[2]?.filter_value.map((data) => (
                          <h3
                            onClick={() => handleChange("storage", data?.id)}
                            className={clsx(
                              "ram-single phone-finder",
                              data?.id === state.storage && "active"
                            )}
                          >
                            {data?.filter_value}
                          </h3>
                        ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="ads-section margin-top-20px">
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
          {/* main camera */}
          <section className="backcamera">
            <div className="container">
              <div className="row">
                <div className="col-sm-12">
                  <div className="for-light-bg ram-wrap">
                    <h4 className="phone-finder-tit">
                      {" "}
                      {filters?.data?.$filters &&
                        filters?.data?.$filters[3]?.filter_name}
                    </h4>
                    <div className="ram-phonefinder">
                      {filters?.data?.$filters &&
                        filters?.data?.$filters[3]?.filter_value &&
                        filters?.data?.$filters[3]?.filter_value.map((data) => (
                          <h3
                            onClick={() => handleChange("backCamera", data?.id)}
                            className={clsx(
                              "ram-single phone-finder",
                              data?.id === state.backCamera && "active"
                            )}
                          >
                            {data?.filter_value}
                          </h3>
                        ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* front camera */}
          <section className="front-camera1">
            <div className="container">
              <div className="row">
                <div className="col-sm-12">
                  <div className="for-light-bg ram-wrap">
                    <h4 className="phone-finder-tit">
                      {" "}
                      {filters?.data?.$filters &&
                        filters?.data?.$filters[4]?.filter_name}
                    </h4>
                    <div className="ram-phonefinder">
                      {filters?.data?.$filters &&
                        filters?.data?.$filters[4]?.filter_value &&
                        filters?.data?.$filters[4]?.filter_value.map((data) => (

                          <>

                            <h3
                              onClick={() =>
                                handleChange("frontCamera", data?.id)
                              }
                              className={clsx(
                                "ram-single phone-finder",
                                data?.id === state.frontCamera && "active"
                              )}
                            >
                              {data?.filter_value}
                            </h3>
                          </>

                        ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <div className="container">
            <div className="row">
              <div className="col-12 mt-3 mb-3">

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
          {/* battery */}
          <section className="front-camera">
            <div className="container">
              <div className="row">
                <div className="col-sm-12">
                  <div className="for-light-bg ram-wrap">
                    <h4 className="phone-finder-tit">
                      {" "}
                      {filters?.data?.$filters &&
                        filters?.data?.$filters[5]?.filter_name}
                    </h4>
                    <div className="ram-phonefinder">
                      {filters?.data?.$filters &&
                        filters?.data?.$filters[5]?.filter_value &&
                        filters?.data?.$filters[5]?.filter_value.map((data) => (
                          <h3
                            onClick={() => handleChange("battery", data?.id)}
                            className={clsx(
                              "ram-single phone-finder",
                              data?.id === state.battery && "active"
                            )}
                          >
                            {data?.filter_value}
                          </h3>
                        ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="container">
              <div className="row">
                <div className="col-sm-12">
                  <div className="for-light-bg ram-wrap">
                    <h4 className="phone-finder-tit">
                      {" "}
                      {filters?.data?.$filters &&
                        filters?.data?.$filters[6]?.filter_name}
                    </h4>
                    <div className="ram-phonefinder">
                      {filters?.data?.$filters &&
                        filters?.data?.$filters[6]?.filter_value &&
                        filters?.data?.$filters[6]?.filter_value.map((data) => (
                          <h3
                            onClick={() => handleChange("os", data?.id)}
                            className={clsx(
                              "ram-single phone-finder",
                              data?.id === state.os && "active"
                            )}
                          >
                            {data?.filter_value}
                          </h3>
                        ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <div
            className={clsx(
              "",
              mobileWidth && "finders",
              !mobileWidth && "finder"
            )}
          >
            <button
              className={clsx(
                "margin-right",
                mobileWidth && "find-mobi phone-finder-btn",
                !mobileWidth && "find-mob phone-finder-btn"
              )}
              onClick={() => {
                // navigate(`/new-mobile/trending-mobiles?from=${search}`);
                search();
                navigate("/phonefinderdetails")
              }}
            >
              Find mobile
            </button>
            <button
              className={clsx(
                "margin-right",
                mobileWidth && "find-mobiii phone-finder-btn",
                !mobileWidth && "find-mobbb phone-finder-btn"
              )}
              onClick={resetData}
            >
              Cancel
            </button>
          </div>
          {/* <div className="container">
            <div className="row">
              <div className="col-sm-6 col-7">
                <h2 className="main-tit">Filtered Mobiles</h2>
              </div>
              <div className="col-sm-6 col-5"></div>
            </div>
          </div>
          <div className="container mt-2 mb-4">
            <div className="row px-2">
              {filterMobilesResponse?.loading ? (
                <div className="w-100 d-flex justify-content-center align-items-center h-40vh">
                  <Spinner />
                </div>
              ) : filterMobilesResponse?.data?.products &&
                filterMobilesResponse?.data?.products?.length !== 0 ? (
                (filterMobilesResponse?.data?.products).map((item, index) => {
                  return (
                    <div className="col-sm-3 col-6 px-2">
                      <div className="single-m-wrap">
                        <img
                          className="single-mob-img"
                          src={`https://softliee.com/softlee/public/storage/product/${item.image}`}
                          alt=""
                          onClick={() => handleImgClick1(item.slug)}
                        />
                        <h3
                          className="single-mob-tit"
                          onClick={() => handleImgClick1(item.slug)}
                        >
                          {item.name}
                        </h3>
                    

                        <div className="price-icon-wrap flex align-items-center justify-content-center">
                          <h3 className="single-mob-tit">
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
                <div className="w-100 d-flex justify-content-center text-red-600 align-items-center h-40vh">
                  No Date Found!
                </div>
              )}
            </div>
          </div> */}

          <Popularcomp />




          <Footer />
        </>
      )
      }
    </>
  );
};
export default PhoneFinder;
