import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { Country, State, City } from "country-state-city";
import axios, { all } from "axios";
import { BASE_API_URL } from "../utils/constants";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
const ThirdStep = (props) => {
  const navigate = useNavigate();
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  useEffect(() => {
    const getCoutries = async () => {
      try {
        setIsLoading(true);
        const result = await Country.getAllCountries();
        let allCountries = [];
        allCountries = result?.map(({ isoCode, name }) => ({
          isoCode,
          name,
        }));
        const [{ isoCode: firstCountry } = {}] = allCountries;

        setCountries(allCountries);
        setSelectedCountry(firstCountry);
        setIsLoading(false);
      } catch (error) {
        setCountries([]);
        setIsLoading(false);
      }
    };
    getCoutries();
  }, []);
  useEffect(() => {
    const getStates = async () => {
      try {
        const result = await State.getStatesOfCountry(selectedCountry);

        let allStates = [];
        allStates = result?.map(({ isoCode, name }) => ({
          isoCode,
          name,
        }));
        const [{ isoCode: firstState = "" } = {}] = allStates;
        setCities([]);
        setSelectedCity("");
        setStates(allStates);
        setSelectedState(firstState);
      } catch (error) {
        setStates([]);
        setCities([]);
        setSelectedCity("");
      }
    };
    getStates();
  }, [selectedCountry]);
  useEffect(() => {
    const getCities = async () => {
      try {
        const result = await City.getCitiesOfState(
          selectedCountry,
          selectedState
        );
        let allCities = [];
        allCities = result?.map(({ name }) => ({
          name,
        }));
        const [{ name: firstCity = "" } = {}] = allCities;
        setCities(allCities);
        setSelectedCity(firstCity);
      } catch (error) {
        setCities([]);
      }
    };
    getCities();
  }, [selectedState]);
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { user } = props;
      const updatedData = {
        country: countries.find(
          (country) => country.isoCode === selectedCountry
        )?.name,
        state:
          states.find((state) => state.isoCode === selectedState)?.name || "",
        city: selectedCity,
      };
      await axios.post(`${BASE_API_URL}/register`, {
        ...user,
        ...updatedData,
      }); //understand the type of data by seeing test_post_understand.js in mern-form directory
      Swal.fire("Awesome!", "You're successfully registered", "success").then(
        (result) => {
          if (result.isConfirmed || result.isDenied) {
            props.resetUser();
            navigate("/");
          }
        }
      );
    } catch (error) {
      if (error.message) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.response.data,
        });
      }
    }
  };
  return (
    <Form className="input-form" onSubmit={handleSubmit}>
      <motion.div
        className="col-md-6 offset-md-3"
        initial={{ x: "-100vw" }}
        animate={{ x: 0 }}
        transition={{ stiffness: 150 }}
      >
        <Form.Group controlId="country">
          {isLoading && (
            <p className="loading">Loading Countries....Please Wait......</p>
          )}
          <Form.Label>Country</Form.Label>
          <Form.Control
            as="select"
            name="country"
            value={selectedCountry}
            onChange={(event) => {
              setSelectedCountry(event.target.value);
            }}
          >
            {countries.map(({ isoCode, name }) => (
              <option value={isoCode} key={isoCode}>
                {name}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
        <br />
        <Form.Group controlId="state">
          <Form.Label>State</Form.Label>
          <Form.Control
            as="select"
            name="state"
            value={selectedState}
            onChange={(event) => setSelectedState(event.target.value)}
          >
            {states.length > 0 ? (
              states.map(({ isoCode, name }) => (
                <option value={isoCode} name={isoCode}>
                  {name}
                </option>
              ))
            ) : (
              <option value="" key="">
                No state found
              </option>
            )}
          </Form.Control>
        </Form.Group>
        <br />
        <Form.Group controlId="city">
          <Form.Label>City</Form.Label>
          <Form.Control
            as="select"
            name="city"
            value={selectedCity}
            onChange={(event) => setSelectedCity(event.target.value)}
          >
            {cities.length > 0 ? (
              cities.map(({ name }) => (
                <option value={name} key={name}>
                  {name}
                </option>
              ))
            ) : (
              <option value="" key="">
                No cities found
              </option>
            )}
          </Form.Control>
        </Form.Group>
        <br />
        <Button variant="primary" type="submit">
          Register
        </Button>
      </motion.div>
    </Form>
  );
};
export default ThirdStep;
