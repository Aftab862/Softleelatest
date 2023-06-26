import { NotificationsNone, Upcoming } from "@mui/icons-material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { IsMobileWidth, IsTabletWidth } from "../utils";
import PopularMobiles from "./popularmobiles";
import UpcomingPhones from "../upcomingPhones";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMaxCountBlog } from "../../redux/actions/app.actions";
import { Link } from "react-router-dom";
import { Adsense } from "@ctrl/react-adsense";

const BlogSidebar = () => {
  const mobileWidth = IsMobileWidth();
  const tabletWidth = IsTabletWidth();
  const dispatch = useDispatch();
  const { maxCountBlog } = useSelector((selectSate) => selectSate.app);

  useEffect(() => {
    if (!maxCountBlog?.data && !maxCountBlog?.loading) {
      dispatch(getMaxCountBlog());
    }

  }, []);

  return (
    <>
      {tabletWidth ? (
        <div className="col-sm-3 ps-0 blog-sidebar">

          <div className="w-100 d-flex justify-content-center">
            {/* <p className="ads-text">ADS</p>
            <Adsense
              client="ca-pub-2933454440337038"
              slot="6702463586"
              style={{ display: "block" }}
              format="auto"
              layout="in-article"
              responsive="true"
            /> */}

          </div>

          <div className="d-flex align-item-center justify-content-between">
            <h3 className="main-tit tech-news">Tech News</h3>
            <button className="seemoreebss" href="#">
              See More
            </button>
          </div>
          {maxCountBlog?.data?.blogs &&
            maxCountBlog?.data?.blogs.map((data, index) => (

              index < 5 ?
                <div className="side_mobile_section side">
                  <div className="side_mobile_Col">
                    <center>
                      <img
                        className="tech-news-img img-fluid"
                        src={`https://softliee.com/softlee/public/storage/blogs/${data?.image}`}
                        height="88px"
                      />
                    </center>
                  </div>
                  <div className="side_mobile_Col">
                    <div className="side_col_titles">{data?.title}</div>
                  </div>
                </div> : <></>
            ))}


          <div className="w-100 d-flex justify-content-center">
            {/* <img
                src="../../assets/images/blog/ss.png"
                alt=""
                className="img-fluid for-margin-blog-ad ad-between"
              /> */}

            {/* <p className="ads-text">ADS</p>
            <Adsense
              client="ca-pub-2933454440337038"
              slot="6702463586"
              style={{ display: "block" }}
              format="auto"
              layout="in-article"
              responsive="true"
            /> */}
          </div>

          {/* {mobileWidth && <PopularMobiles title="More Mobiles" fourItems />} */}

          {mobileWidth ? (
            <>
              <div className="main-tit browsebyb-tit mt-5">Browse By Budget</div>
              <div className="tags_Sections budget mb-5">
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
            </>
          ) : (
            <>
              <div className="main-tit browsebyb-tit mt-5">Browse By Budget</div>
              <div className="tags_Section budget mb-5">
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
            </>
          )}
          {/* <div className="w-100 d-flex justify-content-center">
            <img
              src="../../assets/images/blog/ss.png"
              alt=""
              className="img-fluid last-ad-blog"
            />
          </div> */}
        </div>
      ) : (

        // this is for desktop
        <div className="col-sm-3 ps-0 blog-sidebar">

          <div className="w-100 d-flex justify-content-center">
            {/* <p className="ads-text">ADS</p>
            <Adsense
              client="ca-pub-2933454440337038"
              slot="6702463586"
              style={{ display: "block" }}
              format="auto"
              layout="in-article"
              responsive="true"
            /> */}
          </div>

          <div className="d-flex align-item-center justify-content-between tech-news">
            <h3 className="main-tit ">Tech News</h3>
            <button className="seemoreeb" href="#">
              See More <ChevronRightIcon className="btn-chev" />
            </button>
          </div>
          {maxCountBlog?.data?.blogs &&
            maxCountBlog?.data?.blogs.map((data, index) => {
              if (index < 5) {
                return (
                  <>
                    <a href={"/details/" + data.slug}>
                      <div className="side_mobile_section side">
                        <div className="side_mobile_Col">
                          <center>
                            <img
                              className="tech-news-img img-fluid"
                              src={`https://softliee.com/softlee/public/storage/blogs/${data?.image}`}
                            />
                          </center>
                        </div>
                        <div className="side_mobile_Col">
                          <div className="side_col_title">{data?.title.slice(0, 35) + "..."}</div>
                        </div>
                      </div>
                    </a>
                  </>
                );
              }
            })}



          <div className="w-100 d-flex justify-content-center">
            {/* <p className="ads-text">ADS</p>
            <Adsense
              client="ca-pub-2933454440337038"
              slot="6702463586"
              style={{ display: "block" }}
              format="auto"
              layout="in-article"
              responsive="true"
            /> */}
          </div>


          <>
            <UpcomingPhones />
          </>


          {mobileWidth ? (
            <>
              <div className="main-tit browsebyb-tit mt-5">Browse By Budget</div>
              <div className="tags_Sections budget mb-5">
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
            </>
          ) : (
            <>
              <div className="main-tit browsebyb-tit mt-5">Browse By Budget</div>
              <div className="tags_Section budget mb-5">
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
            </>
          )}

          <div className="w-100 d-flex justify-content-center">
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
      )
      }
    </>
  );
};
export default BlogSidebar;
