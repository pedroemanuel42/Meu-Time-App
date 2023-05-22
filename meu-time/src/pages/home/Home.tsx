import React, { useState, useContext } from "react";
import { ApiKeyContext } from "../../context/ApiKeyContext";

import CountrySelect from "../../components/selection/country/CountrySelect";
import LeagueSelect from "../../components/selection/league/LeagueSelect";

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

  return (
    <div className="home-container">
      <h1 className="home-title">Home</h1>

      <div className="home-country-select">
        <CountrySelect apiKey={apiKey} onSelect={handleCountrySelect} />
      </div>

      <div className="home-league-select">
        {selectedCountry && (
          <p className="home-selected-info">
            Selected Country: {`${selectedCountry}`}
            <LeagueSelect
              apiKey={apiKey}
              countrySelected={selectedCountry}
              onSelect={handleLeagueSelect}
            />
          </p>
        )}
      </div>
    </div>
  );
};

export default Home;
