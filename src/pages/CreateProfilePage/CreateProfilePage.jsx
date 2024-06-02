import React, { useState } from 'react';
import './CreateProfilePage.css';
import { useNavigate } from 'react-router-dom';

export default function CreateProfilePage(props) {
  const [formData, setFormData] = useState({
    age: '',
    currentWeight: '',
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
      age: Number(formData.age),
      currentWeight: Number(formData.currentWeight),
    };

    try {
      const token = localStorage.getItem('token');
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
        navigate('/create-goals');
      } else {
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
          <button type="submit">Submit</button>
        </form>
      </section>
    </>
  );
}
