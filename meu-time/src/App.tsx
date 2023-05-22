import React, { useState } from "react";
import { BrowserRouter, Routes } from "react-router-dom";
import { Route } from "react-router";

// Pages
import Login from "./components/login/Login";

import "./App.scss";
import { ApiKeyProvider } from "./context/ApiKeyContext";
import Countries from "./components/selection/country/Countries";
import Leagues from "./components/selection/league/Leagues";

function App() {
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);

  const handleCountrySelect = (countryName: string) => {
    setSelectedCountry(countryName);
  };

  const handleLeagueSelect = (leagueId: number) => {
    console.log(`League selected: ${leagueId}`);
  };

  return (
    <div className="App">
      <BrowserRouter>
        <ApiKeyProvider>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route
              path="/countries"
              element={<Countries onSelect={handleCountrySelect} />}
            />
            <Route
              path="/leagues"
              element={
                <Leagues
                  countrySelected={selectedCountry}
                  onSelect={handleLeagueSelect}
                />
              }
            />
          </Routes>
        </ApiKeyProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
