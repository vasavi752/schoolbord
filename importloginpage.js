
import React, { useState } from 'react';
import './LoginPage.css';

const LoginPage = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [loginType, setLoginType] = useState('admin'); // 'admin', 'teacher', 'student'

  // Demo users for different roles
  const demoUsers = {
    admin: {
      email: 'admin@school.edu',
      password: 'admin123',
      user: {
        id: 1,
        name: 'Admin User',
        email: 'admin@school.edu',
        role: 'Administrator',
        avatar: null
      }
    },
    teacher: {
      email: 'teacher@school.edu',
      password: 'teacher123',
      user: {
        id: 2,
        name: 'Dr. Sarah Johnson',
        email: 'teacher@school.edu',
        role: 'Teacher',
        avatar: null,
        subject: 'Mathematics',
        classes: ['Grade 10A', 'Grade 11B']
      }
    },
    student: {
      email: 'student@school.edu',
      password: 'student123',
      user: {
        id: 3,
        name: 'Alex Thompson',
        email: 'student@school.edu',
        role: 'Student',
        avatar: null,
        grade: 'Grade 10A',
        gpa: 3.8
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    setError(''); // Clear error when user types
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    const demoUser = demoUsers[loginType];
    
    if (formData.email === demoUser.email && formData.password === demoUser.password) {
      // Store login state in localStorage if remember me is checked
      if (formData.rememberMe) {
        localStorage.setItem('schoolhub_user', JSON.stringify(demoUser.user));
      }
      onLogin(demoUser.user);
    } else {
      setError('Invalid email or password. Please try the demo credentials.');
    }

    setIsLoading(false);
  };

  const handleDemoLogin = (userType) => {
    const demoUser = demoUsers[userType];
    setFormData({
      email: demoUser.email,
      password: demoUser.password,
      rememberMe: false
    });
    setLoginType(userType);
    onLogin(demoUser.user);
  };

  const getRoleIcon = (role) => {
    switch(role) {
      case 'admin': return '👨‍💼';
      case 'teacher': return '👨‍🏫';
      case 'student': return '🎓';
      default: return '👤';
    }
  };

  return (
    <div className="login-container">
      <div className="login-background">
        <div className="login-background-overlay"></div>
      </div>
      
      <div className="login-content">
        <div className="login-card">
          <div className="login-header">
            <div className="school-logo">
              <span className="logo-icon">📚</span>
              <h1>SchoolHub</h1>
            </div>
            <p className="login-subtitle">Welcome back! Please sign in to your account.</p>
          </div>

          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <div className="input-wrapper">
                <span className="input-icon">📧</span>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email"
                  required
                  disabled={isLoading}
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <div className="input-wrapper">
                <span className="input-icon">🔒</span>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Enter your password"
                  required
                  disabled={isLoading}
                />
              </div>
            </div>

            <div className="form-options">
              <label className="checkbox-wrapper">
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleInputChange}
                  disabled={isLoading}
                />
                <span className="checkbox-label">Remember me</span>
              </label>
              <a href="#" className="forgot-password">Forgot password?</a>
            </div>

            {error && (
              <div className="error-message">
                <span className="error-icon">⚠️</span>
                {error}
              </div>
            )}

            <button
              type="submit"
              className="login-button"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="loading-spinner"></span>
                  Signing in...
                </>
              ) : (
                <>
                  <span>Sign In</span>
                  <span className="button-arrow">→</span>
                </>
              )}
            </button>
          </form>

          <div className="divider">
            <span>or</span>
          </div>

          <div className="demo-logins">
            <p className="demo-title">Try Demo Accounts:</p>
            <div className="demo-buttons">
              <button
                type="button"
                onClick={() => handleDemoLogin('admin')}
                className="demo-button admin"
                disabled={isLoading}
              >
                <span className="demo-icon">{getRoleIcon('admin')}</span>
                <div className="demo-info">
                  <span className="demo-role">Administrator</span>
                  <span className="demo-email">admin@school.edu</span>
                </div>
              </button>

              <button
                type="button"
                onClick={() => handleDemoLogin('teacher')}
                className="demo-button teacher"
                disabled={isLoading}
              >
                <span className="demo-icon">{getRoleIcon('teacher')}</span>
                <div className="demo-info">
                  <span className="demo-role">Teacher</span>
                  <span className="demo-email">teacher@school.edu</span>
                </div>
              </button>

              <button
                type="button"
                onClick={() => handleDemoLogin('student')}
                className="demo-button student"
                disabled={isLoading}
              >
                <span className="demo-icon">{getRoleIcon('student')}</span>
                <div className="demo-info">
                  <span className="demo-role">Student</span>
                  <span className="demo-email">student@school.edu</span>
                </div>
              </button>
            </div>
          </div>

          <div className="login-footer">
            <p>Don't have an account? <a href="#" className="signup-link">Contact Administrator</a></p>
          </div>
        </div>

        <div className="login-info">
          <div className="info-card">
            <h3>🎯 Demo Credentials</h3>
            <div className="credential-list">
              <div className="credential-item">
                <strong>Administrator:</strong>
                <span>admin@school.edu / admin123</span>
              </div>
              <div className="credential-item">
                <strong>Teacher:</strong>
                <span>teacher@school.edu / teacher123</span>
              </div>
              <div className="credential-item">
                <strong>Student:</strong>
                <span>student@school.edu / student123</span>
              </div>
            </div>
          </div>

          <div className="info-card">
            <h3>✨ Features</h3>
            <ul className="feature-list">
              <li>📊 Student Management</li>
              <li>👨‍🏫 Teacher Profiles</li>
              <li>📚 Class Organization</li>
              <li>📅 Event Management</li>
              <li>📈 Grade Tracking</li>
              <li>📋 Attendance System</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage
