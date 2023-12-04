import React, { useRef, useState } from "react";
import classes from "./checkout.module.css";

function Checkout(props) {
  const [inputFields, setInputFields] = useState({
    name: true,
    street: true,
    postalCode: true,
    city: true,
  });

  const isEmpty = (value) => value.trim() === "";
  const fiveChar = (value) => value.trim().length === 5;

  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const cityInputRef = useRef();
  const postalInputRef = useRef();

  const submitFrom = (event) => {
    event.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredStreet = streetInputRef.current.value;
    const enteredPostal = postalInputRef.current.value;
    const enteredCity = cityInputRef.current.value;

    setInputFields({
      name: enteredName,
      street: enteredStreet,
      postalCode: enteredPostal,
      city: enteredCity,
    });

    const nameIsValid = !isEmpty(enteredName);
    const streetIsValid = !isEmpty(enteredStreet);
    const cityIsValid = !isEmpty(enteredCity);
    const postalIsValid = fiveChar(enteredPostal);

    const formIsValid =
      nameIsValid && streetIsValid && cityIsValid && postalIsValid;

    if (!formIsValid) {
      return;
    }

    props.submitData({
      name: enteredName,
      street: enteredStreet,
      postalCode: enteredPostal,
      city: enteredCity,
    })
  };
  return (
    <form className={classes.form} onSubmit={submitFrom}>
      <div
        className={`${classes.control} ${
          inputFields.name ? "" : classes.invalid
        } `}
      >
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" ref={nameInputRef} />
        {!inputFields.name && <p>Please enter a valid Name!!</p>}
      </div>
      <div  className={`${classes.control} ${
          inputFields.street ? "" : classes.invalid
        } `}>
        <label htmlFor="street">Street</label>
        <input type="text" id="street" ref={streetInputRef} />
        {!inputFields.street && <p>Please enter a valid Street!!</p>}
      </div>
      <div  className={`${classes.control} ${
          inputFields.postalCode ? "" : classes.invalid
        } `}>
        <label htmlFor="postal">Postal Code</label>
        <input type="text" id="postal" ref={postalInputRef} />
        {!inputFields.postalCode && <p>Please enter a valid Postal Code!!</p>}
      </div>
      <div  className={`${classes.control} ${
          inputFields.city ? "" : classes.invalid
        } `}>
        <label htmlFor="city">City</label>
        <input type="text" id="city" ref={cityInputRef} />
        {!inputFields.city && <p>Please enter a valid City!!</p>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
}

export default Checkout;
