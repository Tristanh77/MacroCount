import React, { useState, useEffect } from 'react';
import './ExercisePage.css';
import { useNavigate } from 'react-router-dom';

export default function ExercisePage(props) {
  const [formData, setFormData] = useState({
    workout: '',
    caloriesburned: '',
  });

  const navigate = useNavigate();

  useEffect(() => {
    const now = new Date();
    const millisTillMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 0, 0) - now;

    const timer = setTimeout(() => {
      setFormData((prevFormData) => ({
        ...prevFormData,
        caloriesburned: '',
      }));
    }, millisTillMidnight);

    return () => clearTimeout(timer); // Cleanup on unmount
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
        // Optionally, navigate to another page or display a success message
        navigate('/'); // Redirect to the exercises page or any other page
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
        <div className="exercise-form-container">
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
        </div>
      </section>
    </>
  );
}
