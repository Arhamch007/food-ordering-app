import React from "react";
import classes from "./Header.module.css";
import MealImg from "../../assests/meals.jpg";
import HeaderCartButton from "./HeaderCartButton";

const header = (props) => {
  return (
    <React.Fragment>
      <header className={classes.header}>
        <h1>Food Meals</h1>
        <HeaderCartButton onClickShow={props.showCard}/>
      </header>
      <div className={classes["main-image"]}>
        <img src={MealImg} alt="FoodImage!!" />
      </div>
    </React.Fragment>
  );
};

export default header;
