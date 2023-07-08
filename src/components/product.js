import Footer from "./small/footer";
import Header from "./small/header";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Slider from "react-slick";
import { useEffect, useState, useRef } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Popularcomp from "./small/popularcomp";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import { Favorite } from "@mui/icons-material";
import { Icon } from "@iconify/react";
import clsx from "clsx";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch, useSelector } from "react-redux";
import {
  getSingleProducts,
  getUpcomingProducts,
  postComments,
} from "../redux/actions/app.actions";
import { formatAmount, IsMobileWidth, IsTabletWidth } from "./utils";
import UpcomingPhones from "./upcomingPhones";
import moment from "moment";
import { Helmet } from "react-helmet";
import { Adsense } from "@ctrl/react-adsense";
import axios from "axios";
import SearchBar from "./small/searchbar";

const ProductPages = () => {
  const [isSearchBarOpen, setIsSearchBarOpen] = useState(false);

  const [myFlag, setmyFlag] = useState(false)
  const [LikeRerender, setLikeRerender] = useState(false)
  const [Likesobj, setLikesobj] = useState({})
  const [CurrentLiked, setCurrentLiked] = useState({})
  const { commentsResponse, advertisement } = useSelector(
    (selectSate) => selectSate.app
  );
  const [currentUser, setCurrentUser] = useState([]);
  const tabletWidth = IsTabletWidth();
  const mobileWidth = IsMobileWidth();
  const [state, setState] = useState({
    group1: [],
    group2: [],
    group3: [],
    group4: [],
    group5: [],
    group6: [],
    group7: [],
    group8: [],
    group9: [],
    group10: [],
    storage: "ONE",
    comment: "",
    commentReply: "",
    selectedIndex: false,
  });
  const { slug } = useParams();
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrow: false,
    autoplay: true,
    autoplaySpeed: 30000,
  };

  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };
  useEffect(() => {
    scrollToTop();
  }, []);

  let navigate = useNavigate();
  const dispatch = useDispatch();
  const { singleProducts, upcomingProducts } = useSelector(
    (selectSate) => selectSate.app
  );
  const handleImgClick = (slug) => {
    navigate(`/${slug}`, { replace: true });

  };

  useEffect(() => {
    dispatch(getSingleProducts(slug));
    setState({ ...state, comment: "", commentReply: "", selectedIndex: false });

  }, [slug, commentsResponse, LikeRerender]);
  useEffect(() => {
    console.log(state);
  }, [state]);

  useEffect(() => {
    if (singleProducts?.data?.single_product?.attribute_values) {
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

      singleProducts?.data?.single_product?.attribute_values.map((data) => {
        if (
          data?.group_id == 1 &&
          data?.attribute_value &&
          data?.attribute_value !== ""
        ) {
          group1.push({
            name: data?.group_values?.value,
            value: data?.attribute_value,
          });
        } else if (
          data?.group_id == 2 &&
          data?.attribute_value &&
          data?.attribute_value !== ""
        ) {
          group2.push({
            name: data?.group_values?.value,
            value: data?.attribute_value,
          });
        } else if (
          data?.group_id == 3 &&
          data?.attribute_value &&
          data?.attribute_value !== ""
        ) {
          group3.push({
            name: data?.group_values?.value,
            value: data?.attribute_value,
          });
        } else if (
          data?.group_id == 4 &&
          data?.attribute_value &&
          data?.attribute_value !== ""
        ) {
          group4.push({
            name: data?.group_values?.value,
            value: data?.attribute_value,
          });
        } else if (
          data?.group_id == 5 &&
          data?.attribute_value &&
          data?.attribute_value !== ""
        ) {
          group5.push({
            name: data?.group_values?.value,
            value: data?.attribute_value,
          });
        } else if (
          data?.group_id == 6 &&
          data?.attribute_value &&
          data?.attribute_value !== ""
        ) {
          group6.push({
            name: data?.group_values?.value,
            value: data?.attribute_value,
          });
        } else if (
          data?.group_id == 7 &&
          data?.attribute_value &&
          data?.attribute_value !== ""
        ) {
          group7.push({
            name: data?.group_values?.value,
            value: data?.attribute_value,
          });
        } else if (
          data?.group_id == 8 &&
          data?.attribute_value &&
          data?.attribute_value !== ""
        ) {
          group8.push({
            name: data?.group_values?.value,
            value: data?.attribute_value,
          });
        } else if (
          data?.group_id == 9 &&
          data?.attribute_value &&
          data?.attribute_value !== ""
        ) {
          group9.push({
            name: data?.group_values?.value,
            value: data?.attribute_value,
          });
        } else if (
          data?.group_id == 10 &&
          data?.attribute_value &&
          data?.attribute_value !== ""
        ) {
          group10.push({
            name: data?.group_values?.value,
            value: data?.attribute_value,
          });
        }
      });

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
      });
    }
  }, [singleProducts?.data?.single_product?.attribute_values]);

  const specRef = useRef(null);
  const opinRef = useRef(null);

  const handleScroll = (ref) => {
    window.scrollTo({
      top: ref.offsetTop,
      left: 0,
      behavior: "smooth",
    });
  };

  const handleChange = (name, value) => {
    setState({
      ...state,
      [name]: value,
    });
  };

  const handleRelatedImage = (slug) => {
    navigate(`/${slug}`, { replace: true });
  };

  const handleCommentPost = (id) => {
    if (state.comment !== "" || state.commentReply !== "") {
      let form = new FormData();
      form.append("comment", id ? state.commentReply : state.comment);
      form.append("product_id", singleProducts?.data?.single_product?.id);
      if (id) {
        form.append("parent_id", id);
      }
      dispatch(postComments(form));
    }
  };
  const handleText = () => {

  }


  useEffect(() => {
    let test = localStorage.getItem("softliUserData")

    let user = JSON.parse(test);
    // console.log(user);
    setCurrentUser(user)
  }, [])

  const like = async (commentid) => {
    console.log("Curent uid", currentUser);
    if (currentUser == null) {
      alert("Please Login")
    } else {
      console.log("Curent uid", commentid);
      axios.post(`https://softliee.com/softlee/public/api/save-likedislike?id=${commentid}&type=like&user_id=${currentUser?.user?.id}`).then(res => {
        console.log(res.data);
        setLikeRerender(!LikeRerender)
        // window.location.reload()
      }).catch(err => {
        console.log(err);
      })
    }

  }

  const dislike = async (commentid) => {
    console.log("dislike");
    if (currentUser == null) {
      alert("Please Login")
    } else {
      axios.post(`https://softliee.com/softlee/public/api/save-likedislike?id=${commentid}&type=dislike&user_id=${currentUser?.user?.id}`).then(res => {
        console.log(res.data);
        setLikeRerender(!LikeRerender)
        // window.location.reload()
      }).catch(err => {
        console.log(err);
      })
    }
  }


  const getCommentData = () => {

    let obj = {}
    let obj2 = {}
    singleProducts?.data?.single_product?.comments_with_likes_and_dislikes.map((item, index) => {
      obj[item.id] = { likes: item.likes.length, dislikes: item.dislikes.length };
      for (let i = 0; i < item.likes.length; i++) {
        if (item.likes[i].user_id == currentUser?.user?.id) {
          console.log("liked", item.likes[i]);
          obj2[item.id] = "liked";
          setCurrentLiked(obj2)

        }
      }
      for (let i = 0; i < item.dislikes.length; i++) {
        if (item.dislikes[i].user_id == currentUser?.user?.id) {
          console.log("dislike", item.likes[i]);
          obj2[item.id] = "disliked"
          setCurrentLiked(obj2)



        }
      }
    });
    console.log(obj);
    console.log(obj2);
    setLikesobj(obj)
  }
  useEffect(() => {
    getCommentData()
  }, [singleProducts, LikeRerender])

  return (
    <>
      <Helmet>
        <title>
          {singleProducts?.data?.single_product?.meta_title
            ? singleProducts?.data?.single_product?.meta_title
            : "Sofliee"}

        </title>
        <meta
          name="description"
          content={
            singleProducts?.data?.single_product?.meta_description
              ? singleProducts?.data?.single_product?.meta_description
              : ""
          }
        />
        <meta
          name="keywords"
          content={
            singleProducts?.data?.single_product?.meta_keywords
              ? singleProducts?.data?.single_product?.meta_keywords
              : ""
          }
        />

        <link rel="canonical" href={window.location.href} />

      </Helmet>


      {isSearchBarOpen && mobileWidth ? (
        <>
          <SearchBar onGoBack={() => setIsSearchBarOpen(false)} />
          {/* <Header setIsSearchBarOpen={setIsSearchBarOpen} isSearchBarOpen={isSearchBarOpen} /> */}
        </>) :
        <>
          <Header hadleSarchBarOpen={() => setIsSearchBarOpen(true)}
            isSearchBarOpen={isSearchBarOpen} />

          {singleProducts?.error ? (
            <img className="fourzero" src="../../assets/images/404.png" alt="" />
          ) : (
            <main id="single-mob-product-page">

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

                        responsive="true"
                      />
                    </div>


                  </div>
                </div>
              </section>

              <section>
                <div className="container">
                  <div className="spacer_custom_20"></div>
                  <div className="bread_crumb_link">
                    <Link to="/" className="bread_crumb_link">
                      Home
                    </Link>
                    <ChevronRightIcon />
                    <Link to={`/${slug}`} className="bread_crumb_link">
                      {singleProducts?.data?.single_product?.name}
                    </Link>
                  </div>
                  <div className="spacer_custom_20"></div>
                  <h1 className="product_heading_title">
                    {singleProducts?.data?.single_product?.name} Price in Pakistan
                  </h1>
                  <div className="spacer_custom_20"></div>
                </div>
              </section>

              {/* <section id="ad-plpl">
            <section>
              <div className="container">
                <div className="row">
                  {advertisement.data?.ads &&
                    (!mobileWidth ? (
                      <img
                        className="single-mob-imgss"
                        src={`https://softliee.com/softlee/public/storage/adds/${advertisement.data?.ads.find(
                          (data) => data?.size === "728 × 90 px"
                        )?.image
                          }`}
                        alt=""
                      />
                    ) : (
                      <img
                        className="single-mob-imgss-mobiles"
                        src={`https://softliee.com/softlee/public/storage/adds/${advertisement.data?.ads.find(
                          (data) => data?.size === "160 × 600 px"
                        )?.image
                          }`}
                        alt=""
                      />
                    ))}
                </div>
              </div>
            </section>
          </section> */}
              <section id="product-details margin-bottom-10px" >
                <div className="container product_detail_section">
                  <div className="row p-0">
                    <div className="col-6 col-sm-5 product_vision_section pe-0">
                      <div className="inner-border-vision-section">
                        <div className="spacer_custom_20"></div>
                        <Slider {...settings} className="prod-page-slider">
                          <div className="img-slider-img-wrap">
                            <img
                              className="product-img img-fluid"
                              src={`https://softliee.com/softlee/public/storage/product/${singleProducts?.data?.single_product?.image}`}
                              alt={singleProducts?.data?.single_product?.name}
                            />
                          </div>
                          {/* <div>
                        <img
                          className="product-img img-fluid"
                          src={`https://softliee.com/softlee/public/storage/product/${singleProducts?.data?.single_product?.image}`}
                          alt=""
                        />
                      </div>
                      <div>
                        <img
                          className="product-img img-fluid"
                          src={`https://softliee.com/softlee/public/storage/product/${singleProducts?.data?.single_product?.image}`}
                          alt=""
                        />
                      </div> */}
                        </Slider>
                        <div className="hide-on-mobile">
                          <div className="spacer_custom_20"></div>
                          <h2 className="product_name">
                            {singleProducts?.data?.single_product?.name}
                          </h2>
                          <h3 className="product_price_under_product_name text-center">
                            RS{" "}
                            {state.storage === "ONE"
                              ? formatAmount(
                                singleProducts?.data?.single_product
                                  ?.ram_storage1_price
                              )
                              : state.storage === "TWO"
                                ? formatAmount(
                                  singleProducts?.data?.single_product
                                    ?.ram_storage2_price
                                )
                                : formatAmount(
                                  singleProducts?.data?.single_product
                                    ?.ram_storage3_price
                                )}
                            {/* {singleProducts?.data?.single_product?.orignal_price} */}
                          </h3>
                          {/* <h4 className="mobile_continue_status">Discontinued</h4> */}
                          <div className="memory_detail_section">
                            <nav className="nav nav-pills nav-fill">
                              {singleProducts?.data?.single_product
                                ?.ram_storage1 && (
                                  <a
                                    onClick={() => handleChange("storage", "ONE")}
                                    class={clsx(
                                      "nav-link rounded-0 memory_status_button",
                                      state.storage === "ONE" &&
                                      "memory_status_button_active"
                                    )}
                                  >
                                    {
                                      singleProducts?.data?.single_product
                                        ?.ram_storage1
                                    }
                                  </a>
                                )}
                              {singleProducts?.data?.single_product
                                ?.ram_storage2 && (
                                  <a
                                    class={clsx(
                                      "nav-link rounded-0 memory_status_button",
                                      state.storage === "TWO" &&
                                      "memory_status_button_active"
                                    )}
                                    onClick={() => handleChange("storage", "TWO")}
                                  >
                                    {
                                      singleProducts?.data?.single_product
                                        ?.ram_storage2
                                    }
                                  </a>
                                )}
                              {singleProducts?.data?.single_product
                                ?.ram_storage3 && (
                                  <a
                                    class={clsx(
                                      "nav-link rounded-0 memory_status_button",
                                      state.storage === "THREE" &&
                                      "memory_status_button_active"
                                    )}
                                    onClick={() => handleChange("storage", "THREE")}
                                  >
                                    {
                                      singleProducts?.data?.single_product
                                        ?.ram_storage3
                                    }
                                  </a>
                                )}
                            </nav>
                          </div>
                          <div className="">
                            <nav className="nav nav-pills nav-fill">
                              <a
                                className="nav-link rounded-0 more_vision_details"
                                aria-current="page"
                                href="#"
                               
                              >
                                Pictures <ChevronRightIcon />
                              </a>
                              <Link
                                to={`/compare/${slug}/change_product`}
                                className="nav-link rounded-0 more_vision_details"
                                aria-current="page"
                                href="#"
                             
                              >
                                Compare <ChevronRightIcon />
                              </Link>
                              <div
                                onClick={() => handleScroll(opinRef.current)}
                                className="nav-link rounded-0 more_vision_details"
                                aria-current="page"

                              >
                                Opinions <ChevronRightIcon />
                              </div>
                            </nav>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="col-6 col-sm-7 product_short_detail_section ps-0 ">
                      <div className="inner-border-vision-section_right">
                        <div className="overview_prdouct">
                          <h3 className="overview-tit">Overview</h3>
                          <a
                            href="https://play.google.com/store/apps/details?id=com.mobilestore.softliee&hl"
                            target="_blank"
                         
                          >

                            <img
                              width="33"
                              src="../../assets/images/blogdetails/playstore.png"
                              alt=""
                            />
                          </a>
                        </div>
                        <div className="overview_details row p-0 m-0 hide-on-mobile">
                          {singleProducts?.data?.single_product?.features &&
                            singleProducts?.data?.single_product?.features.map(
                              (data, index) => (
                                <div
                                  className="col-sm-6 overview_details_section"
                                  key={index}
                                >
                                  <div className="overview_details_section_col overview_details_icon">
                                    <img
                                      className="prod-spec-img"
                                      src={`https://softliee.com/softlee/public/storage/feature_icons/${data?.feature?.feature_icon}`}
                                      height="52px"
                                    />
                                  </div>
                                  <div className="overview_details_section_col overview_icon_details">
                                    <div className="overview_details_title">
                                      {data?.feature?.feature_name}
                                    </div>
                                    <div className="overview_details_value" onClick={handleText()}>
                                      {data?.feature_value.length > 12 ?


                                        data?.feature_value.substring(0, 11)



                                        : data?.feature_value}
                                    </div>
                                  </div>
                                </div>
                              )
                            )}
                        </div>
                        <div className="overview_details row p-0 m-0 hide-on-desktop">
                          {singleProducts?.data?.single_product?.features &&
                            singleProducts?.data?.single_product?.features.map(
                              (data, index) => (
                                (index == 0 || index == 2 || index == 4 || index == 6) ?
                                  <div
                                    className="col-sm-6 overview_details_section"
                                    key={index}
                                  >
                                    <div className="overview_details_section_col overview_details_icon">
                                      <img
                                        className="prod-spec-img"
                                        src={`https://softliee.com/softlee/public/storage/feature_icons/${data?.feature?.feature_icon}`}
                                        height="52px"
                                      />
                                    </div>
                                    <div className="overview_details_section_col overview_icon_details">
                                      <div className="overview_details_title">
                                        {data?.feature?.feature_name}
                                      </div>
                                      <div className="overview_details_value">
                                        {data?.feature_value}
                                      </div>
                                    </div>
                                  </div>
                                  : <></>

                              )
                            )}
                        </div>
                        <div
                          onClick={() => handleScroll(specRef.current)}
                          className="cursor-pointer see_full_specification_btn hide-on-mobile"
                        >
                          See Full Specification
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="row hide-on-desktop">
                    <div className="col-12">
                      <div className="mobile-prod-details">
                        <div className="spacer_custom_20"></div>
                        <div className="compare-btn-tit-price-wrap">
                          <div>
                            <h3 className="product_name">{singleProducts?.data?.single_product?.name}</h3>
                            <h3 className="product_price_under_product_name text-center">
                              RS  {state.storage === "ONE"
                                ? formatAmount(
                                  singleProducts?.data?.single_product
                                    ?.ram_storage1_price
                                )
                                : state.storage === "TWO"
                                  ? formatAmount(
                                    singleProducts?.data?.single_product
                                      ?.ram_storage2_price
                                  )
                                  : formatAmount(
                                    singleProducts?.data?.single_product
                                      ?.ram_storage3_price
                                  )}
                            </h3>
                            <h4 className="mobile_continue_status">Discontinued</h4>
                          </div>

                          <div className="compair-btn-with-ico hide-on-desktop">
                            <h4>Compare</h4>
                            <AddIcon />
                          </div>
                        </div>
                        <div className="memory_detail_section">
                          <nav className="nav nav-pills nav-fill">
                            {singleProducts?.data?.single_product
                              ?.ram_storage1 && (
                                <a
                                  onClick={() => handleChange("storage", "ONE")}
                                  class={clsx(
                                    "nav-link rounded-0 memory_status_button",
                                    state.storage === "ONE" &&
                                    "memory_status_button_active"
                                  )}
                                >
                                  {
                                    singleProducts?.data?.single_product
                                      ?.ram_storage1
                                  }
                                </a>
                              )}
                            {singleProducts?.data?.single_product
                              ?.ram_storage2 && (
                                <a
                                  class={clsx(
                                    "nav-link rounded-0 memory_status_button",
                                    state.storage === "TWO" &&
                                    "memory_status_button_active"
                                  )}
                                  onClick={() => handleChange("storage", "TWO")}
                                >
                                  {
                                    singleProducts?.data?.single_product
                                      ?.ram_storage2
                                  }
                                </a>
                              )}
                            {singleProducts?.data?.single_product
                              ?.ram_storage3 && (
                                <a
                                  class={clsx(
                                    "nav-link rounded-0 memory_status_button",
                                    state.storage === "THREE" &&
                                    "memory_status_button_active"
                                  )}
                                  onClick={() => handleChange("storage", "THREE")}
                                >
                                  {
                                    singleProducts?.data?.single_product
                                      ?.ram_storage3
                                  }
                                </a>
                              )}
                          </nav>
                        </div>
                        <div className="pictures-compare">
                          <nav className="nav nav-pills nav-fill">
                            <a
                              className="nav-link rounded-0 more_vision_details"
                              aria-current="page"
                              href="#"
                          
                            >
                              Pictures <ChevronRightIcon />
                            </a>
                            <Link
                              to={`/compare/${slug}/change_product`}
                              className="nav-link rounded-0 more_vision_details"
                              aria-current="page"
                              href="#"
                           
                            >
                              Compare <ChevronRightIcon />
                            </Link>
                            <div
                              onClick={() => handleScroll(opinRef.current)}
                              className="nav-link rounded-0 more_vision_details"
                              aria-current="page"
                              href="#"
                            >
                              Opinions <ChevronRightIcon />
                            </div>
                          </nav>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="spacer_custom_30"></div>
              </section>
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

                        responsive="true"
                      />
                    </div>


                  </div>
                </div>
              </section>

              <section ref={specRef} id="specification-sec">
                <div className="container">
                  <div className="row">
                    <div className="col-md-9 spec-col-for-p">

                      <h2 className="main-tit">Specifications</h2>
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
                          <table className="table specification_table">
                            {state.group1.map((data, index) => (
                              <>
                                <tr key={index}>
                                  <td>{data?.name}</td>
                                  <td>{data?.value}</td>
                                </tr>
                              </>
                            ))}
                          </table>
                        </>
                      )}

                      {state.group2.length > 0 && (
                        <>
                          <div className="icon_heading_sepecification">
                            <img
                              className="spec-ico"
                              src="../../assets/images/product/display.png"
                              height="30px"
                            />{" "}
                            <span className="icon_heading_title">Display</span>
                          </div>
                          <table className="table specification_table">
                            {state.group2.map((data, index) => (
                              <>
                                <tr key={index}>
                                  <td>{data?.name}</td>
                                  <td>{data?.value}</td>
                                </tr>
                              </>
                            ))}
                          </table>
                        </>
                      )}
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
                              className="spec-ico"
                              src="../../assets/images/product/build.png"
                              height="30px"
                            />{" "}
                            <span className="icon_heading_title">Build</span>
                          </div>
                          <table className="table specification_table">
                            {state.group3.map((data, index) => (
                              <>
                                <tr key={index}>
                                  <td>{data?.name}</td>
                                  <td>{data?.value}</td>
                                </tr>
                              </>
                            ))}
                          </table>
                        </>
                      )}

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

                                responsive="true"
                              />
                            </div>


                          </div>
                        </div>
                      </section>
                      {state.group4.length > 0 && (
                        <>
                          <div className="icon_heading_sepecification">
                            <img
                              className="spec-ico"
                              src="../../assets/images/product/network.png"
                              height="30px"
                            />{" "}
                            <span className="icon_heading_title">Network</span>
                          </div>
                          <table className="table specification_table">
                            {state.group4.map((data, index) => (
                              <>
                                <tr key={index}>
                                  <td>{data?.name}</td>
                                  <td>{data?.value}</td>
                                </tr>
                              </>
                            ))}
                          </table>
                        </>
                      )}
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

                                responsive="true"
                              />
                            </div>


                          </div>
                        </div>
                      </section>

                      {state.group5.length > 0 && (
                        <>
                          <div className="icon_heading_sepecification">
                            <img
                              className="spec-ico"
                              src="../../assets/images/product/memory.png"
                              height="30px"
                            />{" "}
                            <span className="icon_heading_title">Memory</span>
                          </div>
                          <table className="table specification_table">
                            {state.group5.map((data, index) => (
                              <>
                                <tr key={index}>
                                  <td>{data?.name}</td>
                                  <td>{data?.value}</td>
                                </tr>
                              </>
                            ))}
                          </table>
                        </>
                      )}
                      {state.group6.length > 0 && (
                        <>
                          <div className="icon_heading_sepecification">
                            <img
                              className="spec-ico"
                              src="../../assets/images/product/camera.png"
                              height="30px"
                            />{" "}
                            <span className="icon_heading_title">Camera</span>
                          </div>
                          <table className="table specification_table">
                            {state.group6.map((data) => (
                              <>
                                <tr>
                                  <td>{data?.name}</td>
                                  <td>{data?.value}</td>
                                </tr>
                              </>
                            ))}
                          </table>
                        </>
                      )}
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
                              className="spec-ico"
                              src="../../assets/images/product/connectivity.png"
                              height="30px"
                            />{" "}
                            <span className="icon_heading_title">Connectivity</span>
                          </div>
                          <table className="table specification_table">
                            {state.group7.map((data) => (
                              <>
                                <tr>
                                  <td>{data?.name}</td>
                                  <td>{data?.value}</td>
                                </tr>
                              </>
                            ))}
                          </table>


                        </>
                      )}
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

                                responsive="true"
                              />
                            </div>


                          </div>
                        </div>
                      </section>
                      {state.group8.length > 0 && (
                        <>
                          <div className="icon_heading_sepecification">
                            <img
                              className="spec-ico"
                              src="../../assets/images/product/featires.png"
                              height="30px"
                            />{" "}
                            <span className="icon_heading_title">Features</span>
                          </div>
                          <table className="table specification_table">
                            {state.group8.map((data) => (
                              <>
                                <tr>
                                  <td>{data?.name}</td>
                                  <td>{data?.value}</td>
                                </tr>
                              </>
                            ))}
                          </table>
                        </>
                      )}
                      {state.group9.length > 0 && (
                        <>
                          <div className="icon_heading_sepecification">
                            <img
                              className="spec-ico"
                              src="../../assets/images/product/battery.png"
                              height="30px"
                            />{" "}
                            <span className="icon_heading_title">Battery</span>
                          </div>
                          <table className="table specification_table">
                            {state.group9.map((data) => (
                              <>
                                <tr>
                                  <td>{data?.name}</td>
                                  <td>{data?.value}</td>
                                </tr>
                              </>
                            ))}
                          </table>
                        </>
                      )}
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

                                responsive="true"
                              />
                            </div>


                          </div>
                        </div>
                      </section>
                      {state.group10.length > 0 && (
                        <div className="internationalprice">
                          <h3 className="main-tit">
                            International Price List of{" "}
                            {singleProducts?.data?.single_product?.name}
                          </h3>
                          <table className="table specification_table">
                            {state.group10.map((data) => (
                              <>
                                <tr>
                                  <td>{data?.name}</td>
                                  <td>{data?.value}</td>
                                </tr>
                              </>
                            ))}
                          </table>
                        </div>
                      )}
                    </div>
                    <div className="col-md-3 nopaddingleftright">
                      <a href="https://play.google.com/store/apps/details?id=com.mobilestore.softliee" target="_blank">
                        <img
                          src="../../assets/images/product/prod-banner.jpeg"
                          width="100%"
                        />
                      </a>
                      <div className="spacer_custom_50"></div>
                      <div className="spacer_custom_20"></div>
                      <div className="main-tit">Tags</div>
                      <div className="tags_Section">
                        {singleProducts?.data?.single_product?.tags &&
                          singleProducts?.data?.single_product?.tags.map((data, index) => (
                            <div className="btn tags" key={index}>#{data?.slug}</div>
                          ))}
                      </div>

                      <div className="spacer_custom_30"></div>
                      <div className="main-tit">
                        Browse By {singleProducts?.data?.single_product?.name}
                      </div>
                      <div className="spacer_custom_10"></div>
                      {singleProducts?.data[" $browes_product"] &&
                        singleProducts?.data[" $browes_product"].map(
                          (item, index) => (
                            <div className="side_mobile_section" key={index}>
                              <div className="side_mobile_Col">
                                <center>
                                  <img
                                    className="side-mobile-sec-img"
                                    src={`https://softliee.com/softlee/public/storage/product/${item.image}`}
                                    height="88px"
                                  />
                                </center>
                              </div>
                              <div className="side_mobile_Col">
                                <div className="side_col_title">{item?.name}</div>
                                {item?.price ? (
                                  <div className="side_col_rupee">
                                    RS {formatAmount(item?.price)}
                                  </div>
                                ) : null}
                                <a
                                  className="view_more_link"
                                  onClick={() => handleImgClick(item?.slug)}
                                >
                                  View More
                                </a>
                              </div>
                            </div>
                          )
                        )}

                      <div className="spacer_custom_30"></div>
                      <UpcomingPhones />
                      <div className="spacer_custom_30"></div>
                      <div className="main-tit browsebyb-tit">Browse By Budget</div>

                      <div className="tags_Section budget">
                        <Link to={`/browsebybudget/15000`}>
                          <div className="btn tags budget-range">Under 15,000</div>
                        </Link>
                        <Link to={`/browsebybudget/25000`}>
                          <div className="btn tags budget-range">Under 25,000</div>
                        </Link>
                        <Link to={`/browsebybudget/35000`}>
                          <div className="btn tags budget-range">Under 35,000</div>
                        </Link>
                        <Link to={`/browsebybudget/45000`}>
                          <div className="btn tags budget-range">Under 45,000</div>
                        </Link>
                        <Link to={`/browsebybudget/65000`}>
                          <div className="btn tags budget-range">Under 65,000</div>
                        </Link>
                        <Link to={`/browsebybudget/85000`}>
                          <div className="btn tags budget-range">Under 85,000</div>
                        </Link>
                        <Link to={`/browsebybudget/115000`}>
                          <div className="btn tags budget-range">Under 115,000</div>
                        </Link>
                      </div>
                      <div className="spacer_custom_30"></div>


                      <p className="ads-text">ADS</p>
                      <Adsense
                        client="ca-pub-2933454440337038"
                        slot="6702463586"
                        style={{ display: "block" }}
                        format="auto"

                        responsive="true"
                      />


                    </div>
                  </div>
                </div>
              </section>
              <section id="mob-info">
                <div className="mobile-info">
                  <div className="container">
                    <div className="row p-0 m-0">
                      <div className="col-md-6">
                        <div className="main-tit">Mobile Information</div>
                        <div className="spacer_custom_30"></div>
                        <p
                          className="mobile_information_p"
                          dangerouslySetInnerHTML={{
                            __html:
                              (!myFlag ? (singleProducts?.data?.single_product?.description.length > 560 ?
                                singleProducts?.data?.single_product?.description.substring(0, 569) + "...." :
                                singleProducts?.data?.single_product?.description) : singleProducts?.data?.single_product?.description
                              )
                          }}
                        ></p>
                        <button className="btn read_more_btn" onClick={() => {
                          if (myFlag) {
                            setmyFlag(false)
                          } else {
                            setmyFlag(true)
                          }
                        }}>Read More</button>
                      </div>
                      <div className="col-md-6">
                        <iframe
                          width="560"
                          height="315"
                          src={`${singleProducts?.data?.single_product?.video_link}`}
                          title="YouTube video player"
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        ></iframe>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <section className="ads-section " >
                <div className="container">
                  <div className="row justify-content-center">
                    <div className="col-12">

                      <p className="ads-text">ADS</p>
                      <Adsense
                        client="ca-pub-2933454440337038"
                        slot="6702463586"
                        style={{ display: "block" }}
                        format="auto"

                        responsive="true"
                      />
                    </div>


                  </div>
                </div>
              </section>
              <section ref={opinRef} id="users-comments">
                <div className="container">
                  <div className="row">
                    <div className="col-sm-12">
                      <h3 className="main-tit users-cc-tit">
                        {" "}
                        {slug.replaceAll("-", " ")} Opinions and reviews
                      </h3>

                      <div className="d-flex align-items-bottom">
                        <img
                          className="comment-av"
                          src="../../assets/images/avatar.png"
                          alt=""
                        />
                        <input
                          className="comment-input "
                          type="text"
                          placeholder="Write a comments..."
                          value={state.comment}
                          onChange={(e) => handleChange("comment", e.target.value)}
                        />
                      </div>
                      <div className="d-flex align-items-center justify-content-end">
                        <button
                          className="comment-btn"
                          onClick={() => handleCommentPost()}
                        >
                          Post Review
                        </button>
                      </div>
                      {singleProducts?.data?.single_product?.comments &&
                        singleProducts?.data?.single_product?.comments?.length !==
                        0 &&
                        singleProducts?.data?.single_product?.comments.map(
                          (data, index) => (
                            <>
                              <div className="comment-wrapper" key={index}>
                                <div
                                  className={
                                    tabletWidth || mobileWidth
                                      ? "align-items-start justify-content-between"
                                      : "d-flex align-items-start justify-content-between"
                                  }
                                >
                                  <div
                                    className={
                                      tabletWidth || mobileWidth
                                        ? "align-items-center"
                                        : "d-flex align-items-center"
                                    }
                                  >
                                    <img
                                      className="comment-av-real"
                                      src={data?.user?.profile_photo_url}
                                      alt=""
                                    />
                                    <div className="comment-prof-info">
                                      <h3 className="prof-tit">
                                        {data?.user?.name}
                                      </h3>
                                      <h6 className="daysago">
                                        {moment(data?.created_at).format(
                                          "YYYY-MM-DD hh:mm:ss"
                                        )}{" "}
                                        {/* days ago{" "} */}
                                      </h6>

                                      <div className="d-flex">
                                        <p className="comment-desc">
                                          {data?.comment}
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="wrapper-rep-like-dis align-items-end">
                                    {state.selectedIndex === index ? (
                                      <>
                                        <input
                                          className="comment-input mt-3 comment-q"
                                          type="text"
                                          placeholder="Write a reply..."

                                          value={state.commentReply}
                                          onChange={(e) =>
                                            handleChange(
                                              "commentReply",
                                              e.target.value
                                            )
                                          }
                                        />
                                        <button
                                          className="comment-btn w-100"
                                          onClick={() => handleCommentPost(data.id)}
                                        >
                                          Post Reply
                                        </button>
                                      </>
                                    ) : (
                                      <button
                                        className="reply-btn w-100"
                                        onClick={() =>
                                          handleChange("selectedIndex", index)
                                        }
                                      >
                                        Reply
                                      </button>
                                    )}
                                    <div className="like-btn-count" onClick={() => like(data.id)}>
                                      {
                                        CurrentLiked[data.id] == "liked" ? <>
                                          <Icon
                                            className="like-ico liked"
                                            icon="ant-design:like-filled"
                                          />
                                          <h6 className="like-ico-count liked">{Likesobj[data.id]?.likes}</h6>
                                        </> : <>
                                          <Icon
                                            className="like-ico"
                                            icon="ant-design:like-filled"
                                          />
                                          <h6 className="like-ico-count">{Likesobj[data.id]?.likes}</h6>
                                        </>
                                      }

                                    </div>
                                    <div className="like-btn-count" onClick={() => dislike(data.id)}>

                                      {

                                        CurrentLiked[data.id] == "disliked" ? <>
                                          <Icon
                                            className="dislike-ico liked"
                                            icon="ant-design:like-filled"
                                          />
                                          <h6 className="like-ico-count liked" >{Likesobj[data.id]?.dislikes}</h6>
                                        </> : <>
                                          <Icon
                                            className="dislike-ico"
                                            icon="ant-design:like-filled"
                                          />
                                          <h6>{Likesobj[data.id]?.dislikes}</h6></>
                                      }


                                    </div>
                                  </div>
                                </div>

                                <div className="forborborderbottom"></div>
                              </div>

                              {data?.replies &&
                                data?.replies?.length !== 0 &&
                                data?.replies.map((data1, index) => (
                                  <div className="comment-wrapper for-reply" key={index}>
                                    <div
                                      className={
                                        tabletWidth || mobileWidth
                                          ? "align-items-start justify-content-between"
                                          : "d-flex align-items-start justify-content-between"
                                      }
                                    >
                                      <div
                                        className={
                                          tabletWidth || mobileWidth
                                            ? "align-items-center"
                                            : "d-flex align-items-center"
                                        }
                                      >
                                        <img
                                          className="comment-av-real"
                                          src={data1?.user?.profile_photo_url}
                                          alt=""
                                        />
                                        <div className="comment-prof-info">
                                          <h3 className="prof-tit">
                                            {data1?.user?.name}
                                          </h3>
                                          <h6 className="daysago">
                                            {moment(data1?.created_at).format(
                                              "YYYY-MM-DD hh:mm:ss"
                                            )}{" "}
                                            {/* days ago{" "} */}
                                          </h6>

                                          <div className="d-flex">
                                            <p className="comment-desc">
                                              {data1?.comment}
                                            </p>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="wrapper-rep-like-dis">
                                        {/* <button className="reply-btn">Reply</button> */}
                                        <div className="like-btn-count">
                                          <Icon
                                            className="like-ico"
                                            icon="ant-design:like-filled"
                                          />
                                          <h6 className="like-ico-count">12</h6>
                                        </div>
                                        <div className="like-btn-count">
                                          <Icon
                                            className="dislike-ico"
                                            icon="ant-design:like-filled"
                                          />
                                          <h6>0</h6>
                                        </div>
                                      </div>
                                    </div>

                                    <div className="forborborderbottom"></div>
                                  </div>
                                ))}
                            </>
                          )
                        )}
                    </div>
                  </div>
                </div>
              </section>

              <Popularcomp />
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

                        responsive="true"
                      />
                    </div>


                  </div>
                </div>
              </section>
            </main>
          )
          }
          <Footer />
        </>

      }



    </>
  );
};
export default ProductPages;
