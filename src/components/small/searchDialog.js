import React, { useEffect } from "react";
import { IconButton } from "@mui/material";
import Spinner from 'react-bootstrap/Spinner';
import { Close } from "@mui/icons-material";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import "./searchDialog.css";
import {
  getSearchList,
  getSearchProduct,
} from "../../redux/actions/app.actions";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { formatAmount } from "../utils";

export default function SearchDialog(props) {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const { searchList, searchProduct, currency } = useSelector(
    (selectSate) => selectSate.app
  );
  const { value } = props;
  const [tab, setTab] = React.useState("1");
  const handleChange = (event, newValue) => {
    setTab(newValue);
  };

  const handleImgClick = (slug) => {
    navigate(`/${slug}`, { replace: true });
  };

  const handleImgClickk = (slug) => {
    navigate(`/details/${slug}`, { replace: true });
  };
  useEffect(() => {
    if (!searchList?.data && !searchList?.loading) {
      dispatch(getSearchList());
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


  return (
    <div className="searchDialogContainer rounded-3">
      {searchProduct.loading ? (
        <div className="w-100 d-flex justify-content-center align-items-center h-40vh">
          <Spinner />
        </div>
      ) : searchProduct?.data?.search_Product ? (
        searchProduct?.data?.search_Product.map((item, index) => (
          <div className="single-m-wrap search-items-wrap">
            <div className="single-m-inner">
              <img
                width="60px"
                height="80px"
                src={`https://softliee.com/softlee/public/storage/product/${item.image}`}
                onClick={() => handleImgClick(item.slug)}
              />
              <h6
                className="fw-bold"
                onClick={() => handleImgClick(item.slug)}
              >
                {item.name}
              </h6>
            </div>
            {/* <div>
              <IconButton>
                <Close />
              </IconButton>
            </div> */}
          </div>
        ))
      ) : (
        <Box sx={{ width: "100%", typography: "body1" }}>
          <TabContext value={tab}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList
                TabIndicatorProps={{
                  style: {
                    backgroundColor: "#4958EF",
                  },
                }}
                onChange={handleChange}
                aria-label="lab API tabs example"
              >
                <Tab
                  label={
                    <span
                      className={`${tab == 1 ? "tab-text-active" : "tab-text"}`}
                    >
                      Phone
                    </span>
                  }
                  value="1"
                />
                {/* <Tab
                  label={
                    <span
                      className={`${tab == 2 ? "tab-text-active" : "tab-text"}`}
                    >
                      News
                    </span>
                  }
                  value="2"
                /> */}
                {/* <Tab label={<span className={`${tab == 3 ? "tab-text-active" : "tab-text"}`}>Compares</span>} value="3" /> */}
              </TabList>
            </Box>
            <div className="d-flex align-item-center justify-content-between align-items-center mt-3">
              <div className="main-tit2 ms-2">Latest</div>
              <button className="seemoreeb2 me-3" href="#">
                See More <ChevronRightIcon className="btn-chev" />
              </button>
            </div>
            <TabPanel sx={{ padding: "8px" }} value="1">
              <div className="d-flex justify-content-between w-100">
                {searchList?.data?.searchProduct_list &&
                  searchList?.data?.searchProduct_list.map((item, index) => (
                    <div className="single-m-wrap d-flex align-items-center flex-column me-2 p-2 w-100">
                      <img
                        className="mt-2"
                        src={`https://softliee.com/softlee/public/storage/product/${item.image}`}
                        alt=""
                        onClick={() => handleImgClick(item.slug)}
                        width="70px"
                        height="78px"
                      />
                      <span
                        className="w-100 overview_details_title-2 text-center mt-3 fw-bolder"
                        onClick={() => handleImgClick(item.slug)}
                      >
                        {item.name}
                      </span>
                      <span className="text-center search-price mt-1">
                        {localSelectedCurrency === "USD" ? "$ " : "RS "}
                        {item.orignal_price
                          ? formatAmount(getItemPrice(item.orignal_price))
                          : "N/A"}
                      </span>
                    </div>
                  ))}
              </div>
            </TabPanel>

            {/* <TabPanel sx={{ padding: "8px" }} value="2">
              <div className="d-flex justify-content-between w-100">
                {searchList?.data?.searchPost_list &&
                  searchList?.data?.searchPost_list.map((item, index) => (
                    <div className="single-m-wrap d-flex align-items-center flex-column me-2 pt-1 pb-1 w-[100px]">
                      <img
                        className="mt-2"
                        src={`https://softliee.com/softlee/public/storage/blogs/${item.image}`}
                        onClick={() => handleImgClickk(item.slug)}
                        alt=""
                        width="78px"
                        height="88px"

                        // onClick={() => handleImgClick()}
                      />
                      <div
                        className="w-100 overview_details_title-3 text-center mt-3"
                        onClick={() => handleImgClickk(item.slug)}
                      >
                        {item.title}
                      </div>
                    </div>
                  ))}
              </div>
            </TabPanel> */}
          </TabContext>
        </Box>
      )}
    </div>
  );
}
