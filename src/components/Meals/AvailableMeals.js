import { useEffect, useState } from "react";
import axios from "axios";

import classes from "./AvailableMeals.module.css";
import MealItem from "./MealItem/MealItem";
import Card from "../UI/Card";
import ClipLoader from "react-spinners/ClipLoader";

const AvailabeMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState();

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const response = await axios.get(
          "https://food-ordering-backend-lc7d.onrender.com/api/meals/"
        );
        if (!response.status === 200) {
          throw new Error("Something went wrong!");
        }
        const responseData = response.data.myData;

        const loadedMeals = Object.values(responseData).map((mealData) => ({
          id: mealData.id,
          name: mealData.name,
          description: mealData.description,
          price: mealData.price,
        }));

        setMeals(loadedMeals);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        setHttpError(error.message);
      }
    };
    fetchMeals();
  }, []);

  if (isLoading) {
    return (
      <div>
        <div className={classes.container}>
          <ClipLoader color="#36d7b7" size={50} cssOverride={{}} />
        </div>
        <p className={classes.MealsLoading}>Loading.....</p>
      </div>
    );
  }
  if (httpError) {
    return (
      <section className={classes.MealsError}>
        <p>{httpError}</p>
      </section>
    );
  }

  const mealsList = meals.map((meal) => (
    <MealItem
      id={meal.id}
      key={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));
  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailabeMeals;
