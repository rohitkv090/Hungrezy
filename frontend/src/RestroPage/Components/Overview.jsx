import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUserLocation } from "../../LandingPage/Redux/action";
import CheckCircleOutline from "@material-ui/icons/CheckCircleOutline";
import { Wrapper } from "../Style/OverviewStyle";
import MainFooter from "../../LandingPage/Components/MainFooter";
import { Card, CardContent } from "@material-ui/core";
import DirectionsIcon from "@material-ui/icons/Directions";

function Overview(props) {
  const { data } = props;
  const [restaurantLocation, setRestaurantLocation] = useState({});
  const userCoordinates = useSelector(
    (state) => state.landingPageReducer.userCoordinates
  );
  useEffect(() => {
    if (data.location) {
      setRestaurantLocation(data.location.cords.coordinates);
    }
  }, [data.location]);

  const dispatch = useDispatch();

  const getUserCoordinates = () => {
    function success(position) {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      dispatch(getUserLocation(longitude, latitude));
      window.open(
        `https://www.google.com/maps/dir/?api=1&origin=${latitude},${longitude}&destination=${
          data && data.location && data.location.cords.coordinates[1]
        },${data && data.location && data.location.cords.coordinates[0]}`
      );
    }

    function error() {
      console.log("Unable to retrieve your location");
      window.open(
        `https://www.google.com/maps/dir/${
          data && data.location && data.location.cords.coordinates[1]
        },${data && data.location && data.location.cords.coordinates[0]}`
      );
    }

    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
    } else {
      return navigator.geolocation.getCurrentPosition(success, error);
    }
  };

  const goToLocation = () => {
    if (userCoordinates.latitude === undefined) {
      getUserCoordinates();
    } else {
      window.open(
        `https://www.google.com/maps/dir/?api=1&origin=${
          userCoordinates.latitude
        },${userCoordinates.longitude}&destination=${
          data && data.location && data.location.cords.coordinates[1]
        },${data && data.location && data.location.cords.coordinates[0]}`
      );
    }
  };

  return (
    <>
      <Wrapper>
        <div className="overviewWrapper">
          <div
            style={{
              width: "60%",
            }}
          >
            <div className="container">
              <h3 className="about">About This Place</h3>
            </div>

            <section className="action-div container">
              <section className="action-sec">
                <section className="action-box1">
                  <img
                    src="https://b.zmtcdn.com/data/o2_assets/ebd42529c3342bdaf8b624a63a571fcc1585754330.png"
                    alt="safety"
                    className="box1-img"
                  />
                  <section className="box1-text-sec">
                    <p className="box1-text1">RESTAURANT SAFETY MEASURE</p>
                    <p className="box1-text2">Well Sanitized Kitchen</p>
                  </section>
                </section>
                <section className="action-box1">
                  <img
                    src="https://b.zmtcdn.com/data/o2_assets/fa7443fb81df3ff2c54186672599c3db1585754076.png"
                    alt="safety"
                    className="box1-img"
                  />
                  <section className="box1-text-sec">
                    <p className="box1-text1">RESTAURANT SAFETY MEASURE</p>
                    <p className="box1-text2">RIDER HAND WASH</p>
                  </section>
                </section>
                <section className="action-box1">
                  <img
                    src="https://b.zmtcdn.com/data/o2_assets/8ecc61badb80ea685f0afc71a4d721671585754288.png"
                    alt="safety"
                    className="box1-img"
                  />
                  <section className="box1-text-sec">
                    <p className="box1-text1">RESTAURANT SAFETY MEASURE</p>
                    <p className="box1-text2">DAILY TEMP CHECKS</p>
                  </section>
                </section>
              </section>
            </section>
            <div className="container">
              <h4 className="font-weight mt-4">Cuisines</h4>
              <div className="d-flex mt-0 flex-wrap">
                {data.cuisines &&
                  data.cuisines
                    .trim()
                    .split(",")
                    .map((cuisine, i) => (
                      <p className="cuisines" key={cuisine + i}>
                        {cuisine}
                      </p>
                    ))}
              </div>
            </div>
            <div className="container">
              <h5 className="dish-heading">Popular Dishes</h5>
              <p className="pop-dish">
                {data.menu &&
                  data.menu.map(
                    (dish, i) =>
                      i < 5 && (
                        <React.Fragment key={dish + i}>
                          {" "}
                          {dish.dish}
                        </React.Fragment>
                      )
                  )}
              </p>
              <h5 className="dish-heading">
                People Say This Place Is Known For
              </h5>
              <p className="pop-dish">
                {data.cuisines &&
                  data.cuisines
                    .trim()
                    .split(",")
                    .map(
                      (cuisine, i) =>
                        i < 5 && (
                          <React.Fragment key={cuisine + i}>
                            {cuisine}
                          </React.Fragment>
                        )
                    )}
              </p>
            </div>
            <div className="container">
              <h5 className="avg-cost">Average Cost</h5>
              <p className="cost">
                ₹{data && data.average_cost_for_two} for two people (approx.)
              </p>
              <p className="desc">
                Exclusive of applicable taxes and charges, if any
              </p>
            </div>
            <div className="container">
              <h5 className="info">More Info</h5>
              <div className="info-div">
                {data &&
                  data.highlights?.map(
                    (item, i) =>
                      i < 7 && (
                        <div className="info-name" key={i}>
                          <CheckCircleOutline className="info-icons" />
                          <p className="info-text">{item}</p>
                        </div>
                      )
                  )}
              </div>
            </div>
          </div>
          <div className="restaurantMapDiv">
            <Card className="restaurantMap">
              <CardContent>
                <div className="mt-2 mb-2">
                  <div style={{ fontSize: "20px" }}>Call</div>
                  <div style={{ color: "red", fontSize: "15px" }}>
                    {data.phone_numbers}
                  </div>
                </div>
                <div style={{ fontSize: "20px" }}>Direction</div>
                <img
                  src={`https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/pin-s-l+000(${restaurantLocation[0]},${restaurantLocation[1]})/${restaurantLocation[0]},${restaurantLocation[1]},14/500x300?access_token=pk.eyJ1IjoibWFuaXNoLWt1bWFyLWRldiIsImEiOiJja2gyOGw4b24wOWhwMnNtemVmeHA2djV0In0.IWI4BNamZ8XXAawc2fuk8w`}
                  alt="Restaurant Location"
                  style={{ width: "100%" }}
                />
                <div style={{ margin: "5px 0px" }}>
                  {data && data.location && data.location.address}
                </div>
                <div className="btn">
                  <span className="add" onClick={goToLocation}>
                    <DirectionsIcon />
                    <span style={{ color: "rgb(28, 28, 28)" }}>Direction</span>
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        <MainFooter />
      </Wrapper>
    </>
  );
}

export default Overview;
