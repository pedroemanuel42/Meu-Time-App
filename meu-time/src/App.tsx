import React from "react";
import { BrowserRouter, Routes } from "react-router-dom";
import { Route } from "react-router";

//Components
import Login from "../src/components/login/Login";
import CountrySelect from "../src/components/selection/country/CountrySelect";
import LeagueSelect from "../src/components/selection/league/LeagueSelect";
import TeamSelect from "../src/components/selection/team/TeamSelect";
import TeamDetails from "../src/components/team-details/TeamDetails";

import "./App.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/country-select" element={<CountrySelect />} />
          <Route path="/league-select" element={<LeagueSelect />} />
          <Route path="/team-select" element={<TeamSelect />} />
          <Route path="/team-details" element={<TeamDetails />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
