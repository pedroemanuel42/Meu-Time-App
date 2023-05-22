import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { FormControl, ListGroup } from "react-bootstrap";
import { SpinnerCircular } from "spinners-react";

interface CountrySelectProps {
  apiKey?: string | null;
  onSelect: (countryName: string) => void;
}

interface Country {
  code: string;
  name: string;
  flag: string;
}

const Countries = ({ apiKey = null, onSelect }: CountrySelectProps) => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [filteredCountries, setFilteredCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");

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
        setFilteredCountries(resCountries);
      } catch (error) {
        console.error(error);
        setError("Error fetching countries. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, [apiKey]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = event.target.value.toLowerCase();
    setSearchTerm(searchTerm);

    const filteredCountries = countries.filter((country) =>
      country.name.toLowerCase().includes(searchTerm)
    );
    setFilteredCountries(filteredCountries);
  };

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
      <h2>Countries</h2>
      <FormControl
        type="text"
        placeholder="Search by country name"
        value={searchTerm}
        onChange={handleSearch}
      />
      <ListGroup>
        {filteredCountries.map((country, index) => (
          <ListGroup.Item
            key={country.name}
            onClick={() => onSelect(country.name)}
            action
          >
            <span>{index + 1}</span>
            <img src={country.flag} alt={country.name} width={30} height={20} />
            <span>{country.name}</span>
            <span>{country.code}</span>
            <Link to={`/leagues/${country.name}`}>
              <button>Leagues</button>
            </Link>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
}

export default Countries;
