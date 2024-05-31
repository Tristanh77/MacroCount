import React, { useState, useEffect } from 'react';
import './OverviewPage.css';
import { Bar, Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

export default function OverviewPage() {
  const [calorieGoal, setCalorieGoal] = useState(0);
  const [caloriesEaten, setCaloriesEaten] = useState(0);
  const [caloriesBurned, setCaloriesBurned] = useState(0);
  const [macros, setMacros] = useState({
    protein: 0,
    fat: 0,
    carb: 0,
  });
  const [macroGoals, setMacroGoals] = useState({
    protein: 0,
    fat: 0,
    carb: 0,
  });

  useEffect(() => {
    const fetchGoals = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('/api/goals', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });
        if (response.ok) {
          const goals = await response.json();
          if (goals.length > 0) {
            setCalorieGoal(goals[0].calorieGoal);
            setMacroGoals({
              protein: goals[0].proteinGoal,
              fat: goals[0].fatGoal,
              carb: goals[0].carbGoal,
            });
          }
        } else {
          console.error('Failed to fetch goals');
        }
      } catch (error) {
        console.error('Error fetching goals:', error);
      }
    };

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
          const meals = await response.json();
          const totalCaloriesEaten = meals.reduce((acc, meal) => acc + (meal.caloriesPerServing * meal.numberOfServings), 0);
          const totalProtein = meals.reduce((acc, meal) => acc + (meal.servingMacros.servingProtein * meal.numberOfServings), 0);
          const totalFat = meals.reduce((acc, meal) => acc + (meal.servingMacros.servingFat * meal.numberOfServings), 0);
          const totalCarb = meals.reduce((acc, meal) => acc + (meal.servingMacros.servingCarb * meal.numberOfServings), 0);
          setCaloriesEaten(totalCaloriesEaten);
          setMacros({
            protein: totalProtein,
            fat: totalFat,
            carb: totalCarb,
          });
        } else {
          console.error('Failed to fetch meals');
        }
      } catch (error) {
        console.error('Error fetching meals:', error);
      }
    };

    const fetchExercises = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('/api/exercise', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });
        if (response.ok) {
          const exercises = await response.json();
          const totalCaloriesBurned = exercises.reduce((acc, exercise) => acc + exercise.caloriesburned, 0);
          setCaloriesBurned(totalCaloriesBurned);
        } else {
          console.error('Failed to fetch exercises');
        }
      } catch (error) {
        console.error('Error fetching exercises:', error);
      }
    };

    fetchGoals();
    fetchMeals();
    fetchExercises();
  }, []);

  if (!calorieGoal) {
    return <div>Loading...</div>;
  }

  const caloriesLeft = calorieGoal + caloriesBurned - caloriesEaten;

  const doughnutData = {
    labels: ['Calories Left', 'Calories Eaten'],
    datasets: [
      {
        data: [caloriesLeft, caloriesEaten],
        backgroundColor: ['#102937', '#f9744b'],
        hoverBackgroundColor: ['#091d26', '#d84f2a'],
        borderWidth: 1,
      },
    ],
  };

  const doughnutOptions = {
    cutout: '75%',
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  const macroData = {
    labels: ['Protein', 'Fat', 'Carbs'],
    datasets: [
      {
        label: 'Consumed',
        data: [macros.protein, macros.fat, macros.carb],
        backgroundColor: '#f9744b',
        borderColor: '#d6c4b0',
        borderWidth: 1,
      },
      {
        label: 'Goal',
        data: [macroGoals.protein, macroGoals.fat, macroGoals.carb],
        backgroundColor: '#102937',
        borderColor: '#d6c4b0',
        borderWidth: 1,
      },
    ],
  };

  const barOptions = {
    plugins: {
      title: {
        display: true,
        text: 'Macros Consumed vs Goal',
      },
      legend: {
        display: false, // Hide legend
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="overview-page">
      <div className="calories-left">
        <h1 class='calories'>Calories Left for the Day</h1>
        <div className="doughnut-container">
          <Doughnut data={doughnutData} options={doughnutOptions} />
          <div className="calories-left-text">
            <h2>{caloriesLeft >= 0 ? caloriesLeft : 0}</h2>
            <p class='calories'>Remaining</p>
          </div>
        </div>
      </div>
      <div className="calories-summary">
        <div className="calories-burned">
          <h3>Calories Burned</h3>
          <p class='calories'>{caloriesBurned}</p>
        </div>
        <div className="calories-eaten">
          <h3>Calories Eaten</h3>
          <p class='calories'>{caloriesEaten}</p>
        </div>
      </div>
      <div className="macros-table">
        <h3>Macros</h3>
        <table>
          <thead>
            <tr>
              <th>Protein</th>
              <th>Fat</th>
              <th>Carbs</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{macros.protein} / {macroGoals.protein}</td>
              <td>{macros.fat} / {macroGoals.fat}</td>
              <td>{macros.carb} / {macroGoals.carb}</td>
            </tr>
          </tbody>
        </table>
        <Bar data={macroData} options={barOptions} />
      </div>
    </div>
  );
}
