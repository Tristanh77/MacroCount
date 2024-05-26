import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function EditProfilePage() {
  const [currentWeight, setCurrentWeight] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch current profile data
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('/api/profile/me', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });
        if (response.ok) {
          const profile = await response.json();
          setCurrentWeight(profile.currentWeight || '');
        } else {
          console.error('Failed to fetch profile');
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setCurrentWeight(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/profile/me', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ currentWeight: Number(currentWeight) }),
      });

      if (response.ok) {
        const profile = await response.json();
        console.log('Profile updated successfully:', profile);
        navigate('/profile'); // Redirect to the profile page
      } else {
        console.error('Failed to update profile');
        const errorData = await response.json();
        console.error('Error details:', errorData);
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <section id="editprofile">
      <div className="words" id="welcome">Edit Profile Page</div>
      <form onSubmit={handleSubmit} className="profile-form">
        <label>
          Current Weight:
          <input
            type="number"
            name="currentWeight"
            value={currentWeight}
            onChange={handleChange}
            required
          />
        </label>
        <button type="submit">Submit</button>
      </form>
    </section>
  );
}
