import React, { useState, useEffect } from "react";
import axios from "axios";
import "./leagueSelect.scss";

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
  apiKey = null,
  countrySelected = null,
  onSelect,
}: LeagueSelectProps) => {
  const [leagues, setLeagues] = useState<League[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchLeagues = async () => {
      if (!apiKey || !countrySelected) return;

      setLoading(true);
      setError("");

      const options = {
        method: "GET",
        url: "https://api-football-v1.p.rapidapi.com/v3/leagues",
        params: {
          country: countrySelected,
        },
        headers: {
          "x-rapidapi-key": apiKey,
          "x-rapidapi-host": "api-football-v1.p.rapidapi.com",
        },
      };

      try {
        const response = await axios.request(options);

        const resLeagues = response.data.response;

        const extractedLeagues: League[] = resLeagues.map(
          (item: { league: League }) => item.league
        );

        setLeagues(extractedLeagues);
      } catch (error) {
        console.error(error);
        setError("Error fetching leagues. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchLeagues();
  }, [apiKey, countrySelected]);

  if (loading) {
    return <div>Loading leagues...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>League Select</h2>
      <label htmlFor="league-select">Select a league:</label>
      <select
        id="league-select"
        onChange={(e) => onSelect(Number(e.target.value))}
        disabled={leagues.length === 0}
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
