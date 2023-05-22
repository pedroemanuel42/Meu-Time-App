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
    <div>
      <h1>Home</h1>
      <CountrySelect apiKey={apiKey} onSelect={handleCountrySelect} />
      {selectedCountry && (
        <p>
          Selected Country: {`${selectedCountry}`}
          <LeagueSelect
            apiKey={apiKey}
            countrySelected={selectedCountry}
            onSelect={handleLeagueSelect}
          />
        </p>
      )}
    </div>
  );
};

export default Home;
