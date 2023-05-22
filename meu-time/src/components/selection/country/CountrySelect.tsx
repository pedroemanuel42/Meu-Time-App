import React, { useEffect, useState } from "react";
import axios from "axios";

interface CountrySelectProps {
  apiKey?: string | null;
  onSelect: (countryName: string) => void;
}

interface Country {
  code: string;
  name: string;
}

function CountrySelect({ apiKey = null, onSelect }: CountrySelectProps) {
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchCountries = async () => {
      if (!apiKey) return;

      setLoading(true);
      setError("");

      const options = {
        method: "GET",
        url: "https://api-football-v1.p.rapidapi.com/v3/countries",
        headers: {
          "x-rapidapi-key": apiKey,
          "x-rapidapi-host": "api-football-v1.p.rapidapi.com",
        },
      };

      try {
        const response = await axios.request(options);

        const resCountries = response.data.response;

        setCountries(resCountries);
      } catch (error) {
        console.error(error);
        setError("Error fetching countries. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, [apiKey]);

  if (loading) {
    return <div>Loading countries...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>Country Select</h2>
      <label htmlFor="country-select">Select a country:</label>
      <select
        id="country-select"
        onChange={(e) => onSelect(e.target.value)}
        disabled={countries.length === 0}
      >
        <option value="">Select a country</option>
        {countries.map((country) => (
          <option key={country.name} value={country.name}>
            {country.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default CountrySelect;
