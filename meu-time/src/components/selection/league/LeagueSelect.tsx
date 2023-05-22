import React, { useState, useEffect } from "react";
import "./leagueSelect.scss";

import axios from "axios";

interface LeagueSelectProps {
  apiKey?: string | null;
  countrySelected: string | null;
  onSelect: (leagueId: number) => void;
}

interface League {
  id: number;
  name: string;
}

const LeagueSelect = ({
  apiKey,
  countrySelected,
  onSelect,
}: LeagueSelectProps) => {
  const [leagues, setLeagues] = useState<League[]>([]);

  useEffect(() => {
    const fetchLeagues = async () => {
      if (!apiKey || !countrySelected) return;

      const options = {
        method: "GET",
        url: "https://api-football-v1.p.rapidapi.com/v3/leagues",
        params: {
          country: countrySelected,
        },
        headers: {
          "X-RapidAPI-Key": apiKey,
          "X-RapidAPI-Host": "api-football-v1.p.rapidapi.com",
        },
      };

      try {
        const response = await axios.request(options);

        const resLeagues = response.data.response;

        const extractedLeagues: League[] = resLeagues.map((item: { league: League }) => item.league);

        setLeagues(extractedLeagues);
      } catch (error) {
        console.error(error);
      }
    };

    fetchLeagues();
  }, [apiKey, countrySelected]);

  return (
    <div>
      <h2>League Select</h2>
      <label htmlFor="league-select">Select a league:</label>
      <select
        id="league-select"
        onChange={(e) => onSelect(Number(e.target.value))}
      >
        <option value="">Select a league</option>
        {leagues.map((league) => (
          <option key={league.id} value={league.id}>
            {league.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LeagueSelect;
