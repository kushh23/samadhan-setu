import React from "react";
// import "./Dashboard.css"; // Make sure your CSS is adapted for React
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import '@fortawesome/fontawesome-free/css/all.min.css';
import { faGlobe, faCaretDown, faMoon, faHandHoldingHeart, faDonate } from "@fortawesome/free-solid-svg-icons";
import "./donation.css"

const Dashboard = () => {
  return (
    <div className="dashboard-wrapper">
      <header className="header">
        <div className="header-content">
          <div className="logo-container">
            <img
              src="https://i.ibb.co/qZzvg53/Whats-App-Image-2025-09-09-at-08-13-15-f871567f-removebg-preview.png"
              alt="Samadhan Setu Logo"
              className="logo-img"
            />
            <div className="logo">Samadhan Setu</div>
          </div>

          <div className="header-actions">
            <div className="language-selector" id="languageSelector">
              <button className="language-btn" id="languageBtn">
                <FontAwesomeIcon icon={faGlobe} />{" "}
                <span id="currentLang">English</span>{" "}
                <FontAwesomeIcon icon={faCaretDown} />
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
              <FontAwesomeIcon icon={faMoon} />
            </button>

            <div className="user-profile">
              <button className="profile-btn">
                <img
                  src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMTYiIGN5PSIxNiIgcj0iMTYiIGZpbGw9IiM2ZDlkZGYiLz4KPHBhdGggZD0iTTE2IDE3LjVDMTkuNTk4NiAxNy41IDIyLjUgMTQuNTk4NiAyMi41IDExQzIyLjUgNy40MDEzNyAxOS41OTg2IDQuNSAxNiA0LjVDMTIuNDAxNCA0LjUgOS41IDcuNDAxMzcgOS41IDExQzkuNSAxNC41OTg2IDEyLjQwMTQgMTcuNSAxNiAxNy41WiIgZmlsbD0id2hpdGUiLz4KPHBhdGggZD0iTTE2IDIwLjVDOS42NjQgMjAuNSA0LjUgMjUuNjY0IDQuNSAzMkgyNy41QzI3LjUgMjUuNjY0IDIyLjMzNiAyMC41IDE2IDIwLjVaIiBmaWxsPSJ3aGl0ZSIvPgo8L3N2Zz4K"
                  alt="User"
                  className="profile-img"
                />
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="dashboard">
        <div className="container">
          <div className="welcome-banner">
            <div className="user-info">
              <h1 data-i18n="reliefFundTitle">Relief Fund & Donation</h1>
              <p data-i18n="reliefFundDesc">
                Support natural causes and help communities in need through
                your contributions
              </p>
            </div>

            <div className="user-stats">
              <div className="stat-item">
                <div className="stat-value">₹12,500</div>
                <div className="stat-label" data-i18n="totalDonated">
                  Total Donated
                </div>
              </div>
              <div className="stat-item">
                <div className="stat-value">8</div>
                <div className="stat-label" data-i18n="causesSupported">
                  Causes Supported
                </div>
              </div>
              <div className="stat-item">
                <div className="stat-value">350</div>
                <div className="stat-label" data-i18n="impactPoints">
                  Impact Points
                </div>
              </div>
            </div>
          </div>

          <h2 className="section-title">
            <FontAwesomeIcon icon={faHandHoldingHeart} />{" "}
            <span data-i18n="activeCauses">Active Causes</span>
          </h2>

          <div className="causes-grid">
            {/* Cause Card 1 */}
            <div className="cause-card">
              <div className="cause-image">
                <img
                  src="https://tse1.mm.bing.net/th/id/OIP.sYGNDLlXHQ5PwZITg3PTRAAAAA?rs=1&pid=ImgDetMain&o=7&rm=3"
                  alt="Flood Relief"
                />
                <div className="cause-progress">
                  <div className="progress-bar" style={{ width: "65%" }}></div>
                </div>
              </div>
              <div className="cause-content">
                <h3 className="cause-title" data-i18n="floodReliefTitle">
                  Flood Relief in Assam
                </h3>
                <p className="cause-description" data-i18n="floodReliefDesc">
                  Support communities affected by recent floods with essential
                  supplies and rehabilitation.
                </p>
                <div className="cause-meta">
                  <span className="cause-raised">
                    ₹3.2L <span data-i18n="raised">raised</span>
                  </span>
                  <span className="cause-goal">
                    <span data-i18n="of">of</span> ₹5L{" "}
                    <span data-i18n="goal">goal</span>
                  </span>
                </div>
                <button
                  className="btn-donate"
                  data-cause="Flood Relief in Assam"
                >
                  <FontAwesomeIcon icon={faDonate} />{" "}
                  <span data-i18n="donateNow">Donate Now</span>
                </button>
              </div>
            </div>

            {/* Cause Card 2 */}
            <div className="cause-card">
              <div className="cause-image">
                <img
                  src="https://th.bing.com/th/id/OIP.p4gUY7yxlDKYT_ezNPShaQHaEV?w=344&h=180&c=7&r=0&o=7&pid=1.7&rm=3"
                  alt="Wildfire Recovery"
                />
                <div className="cause-progress">
                  <div className="progress-bar" style={{ width: "40%" }}></div>
                </div>
              </div>
              <div className="cause-content">
                <h3 className="cause-title" data-i18n="wildfireTitle">
                  Wildfire Recovery in Uttarakhand
                </h3>
                <p className="cause-description" data-i18n="wildfireDesc">
                  Help rebuild communities and restore forests affected by
                  devastating wildfires.
                </p>
                <div className="cause-meta">
                  <span className="cause-raised">
                    ₹1.8L <span data-i18n="raised">raised</span>
                  </span>
                  <span className="cause-goal">
                    <span data-i18n="of">of</span> ₹4.5L{" "}
                    <span data-i18n="goal">goal</span>
                  </span>
                </div>
                <button
                  className="btn-donate"
                  data-cause="Wildfire Recovery in Uttarakhand"
                >
                  <FontAwesomeIcon icon={faDonate} />{" "}
                  <span data-i18n="donateNow">Donate Now</span>
                </button>
              </div>
            </div>

            {/* Add more cause cards as needed */}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
