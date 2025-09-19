import React from "react";
import "./ecovoice.css"

const Dashboard = () => {
  return (
    <div>
      <header>
        <div className="header-content">
          <div className="logo-container">
            <img
              src="https://i.ibb.co/qZzvg53/Whats-App-Image-2025-09-09-at-08-13-15-f871567f-removebg-preview.png"
              alt="Samadhan Setu Logo"
            />
            <div className="logo">Samadhan Setu</div>
          </div>

          <nav>
            <ul></ul>
          </nav>

          <div className="header-actions">
            <div className="language-selector" id="languageSelector">
              <button className="language-btn" id="languageBtn">
                <i className="fas fa-globe"></i> <span>English</span>{" "}
                <i className="fas fa-caret-down"></i>
              </button>
              <div className="language-dropdown" id="languageDropdown">
                <a href="#" className="lang-option" data-lang="en">
                  English
                </a>
                <a href="#" className="lang-option" data-lang="hi">
                  हिन्दी
                </a>
                <a href="#" className="lang-option" data-lang="mr">
                  मराठी
                </a>
              </div>
            </div>

            <button className="theme-toggle" id="themeToggle">
              <i className="fas fa-moon"></i>
            </button>

            <div className="user-profile">
              <button className="profile-btn">
                <img
                  src="data:image/svg+xml;base64,..."
                  alt="User"
                  className="profile-img"
                />
              </button>

              <div className="profile-dropdown" id="profileDropdown">
                <a href="#">
                  <i className="fas fa-user"></i> Profile
                </a>
                <a href="#">
                  <i className="fas fa-cog"></i> Settings
                </a>
                <a href="#">
                  <i className="fas fa-award"></i> Achievements
                </a>
                <a href="#">
                  <i className="fas fa-history"></i> Activity
                </a>
                <a href="#" id="logoutBtn">
                  <i className="fas fa-sign-out-alt"></i> Logout
                </a>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="dashboard">
        <div className="container">
          <div className="eco-voice-header">
            <img
              src="https://i.ibb.co/3yQZ5j98/Whats-App-Image-2025-09-16-at-13-14-21-8745e89b-removebg-preview.png"
              alt=""
            />
            <h1>Eco Voice</h1>
            <p>
              Connect with your community, share environmental updates, and
              engage with fellow citizens through reels and conversations.
              Together we can make our neighborhoods better!
            </p>
          </div>

          <div className="community-features">
            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-video"></i>
              </div>
              <h3 className="feature-title">Share Reels</h3>
              <p className="feature-description">
                Upload short videos about environmental issues, community
                events, or positive changes in your neighborhood.
              </p>
              <a href="#upload" className="feature-cta">
                Upload Now
              </a>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-comment-dots"></i>
              </div>
              <h3 className="feature-title">Community Chat</h3>
              <p className="feature-description">
                Connect with neighbors, discuss local issues, and organize
                community initiatives through our chat platform.
              </p>
              <a href="#chat" className="feature-cta">
                Join Conversation
              </a>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-users"></i>
              </div>
              <h3 className="feature-title">Community Groups</h3>
              <p className="feature-description">
                Join or create groups based on your interests, locality, or
                specific environmental concerns.
              </p>
              <a href="#" className="feature-cta">
                Explore Groups
              </a>
            </div>
          </div>

          <div className="reels-container">
            <h2 className="section-title">
              <i className="fas fa-film"></i> Community Reels
            </h2>
            <p>See what's happening in your community through these shared videos</p>

            <div className="reels-grid">
              <div className="reel-card">
                <div className="reel-video">
                  <img
                    src="data:image/webp;base64,..."
                    alt="Reel"
                  />
                </div>
              </div>
              {/* Add more reel cards as needed */}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
