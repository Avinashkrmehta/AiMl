import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { 
  LogOut, 
  User, 
  Activity, 
  TrendingUp, 
  Users, 
  BarChart3,
  Bell
} from 'lucide-react';
import toast from 'react-hot-toast';

const Dashboard = () => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
  };

  const getInitials = (firstName, lastName) => {
    return `${firstName?.charAt(0) || ''}${lastName?.charAt(0) || ''}`.toUpperCase();
  };

  const stats = [
    {
      title: 'Total Users',
      value: '2,543',
      description: '+12% from last month',
      icon: Users,
      color: 'primary'
    },
    {
      title: 'Active Sessions',
      value: '1,234',
      description: '+5% from last week',
      icon: Activity,
      color: 'success'
    },
    {
      title: 'Revenue',
      value: '$45,678',
      description: '+18% from last month',
      icon: TrendingUp,
      color: 'warning'
    },
    {
      title: 'Conversion Rate',
      value: '3.24%',
      description: '+2.1% from last week',
      icon: BarChart3,
      color: 'info'
    }
  ];

  const recentActivities = [
    {
      id: 1,
      action: 'New user registered',
      user: 'john.doe@example.com',
      time: '2 minutes ago',
      type: 'user'
    },
    {
      id: 2,
      action: 'Payment processed',
      user: 'jane.smith@example.com',
      time: '5 minutes ago',
      type: 'payment'
    },
    {
      id: 3,
      action: 'Profile updated',
      user: 'mike.johnson@example.com',
      time: '10 minutes ago',
      type: 'update'
    },
    {
      id: 4,
      action: 'New subscription',
      user: 'sarah.wilson@example.com',
      time: '15 minutes ago',
      type: 'subscription'
    }
  ];

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div className="dashboard-logo">
          Dashboard
        </div>
        
        <nav className="dashboard-nav">
          <div className="user-menu">
            <div className="user-avatar">
              {getInitials(user?.first_name, user?.last_name)}
            </div>
            <div className="user-info">
              <div className="user-name">
                {user?.first_name} {user?.last_name}
              </div>
              <div className="user-email">
                {user?.email}
              </div>
            </div>
            <button onClick={handleLogout} className="logout-btn">
              <LogOut size={16} />
              Logout
            </button>
          </div>
        </nav>
      </header>

      <main className="dashboard-content">
        <div className="welcome-section">
          <h1 className="welcome-title">
            Welcome back, {user?.first_name}! 👋
          </h1>
          <p className="welcome-subtitle">
            Here's what's happening with your account today.
          </p>
        </div>

        <div className="dashboard-grid">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div key={index} className="dashboard-card">
                <div className="card-header">
                  <div className={`card-icon ${stat.color}`}>
                    <IconComponent size={24} />
                  </div>
                  <h3 className="card-title">{stat.title}</h3>
                </div>
                <div className="card-value">{stat.value}</div>
                <div className="card-description">{stat.description}</div>
              </div>
            );
          })}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
          <div className="dashboard-card">
            <div className="card-header">
              <div className="card-icon primary">
                <BarChart3 size={24} />
              </div>
              <h3 className="card-title">Analytics Overview</h3>
            </div>
            <div style={{ height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748b' }}>
              <div style={{ textAlign: 'center' }}>
                <BarChart3 size={48} style={{ marginBottom: '16px', opacity: 0.5 }} />
                <p>Chart visualization would go here</p>
                <p style={{ fontSize: '0.9rem' }}>Connect your analytics service to see real data</p>
              </div>
            </div>
          </div>

          <div className="dashboard-card">
            <div className="card-header">
              <div className="card-icon info">
                <Bell size={24} />
              </div>
              <h3 className="card-title">Recent Activity</h3>
            </div>
            <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
              {recentActivities.map((activity) => (
                <div key={activity.id} style={{ 
                  padding: '12px 0', 
                  borderBottom: '1px solid #e2e8f0',
                  ':last-child': { borderBottom: 'none' }
                }}>
                  <div style={{ fontWeight: '600', fontSize: '0.9rem', marginBottom: '4px' }}>
                    {activity.action}
                  </div>
                  <div style={{ color: '#64748b', fontSize: '0.8rem', marginBottom: '2px' }}>
                    {activity.user}
                  </div>
                  <div style={{ color: '#94a3b8', fontSize: '0.75rem' }}>
                    {activity.time}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="dashboard-card">
          <div className="card-header">
            <div className="card-icon primary">
              <User size={24} />
            </div>
            <h3 className="card-title">Profile Information</h3>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
            <div>
              <div style={{ fontWeight: '600', marginBottom: '4px', color: '#374151' }}>Full Name</div>
              <div style={{ color: '#6b7280' }}>{user?.first_name} {user?.last_name}</div>
            </div>
            <div>
              <div style={{ fontWeight: '600', marginBottom: '4px', color: '#374151' }}>Email</div>
              <div style={{ color: '#6b7280' }}>{user?.email}</div>
            </div>
            <div>
              <div style={{ fontWeight: '600', marginBottom: '4px', color: '#374151' }}>Member Since</div>
              <div style={{ color: '#6b7280' }}>
                {user?.created_at ? new Date(user.created_at).toLocaleDateString() : 'N/A'}
              </div>
            </div>
            <div>
              <div style={{ fontWeight: '600', marginBottom: '4px', color: '#374151' }}>Status</div>
              <div style={{ 
                color: '#059669', 
                background: '#d1fae5', 
                padding: '4px 8px', 
                borderRadius: '4px', 
                fontSize: '0.8rem',
                display: 'inline-block'
              }}>
                Active
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;