import React, { useState, useEffect } from 'react';
import './DailyMeals.css';

export default function DailyMeals() {
  const [meals, setMeals] = useState([]);
  
  useEffect(() => {
    // Fetch meals for the current day when the component mounts
    const fetchMeals = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('/api/meals/daily', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });
        if (response.ok) {
          const dailyMeals = await response.json();
          setMeals(dailyMeals);
        } else {
          console.error('Failed to fetch meals for today');
        }
      } catch (error) {
        console.error('Error fetching meals:', error);
      }
    };

    fetchMeals();

    // Set an interval to refresh the page at midnight
    const now = new Date();
    const millisTillMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 0, 0) - now;
    const timeoutId = setTimeout(() => {
      window.location.reload();
    }, millisTillMidnight);

    // Clean up the timeout on component unmount
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <div className="daily-meals">
      <h1>Meals for Today</h1>
      {meals.length === 0 ? (
        <p>No meals recorded for today.</p>
      ) : (
        <ul>
          {meals.map(meal => (
            <li key={meal._id}>
              <div>Category: {meal.category}</div>
              <div>Food: {meal.food}</div>
              <div>Calories Per Serving: {meal.caloriesPerServing}</div>
              <div>Number of Servings: {meal.numberOfServings}</div>
              <div>Protein per Serving: {meal.servingMacros.servingProtein}g</div>
              <div>Fat per Serving: {meal.servingMacros.servingFat}g</div>
              <div>Carbs per Serving: {meal.servingMacros.servingCarb}g</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
