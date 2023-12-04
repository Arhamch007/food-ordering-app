import React, { useEffect , useState } from "react";
import classes from "./AvailableMeals.module.css";
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";

const AvailableMeals = () => {
  const [mealss,setMealss]= useState([]);
  const [loading,setIsLoading] =useState(true);
  const [httpsError,setHttpsError] = useState();
  
  useEffect(()=>{

    const fetchMeals = async ()=>{

      const response = await fetch("https://react-https-86f27-default-rtdb.firebaseio.com/meals.json");
      if(!response){
        throw new Error("Something Went Wrong!");
      }
      const responseData = await response.json();
      const loadedArray = [];

      for( const Key in responseData){
        loadedArray.push({
          id:Key,
          description: responseData[Key].description,
          price: responseData[Key].price,
          name: responseData[Key].name });
      }
      setMealss(loadedArray);

    }
    
    setIsLoading(false);

    fetchMeals().catch((error)=>{

      setIsLoading(false);
      setHttpsError(error.message);

    })

  },[])

  if (loading){
    return <section>
      <p className={classes.loading}>Loading...</p>
    </section>
  }
  if (httpsError){
    return <section>
      <p className={classes.loading}>{httpsError}</p>
    </section>
  }

  const meals = mealss.map((meal) => (
    <li>
      <MealItem key={meal.id} meal={meal} />
    </li>
  ));
  return (
    <section className={classes.meals}>
      <Card>
        <ul>{meals}</ul>
      </Card>
    </section>
  );
};
export default AvailableMeals;
