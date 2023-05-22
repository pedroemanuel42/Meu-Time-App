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

function CountrySelect({ apiKey, onSelect }: CountrySelectProps) {
  const [countries, setCountries] = useState<Country[]>([]);

  useEffect(() => {
    const fetchCountries = async () => {
      if (!apiKey) return;

      const options = {
        method: "GET",
        url: "https://api-football-v1.p.rapidapi.com/v3/countries",
        headers: {
          "X-RapidAPI-Key": apiKey,
          "X-RapidAPI-Host": "api-football-v1.p.rapidapi.com",
        },
      };

      try {
        const response = await axios.request(options);

        const resCountries = response.data.response;

        setCountries(resCountries);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCountries();
  }, [apiKey]);

  return (
    <div>
      <h2>Country Select</h2>
      <label htmlFor="country-select">Select a country:</label>
      <select id="country-select" onChange={(e) => onSelect(e.target.value)}>
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
