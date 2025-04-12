import React, { useState, useEffect } from 'react';
import styles from '../css/SectorForm.module.css';

export default function SectorForm() {
  const [date, setDate] = useState('');
  const [sectorName, setSectorName] = useState('');
  const [location, setLocation] = useState('');
  const [members, setMembers] = useState([{ name: '', count: '' }]);
  const [donors40plus, setDonors40plus] = useState('');

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    setDate(today);
  }, []);

  const handleMemberChange = (index, field, value) => {
    const updated = [...members];
    updated[index][field] = value;
    setMembers(updated);
  };

  const addMember = () => {
    setMembers([...members, { name: '', count: '' }]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      date,
      sectorName,
      location,
      members,
      donors40plus,
    };
    console.log('Form Submitted:', formData);
    // TODO: Google Sheets 연동
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h1 className={styles.title}>Sector Management</h1>

      <div className={styles.card}>
        <label>Date</label>
        <div className={styles.staticText}>{date}</div>

        <label>Sector Name</label>
        <input
          type="text"
          placeholder="Enter sector name"
          value={sectorName}
          onChange={(e) => setSectorName(e.target.value)}
        />

        <label>Location</label>
        <div className={styles.locationRow}>
          <input
            type="text"
            placeholder="Search or select location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <span className={styles.mapIcon}>📍</span>
        </div>
      </div>

      <div className={styles.section}>
        <label className={styles.sectionTitle}>Members</label>
        {members.map((member, idx) => (
          <div key={idx} className={styles.memberRow}>
            <input
              type="text"
              placeholder="Name"
              value={member.name}
              onChange={(e) => handleMemberChange(idx, 'name', e.target.value)}
            />
            <input
              type="number"
              placeholder="Sales Count"
              value={member.count}
              onChange={(e) => handleMemberChange(idx, 'count', e.target.value)}
            />
          </div>
        ))}
        <button type="button" className={styles.addBtn} onClick={addMember}>
          + Add Member
        </button>
      </div>

      <div className={styles.section}>
        <label className={styles.sectionTitle}>Donors Aged 40+</label>
        <input
          type="number"
          value={donors40plus}
          onChange={(e) => setDonors40plus(e.target.value)}
          placeholder="Number"
        />
      </div>

      <button type="submit" className={styles.submitBtn}>
        Save
      </button>
    </form>
  );
}