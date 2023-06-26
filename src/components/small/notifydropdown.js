import { Icon } from "@iconify/react";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/Dropdown";
import { getNotification } from "../../redux/actions/app.actions";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { formatAmount } from "../utils";

const NotifyDropdown = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const [allNotifications, setAllNotifications] = useState([]);
  const { notification } = useSelector((selectSate) => selectSate.app);
  const handleImgClick = (slug, type) => {
    // navigate(`/${type}/${slug}`, { replace: true });
    navigate(`/${slug}`, { replace: true });
  };

  useEffect(() => {
    if (!notification?.data && !notification?.loading) {
      dispatch(getNotification());
    }
  }, []);

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
  return (
    <>
      <Dropdown>
        <Dropdown.Toggle variant="light" id="dropdon-basic">
          <img
            className="ic-notify"
            src="../../assets/images/ic_notify.png"
            alt=""
            width="22"
            height="22"

          />
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <div className="notify-upper">
            <h3 className="notification-tit">Notifications</h3>
            <h3 className="notification-tit">
              <Icon className="check-ico" icon="bi:check-circle" /> Mark as Read
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
          {/* <div className="notify-item">
            <img
              className="tech-news-img img-fluid notify"
              src="../../assets/images/blog/side_tech1.png"
              height="88px"
            />
            <div>
              <h3 className="notify-tit">Vivo's Latest Flagship X80</h3>
              <h6 className="notification-time">26 minutes ago</h6>
            </div>
          </div> */}

          {/* <div className="notify-item">
            <img
              className="side-mobile-sec-img"
              src="../../assets/images/product/slider_mobile_here.webp"
              height="88px"
            />
            <div>
              <h3 className="notify-tit">Infinix Note 12 G96</h3>
              <h6 className="notification-time">26 minutes ago</h6>
            </div>
          </div> */}

          {/* <div className="notify-item">
            <img
              className="tech-news-img img-fluid notify"
              src="../../assets/images/blog/side_tech1.png"
              height="88px"
            />
            <div>
              <h3 className="notify-tit">Vivo's Latest Flagship X80</h3>
              <h6 className="notification-time">26 minutes ago</h6>
            </div>
          </div> */}
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
};
export default NotifyDropdown;
