import React, { useState } from 'react';
import './MealPage.css';
import { useNavigate } from 'react-router-dom';

export default function MealPage(props) {
  const [formData, setFormData] = useState({
    category: '',
    food: '',
    caloriesPerServing: '',
    numberOfServings: '',
    servingProtein: '',
    servingFat: '',
    servingCarb: '',
  });

  const navigate = useNavigate();

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
      category: formData.category,
      food: formData.food,
      caloriesPerServing: Number(formData.caloriesPerServing),
      numberOfServings: Number(formData.numberOfServings),
      servingMacros: {
        servingProtein: Number(formData.servingProtein),
        servingFat: Number(formData.servingFat),
        servingCarb: Number(formData.servingCarb),
      },
    };

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/meals', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(dataToSend),
      });
      if (response.ok) {
        const meal = await response.json();
        console.log('Meal saved successfully:', meal);
        // Clear form fields after successful submission
        setFormData({
          category: '',
          food: '',
          caloriesPerServing: '',
          numberOfServings: '',
          servingProtein: '',
          servingFat: '',
          servingCarb: '',
        });
        // Optionally, navigate to another page or display a success message
        navigate('/daily'); // Redirect to another page if necessary
      } else {
        console.error('Failed to save meal');
        const errorData = await response.json();
        console.error('Error details:', errorData);
      }
    } catch (error) {
      console.error('Error saving meal:', error);
    }
  };

  return (
    <section id='meal'>
      <div className='words' id='welcome'>Meal Page</div>
      <div className="meal-form-container">
        <form onSubmit={handleSubmit} className="meal-form">
          <label>
            Category:
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            >
              <option value="">Select a category</option>
              <option value="Breakfast">Breakfast</option>
              <option value="Lunch">Lunch</option>
              <option value="Dinner">Dinner</option>
              <option value="Snack">Snack</option>
            </select>
          </label>
          <label>
            Food:
            <input
              type="text"
              name="food"
              value={formData.food}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Calories Per Serving:
            <input
              type="number"
              name="caloriesPerServing"
              value={formData.caloriesPerServing}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Number of Servings:
            <input
              type="number"
              name="numberOfServings"
              value={formData.numberOfServings}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Protein per Serving (g):
            <input
              type="number"
              name="servingProtein"
              value={formData.servingProtein}
              onChange={handleChange}
            />
          </label>
          <label>
            Fat per Serving (g):
            <input
              type="number"
              name="servingFat"
              value={formData.servingFat}
              onChange={handleChange}
            />
          </label>
          <label>
            Carbs per Serving (g):
            <input
              type="number"
              name="servingCarb"
              value={formData.servingCarb}
              onChange={handleChange}
            />
          </label>
          <button type="submit">Submit</button>
        </form>
      </div>
    </section>
  );
}
