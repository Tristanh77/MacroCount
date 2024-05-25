import React, { useState } from 'react';
import './CreateProfilePage.css';
import { useNavigate } from 'react-router-dom';

export default function CreateProfilePage(props) {
  const [formData, setFormData] = useState({
    age: '',
    currentWeight: '',
    currentCalories: '',
    currentProtein: '',
    currentFat: '',
    currentCarb: '',
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

    // Convert all numeric fields from strings to numbers
    const dataToSend = {
      age: Number(formData.age),
      currentWeight: Number(formData.currentWeight),
      currentCalories: Number(formData.currentCalories),
      currentProtein: Number(formData.currentProtein),
      currentFat: Number(formData.currentFat),
      currentCarb: Number(formData.currentCarb),
    };

    // Log converted data
    console.log('Converted data:', dataToSend);

    try {
      const token = localStorage.getItem('token'); // Assuming the token is stored in localStorage
      console.log('Token:', token);
      const response = await fetch('/api/profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(dataToSend),
      });
      if (response.ok) {
        const profile = await response.json();
        console.log('Profile created successfully:', profile);
        navigate('/goals'); // Redirect to the profile page
      } else {
        console.error('Failed to create profile');
        const errorData = await response.json();
        console.error('Error details:', errorData);
      }
    } catch (error) {
      console.error('Error creating profile:', error);
    }
  };

  return (
    <>
      <section id='createprofile'>
        <div className='words' id='welcome'>Create Profile Page</div>
        <form onSubmit={handleSubmit} className="profile-form">
          <label>
            Age:
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Current Weight:
            <input
              type="number"
              name="currentWeight"
              value={formData.currentWeight}
              onChange={handleChange}
            />
          </label>
          <label>
            Current Calories:
            <input
              type="number"
              name="currentCalories"
              value={formData.currentCalories}
              onChange={handleChange}
            />
          </label>
          <label>
            Current Protein:
            <input
              type="number"
              name="currentProtein"
              value={formData.currentProtein}
              onChange={handleChange}
            />
          </label>
          <label>
            Current Fat:
            <input
              type="number"
              name="currentFat"
              value={formData.currentFat}
              onChange={handleChange}
            />
          </label>
          <label>
            Current Carbohydrates:
            <input
              type="number"
              name="currentCarb"
              value={formData.currentCarb}
              onChange={handleChange}
            />
          </label>
          <button type="submit">Submit</button>
        </form>
      </section>
    </>
  );
}
