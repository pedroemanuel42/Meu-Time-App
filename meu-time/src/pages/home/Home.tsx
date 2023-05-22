import React, { useState, useContext } from "react";
import { ApiKeyContext } from "../../context/ApiKeyContext";

import CountrySelect from "../../components/selection/country/Countries";
import LeagueSelect from "../../components/selection/league/Leagues";

const Home = () => {
  const apiKeyContext = useContext(ApiKeyContext);
  const apiKey = apiKeyContext.apiKey;

  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [selectedLeague, setSelectedLeague] = useState<number | null>(null);

  const handleCountrySelect = (countryName: string) => {
    setSelectedCountry(countryName);
    setSelectedLeague(null);
  };

  const handleLeagueSelect = (leagueId: number) => {
    setSelectedLeague(leagueId);
  };

  if (!apiKey) {
    return <div>Please provide an API key.</div>;
  }

  return (
    <div className="home-container">
      <h1 className="home-title">Home</h1>

      <div className="home-country-select">
        <CountrySelect apiKey={apiKey} onSelect={handleCountrySelect} />
      </div>

      {selectedCountry ? (
        <div className="home-league-select">
          <p className="home-selected-info">
            Selected Country: {selectedCountry}
          </p>
          <LeagueSelect
            apiKey={apiKey}
            countrySelected={selectedCountry}
            onSelect={handleLeagueSelect}
          />
        </div>
      ) : (
        <p>Please select a country.</p>
      )}
    </div>
  );
};

export default Home;
