import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ProfilePage.css'
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler // Import the Filler plugin
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler // Register the Filler plugin
);

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [goal, setGoal] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const [userResponse, profileResponse, goalResponse] = await Promise.all([
          fetch('/api/users/profile', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
          }),
          fetch('/api/profile/me', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
          }),
          fetch('/api/goals', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
          }),
        ]);

        if (userResponse.ok && profileResponse.ok && goalResponse.ok) {
          const userData = await userResponse.json();
          const profileData = await profileResponse.json();
          const goalData = await goalResponse.json();

          setUser(userData);
          setProfile(profileData);
          setGoal(goalData[0]); // Assuming goalData is an array and we need the first item
        } else {
          console.error('Failed to fetch user, profile, or goal data');
        }
      } catch (error) {
        console.error('Error fetching user, profile, or goal data:', error);
      }
    };

    fetchUserProfile();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const handleNavigate = (path) => {
    navigate(path);
  };

  if (!user || !profile || !goal) {
    return <div>Loading...</div>;
  }

  const data = {
    labels: ['Starting Weight', 'Current Weight', 'Goal Weight'],
    datasets: [
      {
        label: 'Weight Progress',
        data: [profile.startingWeight || 0, profile.currentWeight, goal.weightGoal],
        borderColor: '#102937',
        backgroundColor: 'rgba(16, 41, 55, 0.2)',
        fill: true, // Enable fill
      },
    ],
  };

  const options = {
    plugins: {
      title: {
        display: true,
        text: 'Weight Progress',
        color: '#102937' // Title color
      },
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: false,
        ticks: {
          color: '#102937' // Y-axis ticks color
        }
      },
      x: {
        ticks: {
          color: '#102937' // X-axis ticks color
        }
      }
    },
  };

  return (
    <div className="profile-page">
      <h1>{user.name}</h1>
      <div className="weight-progress">
        <Line data={data} options={options} />
      </div>
      <div className="profile-details">
        <p>Current Weight: {profile.currentWeight} lbs</p>
        <p>Weight Goal: {goal.weightGoal} lbs</p>
      </div>
      <div className="profile-links">
        <button className='profile-button' onClick={() => handleNavigate('/goals')}>Change Macro and Weight Goals</button>
        <button className='profile-button'onClick={() => handleNavigate('/edit-profile')}>Edit Current Weight</button>
      </div>
      <button className='profile-button' onClick={handleLogout}>Logout</button>
    </div>
  );
}
