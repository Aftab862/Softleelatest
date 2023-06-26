import "./App.css";
import Home from "./components/home";
import ProductPages from "./components/product";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ReactDOM from "react-dom/client";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Filterbrand from "./components/filterbrand";
import PagePrivacy from "./components/privacypolicy";
import PageTerms from "./components/termsandconditions";
import PageContact from "./components/contactus";
import PageCompare from "./components/comparepage";
import PhoneFinder from "./components/phonefinder";
import Ourblog from "./components/ourblog";
import Blogdetails from "./components/blogdetails";
import Login from "./components/login";
import Advertisewithus from "./components/advertisewithus";
import Aboutus from "./components/aboutus";
import Emailproduct from "./components/emailproduct";
import { useDispatch } from "react-redux";
import { getAdvertisement } from "./redux/actions/app.actions";
import Register from "./components/register";
import PopularMobiles from "./components/small/popularmobiles";
import UpcomingPhones from "./components/upcomingPhones";
import UpcomingPage from "./components/upcomingPage";
import RamFilter from "./components/RamFilter";
import "./App.scss"
import PhoneFinderDetails from "./components/phonefinderdetails";
import NotFound from "./components/NotFound";
import { HashRouter } from "react-router-dom";
import SearchResultPage from "./components/searchpage";
import FindAMobile from "./components/findAmobile";
import BrowseByBudget from "./components/browsebybudget";
import Sitemapss from "./components/sitemap";
import React, { useEffect } from 'react';
import { getCLS, getFID, getLCP } from 'web-vitals';



function App() {

  const dispatch = useDispatch();

  function sendToAnalytics({ name, delta, id }) {
    // Send the metric value to an analytics service or console
    // console.log(name, delta, id);
  }

  useEffect(() => {
    getCLS(sendToAnalytics);
    getFID(sendToAnalytics);
    getLCP(sendToAnalytics);
  }, []);
  useEffect(() => {
    dispatch(getAdvertisement());
  }, []);

  return (
    <>

      <BrowserRouter >
        <Routes>
          <Route index element={<Home />} />
          <Route path="/findamobile/:slug" element={<FindAMobile />} />
          <Route path="/new-mobile/:slug" element={<Filterbrand />} />
          <Route path="/contact" element={<PageContact />} />
          <Route path="/termsandconditions" element={<PageTerms />} />
          <Route path="/popularmobiles" element={<PopularMobiles />} />
          <Route path="/top-upcoming-mobile-phones-in-2023" element={<UpcomingPage />} />
          <Route path="/privacypolicy" element={<PagePrivacy />} />
          <Route path="/phonefinder" element={<PhoneFinder />} />
          <Route path="/phonefinderdetails" element={<PhoneFinderDetails />} />
          <Route path="/advertise" element={<Advertisewithus />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/about" element={<Aboutus />} />
          <Route path="/:slug" element={<ProductPages />} />
          <Route path="/blog" element={<Ourblog />} />
          <Route path="/details/:slug" element={<Blogdetails />} />
          <Route path="/compare-mobile-phone" element={<PageCompare />} />
          <Route path="/ram/:id" element={<RamFilter />} />
          <Route path="/browsebybudget/:id/" element={<BrowseByBudget />} />
          <Route
            path="/compare-mobile-phone/:slug/:slug1"
            element={<PageCompare />}
          />
          <Route path="*" element={<NotFound />} />
          <Route path="/searchresult" element={<SearchResultPage />} />
          <Route path="/allpages" element={<Sitemapss />} />
        </Routes>
      </BrowserRouter>

    </>
  );
}

export default App;







