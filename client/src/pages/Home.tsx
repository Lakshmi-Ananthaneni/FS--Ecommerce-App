import React from "react"

import Products from "components/Products";
import Banner from "components/Banner";
import { RunningText } from "components/RunningText";
import { NewsLetter } from "components/NewsLetter";

export const Home = () => {
  return (
    <div>
     
      <Banner />
      <NewsLetter />
    </div>
  );
};

