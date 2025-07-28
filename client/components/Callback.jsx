'use client';

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import axios from 'axios';
import * as jose from 'jose';

const Callback = () => {
  const [userInfo, setUserInfo] = useState(null);
  const searchParams = useSearchParams();

  useEffect(() => {
    const fetchToken = async (code) => {
      try {
        const response = await axios.post('http://localhost:5000/api/token', { code });

        const { access_token } = response.data;
        console.log("Access token:", access_token);

        const userInfoResponse = await axios.post("http://localhost:5000/api/userinfo/", {
          access_token
        });

        console.log("User info response:", userInfoResponse.data);
        const decodedUserInfo = await decodeUserInfoResponse(userInfoResponse.data);
        console.log("Decoded user info:", decodedUserInfo);

        setUserInfo(decodedUserInfo);
      } catch (error) {
        console.error('Error fetching token or user info:', error);
      }
    };

    const code = searchParams.get('code');
    if (code) fetchToken(code);
  }, [searchParams]);

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>
          <img src="/national-id-logo.png" alt="Logo" width="50" height="50" style={{ marginRight: '15px' }} />
          Fayda Mock Relying Party - User Info
        </h1>
      </header>

      <main style={styles.main}>
        {userInfo ? (
          <div style={styles.card}>
            <div style={styles.cardBody}>
              <h5 style={styles.cardTitle}>User Information</h5>
              <ul style={styles.list}>
                <InfoItem label="Name" value={userInfo.name} />
                <InfoItem label="Email" value={userInfo.email} />
                <InfoItem label="Gender" value={userInfo.gender} />
                <InfoItem label="Phone" value={userInfo.phone_number} />
                <InfoItem label="Nationality" value={userInfo.nationality} />
                <InfoItem label="Date of Birth" value={userInfo.birthdate} />
                <InfoItem
                  label="Address"
                  value={
                    userInfo.address
                      ? `${userInfo.address.zone}, ${userInfo.address.woreda}, ${userInfo.address.region}`
                      : 'N/A'
                  }
                />
                {userInfo.picture && (
                  <li style={styles.listItem}>
                    <img
                      src={userInfo.picture}
                      alt="User"
                      width="150"
                      style={{ borderRadius: '50%', border: '3px solid #f8c94e', padding: '5px' }}
                    />
                  </li>
                )}
              </ul>
            </div>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </main>

      <footer style={styles.footer}>
        <p>&copy; 2025 National ID. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

const InfoItem = ({ label, value }) => (
  <li style={styles.listItem}>
    <strong>{label}:</strong> {value || 'N/A'}
  </li>
);

const decodeUserInfoResponse = async (userinfoJwtToken) => {
  try {
    return jose.decodeJwt(userinfoJwtToken);
  } catch (error) {
    console.error('Error decoding JWT user info:', error);
    return null;
  }
};

export default Callback;

// --- 💅 Inline Styles
const styles = {
  container: {
    backgroundColor: '#1a1a2e',
    color: 'white',
    minHeight: '100vh',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  header: {
    backgroundColor: '#0f3460',
    padding: '15px',
    width: '100%',
    textAlign: 'center',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
  },
  title: {
    color: '#f8c94e',
    fontSize: '1.75rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  main: {
    marginTop: '50px',
    width: '100%',
    maxWidth: '900px',
    textAlign: 'center'
  },
  card: {
    backgroundColor: '#162447',
    borderRadius: '15px',
    boxShadow: '0 10px 20px rgba(0, 0, 0, 0.3)',
    border: 'none',
    marginBottom: '30px'
  },
  cardBody: {
    padding: '30px'
  },
  cardTitle: {
    color: '#f8c94e',
    fontWeight: 600
  },
  list: {
    listStyle: 'none',
    padding: 0
  },
  listItem: {
    backgroundColor: '#0f3460',
    borderColor: '#f8c94e',
    color: 'white',
    textAlign: 'left',
    padding: '10px 20px',
    borderBottom: '1px solid #f8c94e'
  },
  footer: {
    backgroundColor: '#0f3460',
    marginTop: 'auto',
    padding: '20px 0',
    borderTop: '2px solid #f8c94e',
    width: '100%',
    textAlign: 'center'
  }
};
