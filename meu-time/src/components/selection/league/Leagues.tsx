// Leagues.tsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { ListGroup } from "react-bootstrap";
import { SpinnerCircular } from "spinners-react";

interface LeaguesProps {
  apiKey?: string | null;
  countrySelected: string | null;
  onSelect: (leagueId: number) => void;
}

interface League {
  id: number;
  name: string;
}

const Leagues = ({
  apiKey = null,
  countrySelected = null,
  onSelect,
}: LeaguesProps) => {
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
    return (
      <div>
        <SpinnerCircular />
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>Leagues</h2>
      <ListGroup>
        {leagues.map((league) => (
          <ListGroup.Item
            key={league.id}
            onClick={() => onSelect(league.id)}
            action
          >
            {league.name}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
};

export default Leagues;
