import MealsSummary from "./MealsSummary";
import AvailabeMeals from "./AvailableMeals";
import { Fragment } from "react";

const Meals = () => {
  return (
    <Fragment>
      <MealsSummary />
      <AvailabeMeals />
    </Fragment>
  );
};

export default Meals;
