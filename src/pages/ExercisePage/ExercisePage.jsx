import React, { useState, useEffect } from 'react';
import './ExercisePage.css';
import { useNavigate } from 'react-router-dom';

export default function ExercisePage(props) {
  const [formData, setFormData] = useState({
    workout: '',
    caloriesburned: '',
  });
  const [exercises, setExercises] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    // Fetch exercises for the current day when the component mounts
    const fetchExercises = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('/api/exercise/daily', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });
        if (response.ok) {
          const dailyExercises = await response.json();
          setExercises(dailyExercises);
        } else {
          console.error('Failed to fetch exercises for today');
        }
      } catch (error) {
        console.error('Error fetching exercises:', error);
      }
    };

    fetchExercises();

    // Set an interval to refresh the page at midnight
    const now = new Date();
    const millisTillMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 0, 0) - now;
    const timeoutId = setTimeout(() => {
      window.location.reload();
    }, millisTillMidnight);

    // Clean up the timeout on component unmount
    return () => clearTimeout(timeoutId);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataToSend = {
      workout: formData.workout,
      caloriesburned: Number(formData.caloriesburned),
    };

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/exercise', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(dataToSend),
      });
      if (response.ok) {
        const exercise = await response.json();
        console.log('Exercise saved successfully:', exercise);
        // Clear form fields after successful submission
        setFormData({
          workout: '',
          caloriesburned: '',
        });
        // Fetch the updated list of exercises
        const fetchExercises = async () => {
          try {
            const token = localStorage.getItem('token');
            const response = await fetch('/api/exercise/daily', {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
              },
            });
            if (response.ok) {
              const dailyExercises = await response.json();
              setExercises(dailyExercises);
            } else {
              console.error('Failed to fetch exercises for today');
            }
          } catch (error) {
            console.error('Error fetching exercises:', error);
          }
        };
        fetchExercises();
      } else {
        console.error('Failed to save exercise');
        const errorData = await response.json();
        console.error('Error details:', errorData);
      }
    } catch (error) {
      console.error('Error saving exercise:', error);
    }
  };

  return (
    <>
      <section id='exercise'>
        <div className='words' id='welcome'>Exercise Page</div>
        <form onSubmit={handleSubmit} className="exercise-form">
          <label>
            Workout:
            <input
              type="text"
              name="workout"
              value={formData.workout}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Calories Burned:
            <input
              type="number"
              name="caloriesburned"
              value={formData.caloriesburned}
              onChange={handleChange}
              required
            />
          </label>
          <button type="submit">Submit</button>
        </form>
        <div className="daily-exercises">
          <h2>Exercises for Today</h2>
          {exercises.length === 0 ? (
            <p>No exercises recorded for today.</p>
          ) : (
            <ul>
              {exercises.map(exercise => (
                <li key={exercise._id}>
                  <div>Workout: {exercise.workout}</div>
                  <div>Calories Burned: {exercise.caloriesburned}</div>
                  <div>Date: {new Date(exercise.createdAt).toLocaleDateString()}</div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </>
  );
}
