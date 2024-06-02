import React, { useState, useEffect } from 'react';
import './CreateGoalsPage.css';
import { useNavigate } from 'react-router-dom';

export default function GoalsPage(props) {
  const [formData, setFormData] = useState({
    calorieGoal: '',
    proteinGoal: '',
    fatGoal: '',
    carbGoal: '',
    weightGoal: '',
  });

  const [goalId, setGoalId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch current goal data when the component mounts
    const fetchGoal = async () => {
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
            const goal = goals[0]; // Assuming there is only one goal per user
            setFormData({
              calorieGoal: goal.calorieGoal || '',
              proteinGoal: goal.proteinGoal || '',
              fatGoal: goal.fatGoal || '',
              carbGoal: goal.carbGoal || '',
              weightGoal: goal.weightGoal || '',
            });
            setGoalId(goal._id);
          }
        } else {
          console.error('Failed to fetch goal');
          const errorData = await response.json();
          console.error('Error details:', errorData);
        }
      } catch (error) {
        console.error('Error fetching goal:', error);
      }
    };

    fetchGoal();
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

    // Convert all numeric fields from strings to numbers
    const dataToSend = {
      calorieGoal: Number(formData.calorieGoal),
      proteinGoal: Number(formData.proteinGoal),
      fatGoal: Number(formData.fatGoal),
      carbGoal: Number(formData.carbGoal),
      weightGoal: Number(formData.weightGoal),
    };

    // Log converted data
    console.log('Converted data:', dataToSend);

    try {
      const token = localStorage.getItem('token');
      const url = goalId ? `/api/goals/${goalId}` : '/api/goals';
      const method = goalId ? 'PUT' : 'POST';
      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(dataToSend),
      });
      if (response.ok) {
        const goal = await response.json();
        console.log('Goal saved successfully:', goal);
        navigate('/'); // Redirect to the goals page or any other page
      } else {
        console.error('Failed to save goal');
        const errorData = await response.json();
        console.error('Error details:', errorData);
      }
    } catch (error) {
      console.error('Error saving goal:', error);
    }
  };

  return (
    <>
      <section id='goals'>
        <div className='words' id='welcome'>Goals Page</div>
        <div className="goals-form-container">
          <form onSubmit={handleSubmit} className="goals-form">
            <label>
              Calorie Goal:
              <input
                type="number"
                name="calorieGoal"
                value={formData.calorieGoal}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Protein Goal:
              <input
                type="number"
                name="proteinGoal"
                value={formData.proteinGoal}
                onChange={handleChange}
              />
            </label>
            <label>
              Fat Goal:
              <input
                type="number"
                name="fatGoal"
                value={formData.fatGoal}
                onChange={handleChange}
              />
            </label>
            <label>
              Carb Goal:
              <input
                type="number"
                name="carbGoal"
                value={formData.carbGoal}
                onChange={handleChange}
              />
            </label>
            <label>
              Weight Goal:
              <input
                type="number"
                name="weightGoal"
                value={formData.weightGoal}
                onChange={handleChange}
              />
            </label>
            <button type="submit">Submit</button>
          </form>
        </div>
      </section>
    </>
  );
}
