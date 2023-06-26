import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { IsTabletWidth } from "../utils";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPopularComparision } from "../../redux/actions/app.actions";


const Popularcomp = () => {
  const tabletWidth = IsTabletWidth();
  const dispatch = useDispatch();
  const { popularComparision } = useSelector((selectSate) => selectSate.app);
  const [popular, setPopular] = useState([]);

  useEffect(() => {
    if (!popularComparision?.data) {
      dispatch(getPopularComparision());
    }
  }, []);

  useEffect(() => {
    if (popularComparision?.data) {
      let popular = [];
      popular.push([
        { ...popularComparision?.data?.products_one },
        { ...popularComparision?.data?.products_two },
        { ...popularComparision?.data?.products_three },
      ]);
      setPopular(...popular);
    }
  }, [popularComparision?.data]);



  return (
    <section className="popular-comparison margin-top-30px margin-bottom-30px">
      <div className="container">
        <div className="row">
          <div className="col-sm-6 col-7">
            <h2 className="main-tit">Popular Comparison</h2>
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
      <div className="container hide-on-mobile">
        <div className="row">
          {popular.map((item, index) => {
            return (
              <div className={tabletWidth ? "col-sm-6" : "col-sm-4"}>
                <div className="comparison-single-wrap">
                  <div className="flex justify-content-between align-items-center">
                    <div className="w-50 p-1 d-flex flex-column justify-content-center align-items-center">
                      <img
                        className="comp-single-img"
                        src={`https://softliee.com/softlee/public/storage/product/${item[0]?.image}`}

                        width="1"
                        height="1"
                        alt="compare image"
                      />
                      <h3
                        className="single-mob-tit compar-tit"

                      >
                        {item[0]?.name}
                      </h3>
                    </div>
                    <div>
                      <img className="margin-bottom-50px" src="../../../assets/images/vs.png" width="45"
                        height="45" alt="compare image" />
                    </div>
                    <div className="w-50 p-1 d-flex flex-column justify-content-center align-items-center">
                      <img
                        className="comp-single-img"
                        src={`https://softliee.com/softlee/public/storage/product/${item[1]?.image}`}

                        width="1"
                        height="1"
                        alt="compare image"
                      />
                      <h3
                        className="single-mob-tit compar-tit"

                      >
                        {item[1]?.name}
                      </h3>
                    </div>
                  </div>
                  <Link to={`/compare-mobile-phone/${item[0]?.slug}/${item[1]?.slug}`}>
                    <button className="compare-btn-second">Compare</button>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="container hide-on-desktop">
        <div className="row">
          {popular.map((item, index) => {
            return (
              <div className="col-sm-4">
                <div className="comparison-single-wrap mobile">
                  <div className="flex justify-content-between">
                    <div className="first-mobile-comp">
                      <img
                        className="comp-single-img"
                        src={`https://softliee.com/softlee/public/storage/product/${item[0]?.image}`}
                        alt=""
                      />
                      <h3 className="single-mob-tit compar-tit">
                        {item[0]?.name}
                      </h3>
                    </div>

                    <div className="second-mobile-comp">
                      <img
                        className="comp-single-img"
                        src={`https://softliee.com/softlee/public/storage/product/${item[1]?.image}`}
                        alt=""
                      />
                      <h3 className="single-mob-tit compar-tit">
                        {item[1]?.name}
                      </h3>
                    </div>
                    <Link to={`/compare-mobile-phone/${item[0]?.slug}/${item[1]?.slug}`}>
                      <button className="compare-btn-second">
                        <ChevronRightIcon />
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
export default Popularcomp;
