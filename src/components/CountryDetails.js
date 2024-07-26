import React, { useEffect, useState } from 'react';
import './CountryDetails.css';
import { Link, useParams } from 'react-router-dom';
import CountryShimmer from './CountryShimmer.js';

function CountryDetails() {
  const params = useParams();
  const countryName = params.country;

  const [countryData, setCountryData] = useState(null);
  const [notfound, setNotFound] = useState(false);

  useEffect(() => {
    fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
      .then((res) => res.json())
      .then(([data]) => {
        setCountryData({
          flag: data.flags.svg,
          name: data.name.common || data.name,
          population: data.population,
          capital: data.capital || [],  
          tld: data.tld || [],
          currencies: Object.values(data.currencies || {}).map((currency) => currency.name) || [], 
          languages: Object.values(data.languages || []) || [],  
          borders: data.borders || [], 
        });

        if (data.borders && data.borders.length > 0) {
          Promise.all(
            data.borders.map((border) =>
              fetch(`https://restcountries.com/v3.1/alpha/${border}`)
                .then((res) => res.json())
                .then(([borderCountry]) => borderCountry.name.common)
            )
          ).then((borders) => {
            setCountryData((prevState) => ({ ...prevState, borders }));
          });
        }
      })
      .catch((err) => {
        console.log(err);
        setNotFound(true);
      });
  }, [countryName]);

  if (notfound) {
    return <h1>Country not Found yet!!...</h1>;
  }

  return countryData === null ? (
    "Hold On Loading..."
  ) : (
    <main>
      <div className="button">
        <p>
          <button className="back-button" onClick={() => window.history.back()}>Back</button>
        </p>
        <p>
          <button className="back-button" onClick={() => window.history.forward()}>Forward</button>
        </p>
         </div>
      {countryData === null ? (<CountryShimmer />) : (
      <div className="country-details">
        <img src={countryData.flag} alt={countryData.name} />
        <div className="details-text-container">
          <h1>{countryData.name}</h1>
          <div className="details-text">
            <p><b>Population: {countryData.population.toLocaleString('en-IN')}</b></p>
            <p><b>Capital: {countryData.capital.join(', ') || 'N/A'}</b></p>
            <p><b>Top level domain: {countryData.tld.join(', ') || 'N/A'}</b></p>
            <p><b>Currencies: {countryData.currencies.join(', ') || 'N/A'}</b></p>
            <p><b>Languages: {countryData.languages.join(', ') || 'N/A'}</b></p>
          </div>
          <div className="border-countries">
            <b>Border Countries: </b>
            {countryData.borders.length > 0 ? (
              countryData.borders.map((border) => <Link key={border} to={`/${border}`}>{border}</Link>)
            ) : (
              <span>No border countries</span>
            )}
          </div>
          
        </div>
      </div>
    )}

    </main>
  );
}

export default CountryDetails;
