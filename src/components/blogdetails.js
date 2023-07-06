import Header from "./small/header";
import Footer from "./small/footer";
import { Icon } from "@iconify/react";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate, useParams } from "react-router-dom";
import BlogSidebar from "./small/blogsidebar";
import { IsMobileWidth, IsTabletWidth } from "./utils";
import { useEffect, useState } from "react";
import axios from "axios";
import { Adsense } from "@ctrl/react-adsense";
import { Helmet } from "react-helmet";
import { postBlogComments } from "../redux/actions/app.actions";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import PopularMobiles from "./small/popularmobiles";
import { getPopularProducts } from "../redux/actions/app.actions";

import Spinner from 'react-bootstrap/Spinner';

import clsx from "clsx";
import { formatAmount } from "./utils";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";

// import { getSingleBlog } from "../redux/actions/app.actions";

const Blogdetails = () => {

  const [singleBlog, setSingleBlog] = useState([])
  const [comment, setComment] = useState([])
  const [commentReply, setCommentReply] = useState([])
  const [replyClicked, setreplyClicked] = useState([])

  const [currentUser, setCurrentUser] = useState([]);

  const tabletWidth = IsTabletWidth();
  const mobileWidth = IsMobileWidth();
  const mylocation = window.location.pathname.split("/")
  const { loginResponse } = useSelector((selectSate) => selectSate.app);

  // const dispatch = useDispatch();
  // const { slug } = useParams();
  // const { singleBlog } = useSelector((selectSate) => selectSate.app);

  // useEffect(() => {
  //   dispatch(getSingleBlog(slug));
  // }, []);

  let navigate = useNavigate();
  const dispatch = useDispatch();



  const { popularProducts, advertisement, currency } = useSelector(
    (selectSate) => selectSate.app
  );

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

  const handleImgClick = (slug) => {
    navigate(`/${slug}`, { replace: true });
  };


  let localSelectedCurrency = localStorage.getItem("selectedCurrency");

  useEffect(() => {


    axios.get(`https://softliee.com/softlee/public/api/blog/${mylocation[2]}`).then((res) => {
      // 
      setSingleBlog(res.data.single_blog)

    }).catch((err) => {

    })
  }, [])
  useEffect(() => {
    if (singleBlog) {
      singleBlog?.comments?.map((item, index) => {
        setreplyClicked(prev => [...prev, ({ [item.id]: "false" })])
      })
    }

  }, [singleBlog])
  useEffect(() => {


  }, [replyClicked])

  const handleCommentPost = (id) => {
    if (localStorage.softliUserData) {

      let abc = localStorage.getItem("softliUserData")
      let test = JSON.parse(abc);


      // 

      axios.post(`https://softliee.com/softlee/public/api/blogcommentsave?user_id=${test.user.id}&blog_id=${singleBlog?.id}&comment=${comment}`).then(res => {

        window.location.reload()

      }).catch(err => {

      })
      //   
    } else {
      alert("Please Login to comment")
    }



  };


  const handleReply = (commentid) => {

    if (localStorage.softliUserData) {

      let abc = localStorage.getItem("softliUserData")
      let test = JSON.parse(abc);

      // 

      axios.post(`https://softliee.com/softlee/public/api/blogcommentsave?user_id=${test.user.id}&blog_id=${singleBlog?.id}&parent_id=${commentid}&comment=${commentReply}`).then(res => {

        window.location.reload()
      }).catch(err => {

      })
      //   
    } else {
      alert("Please Login to comment")
    }



  }
  // useEffect(() => {
  //   
  // }, [singleBlog])
  // useEffect(() => {
  //   
  // }, [])



  useEffect(() => {
    if (!popularProducts?.data && !popularProducts?.loading) {
      dispatch(getPopularProducts());
    }
  }, []);


  useEffect(() => {

    let abc = localStorage.getItem("softliUserData")
    let test = JSON.parse(abc);
    setCurrentUser(test)
  }, [])

  const like = async () => {
    console.log("Curent uid", currentUser.user.id);
    // axios.post(`https://softliee.com/softlee/public/api/save-likedislike?id=2&type=like&user_id=${currentUser.user.id}`).then(res => {
    //   console.log(res.data);
    // }).catch(err => {
    //   console.log(err);
    // })
  }

  const dislike = async () => {
    console.log("like");
  }



  return (
    <>
      <Helmet>
        <title>{singleBlog?.meta_title}</title>
        <meta
          name="description"
          content={singleBlog?.meta_description}
        />

        <meta
          name="keywords"
          content={
            singleBlog?.meta_keywords
          }
        />
      </Helmet>

      <Header />

      <section className="advertiseus">
        <div className="container">
          <div className="row">
            <div className="col-sm-12">
              {/* <div className="bread_crumb_link blog-detail">
                <a href="/" className="bread_crumb_link">
                  Home
                </a>{" "}
                <ChevronRightIcon />
                <a href="" className="bread_crumb_link">
                  {singleBlog?.category?.name}
                </a>{" "}
                <ChevronRightIcon />
                <a href="" className="bread_crumb_link">
                  {singleBlog?.title}
                </a>{" "}
                <ChevronRightIcon />
              </div> */}

              <div className="banner-ad-single-post">
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
        </div>
      </section>

      <section>
        <div className="container">
          <div className="row">
            <div className="col-sm-9 blog-details-left">
              <div className="col-sm-12">
                <img
                  className="img-fluid about-us-img"
                  src={`https://softliee.com/softlee/public/storage/blogs/${singleBlog?.image}`}
                  alt={singleBlog?.alt_image}
                  width="1"
                  height="1"
                />
              </div>

              <h3 className="main-tit my-3">
                {singleBlog?.title}
              </h3>
              <p className="ads-text">ADS</p>
              <Adsense
                client="ca-pub-2933454440337038"
                slot="6702463586"
                style={{ display: "block" }}
                format="auto"
                layout="in-article"
                responsive="true"
              />

              <p className="single-post-descroption"
                dangerouslySetInnerHTML={{
                  __html: singleBlog?.description
                }}
              ></p>
              <p className="ads-text">ADS</p>

              <Adsense
                client="ca-pub-2933454440337038"
                slot="6702463586"
                style={{ display: "block" }}
                format="auto"
                layout="in-article"
                responsive="true"
              />
              {/* <div className="quote-section">
                <div className="row">
                  <div className="col-sm-2">
                    <div className="quote-wrapper">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                        role="img"
                        className="quotesvg iconify iconify--clarity"
                        width="1em"
                        height="1em"
                        preserveAspectRatio="xMidYMid meet"
                        viewBox="0 0 36 36"
                      >
                        <path
                          fill="#fff"
                          d="M11.86 16.55a4.31 4.31 0 0 0-2.11.56a14.44 14.44 0 0 1 4.36-6a1.1 1.1 0 0 0-1.4-1.7c-4 3.25-5.78 7.75-5.78 10.54A5.08 5.08 0 0 0 10 24.58a4.4 4.4 0 0 0 1.88.44a4.24 4.24 0 1 0 0-8.47Z"
                          className="clr-i-outline clr-i-outline-path-1"
                        ></path>
                        <path
                          fill="#fff"
                          d="M23 16.55a4.29 4.29 0 0 0-2.11.56a14.5 14.5 0 0 1 4.35-6a1.1 1.1 0 1 0-1.39-1.7c-4 3.25-5.78 7.75-5.78 10.54a5.08 5.08 0 0 0 3 4.61A4.37 4.37 0 0 0 23 25a4.24 4.24 0 1 0 0-8.47Z"
                          className="clr-i-outline clr-i-outline-path-2"
                        ></path>
                      </svg>
                    </div>
                  </div>
                  <div className="col-sm-10">
                    <p className="quote-tit">
                      Due to extensive flooding, most of the pathways of
                      underground cables have been submerged, as relief workers
                      or locals were trying to divert floodwater by digging
                      trenches on roads and footpaths. The ministry has directed
                      PTCL to declare an emergency so that repair work could be
                      initiated when any such incident is reported in the
                      system, while PTA is constantly monitoring the quality of
                      service.
                    </p>
                  </div>
                </div>
              </div>

              <p className="pt-3">
                PTCL’s network cables have a total capacity of 6.5 terabytes,
                but only 70% of it is used so that traffic can be shifted to
                other cables in case of emergencies.
              </p> */}

              {/* <div className="playstoresection p-1 mb-5">
                <a
                  href="https://play.google.com/store/apps/details?id=com.mobilestore.softliee&hl"
                  className="link-play"
                >
                  <div className="d-flex justify-content-between p-3 align-items-center">
                    <div>
                      <div className="d-flex justify-content-center align-items-center">
                        <img
                          width="40"
                          src="../../assets/images/blogdetails/playstore.png"
                          alt=""
                          height="40"
                        />
                      </div>
                    </div>
                    <div>
                      <p className="quote-tit text-center">
                        {!mobileWidth
                          ? "Get the Sofliee App now & scroll through your favourite content faster!"
                          : "Download from play store"}
                      </p>
                    </div>
                  </div>
                </a>
              </div> */}
              {/* author bio */}

              {/* {mobileWidth ? (
                <div className="author-bio">
                  <div className="row">
                    <div
                      className={
                        tabletWidth || mobileWidth
                          ? "col-sm-12 mt-2"
                          : "col-sm-6"
                      }
                    >
                      <div className="image-tit-wrap">
                        <img
                          className="profile"
                          src="../../assets/images/blogdetails/profile.png"
                          alt=" Profile Image"
                        />
                        <div>
                          <p className="quote-tits">Nolan Workman</p>

                          <div className="published-dates">
                            Published {singleBlog?.created_at}
                          </div>
                          <div className="published-times">12:08 pm</div>

                          <div
                            className={
                              tabletWidth || mobileWidth
                                ? "col-sm-12 align-items-center mt-1"
                                : "col-sm-6"
                            }
                          >
                            <div
                              className={
                                tabletWidth || mobileWidth
                                  ? "col-sm-12 mb-3 all-wrappers"
                                  : "all-wrappers"
                              }
                            >
                              <div className="social-items-wraps">
                                <img
                                  className="blog-social-items"
                                  src="../../assets/images/blogdetails/fb.png"
                                  alt=""
                                />
                                <img
                                  className="blog-social-items"
                                  src="../../assets/images/blogdetails/yt.png"
                                  alt=""
                                />
                                <img
                                  className="blog-social-items"
                                  src="../../assets/images/blogdetails/in.png"
                                  alt=""
                                />
                                <img
                                  className="blog-social-items"
                                  src="../../assets/images/blogdetails/pi.png"
                                  alt=""
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div
                      className={
                        tabletWidth || mobileWidth
                          ? "align-items-center d-flex justify-content-between gap-2 mt-4"
                          : "shareviews"
                      }
                    >
                      <div className="colsss">
                        <img
                          className="share-iconss"
                          src="../../assets/images/blogdetails/share.png"
                          alt=""
                        />
                        <span>12 </span>
                      </div>
                      <div className="colsss">
                        <img
                          className="share-iconss"
                          src="../../assets/images/blogdetails/eye.png"
                          alt=""
                        />
                        <span>4.4k</span>
                      </div>
                      <div className="colsss">
                        <img
                          className="share-iconss"
                          src="../../assets/images/blogdetails/message.png"
                          alt=""
                        />
                        <span>4</span>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="author-bio">
                  <div className="row">
                    <div
                      className={
                        tabletWidth || mobileWidth
                          ? "col-sm-12 mt-2"
                          : "col-sm-6"
                      }
                    >
                      <div className="image-tit-wrap">
                        <img
                          src="../../assets/images/blogdetails/profile.png"
                          alt=" Profile Image"
                        />
                        <div>
                          <p className="quote-tit">Nolan Workman</p>

                          <div className="published-date">
                            Published {singleBlog?.created_at}
                          </div>
                          <div className="published-time">12:08 pm</div>
                        </div>
                      </div>
                    </div>
                    <div
                      className={
                        tabletWidth || mobileWidth
                          ? "col-sm-12 align-items-center mt-3 "
                          : "col-sm-6"
                      }
                    >
                      <div
                        className={
                          tabletWidth || mobileWidth
                            ? "col-sm-12 align-items-center mb-3 all-wrapper"
                            : "all-wrapper"
                        }
                      >
                        <div className="social-items-wrap">
                          <img
                            className="blog-social-item"
                            src="../../assets/images/blogdetails/fb.png"
                            alt=""
                          />
                          <img
                            className="blog-social-item"
                            src="../../assets/images/blogdetails/yt.png"
                            alt=""
                          />
                          <img
                            className="blog-social-item"
                            src="../../assets/images/blogdetails/in.png"
                            alt=""
                          />
                          <img
                            className="blog-social-item"
                            src="../../assets/images/blogdetails/pi.png"
                            alt=""
                          />
                        </div>

                        <div
                          className={
                            tabletWidth || mobileWidth
                              ? "align-items-center d-flex gap-2"
                              : "shareviews"
                          }
                        >
                          <div className="colss">
                            <img
                              className="share-icons"
                              src="../../assets/images/blogdetails/share.png"
                              alt=""
                            />
                            <span>12 Shares</span>
                          </div>
                          <div className="colss">
                            <img
                              className="share-icons"
                              src="../../assets/images/blogdetails/eye.png"
                              alt=""
                            />
                            <span>4.4k Views</span>
                          </div>
                          <div className="colss">
                            <img
                              className="share-icons"
                              src="../../assets/images/blogdetails/message.png"
                              alt=""
                            />
                            <span>4 Comments</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )} */}

              {/* comments here */}
              {mobileWidth ? (
                <section id="users-comments">
                  <div className="container">
                    <div className="row">
                      <div className="col-sm-12">
                        <h3 className="main-tit users-cc-tit">
                          {" "}
                          {singleBlog?.title} Opinions and reviews
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
                            placeholder="Write a review..."
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                          />
                        </div>
                        <div className="d-flex align-items-center justify-content-end">
                          <button className="comment-btn" onClick={handleCommentPost}>Post Review</button>
                        </div>


                        {/* --------------------------------------------------------------------- */}

                        {

                          singleBlog ?
                            singleBlog?.comments?.map((item, index) => {


                              return (
                                <>
                                  <div className="comment-wrapper">
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
                                          className="comment-av-reals"
                                          src={item?.user?.profile_photo_url}
                                          alt=""
                                        />
                                        <div className="comment-prof-info">
                                          <h3 className="prof-tits">{item?.user?.name}</h3>
                                          {/* <h6 className="daysago">3 days ago </h6> */}

                                          <div className="d-flex">
                                            <p className="comment-desc">
                                              {item.comment}
                                            </p>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="wrapper-rep-like-dis">



                                        {
                                          replyClicked[item.id] ?
                                            <>
                                              <button className=" comment-btn w-100" onClick={() => handleReply(item.id)}>Reply</button>
                                              <input className="comment-input mt-3 write-a-reply" type="text" placeholder="Write a reply..." value={commentReply} onChange={(e) => setCommentReply(e.target.value)} />
                                            </>

                                            : <>  <button className="reply-btn" onClick={() => {

                                              setreplyClicked({ [item.id]: true })
                                            }}>Reply</button></>
                                        }

                                        {/* <div className="like-btn-count">
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
                                        </div> */}
                                      </div>
                                    </div>

                                    <div className="forborborderbottom"></div>
                                  </div>

                                  {
                                    item.replies && item.replies.length > 0 ?

                                      item.replies.map((item, index) => {
                                        return (
                                          <div className="comment-wrapper replay">
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
                                                  src={item?.user?.profile_photo_url}
                                                  alt=""
                                                />
                                                <div className="comment-prof-info">
                                                  <h3 className="prof-tit">{item?.user?.name}</h3>
                                                  {/* <h6 className="daysago">3 days ago </h6> */}

                                                  <div className="d-flex">
                                                    <p className="comment-desc">
                                                      {item?.comment}
                                                    </p>
                                                  </div>
                                                </div>
                                              </div>

                                              {/* <button className="reply-btn">Reply</button> */}
                                              {/* <div className="wrapper-rep-like-dis">
                                            <button className="reply-btn">Reply</button>
                                            <div className="like-btn-count">
                                              <Icon className="like-ico" icon="ant-design:like-filled" />
                                              <h6 className="like-ico-count">12</h6>
                                            </div>
                                            <div className="like-btn-count">
                                              <Icon className="dislike-ico" icon="ant-design:like-filled" />
                                              <h6>0</h6>
                                            </div>
                                          </div> */}
                                            </div>

                                            <div className="forborborderbottom"></div>
                                          </div>
                                        )
                                      })


                                      :

                                      <></>
                                  }
                                </>
                              )
                            }) : <></>

                        }








                        {/* -------------------------------------------------------------------------------- */}



                      </div>
                    </div>
                  </div>
                </section>
              ) : (
                <section id="users-comments">
                  <div className="container">
                    <div className="row">
                      <div className="col-sm-12">
                        <h3 className="main-tit users-cc-tit">
                          {" "}
                          {singleBlog?.title} Opinions and reviews
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
                            placeholder="Write a review..."
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                          />
                        </div>
                        <div className="d-flex align-items-center justify-content-end">
                          <button className="comment-btn" onClick={handleCommentPost}>Post Review</button>
                        </div>
                        {

                          singleBlog ?
                            singleBlog?.comments?.map((item, index) => {


                              return (
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
                                          src={item?.user?.profile_photo_url}
                                          alt=""
                                        />
                                        <div className="comment-prof-info">
                                          <h3 className="prof-tit">{item?.user?.name}</h3>
                                          <h6 className="daysago"> {moment(item?.created_at).format(
                                            "YYYY-MM-DD hh:mm:ss"
                                          )}</h6>

                                          <div className="d-flex">
                                            <p className="comment-desc">
                                              {item?.comment}
                                            </p>
                                          </div>
                                        </div>
                                      </div>

                                      <div className="wrapper-rep-like-dis">
                                        {replyClicked[item.id] ? <>
                                          <input className="comment-input mt-3 write-a-reply" type="text" placeholder="Write a reply..." value={commentReply} onChange={(e) => setCommentReply(e.target.value)} />
                                          <button className=" comment-btn w-100" onClick={() => handleReply(item.id)}>Reply</button>
                                        </> : <button className="reply-btn" onClick={() => {
                                          setreplyClicked({ [item.id]: true })

                                        }}>Reply</button>
                                        }

                                        {/* <div className="like-btn-count">
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
                                        </div> */}
                                      </div>
                                    </div>

                                    <div className="forborborderbottom"></div>
                                  </div>

                                  {
                                    item.replies && item.replies.length > 0 ?

                                      item.replies.map((item, index) => {
                                        return (
                                          <div className="comment-wrapper replay">
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
                                                  src={item?.user?.profile_photo_url}
                                                  alt=""
                                                />
                                                <div className="comment-prof-info">
                                                  <h3 className="prof-tit">{item?.user?.name}</h3>
                                                  {/* <h6 className="daysago">3 days ago </h6> */}

                                                  <div className="d-flex">
                                                    <p className="comment-desc">
                                                      {item.comment}
                                                    </p>
                                                  </div>
                                                </div>
                                              </div>


                                            </div>

                                            <div className="forborborderbottom"></div>
                                          </div>
                                        )
                                      })


                                      :

                                      <></>
                                  }
                                </>
                              )
                            }) : <></>

                        }



                      </div>
                    </div>
                  </div>
                </section>
              )}

            </div>



            <BlogSidebar />
            <section className="popular-mobiles">
              <div className="container">
                <div className="row">
                  <div className="col-sm-6 col-7">
                    <h2 className="main-tit">Popular Mobiles</h2>
                  </div>
                  <div className="col-sm-6 col-5">
                    <div className="flex align-items-end justify-content-end">

                      <a className="seemoree" href="#">
                        See More <ChevronRightIcon className="btn-chev" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="container">
                <div className="row px-2">
                  {popularProducts.loading ? (
                    <div className="w-100 d-flex justify-content-center align-items-center h-40vh">
                      <Spinner />
                    </div>
                  ) : (
                    popularProducts?.data?.$popular_products?.data &&
                    popularProducts?.data?.$popular_products?.data.map(
                      (item, index) => {
                        if (index < 4) {
                          return (
                            <div className="col-sm-3 col-6 px-2">
                              <div
                                className={clsx(
                                  "",
                                  mobileWidth && "single-m-wraps",
                                  !mobileWidth && "single-m-wrap"
                                )}

                              >
                                <a href={item.slug} className="single-m-link">
                                  <img
                                    className="single-mob-img"
                                    src={`https://softliee.com/softlee/public/storage/product/${item.image}`}
                                    alt={item.name}
                                  
                                  // onClick={() => handleImgClick(item.slug)}
                                  />
                                  <h3 className={clsx(
                                    "",
                                    mobileWidth && "single-mob-tits",
                                    !mobileWidth && "single-mob-tit"
                                  )}>{item.name}</h3>
                                </a>
                                <div className="compair-btn-with-ico">
                                  <h4>Compare</h4>
                                  <AddIcon />
                                </div>

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

                                <div className={clsx(
                                  "flex align-items-center justify-content-center",
                                  mobileWidth && "price-icon-wraps",
                                  !mobileWidth && "price-icon-wrap"
                                )}>
                                  <h3 className={clsx(
                                    "",
                                    mobileWidth && "single-mob-tits",
                                    !mobileWidth && "single-mob-tit"
                                  )}>
                                    {localSelectedCurrency === "USD" ? "$ " : "RS "}
                                    {item.orignal_price
                                      ? formatAmount(
                                        getItemPrice(item.orignal_price)
                                      )
                                      : "N/A"}
                                  </h3>
                                  <RemoveRedEyeIcon />
                                </div>
                              </div>
                            </div>
                          );
                        }
                      }
                    )
                  )}
                </div>
              </div>
            </section>

            <section className="ads-section forbot-marg">
              <div className="container">
                <div className="row justify-content-center">
                  <div className="col-12">

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
          </div>
        </div>
      </section>



      <Footer />
    </>
  );
};
export default Blogdetails;
