import Footer from "./small/footer";
import Header from "./small/header";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate, useParams } from "react-router";
import Popularcomp from "./small/popularcomp";
import InfoIcon from "@mui/icons-material/Info";
import clsx from "clsx";
import {
  formatAmount,
  IsMobileWidth,
  IsTabletWidth,
  selectThemeColors,
} from "./utils";
import { useEffect, useState } from "react";
import SearchBar from "./small/searchbar";
import { useDispatch, useSelector } from "react-redux";
import {
  getCompareTwoProducts,
  getSingleProducts,
  getAllProductsList,
} from "../redux/actions/app.actions";
import Spinner from 'react-bootstrap/Spinner';

import Select from "react-select";
import { Helmet } from "react-helmet";
import { Adsense } from "@ctrl/react-adsense";

const PageCompare = () => {

  const [myFlag, setMyflag] = useState(false)
  let navigate = useNavigate();
  const mobileWidth = IsMobileWidth();
  const tabletWidth = IsTabletWidth();
  const [state, setState] = useState({
    group1: [
      { name: "Model Name", value: "-", secondValue: "-" },
      { name: "Announce Date", value: "-", secondValue: "-" },
      { name: "Status", value: "-", secondValue: "-" },
    ],
    group2: [
      { name: "Display Type", value: "-", secondValue: "-" },
      { name: "Dimensions", value: "-", secondValue: "-" },
      { name: "Resolution", value: "-", secondValue: "-" },
      { name: "Weight", value: "-", secondValue: "-" },
      { name: "colors", value: "-", secondValue: "-" },
      { name: "Size", value: "-", secondValue: "-" },
      { name: "Protection", value: "-", secondValue: "-" },
      { name: "Extra Features", value: "-", secondValue: "-" },
      { name: "Sensors", value: "-", secondValue: "-" },
    ],
    group3: [
      { name: "2G Network", value: "-", secondValue: "-" },
      { name: "3G Network", value: "-", secondValue: "-" },
      { name: "4G Network", value: "-", secondValue: "-" },
      { name: "5G Networks", value: "-", secondValue: "-" },
      { name: "Sim", value: "-", secondValue: "-" },
    ],
    group4: [
      { name: "OS", value: "-", secondValue: "-" },
      { name: "Chipset", value: "-", secondValue: "-" },
      { name: "CPU", value: "-", secondValue: "-" },
      { name: "GPU", value: "-", secondValue: "-" },
    ],
    group5: [
      { name: "Main Camera", value: "-", secondValue: "-" },
      { name: "Front Camera", value: "-", secondValue: "-" },
      { name: "Features", value: "-", secondValue: "-" },
    ],
    group6: [
      { name: "RAM (Memory)", value: "-", secondValue: "-" },
      { name: "Internal Storage", value: "-", secondValue: "-" },
      { name: "Card slot", value: "-", secondValue: "-" },
    ],
    group7: [
      { name: "Battery Type", value: "-", secondValue: "-" },
      { name: "Capacity", value: "-", secondValue: "-" },
      { name: "Fast battery charging", value: "-", secondValue: "-" },
      { name: "Placement", value: "-", secondValue: "-" },
      { name: "Wireless Charging", value: "-", secondValue: "-" },
    ],
    group8: [
      { name: "Wi-fi Hotspot", value: "-", secondValue: "-" },
      { name: "Bluetooth", value: "-", secondValue: "-" },
      { name: "USB", value: "-", secondValue: "-" },
      { name: "Radio", value: "-", secondValue: "-" },
      { name: "Loudspeaker", value: "-", secondValue: "-" },
    ],
    group9: [
      { name: "Price in PAK", value: "-", secondValue: "-" },
      { name: "Price in USA", value: "-", secondValue: "-" },
    ],
    group10: [],
    firstProduct: "",
    secondProduct: "",
    firstProductText: "",
    secondProductText: "",
  });
  const [isSearchBarOpen, setIsSearchBarOpen] = useState(false);
  const { slug, slug1 } = useParams();
  const dispatch = useDispatch();
  const { compareTwoProducts, allProductsList, advertisement, currency } =
    useSelector((selectSate) => selectSate.app);

  const handleChange = (name, value) => {
    if (name === "secondProduct") {
      navigate(`/compare-mobile-phone/${slug}/${value?.value}`);
      dispatch(getCompareTwoProducts(state.firstProduct?.value, value?.value));
      setState({
        ...state,
        [name]: value,
      });
    } else if (name === "firstProduct") {
      navigate(`/compare-mobile-phone/${value?.value}/${slug1}`);
      dispatch(getCompareTwoProducts(value?.value, state.secondProduct?.value));
      setState({
        ...state,
        [name]: value,
      });
    } else {
      setState({
        ...state,
        [name]: value,
      });
    }
  };

  useEffect(() => {
    dispatch(getAllProductsList());
  }, []);

  useEffect(() => {
    if (slug && slug1) {
      dispatch(getCompareTwoProducts(slug, slug1));
    }
  }, [slug]);


  useEffect(() => {
    if (compareTwoProducts?.data?.first_product?.attribute_values) {
      let group1 = [];
      let group2 = [];
      let group3 = [];
      let group4 = [];
      let group5 = [];
      let group6 = [];
      let group7 = [];
      let group8 = [];
      let group9 = [];
      let group10 = [];

      compareTwoProducts?.data?.first_product?.attribute_values.map(
        (data, index) => {
          if (
            data?.group_id == 1 &&
            data?.attribute_value &&
            data?.attribute_value !== ""
          ) {
            group1.push({
              name: data?.group_values?.value,
              value: data?.attribute_value,
              secondValue:
                compareTwoProducts?.data?.second_product?.attribute_values &&
                  compareTwoProducts?.data?.second_product?.attribute_values[
                    index
                  ]?.attribute_value
                  ? compareTwoProducts?.data?.second_product?.attribute_values[
                    index
                  ]?.attribute_value
                  : "-",
            });
          } else if (
            data?.group_id == 2 &&
            data?.attribute_value &&
            data?.attribute_value !== ""
          ) {
            group2.push({
              name: data?.group_values?.value,
              value: data?.attribute_value,
              secondValue:
                compareTwoProducts?.data?.second_product?.attribute_values &&
                  compareTwoProducts?.data?.second_product?.attribute_values[
                    index
                  ]?.attribute_value
                  ? compareTwoProducts?.data?.second_product?.attribute_values[
                    index
                  ]?.attribute_value
                  : "-",
            });
          } else if (
            data?.group_id == 3 &&
            data?.attribute_value &&
            data?.attribute_value !== ""
          ) {
            group3.push({
              name: data?.group_values?.value,
              value: data?.attribute_value,
              secondValue:
                compareTwoProducts?.data?.second_product?.attribute_values &&
                  compareTwoProducts?.data?.second_product?.attribute_values[
                    index
                  ]?.attribute_value
                  ? compareTwoProducts?.data?.second_product?.attribute_values[
                    index
                  ]?.attribute_value
                  : "-",
            });
          } else if (
            data?.group_id == 4 &&
            data?.attribute_value &&
            data?.attribute_value !== ""
          ) {
            group4.push({
              name: data?.group_values?.value,
              value: data?.attribute_value,
              secondValue:
                compareTwoProducts?.data?.second_product?.attribute_values &&
                  compareTwoProducts?.data?.second_product?.attribute_values[
                    index
                  ]?.attribute_value
                  ? compareTwoProducts?.data?.second_product?.attribute_values[
                    index
                  ]?.attribute_value
                  : "-",
            });
          } else if (
            data?.group_id == 5 &&
            data?.attribute_value &&
            data?.attribute_value !== ""
          ) {
            group5.push({
              name: data?.group_values?.value,
              value: data?.attribute_value,
              secondValue:
                compareTwoProducts?.data?.second_product?.attribute_values &&
                  compareTwoProducts?.data?.second_product?.attribute_values[
                    index
                  ]?.attribute_value
                  ? compareTwoProducts?.data?.second_product?.attribute_values[
                    index
                  ]?.attribute_value
                  : "-",
            });
          } else if (
            data?.group_id == 6 &&
            data?.attribute_value &&
            data?.attribute_value !== ""
          ) {
            group6.push({
              name: data?.group_values?.value,
              value: data?.attribute_value,
              secondValue:
                compareTwoProducts?.data?.second_product?.attribute_values &&
                  compareTwoProducts?.data?.second_product?.attribute_values[
                    index
                  ]?.attribute_value
                  ? compareTwoProducts?.data?.second_product?.attribute_values[
                    index
                  ]?.attribute_value
                  : "-",
            });
          } else if (
            data?.group_id == 7 &&
            data?.attribute_value &&
            data?.attribute_value !== ""
          ) {
            group7.push({
              name: data?.group_values?.value,
              value: data?.attribute_value,
              secondValue:
                compareTwoProducts?.data?.second_product?.attribute_values &&
                  compareTwoProducts?.data?.second_product?.attribute_values[
                    index
                  ]?.attribute_value
                  ? compareTwoProducts?.data?.second_product?.attribute_values[
                    index
                  ]?.attribute_value
                  : "-",
            });
          } else if (
            data?.group_id == 8 &&
            data?.attribute_value &&
            data?.attribute_value !== ""
          ) {
            group8.push({
              name: data?.group_values?.value,
              value: data?.attribute_value,
              secondValue:
                compareTwoProducts?.data?.second_product?.attribute_values &&
                  compareTwoProducts?.data?.second_product?.attribute_values[
                    index
                  ]?.attribute_value
                  ? compareTwoProducts?.data?.second_product?.attribute_values[
                    index
                  ]?.attribute_value
                  : "-",
            });
          } else if (
            data?.group_id == 9 &&
            data?.attribute_value &&
            data?.attribute_value !== ""
          ) {
            group9.push({
              name: data?.group_values?.value,
              value: data?.attribute_value,
              secondValue:
                compareTwoProducts?.data?.second_product?.attribute_values &&
                  compareTwoProducts?.data?.second_product?.attribute_values[
                    index
                  ]?.attribute_value
                  ? compareTwoProducts?.data?.second_product?.attribute_values[
                    index
                  ]?.attribute_value
                  : "-",
            });
          } else if (
            data?.group_id == 10 &&
            data?.attribute_value &&
            data?.attribute_value !== ""
          ) {
            group10.push({
              name: data?.group_values?.value,
              value: data?.attribute_value,
              secondValue:
                compareTwoProducts?.data?.second_product?.attribute_values &&
                  compareTwoProducts?.data?.second_product?.attribute_values[
                    index
                  ]?.attribute_value
                  ? compareTwoProducts?.data?.second_product?.attribute_values[
                    index
                  ]?.attribute_value
                  : "-",
            });
          }
        }
      );

      setState({
        ...state,
        group1,
        group2,
        group3,
        group4,
        group5,
        group6,
        group7,
        group8,
        group9,
        group10,
        firstProduct: compareTwoProducts?.data?.first_product?.name
          ? {
            label: compareTwoProducts?.data?.first_product?.name,
            value: compareTwoProducts?.data?.first_product?.slug,
          }
          : "",
        secondProduct: compareTwoProducts?.data?.second_product?.name
          ? {
            label: compareTwoProducts?.data?.second_product?.name,
            value: compareTwoProducts?.data?.second_product?.slug,
          }
          : "",
      });
    }
  }, [compareTwoProducts?.data?.first_product]);



  const handleSearch = (type) => {
    if (type === 2) {
      dispatch(getSingleProducts(state.secondProduct));
    }
  };

  const allProducts =
    allProductsList.data &&
    allProductsList.data?.$products &&
    allProductsList.data.$products.map((product) => ({
      label: product.name,
      value: product.slug,
      ...product,
    }));

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
      <Header
        hadleSarchBarOpen={() => setIsSearchBarOpen(true)}
        isSearchBarOpen={isSearchBarOpen}
      />
      <Helmet>
        <title>compare mobile phones in pakistan 2023 - Sofliee.com</title>
        <meta
          name="description"
          content="Compare Mobiles Phones-Compare phones Prices, Specification, Display,Cpu, Storage, Camera, Battery, Rating and more"
        />
      </Helmet>
      {compareTwoProducts?.loading ? (
        <div

          className="d-flex justify-content-center align-items-center height-80vh"
        >
          <Spinner />
        </div>
      ) : compareTwoProducts?.error ? (
        <h3

          className="d-flex justify-content-center align-items-center fw-bolder text-danger height-80vh"
        >
          {compareTwoProducts?.error}
        </h3>
      ) : (
        <>
          {isSearchBarOpen && mobileWidth ? (
            <>
              <SearchBar onGoBack={() => setIsSearchBarOpen(false)} />
            </>
          ) : (
            <>
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

              <div className="container">
                <div className="row">
                  <div className=" col-sm-12">
                    <h3 className="compare-tit">
                      {compareTwoProducts?.data?.first_product?.name} Comparison Mobile
                    </h3>
                  </div>
                </div>
              </div>

              {mobileWidth ? (
                <div className="container">
                  <div className="row">
                    <div className="col-sm-6 col-6 px-2">
                      <div className="grey-bg">
                        <h3 className="comapre-with-tits">Compare with</h3>
                        <Select
                          className={clsx(
                            "",
                            mobileWidth && "select-mb",
                            !mobileWidth && ""
                          )}
                          theme={selectThemeColors}
                          value={state.firstProduct}
                          onChange={(e) => handleChange("firstProduct", e)}
                          id="firstProduct"
                          options={
                            state.firstProductText?.length === 0
                              ? []
                              : allProducts
                          }
                          noOptionsMessage={() =>
                            state.firstProductText?.length === 0
                              ? "Type to search for mobiles"
                              : "No Mobile Found"
                          }
                          isClearable={false}
                          placeholder="Search Mobile"
                          isLoading={allProductsList.loading}
                          onInputChange={(e) =>
                            handleChange("firstProductText", e)
                          }
                        />
                        {/* <div className="d-flex align-items-center warning-wrap">
                          <InfoIcon className="info-ico" />{" "}
                          <p className="warning-msgs">
                            Please Enter model name to compare
                          </p>
                        </div> */}
                      </div>
                    </div>
                    <div className="col-sm-6 col-6 px-2">
                      <div className="grey-bg">
                        <h3 className="comapre-with-tits">Compare with</h3>
                        <Select
                          className={clsx(
                            "",
                            mobileWidth && "select-mb",
                            !mobileWidth && ""
                          )}
                          theme={selectThemeColors}
                          value={state.secondProduct}
                          onChange={(e) => handleChange("secondProduct", e)}
                          id="secondProduct"
                          options={
                            state.secondProductText?.length === 0
                              ? []
                              : allProducts
                          }
                          noOptionsMessage={() =>
                            state.secondProductText?.length === 0
                              ? "Type to search for mobiles"
                              : "No Mobile Found"
                          }
                          isClearable={false}
                          placeholder="Search Mobile"
                          isLoading={allProductsList.loading}
                          onInputChange={(e) =>
                            handleChange("secondProductText", e)
                          }
                        />
                        {/* <div className="d-flex align-items-center warning-wrap">
                          <InfoIcon className="info-ico" />{" "}
                          <p className="warning-msgs">
                            Please Enter model name to compare
                          </p>
                        </div> */}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="container">
                  <div className="row">
                    <div className="col-sm-6 col-6 px-2">
                      <div className="grey-bg">
                        <h3 className="comapre-with-tit">Compare with</h3>
                        <Select
                          theme={selectThemeColors}
                          value={state.firstProduct}
                          onChange={(e) => handleChange("firstProduct", e)}
                          id="firstProduct"
                          options={
                            state.firstProductText?.length === 0
                              ? []
                              : allProducts
                          }
                          noOptionsMessage={() =>
                            state.firstProductText?.length === 0
                              ? "Type to search for mobiles"
                              : "No Mobile Found"
                          }
                          isClearable={false}
                          placeholder="Select Mobile"
                          isLoading={allProductsList.loading}
                          onInputChange={(e) =>
                            handleChange("firstProductText", e)
                          }
                        />
                        {/* <div className="d-flex align-items-center warning-wrap">
                        <InfoIcon className="info-ico" />{" "}
                        <p className="warning-msg">
                          Please Enter model name to compare
                        </p>
                      </div> */}
                      </div>
                    </div>
                    <div className="col-sm-6 col-6 px-2">
                      <div className="grey-bg w-full">
                        <h3 className="comapre-with-tit">Compare with</h3>
                        <div className=" w-full">
                          <Select
                            theme={selectThemeColors}
                            value={state.secondProduct}
                            onChange={(e) => handleChange("secondProduct", e)}
                            id="secondProduct"
                            isClearable={false}
                            placeholder="Select Mobile"
                            options={
                              state.secondProductText?.length === 0
                                ? []
                                : allProducts
                            }
                            noOptionsMessage={() =>
                              state.secondProductText?.length === 0
                                ? "Type to search for mobiles"
                                : "No Mobile Found"
                            }
                            isLoading={allProductsList.loading}
                            onInputChange={(e) =>
                              handleChange("secondProductText", e)
                            }
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="container compare-mobile">
                <div className="row p-0">
                  <div className="col-sm-6 col-6 compare-img-section px-2">
                    <div className="inner-border-vision-section">
                      <div className="spacer_custom_20"></div>
                      {mobileWidth ? (
                        <img
                          className="compares-img"
                          src={
                            compareTwoProducts?.data?.first_product?.image
                              ? `https://softliee.com/softlee/public/storage/product/${compareTwoProducts?.data?.first_product?.image}`
                              : "../../assets/images/mobile-icon.png"
                          }
                          alt=""
                        />
                      ) : (
                        <img
                          className="compare-img"
                          src={
                            compareTwoProducts?.data?.first_product?.image
                              ? `https://softliee.com/softlee/public/storage/product/${compareTwoProducts?.data?.first_product?.image}`
                              : "../../assets/images/mobile-icon.png"
                          }
                          alt=""
                        />
                      )}
                      {mobileWidth ? (
                        <>
                          <>
                            <div className="spacer_custom_20"></div>
                            <h3 className="products_name">
                              {compareTwoProducts?.data?.first_product?.name}
                            </h3>
                          </>
                          <h3 className="products_price_under_product_name text-center">
                            {localSelectedCurrency === "USD" ? "$ " : "RS "}
                            {compareTwoProducts?.data?.first_product
                              ?.orignal_price
                              ? formatAmount(
                                getItemPrice(
                                  compareTwoProducts?.data?.first_product
                                    ?.orignal_price
                                )
                              )
                              : "N/A"}
                          </h3>
                        </>
                      ) : (
                        <>
                          <>
                            <div className="spacer_custom_20"></div>
                            <h3 className="product_name">
                              {compareTwoProducts?.data?.first_product?.name}
                            </h3>
                          </>
                          <h3 className="product_price_under_product_name text-center">
                            {localSelectedCurrency === "USD" ? "$ " : "RS "}
                            {compareTwoProducts?.data?.first_product
                              ?.orignal_price
                              ? formatAmount(
                                getItemPrice(
                                  compareTwoProducts?.data?.first_product
                                    ?.orignal_price
                                )
                              )
                              : "N/A"}
                          </h3>

                        </>
                      )}
                    </div>
                  </div>
                  <div className="col-sm-6 col-6 compare-img-section px-2">
                    <div className="inner-border-vision-section">
                      <div className="spacer_custom_20"></div>
                      {mobileWidth ? (
                        <img
                          className="compares-img"
                          src={
                            compareTwoProducts?.data?.second_product?.image
                              ? `https://softliee.com/softlee/public/storage/product/${compareTwoProducts?.data?.second_product?.image}`
                              : "../../assets/images/mobile-icon.png"
                          }
                          alt=""
                        />
                      ) : (
                        <img
                          className="compare-img"
                          src={
                            compareTwoProducts?.data?.second_product?.image
                              ? `https://softliee.com/softlee/public/storage/product/${compareTwoProducts?.data?.second_product?.image}`
                              : "../../assets/images/mobile-icon.png"
                          }
                          alt=""
                        />
                      )}
                      {mobileWidth ? (
                        <>
                          <>
                            <div className="spacer_custom_20"></div>
                            <h3 className="products_name">
                              {compareTwoProducts?.data?.second_product?.name}
                            </h3>
                          </>
                          <h3 className="products_price_under_product_name text-center">
                            {localSelectedCurrency === "USD" ? "$ " : "RS "}
                            {compareTwoProducts?.data?.second_product
                              ?.orignal_price
                              ? formatAmount(
                                getItemPrice(
                                  compareTwoProducts?.data?.second_product
                                    ?.orignal_price
                                )
                              )
                              : "N/A"}
                          </h3>
                        </>
                      ) : (
                        <>
                          <>
                            <div className="spacer_custom_20"></div>
                            <h3 className="product_name">
                              {compareTwoProducts?.data?.second_product?.name}
                            </h3>
                          </>
                          <h3 className="product_price_under_product_name text-center">
                            {localSelectedCurrency === "USD" ? "$ " : "RS "}
                            {compareTwoProducts?.data?.second_product
                              ?.orignal_price
                              ? formatAmount(
                                getItemPrice(
                                  compareTwoProducts?.data?.second_product
                                    ?.orignal_price
                                )
                              )
                              : "N/A"}
                          </h3>

                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <section id="specification-sec" className="compare-spec">
                <div className="container">
                  <div className="row">
                    <div className="col-md-12 spec-col-for-p spec-sec-compare">
                      <div className="main-tit">Specifications</div>

                      {state.group1.length > 0 && (
                        <>
                          <div className="icon_heading_sepecification">
                            <img

                              className="spec-ico width-19px"
                              src="../../assets/images/product/general.png"
                              height="30px"
                            />{" "}
                            <span className="icon_heading_title">General</span>
                          </div>
                          <div className="table-wrap"><table className="table specification_table general">
                            {state.group1.map((data) => (
                              <>
                                <tr>
                                  <td>{data?.name}</td>
                                  <td>{data?.value}</td>
                                  <td>{data?.secondValue}</td>
                                </tr>
                              </>
                            ))}
                          </table> </div>
                        </>
                      )}

                      {state.group2.length > 0 && (
                        <>
                          <div className="icon_heading_sepecification">
                            <img

                              className="spec-ico width-19px"
                              src="../../assets/images/product/display.png"
                              height="30px"
                            />{" "}
                            <span className="icon_heading_title">Display</span>
                          </div>
                          <div className="table-wrap"><table className="table specification_table display">
                            {state.group2.map((data) => (
                              <>
                                <tr>
                                  <td>{data?.name}</td>
                                  <td>{data?.value}</td>
                                  <td>{data?.secondValue}</td>
                                </tr>
                              </>
                            ))}
                          </table> </div>
                        </>
                      )}

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

                      {state.group3.length > 0 && (
                        <>
                          <div className="icon_heading_sepecification">
                            <img

                              className="spec-ico width-19px"
                              src="../../assets/images/product/build.png"
                              height="30px"
                            />{" "}
                            <span className="icon_heading_title">Build</span>
                          </div>
                          <div className="table-wrap"><table className="table specification_table build">
                            {state.group3.map((data) => (
                              <>
                                <tr>
                                  <td>{data?.name}</td>
                                  <td>{data?.value}</td>
                                  <td>{data?.secondValue}</td>
                                </tr>
                              </>
                            ))}
                          </table> </div>
                        </>
                      )}

                      {state.group4.length > 0 && (
                        <>
                          <div className="icon_heading_sepecification">
                            <img

                              className="spec-ico width-19px"
                              src="../../assets/images/product/network.png"
                              height="30px"
                            />{" "}
                            <span className="icon_heading_title">Network</span>
                          </div>
                          <div className="table-wrap"><table className="table specification_table network">
                            {state.group4.map((data) => (
                              <>
                                <tr>
                                  <td>{data?.name}</td>
                                  <td>{data?.value}</td>
                                  <td>{data?.secondValue}</td>
                                </tr>
                              </>
                            ))}
                          </table> </div>
                        </>
                      )}



                      {state.group5.length > 0 && (
                        <>
                          <div className="icon_heading_sepecification">
                            <img

                              className="spec-ico width-19px"
                              src="../../assets/images/product/memory.png"
                              height="30px"
                            />{" "}
                            <span className="icon_heading_title">Memory</span>
                          </div>
                          <div className="table-wrap"><table className="table specification_table">
                            {state.group5.map((data) => (
                              <>
                                <tr>
                                  <td>{data?.name}</td>
                                  <td>{data?.value}</td>
                                  <td>{data?.secondValue}</td>
                                </tr>
                              </>
                            ))}
                          </table> </div>
                        </>
                      )}

                      {state.group6.length > 0 && (
                        <>
                          <div className="icon_heading_sepecification">
                            <img

                              className="spec-ico width-19px"
                              src="../../assets/images/product/camera.png"
                              height="30px"
                            />{" "}
                            <span className="icon_heading_title">Camera</span>
                          </div>
                          <div className="table-wrap"><table className="table specification_table">
                            {state.group6.map((data) => (
                              <>
                                <tr>
                                  <td>{data?.name}</td>
                                  <td>{data?.value}</td>
                                  <td>{data?.secondValue}</td>
                                </tr>
                              </>
                            ))}
                          </table> </div>
                        </>
                      )}

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

                      {state.group7.length > 0 && (
                        <>
                          <div className="icon_heading_sepecification">
                            <img

                              className="spec-ico width-19px"
                              src="../../assets/images/product/connectivity.png"
                              height="30px"
                            />{" "}
                            <span className="icon_heading_title">Connectivity</span>
                          </div>
                          <div className="table-wrap"><table className="table specification_table">
                            {state.group7.map((data) => (
                              <>
                                <tr>
                                  <td>{data?.name}</td>
                                  <td>{data?.value}</td>
                                  <td>{data?.secondValue}</td>
                                </tr>
                              </>
                            ))}
                          </table> </div>
                        </>
                      )}

                      {state.group8.length > 0 && (
                        <>
                          <div className="icon_heading_sepecification">
                            <img

                              className="spec-ico width-19px"
                              src="../../assets/images/product/featires.png"
                              height="30px"
                            />{" "}
                            <span className="icon_heading_title">Features</span>
                          </div>
                          <div className="table-wrap"><table className="table specification_table">
                            {state.group8.map((data) => (
                              <>
                                <tr>
                                  <td>{data?.name}</td>
                                  <td>{data?.value}</td>
                                  <td>{data?.secondValue}</td>
                                </tr>
                              </>
                            ))}
                          </table> </div>
                        </>
                      )}

                      {state.group9.length > 0 && (
                        <>
                          <div className="icon_heading_sepecification">
                            <img

                              className="spec-ico width-19px"
                              src="../../assets/images/product/battery.png"
                              height="30px"
                            />{" "}
                            <span className="icon_heading_title">Battery</span>
                          </div>
                          <div className="table-wrap"><table className="table specification_table">
                            {state.group9.map((data) => (
                              <>
                                <tr>
                                  <td>{data?.name}</td>
                                  <td>{data?.value}</td>
                                  <td>{data?.secondValue}</td>
                                </tr>
                              </>
                            ))}
                          </table> </div>
                        </>
                      )}

                      <section className="ads-section margin-top-50px margin-bottom-50px">
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

                      {state.group10.length > 0 && (
                        <div className="internationalprice">
                          <h3 className="main-tit">International Price List</h3>
                          <div className="table-wrap"><table className="table specification_table">
                            {state.group10.map((data) => (
                              <>
                                <tr>
                                  <td>{data?.name}</td>
                                  <td>{data?.value}</td>
                                  <td>{data?.secondValue}</td>
                                </tr>
                              </>
                            ))}
                          </table> </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </section>
            </>
          )}
        </>
      )}
      <Footer />
    </>
  );
};
export default PageCompare;
