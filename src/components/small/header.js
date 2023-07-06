import { Link, NavLink, useNavigate } from "react-router-dom";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import { Icon } from "@iconify/react";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/Dropdown";
import "./headermobile.css";
import Offcanvas from "react-bootstrap/Offcanvas";
import { useEffect, useState } from "react";
import NotifyDropdown from "./notifydropdown";
import TechNewsDialog from "../technews";
import SearchDialog from "./searchDialog";
import { Backdrop, ClickAwayListener } from "@mui/material";
import { IsMobileWidth, IsTabletWidth } from "../utils";
import CountryPopup from "./countrypopup";
import { useDispatch, useSelector } from "react-redux";
import {
  logout,
  getCurrency,
  getSearchProduct,
  getNotification,
  getBrands,
} from "../../redux/actions/app.actions";
import { formatAmount } from "../utils";
import axios from "axios";

const Header = (props) => {
  const { isSearchBarOpen } = props;
  const [show, setShow] = useState(false);
  const [showS, setShowS] = useState(false);
  const [ControlBrands, setControlBrands] = useState(false);
  const [isTechNewsDialogOpen, setIsTechNewsDialogOpen] = useState(false);
  const [isSearchDialogOpen, setIsSearchDialogOpen] = useState(false);
  const [search, setSearch] = useState();
  const [countryPopupOpen, setCountryPopupOpen] = useState(true);
  const [mobileLoginDrop, setmobileLoginDrop] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");
  const [softlieeUser, setUser] = useState({});
  const [Brand, setBrands] = useState([]);
  let navigate = useNavigate();
  const tabletWidth = IsTabletWidth();
  const mobileWidth = IsMobileWidth();
  const { logoutResponse, currency, notification, brands } = useSelector(
    (selectSate) => selectSate.app
  );
  const [allNotifications, setAllNotifications] = useState([]);
  const handleImgClick = (slug, type) => {
    navigate(`/${slug}`, { replace: true });
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleCloseS = () => setShowS(false);
  const handleShowS = () => setShowS(true);

  const handleTeachNews = (e) => {
    e.preventDefault();
    setIsTechNewsDialogOpen(true);
  };

  const handleBlurForSearchDialog = () => {
    setIsSearchDialogOpen(false);
  };

  const handleCountryPopupClose = (value) => {
    setCountryPopupOpen(false);
    setSelectedValue(value);
  };

  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  useEffect(() => {
    if (logoutResponse.data) {
      localStorage.removeItem("softliUserData");
      navigate("/login");
    }
  }, [logoutResponse.data]);

  useEffect(() => {
    if (!currency?.data && !currency?.loading) {
      dispatch(getCurrency());
    }
  }, []);

  const handleSearch = () => {
    setIsSearchDialogOpen(true);
    dispatch(getSearchProduct({ search: search }));
    navigate("/searchresult")
  };

  useEffect(() => {
    if (!notification?.data && !notification?.loading) {
      dispatch(getNotification());
    }
  }, []);

  useEffect(() => {
    if (!brands?.data && !brands?.loading) {
      dispatch(getBrands());
    }
  }, []);
  let localSelectedCurrency = localStorage.getItem("selectedCurrency");

  useEffect(() => {
    if (notification?.data) {
      let allNotifications = [];
      notification?.data?.latest_products.map((data) => {
        allNotifications.push({
          ...data,
          latestProduct: true,
        });
      });

      setAllNotifications(allNotifications);
    }
  }, [notification]);

  const handleSearchChange = (e) => {
    // if(e !== ""){
    setIsSearchDialogOpen(true);
    dispatch(getSearchProduct({ search: e }));
    // }
    setSearch(e);
  };

  const handleCurrencyChange = (currency) => {
    if (currency !== localSelectedCurrency) {
      localStorage.setItem("selectedCurrency", currency);
      window.location.reload();
    }
  };
  useEffect(() => {
    if (localStorage.softliUserData) {

      let user = JSON.parse(localStorage.softliUserData);
      setUser(user)
    }
  }, [])
  useEffect(() => {

  }, [softlieeUser])
  useEffect(() => {
    setBrands([])
    axios.get("https://softliee.com/softlee/public/api/brands").then((res) => {

      setBrands((prev) => [...prev, (res.data.brands)])
    })
  }, [softlieeUser])

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  useEffect(() => {

  }, [Brand])
  return (
    <>
      {!isSearchBarOpen && (
        <>
          <Offcanvas fullWidth show={show} onHide={handleClose}>
            <Offcanvas.Header closeButton>
              <Offcanvas.Title>
                <img
                  src="../../../assets/images/icons/off-can-logo.png"
                  alt=""
                />
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body className="p-0 z-index-full">
              <div className="topbrands ps-3 pe-3">
                <div className="title-wrap">
                  <div className="icon-wrap-off">
                    <img src="../../../assets/images/icons/icon1.svg" alt="" />
                  </div>
                  <h3 className="topbrand-tit">Top Brands</h3>
                </div>

                <Icon
                  className="off-canvas-chevron"
                  icon="system-uicons:chevron-up"
                />
              </div>
              <div className="Line"></div>

              <div className="off-submenu ps-3 pe-3">
                {
                  !ControlBrands ? <>
                    <a href="/new-mobile/iphone-mobiles-price" className="myLinkStyle">
                      <h3 className="topbrand-tit sub"
                      // onClick={() => {
                      //   navigate("/new-mobile/iphone-mobiles-price")
                      //   setShow(false)
                      // }}
                      >Apple</h3>
                    </a>
                    <a href="/new-mobile/samsung-mobile-phones-prices-in-pakistan" className="myLinkStyle">

                      <h3 className="topbrand-tit sub" >Samsung</h3>
                    </a>

                    <a href="/new-mobile/realme-mobile-phones" className="myLinkStyle">

                      <h3 className="topbrand-tit sub"

                      >Realme</h3>
                    </a>
                    <h3 className="topbrand-tit sub" onClick={() => {
                      setControlBrands(true)
                    }}>More..</h3>
                  </> : <>
                    {
                      Brand[0] && Brand[0].map((item, index) => {
                        return (
                          <>
                            <a href={"/new-mobile/" + item.slug} className="myLinkStyle">
                              <h3 className="topbrand-tit sub" >{item.brand_name}                        </h3>
                            </a>
                          </>
                        )
                      })
                    }



                    {/* 
                    <a href="/new-mobile/samsung-mobile-phones-prices-in-pakistan" className="myLinkStyle">
                      <h3 className="topbrand-tit sub" onClick={() => {
                        navigate("/new-mobile/samsung-mobile-phones-prices-in-pakistan")
                        setShow(false)
                      }}>Samsung</h3>
                    </a>

                    <a href="/new-mobile/realme-mobile-phoness" className="myLinkStyle">
                      <h3 className="topbrand-tit sub" onClick={() => {
                        navigate("/new-mobile/iphone-mobiles-price")
                        setShow(false)
                      }}>Realme</h3>
                    </a>

                    <a href="/new-mobile/Google%20Mobile%20Phones%202023" className="myLinkStyle">
                      <h3 className="topbrand-tit sub" onClick={() => {
                        navigate("/new-mobile/google-mobile-phones-price-in-pakistan")
                        setShow(false)
                      }}>Google</h3>
                    </a>

                    <a href="/new-mobile/huawei-mobile-phone-price-in-pakistan" className="myLinkStyle">
                      <h3 className="topbrand-tit sub" onClick={() => {
                        navigate("/new-mobile/huawei-mobile-phone-price-in-pakistan")
                        setShow(false)
                      }}>Huawei</h3>
                    </a>

                    <a href=" /new-mobile/realme-mobile-phones" className="myLinkStyle">
                      <h3 className="topbrand-tit sub" onClick={() => {
                        navigate("/new-mobile/alcatel-mobile-phones")
                        setShow(false)
                      }}>Infinix</h3>
                    </a>
                    <a href=" /new-mobile/realme-mobile-phones" className="myLinkStyle">
                      <h3 className="topbrand-tit sub" onClick={() => {
                        navigate("/new-mobile/alcatel-mobile-phones")
                        setShow(false)
                      }}>alcatel</h3>
                    </a>
                    <a href="/new-mobile/honor-mobile-phones" className="myLinkStyle">
                      <h3 className="topbrand-tit sub" onClick={() => {
                        navigate("/new-mobile/honor-mobile-phones")
                        setShow(false)
                      }}>Honor</h3>
                    </a>
                    <a href="/new-mobile/new-itel-mobile-phone-and-prices-in-pakistan" className="myLinkStyle">
                      <h3 className="topbrand-tit sub" onClick={() => {
                        navigate("/new-mobile/new-itel-mobile-phone-and-prices-in-pakistan")
                        setShow(false)
                      }}>Itel</h3>
                    </a>
                    <a href="/new-mobile/nokia-mobile-phones-price-in-pakistan" className="myLinkStyle">
                      <h3 className="topbrand-tit sub" onClick={() => {
                        navigate("/new-mobile/nokia-mobile-phones-price-in-pakistan")
                        setShow(false)
                      }}>Nokia</h3>
                    </a>

                    <a href="/new-mobile/oale-mobile-phones" className="myLinkStyle">
                      <h3 className="topbrand-tit sub" onClick={() => {
                        navigate("/new-mobile/oale-mobile-phones")
                        setShow(false)
                      }}>Oale</h3>
                    </a>

                    <a href="/new-mobile/oneplus-mobile-phone-price-in-pakistan" className="myLinkStyle">
                      <h3 className="topbrand-tit sub" onClick={() => {
                        navigate("/new-mobile/oneplus-mobile-phone-price-in-pakistan")
                        setShow(false)
                      }}>Oneplus</h3>
                    </a>

                    <a href="/new-mobile/oppo-mobile-phone-price-in-pakistan" className="myLinkStyle">
                      <h3 className="topbrand-tit sub" >Oppo</h3>
                    </a>

                    <a href="/new-mobile/q-mobile-phones" className="myLinkStyle">
                      <h3 className="topbrand-tit sub" >Q Mobile</h3>
                    </a>
                    <a href="/new-mobile/realme-mobile-phones" className="myLinkStyle">
                      <h3 className="topbrand-tit sub" >Realme</h3>
                    </a>

                    <a href="/new-mobile/samsung-mobile-phones-prices-in-pakistan" className="myLinkStyle">
                      <h3 className="topbrand-tit sub">Samsung</h3>

                    </a>

                    <a href="/new-mobile/tecno-mobile-phones" className="myLinkStyle">
                      <h3 className="topbrand-tit sub" >Tecno</h3>
                    </a>
                    <a href="/new-mobile/vivo-mobile-phones-prices-in-pakistan" className="myLinkStyle">
                      <h3 className="topbrand-tit sub" >vivo</h3>
                    </a>

                    <a href=" /new-mobile/xiaomi" className="myLinkStyle">
                      <h3 className="topbrand-tit sub">Xiaomi</h3>
                    </a> */}



                    <h3 className="topbrand-tit sub" onClick={() => {
                      setControlBrands(false)
                    }}>Less..</h3>

                  </>
                }

              </div>
              <div className="topbrands ps-3 pe-3">
                <div className="title-wrap">
                  <div className="icon-wrap-off">
                    <img
                      className="off-ico"
                      src="../../../assets/images/icons/icon2.svg"
                      alt=""
                    />
                  </div>
                  <h3 className="topbrand-tit trending">
                    <NavLink
                      to="/popularmobiles"
                      className="off-links"
                    >
                      Popular Mobiles
                    </NavLink>
                  </h3>
                </div>
              </div>
              <div className="Line"></div>
              <div className="topbrands ps-3 pe-3">
                <div className="title-wrap">
                  <div className="icon-wrap-off">
                    <img
                      className="off-ico"
                      src="../../../assets/images/icons/icon3.svg"
                      alt=""
                    />
                  </div>

                  <h3 className="topbrand-tit trending">
                    {" "}
                    <NavLink to="/top-upcoming-mobile-phones-in-2023" className="off-links">
                      Upcoming Mobiles
                    </NavLink>
                  </h3>
                </div>
              </div>
              <div className="Line"></div>
              {/* <div className="topbrands ps-3 pe-3">
                <div className="title-wrap">
                  <div className="icon-wrap-off">
                    <img
                      className="off-ico"
                      src="../../../assets/images/icons/icon4.svg"
                      alt=""
                    />
                  </div>
                  <h3 className="topbrand-tit trending">
                    <NavLink to="/blog" className="off-links">
                      Tech News
                    </NavLink>
                  </h3>
                </div>
              </div> */}

              <div className="Line"></div>
              <div className="more-links">
                <NavLink to="/privacypolicy" className="off-links ps-3 pe-3">
                  <span>Privacy Policy</span>
                </NavLink>
                <div className="Line"></div>
                <NavLink className="off-links ps-3 pe-3" to="/contact">
                  <span>Contact us</span>
                </NavLink>
                <div className="Line"></div>
                <NavLink className="off-links ps-3 pe-3" to="/advertise">
                  <span>Advertise with us</span>
                </NavLink>
                <div className="Line"></div>
                <NavLink className="off-links ps-3 pe-3" to="/termsandconditions">
                  <span>Terms and Conditions</span>
                </NavLink>
                <NavLink className="off-links ps-3 pe-3" to="">
                  <div></div>
                </NavLink>
                <NavLink className="off-links ps-3 pe-3" to="">
                  <div></div>
                </NavLink>
              </div>
              <div className="only-lang off-c">
                <Dropdown>
                  <Dropdown.Toggle variant="light" id="dropdon-basic">
                    <div className="lang-wrap">
                      <img
                        className="ic-notify flag"
                        src="../../assets/images/pkflag.png"
                        alt=""
                        width="10"
                        height="16"
                      />
                      <h5 className="pak-tit">Pakistan</h5>
                      <Icon className="flag-drop-ico" icon="bx:chevron-down" />
                    </div>
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <>
                      <li>
                        {" "}
                        <img
                          className="ic-notify flag"
                          src="../../assets/images/pkflag.png"
                          alt=""
                          width="10"
                          height="16"
                        />
                        pakistan
                      </li>
                      <li>
                        {" "}
                        <img
                          className="ic-notify flag"
                          src="../../assets/images/indflag.png"
                          alt=""
                          width="10"
                          height="16"
                        />
                        india
                      </li>
                      <li>
                        <img
                          className="ic-notify flag"
                          src="../../assets/images/usaflag.png"
                          alt=""
                          width="10"
                          height="16"
                        />
                        USA
                      </li>
                    </>
                    ;
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </Offcanvas.Body>
          </Offcanvas>
          <Offcanvas
            className="notification-off-canvas"
            placement="start"
            show={showS}
            onHide={handleCloseS}
          >
            <Offcanvas.Header className="small-notification-header d-flex justify-content-between align-items-center text-white">
              <h5>
                <img
                  className="me-3"
                  src="../../assets/images/icons/goback-white.png"
                  alt=""
                  onClick={handleCloseS}
                />
                Notifications
              </h5>
              <NavLink to="/login">
                <img
                  src="../../../assets/images/icons/account-mob.png"
                  alt=""
                />
              </NavLink>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <div className="notify-upper">
                <h3 className="notification-tit">Notifications</h3>
                <h3 className="notification-tit">
                  <Icon className="check-ico" icon="bi:check-circle" /> Mark as
                  Read
                </h3>
              </div>

              {allNotifications.map((item, index) => (
                <div className="notify-item">
                  <img
                    className="side-mobile-sec-img"
                    src={`https://softliee.com/softlee/public/storage/${item?.latestPost ? "blogs" : "product"
                      }/${item.image}`}
                    height="88px"
                    onClick={() =>
                      handleImgClick(
                        item.slug,
                        item?.latestPost ? "details" : "product"
                      )
                    }
                  />
                  <div>
                    <h3
                      className="notify-tit"
                      onClick={() =>
                        handleImgClick(
                          item.slug,
                          item?.latestPost ? "details" : "product"
                        )
                      }
                    >
                      {item.name ? item.name : item.title}
                    </h3>
                    <h6 className="notification-time">
                      RS{" "}
                      {item.orignal_price
                        ? formatAmount(item.orignal_price)
                        : "N/A"}
                    </h6>
                  </div>
                </div>
              ))}
            </Offcanvas.Body>
          </Offcanvas>
          <header className="desktop-header">
            <div className="blue-bg">
              <div className="container">
                <div className="row">
                  <div className="col-sm-2">
                    <NavLink to="/">
                      <img
                        className="logo-img"
                        src="../../assets/images/softliee.png"
                        alt="logo"
                        width="34"
                        height="39"
                      />
                    </NavLink>
                  </div>
                  <ClickAwayListener onClickAway={handleBlurForSearchDialog}>
                    <div
                      className={`${tabletWidth ? "col-sm-4" : "col-sm-6"
                        }  p-0 ${isSearchDialogOpen
                          ? "search-box-parent-container rounded-5 p-0"
                          : ""
                        }`}
                    >
                      <div className="flex search-wrap">
                        <input
                          onFocus={() => setIsSearchDialogOpen(true)}
                          onChange={(e) => handleSearchChange(e.target.value)}
                          onKeyPress={handleKeyPress}
                          value={search}
                          type="text"
                          className="search"
                          placeholder="Search your Phone.."
                        />

                        <img
                          onClick={handleSearch}
                          className="search-btn"
                          src="../../assets/images/search-icon.png"
                          alt="search"
                          width="122px"
                          height="38"
                        />
                      </div>
                      {isSearchDialogOpen && (
                        <SearchDialog
                          open={isSearchDialogOpen}
                          value={search}
                        />
                      )}
                    </div>
                  </ClickAwayListener>
                  <div className="col-sm-4">
                    <div className="lang-not-login flex">
                      <div className="only-lang">
                        <Dropdown>
                          <Dropdown.Toggle variant="light" id="dropdon-basic">

                            {
                              localSelectedCurrency == null || localSelectedCurrency == "Pakistan" ?
                                <div className="lang-wrap null pak ">

                                  <img
                                    className="ic-notify flag"
                                    src="../../assets/images/pkflag.png"
                                    alt=""
                                    width="10"
                                    height="16"
                                  />


                                  <h5 className="pak-tit">

                                    Pakistan
                                  </h5>
                                  <Icon
                                    className="flag-drop-ico"
                                    icon="bx:chevron-down"
                                  />
                                </div> :


                                <div className="lang-wrap usa ">

                                  <img
                                    className="ic-notify flag"
                                    src="https://softliee.com/softlee/public/storage/currency/1670178019.png"
                                    alt=""
                                    width="10"
                                    height="16"
                                  />
                                  <h5 className="pak-tit">
                                    USA
                                  </h5>
                                  <Icon
                                    className="flag-drop-ico"
                                    icon="bx:chevron-down"
                                  />
                                </div>

                            }

                          </Dropdown.Toggle>

                          <Dropdown.Menu className="asdasdas">
                            {currency?.data?.currency &&
                              currency?.data?.currency.map((item, index) => (
                                <>
                                  <li

                                    className="cursor-pointer myCustomLi"
                                    onClick={() =>
                                      handleCurrencyChange(item?.country)
                                    }
                                  >
                                    {" "}
                                    <img
                                      className="ic-notify flag"
                                      src={`https://softliee.com/softlee/public/storage/currency/${item?.flag_icon}`}
                                      width="10"
                                      height="16"
                                    />
                                    {item?.country}
                                  </li>
                                </>
                              ))}
                          </Dropdown.Menu>
                        </Dropdown>
                      </div>

                      <div>
                        <NotifyDropdown />
                      </div>

                      <div>
                        {localStorage.getItem("softliUserData") ? (
                          <div className="link-custom">
                            <div className="flex align-items-center justify-center ">
                              <Dropdown>
                                <Dropdown.Toggle
                                  // variant="success"
                                  id="dropdown-basic"
                                  className="user-profile-icon"
                                >
                                  <Icon
                                    icon="mdi:user"
                                    color="white"
                                    width="32"
                                    height="32"
                                  />
                                </Dropdown.Toggle>

                                <Dropdown.Menu className="user-profile-drop-menu">
                                  <Dropdown.Item>
                                    {JSON.parse(
                                      localStorage.getItem("softliUserData")
                                    )?.user?.name && (
                                        <h6 className="mr-16 mb-0 font-bold username-h">
                                          {
                                            JSON.parse(
                                              localStorage.getItem(
                                                "softliUserData"
                                              )
                                            )?.user?.name
                                          }
                                        </h6>
                                      )}
                                  </Dropdown.Item>
                                  <Dropdown.Item>
                                    <h3
                                      className="login-tit cursor-pointer logout"
                                      onClick={handleLogout}
                                    >
                                      Logout
                                    </h3>
                                  </Dropdown.Item>
                                </Dropdown.Menu>
                              </Dropdown>
                            </div>
                          </div>
                        ) : (
                          <NavLink to="/login" className="link-custom">
                            <div className="flex align-items-center">
                              {/* <img
                                className="ic-login"
                                src="../../assets/images/ic_login.png"
                                alt=""
                                width="26"
                                height="26"
                              /> */}
                              <h3 className="login-tit">Login</h3>
                            </div>
                          </NavLink>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="box-shadow-wrapping">
              <div className="container">
                <div className="flex justify-content-between">
                  <ul className="navigation">
                    <li className="nav-single-li">
                      <NavLink
                        className="nav-single-a"
                        to="/"
                      >
                        Home Mobiles
                      </NavLink>
                    </li>
                    <li className="nav-single-li">
                      <NavLink className="nav-single-a" to="/blog">
                        Tech News
                      </NavLink>
                    </li>
                    <li className="nav-single-li">
                      <NavLink className="nav-single-a" to="/top-upcoming-mobile-phones-in-2023">
                        Upcoming mobiles
                      </NavLink>
                    </li>
                    <li className="nav-single-li">
                      <NavLink className="nav-single-a" to="/popularmobiles">
                        Popular Mobiles
                      </NavLink>
                    </li>
                    <li className="nav-single-li">
                      <NavLink className="nav-single-a" to="/compare-mobile-phone">
                        Compare Mobiles
                      </NavLink>
                    </li>
                    <li className="nav-single-li">
                      <NavLink className="nav-single-a" to="/phonefinder">
                        Phone Finder
                      </NavLink>
                    </li>
                  </ul>
                  <div className="flex">
                    <a
                      href="https://www.facebook.com/softliee/"
                      target="_blank"
                    >
                      <img
                        className="social-icon-single"
                        src="../../assets/images/social-icons/fb.png"
                        alt=""
                        width="20"
                        height="20"
                      />
                    </a>
                    <a
                      href="https://www.youtube.com/channel/UCui5-jNud8arKsWsbt3WqeQ"
                      target="_blank"
                    >
                      <img
                        className="social-icon-single"
                        src="../../assets/images/social-icons/youtube.png"
                        alt=""
                        width="20"
                        height="20"
                      />
                    </a>
                    <a
                      href="https://pk.linkedin.com/showcase/softliee"
                      target="_blank"
                    >
                      <img
                        className="social-icon-single"
                        src="../../assets/images/social-icons/linkidin.png"
                        alt=""
                        width="20"
                        height="20"
                      />
                    </a>
                    <a
                      href="https://www.pinterest.com/softliee/"
                      target="_blank"
                    >
                      <img
                        className="social-icon-single me-0"
                        src="../../assets/images/social-icons/pinterest.png"
                        alt=""
                        width="20"
                        height="20"
                      />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </header>
          <header className="mobile-header">
            <div className="header-mob-wrap">
              <div className="hamburger-wrap">
                <img
                  onClick={handleShow}
                  src="../../../assets/images/icons/ham.png"
                  alt=""
                />
              </div>

              <div className="logo-wrapp">
                <NavLink to="/">
                  {" "}
                  <img
                    className="logo-img"
                    src="../../assets/images/softliee.png"
                    alt="logo"
                    width="34"
                    height="39"

                  />
                </NavLink>
              </div>
              <div className="right-side-wrap">
                <img
                  src="../../../assets/images/icons/search.png"
                  alt=""
                  onClick={() => props.hadleSarchBarOpen(true)}
                />
              </div>
              <div>
                {
                  localStorage.softliUserData ? <img src="../../../assets/images/icons/account-mob.png" alt="" onClick={() => {
                    mobileLoginDrop ?
                      setmobileLoginDrop(false) : setmobileLoginDrop(true)

                  }} /> : <Link to="/login">
                    <img src="../../../assets/images/icons/account-mob.png" alt="" />
                  </Link>
                }
              </div>

              {mobileLoginDrop && <div className="mobile-login-dropdown">
                <p>{softlieeUser?.user?.name}</p>
                <p onClick={handleLogout}>Log out</p>
              </div>}
            </div>
          </header>
        </>
      )}

      <section>
        <div className="mobile-buttons hide-on-desktop">
          <div
            onClick={handleCloseS}
            className={
              !showS && window.location.pathname === "/"
                ? "active icon-box-wrap"
                : "icon-box-wrap"
            }
          >
            <NavLink to="/" className="custom-link">
              <div className="image-wrap-fixed-menu">

                <img
                  className="ico"
                  src="../../../assets/images/icons/i1.svg"
                  alt=""
                />
              </div>
              <h3 className="icon-box-tit">Home</h3>
            </NavLink>
          </div>
          <div
            onClick={handleCloseS}
            className={
              !showS && window.location.pathname === "/compare-mobile-phone"
                ? "active icon-box-wrap"
                : "icon-box-wrap"
            }
          >
            <NavLink to="/compare-mobile-phone" className="custom-link">
              <div className="image-wrap-fixed-menu">

                <img
                  className="ico"
                  src="../../../assets/images/icons/i2.svg"
                  alt=""
                />
              </div>
              <h3 className="icon-box-tit">Compare</h3>
            </NavLink>
          </div>

          <div
            onClick={handleCloseS}
            className={
              !showS && window.location.pathname === "/phonefinder"
                ? "active icon-box-wrap"
                : "icon-box-wrap"
            }
          >
            <NavLink to="/phonefinder" className="custom-link">
              <div className="image-wrap-fixed-menu">

                <img
                  className="ico"
                  src="../../../assets/images/icons/i3.svg"
                  alt=""
                />
              </div>

              <h3 className="icon-box-tit">Finder</h3>
            </NavLink>
          </div>
          <div
            onClick={handleCloseS}
            className={
              !showS && window.location.pathname === "/blog"
                ? "active icon-box-wrap"
                : "icon-box-wrap"
            }
          >
            <NavLink to="/blog" className="custom-link">
              <div className="image-wrap-fixed-menu">

                <img
                  className="ico"
                  src="../../../assets/images/icons/News.svg"
                  alt=""
                />
              </div>
              <h3 className="icon-box-tit">News</h3>
            </NavLink>
          </div>
          <div
            className={showS ? "active icon-box-wrap" : "icon-box-wrap"}
            onClick={handleShowS}
          >
            <div className="image-wrap-fixed-menu">

              <img
                className="ico notify-ico-off-c"
                src="../../../assets/images/icons/i4.svg"
                alt=""
              />
            </div>

            <h3 className="icon-box-tit notify">Notify</h3>
          </div>
        </div>
      </section>
      <TechNewsDialog
        dialogIsOpen={isTechNewsDialogOpen}
        handleClose={() => setIsTechNewsDialogOpen(false)}
      />
      {mobileWidth && !isSearchBarOpen && (
        <CountryPopup
          selectedValue={selectedValue}
          open={countryPopupOpen}
          onClose={handleCountryPopupClose}
        />
      )}
    </>
  );
};
export default Header;
