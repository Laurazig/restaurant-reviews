import React, { useState, useEffect } from "react";
import RestaurantDataService from "../services/restaurant";
import { Link } from "react-router-dom";

const Restaurant = props => {
  const initialRestaurantState = {
    id: null,
    name: "",
    address: {},
    cuisine: "",
    reviews: []
  };
  const [restaurant, setRestaurant] = useState(initialRestaurantState)

  csont getRestaurant = id => {
    RestaurantDataService.get(id)
    .then(response => {
      setRestaurant(response.data);
    console.log(response.data);
    })
    .catch(e =>{
      console.log(e);
    });   
  };

  useEffect(()=> {
    getRestaurant(props.match.params.id);
  }, [props.match.params.id]);

  const deleteReview= (reviewId, index) => {
    RestaurantDataService.deleteReview(reviewId)
    .then(response => {
      setRestaurant((prevState) => {
        prevState.reviews.splice(index,1)
        return({
          ...prevState
        })
      })
    })
    .catch(e => {
      console.log(e);
    });
  };

  return (
    <div>
      { restaurant ? (
        <div>
          <h5>{restaurant.name}</h5>
          <p>
            <strong>Cuisine: </strong>{restaurant.cuisine}<br/>
            <strong>Address: </strong>{restaurant.address.building} {restaurant.}
          </p>
            <Link to={"/restaurants/"+ props.match.params.id + "review"} className="btn btn-primary col-lg-5 mx-1 mb-1">
              Add Review
            </Link>
            <h4> Reviews</h4>
            
        </div>
      )

      }
      
    </div>
  );
}

export default Restaurant;