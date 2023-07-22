import Footer from "./small/footer";
import Header from "./small/header";
import { Link } from "react-router-dom";
import BlogSidebar from "./small/blogsidebar";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { IsMobileWidth, IsTabletWidth } from "./utils";
import SearchBar from "./small/searchbar";
import React, { useEffect, useState } from "react";
import { getBlogs } from "../redux/actions/app.actions";
import { useDispatch, useSelector } from "react-redux";
import clsx from "clsx";
import { Adsense } from "@ctrl/react-adsense";
import ReactPaginate from "react-paginate";
import { Helmet } from "react-helmet";


const Ourblog = () => {
  const mobileWidth = IsMobileWidth();
  const tabletWidth = IsTabletWidth();
  const [isSearchBarOpen, setIsSearchBarOpen] = useState(false);
  const dispatch = useDispatch();
  const { blogs } = useSelector((selectSate) => selectSate.app);


  const [itemOffset, setItemOffset] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const [myCurrentItems, setCurrentItems] = useState([]);

  const itemsPerPage = 12;

  // Simulate fetching items from another resources.
  // (This could be items from props; or items loaded in a local state
  // from an API endpoint with useEffect and useState)


  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % blogs.data.blogs.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);

    window.scrollTo(0, 0)
  };

  useEffect(() => {
    if (!blogs?.data && !blogs?.loading) {
      dispatch(getBlogs());
    }
  }, []);






  const ChangeCurrentItems = () => {
    if (blogs) {
      if (blogs.data) {
        console.log("if");
        const endOffset = itemOffset + itemsPerPage;
        console.log(`Loading items from ${itemOffset} to ${endOffset}`);
        const currentItems = blogs?.data?.blogs.slice(itemOffset, endOffset);
        setCurrentItems(currentItems)
        const pageCount1 = Math.ceil(blogs.data.blogs.length / itemsPerPage);
        setPageCount(pageCount1)
        console.log(currentItems, "Current ITems");
      }

    }
  }

  useEffect(() => {
    ChangeCurrentItems()


  }, [blogs.data.blogs, itemOffset])
  return (
    <>
      <Helmet>
        <title>Gadgets - Mobile Phones And Tech Updates - Softliee.com</title>
        <meta
          name="description"
          content="Mobile Blog aims to focus upon latest news and seo friendly content related to technology, gadgets or Mobile phones."
        />

        <meta
          name="keywords"
          content={[
            "Mobile News",
            "Tech News",
            "Mobiles features",
            "Mobile reviews",
            "Tech blog",
            "Mobile Prices"
          ]} />


        <link rel="canonical" href={window.location.href} />

      </Helmet>

      {/* <Items currentItems={currentItems} /> */}

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


          {/* <Feed
            url="https://softliee.com/softlee/public/api/get_blogs"
            count={5} // specify the number of items you want to display
          /> */}

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

          {mobileWidth ? (
            <>
              {" "}
              <section className="technews">
                <div className="container">
                  <div className="row">
                    <div className="col-sm-6 col-7">
                      <h2 className="main-tit">Tech News</h2>
                    </div>
                    <div className="col-sm-6 col-5">
                      <div className="flex align-items-end justify-content-end">
                        {" "}
                        <a className="seemoree" href="#">
                          See More <ChevronRightIcon className="btn-chev" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="container">
                  <div className="row">
                    {myCurrentItems &&
                      myCurrentItems.map((data, index) => {
                        return (
                          <>
                            <div className="col-sm-6">
                              <div className="single-post-item-wrap">
                                <div className="for-flexing-single-post">
                                  <img src={`https://softliee.com/softlee/public/storage/blogs/${data?.image}`} width="100" height="80"></img>
                                  {/* <img
                                    className="posts-img"
                                  
                                    alt=""
                                  /> */}
                                  <div className="right-side-info">
                                    {
                                      mobileWidth ? <h3 className="posts-title-m">{data?.title.substring(0, 45) + "..."}</h3> :
                                        <h3 className="posts-title-m">{data?.title}</h3>
                                    }

                                    <Link
                                      to={`/details/${data?.slug}`}
                                      className="readmore-btn"
                                    >
                                      Read more
                                    </Link>
                                    {/* <div className="d-flex align-items-center">
                                  <h6 className="times-ago">{item.posted}</h6>
                                  <h6 className="times-ago commentss">
                                    {item.comments}
                                  </h6>
                                </div>{" "} */}

                                  </div>
                                </div>
                              </div>
                            </div>


                            {index == 7 || (mobileWidth && index == 3) || (mobileWidth && index == 11) ? <>
                              <p className="ads-text">ADS</p>
                              <Adsense
                                client="ca-pub-2933454440337038"
                                slot="6702463586"
                                style={{ display: "block" }}
                                format="auto"
                                layout="in-article"
                                responsive="true"
                              ></Adsense>

                            </> : <></>}

                          </>)
                      })}
                  </div>
                </div>
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
              </section>
            </>
          ) : (
            <>
              <section className="blog-tit-section">
                <div className="container ">
                  <div className="row">
                    <div className="col-sm-12">
                      <h2 className="main-tit">Recent Posts</h2>
                    </div>
                  </div>
                </div>
              </section>
              <section className="blog-posts-sec">
                <div className="container">
                  <div className="row flex-row-reverse items-start ">
                    {!mobileWidth ? <BlogSidebar /> : null}
                    <div
                      className={clsx(
                        "col-sm-9 for-padding-right"
                      )}
                    >
                      {myCurrentItems &&
                        myCurrentItems.map((data, index) => {

                          return (
                            <>
                              <div className="blog-posts-wrapp ">
                                <div className="blog-card-design">
                                  <div className="img-side">

                                    {/* //----------desktop----------- */}
                                    <img
                                      className="blog-card-img"
                                      src={`https://softliee.com/softlee/public/storage/blogs/${data?.image}`}
                                      alt=""
                                    />
                                  </div>
                                  <div className="text-side">
                                    {/* <h6 className="blogging">Blogging</h6> */}
                                    <h3 className="blog-card-tit">{data?.title}</h3>
                                    <div
                                      className="expert-card-blog truncated-word"
                                      dangerouslySetInnerHTML={{
                                        __html: data?.description.substring(0, 200),
                                      }}
                                    >
                                      {/* {mobileWidth
                                    ? "A lot of people lament how fate and tragedy has affected their future..."
                                    : "A lot of people lament how fate and tragedy has affected their future, mostly for the worst. But there are some exceptional individuals who,..."} */}
                                    </div>
                                    <Link
                                      to={`/details/${data?.slug}`}
                                      className="readmore-btn"
                                    >
                                      Read more
                                    </Link>
                                  </div>
                                </div>
                              </div>
                              {index == 7 || (mobileWidth && index == 3) || (mobileWidth && index == 11) ? <>
                                <p className="ads-text">ADS</p>
                                <Adsense
                                  client="ca-pub-2933454440337038"
                                  slot="6702463586"
                                  style={{ display: "block" }}
                                  format="auto"
                                  layout="in-article"
                                  responsive="true"
                                ></Adsense>

                              </> : <></>}

                            </>
                          )
                        })}

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
                    </div>
                  </div>
                </div>
              </section>
            </>
          )}
          {mobileWidth && <BlogSidebar />}
          <section className="ads-section margin-top-50px margin-bottom-50px">
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
                  ></Adsense>
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
export default Ourblog;
