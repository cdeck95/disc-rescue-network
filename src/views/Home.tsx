import * as React from "react";
import "../globals.css";
import FullLogoHeader from "../components/HeaderComponents";
import HomePageButtons from "../components/HomePageButtons";
import Subheader from "../components/Subheader";
import Discs from "../components/Discs";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import { Disc, DiscStateString } from "../App";
import axios from "axios";

function Home() {
  const [allDiscs, setAllDiscs] = useState<Disc[]>([]);

  useEffect(() => {
    const fetchDiscs = async () => {
      try {
        const response = await axios.get(
          "https://api.discrescuenetwork.com/inventory"
        );
        setAllDiscs(response.data); // Assuming the API response directly contains the array of discs
      } catch (error) {
        console.error("Failed to fetch discs:", error);
      }
    };

    fetchDiscs();
  }, []);

  console.log("All Discs", allDiscs);

  //Filter by status
  const filteredDiscs = allDiscs.filter(
    (disc) =>
      disc.status === DiscStateString.New ||
      disc.status === DiscStateString.Unclaimed
  );
  console.log(filteredDiscs);

  return (
    <div className="container-home">
      <FullLogoHeader />
      <HomePageButtons />
      <div className="disc-container">
        <Subheader text="RECENTLY TURNED IN DISCS" />
        <Discs arrayOfDiscs={filteredDiscs} />
      </div>
    </div>
  );
}

export default Home;
