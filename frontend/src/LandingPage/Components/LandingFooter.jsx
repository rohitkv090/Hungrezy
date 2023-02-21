import React from "react";
import { Link } from "react-router-dom";
import MainFooter from "./MainFooter";
import { Wrapper } from "../Style/LandingFooterStyle";

function LandingFooter() {
  return (
    <>
      <Wrapper>
        <div className="bg-color">
        </div>
        <MainFooter />
      </Wrapper>
    </>
  );
}

export default LandingFooter;
