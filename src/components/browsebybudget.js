import React, { useState, useEffect } from "react";
import Footer from "./small/footer";
import Header from "./small/header";
import { useLocation, useNavigate } from "react-router";
import { Link } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import clsx from "clsx";
import { IsMobileWidth, IsTabletWidth } from "./utils";
import { useSelector } from "react-redux";
import { Adsense } from "@ctrl/react-adsense";
import axios from "axios";
import ReactPaginate from "react-paginate";


const BrowseByBudget = () => {
  const [Users, setUsers] = useState([]);
  const mobileWidth = IsMobileWidth();
  const tabletWidth = IsTabletWidth();
  const { filters, brands, filterMobilesResponse, advertisement, currency } = useSelector(
    (selectSate) => selectSate.app
  );
  const location = useLocation()
  // console.log(location.pathname.split("/"));
  const path = location.pathname.split("/");
  const navigate = useNavigate()

  const mylocation = window.location.pathname.split("/")
  // const [pageNumber, setpageNumber] = useState("")


  // const getUser = async () => {

  //   try {
  //     await fetch(
  //       `https://softliee.com/softlee/public/api/ram_products/${path[2]}`
  //     ).then(async (response) => {
  //       await response.json().then((res) => {
  //         console.log(res.ram_product);
  //         setUsers(res.ram_product);
  //       });
  //     });
  //     //   setLoading(false);
  //   } catch (error) {
  //     alert("api get faile");
  //   }
  // };
  const handleImgClick1 = (slug) => {
    navigate(`/${slug}`, { replace: true });
  };


  const [itemOffset, setItemOffset] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const [myCurrentItems, setCurrentItems] = useState([]);

  const itemsPerPage = 16;


  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % Users.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
    window.scrollTo(0, 0)
  };

  const getData = () => {
    setUsers([])
    axios.get(`https://softliee.com/softlee/public/api/browse_budget/${mylocation[2]}`).then((res) => {
      setUsers(res.data.budget_products);
    })

  }

  useEffect(() => {
    getData()
    window.scrollTo(0, 0)
  }, []);

  useEffect(() => {
    if (Users) {
      const endOffset = itemOffset + itemsPerPage;
      console.log(`Loading items from ${itemOffset} to ${endOffset}`);
      const currentItems = Users.slice(itemOffset, endOffset);
      setCurrentItems(currentItems)
      const pageCount1 = Math.ceil(Users.length / itemsPerPage);
      setPageCount(pageCount1)
      console.log(currentItems, "Current ITems");
    }


  }, [Users, itemOffset]);





  return (
    <div>
      <section className="ram-filter">
        <Header />

        <section className="ads-section margin-top-50px margin-bottom-30px" >
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
              <h1>Browse By Budget</h1>
            </div>
          </div>
          <div className="row px-2">
            {myCurrentItems?.length > 0 && myCurrentItems ? (
              myCurrentItems.map((items, index) => {

                if (index == 7 || (mobileWidth && index == 3) || (mobileWidth && index == 11)) {
                  return (
                    <>

                      <div className="col-sm-3 col-6 bg-sm-danger px-2" key={index}>
                        <div
                          className={clsx(
                            "",
                            mobileWidth && "single-m-wraps",
                            !mobileWidth && "single-m-wrap"
                          )}

                        >
                          <a className="single-m-link" href={items.slug}>
                            <img
                              className="single-mob-img"
                              //   src="\assets\images\mobiles\image1.png"
                              src={`https://softliee.com/softlee/public/storage/product/${items.image}`}
                              alt={items.alt_imag}
                              onClick={() => handleImgClick1(items.slug)}
                            />
                            <h3
                              className={clsx(
                                "",
                                mobileWidth && "single-mob-tits",
                                !mobileWidth && "single-mob-tit"
                              )}
                              onClick={() => handleImgClick1(items.slug)}
                            >{items.name}</h3>
                          </a>

                          <Link
                            to={`/compare-mobile-phone/${items?.slug}/change_product`}
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
                              {items.ram_storage1} GB | {items.battery}
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
                              RS {items.orignal_price}
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


                      </div></>
                  )
                }

                return (
                  <div className="col-sm-3 col-6 bg-sm-danger px-2" key={index}>
                    <div
                      className={clsx(
                        "",
                        mobileWidth && "single-m-wraps",
                        !mobileWidth && "single-m-wrap"
                      )}

                    >
                      <a className="single-m-link" href={items.slug}>
                        <img
                          className="single-mob-img"
                          //   src="\assets\images\mobiles\image1.png"
                          src={`https://softliee.com/softlee/public/storage/product/${items.image}`}
                          alt={items.alt_imag}
                          onClick={() => handleImgClick1(items.slug)}
                        />
                        <h3
                          className={clsx(
                            "",
                            mobileWidth && "single-mob-tits",
                            !mobileWidth && "single-mob-tit"
                          )}
                          onClick={() => handleImgClick1(items.slug)}
                        >{items.name}</h3>
                      </a>

                      <Link
                        to={`/compare-mobile-phone/${items?.slug}/change_product`}
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
                          {items.ram_storage1} GB | {items.battery}
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
          {pageCount > 1 ? <div className="margin-top-40px" >
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
            : <></>}
        </div>
        {/* 
        <button onClick={() => {
          setpageNumber(2)

        }}>Next</button> */}

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
      </section >
    </div >
  );
};

export default BrowseByBudget;
