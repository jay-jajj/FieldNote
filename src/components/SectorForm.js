import React, { useState, useEffect } from 'react';
import styles from '../css/SectorForm.module.css';

export default function SectorForm() {
//sector 종료후 기본적으로 적어야 하는 정보
  const [date, setDate] = useState('');
  const [sectorName, setSectorName] = useState('');
  const [location, setLocation] = useState('');
  const [members, setMembers] = useState([{ name: '', count: '' }]);
  const [donors40plus, setDonors40plus] = useState('');

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0]; // 날짜 자동입력
    setDate(today);
  }, []);

  //섹터원 정보 input에 입력할때 저장하는 함수
  const handleMemberChange = (index, field, value) => {
    const updated = [...members];
    updated[index][field] = value;
    setMembers(updated);
  };
  //입력칸 추가
  const addMember = () => {
    setMembers([...members, { name: '', count: '' }]);
  };
  //입력칸 제거
  const deleteMember = (index) =>{
    let editedMembers = members.splice(index)
    setMembers(editedMembers)
  }

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
          className={styles.baseInput}
          type="text"
          placeholder="섹터명을 입력해주세요"
          value={sectorName}
          onChange={(e) => setSectorName(e.target.value)}
        />

        <label>Location</label>
        <div className={styles.locationRow}>
          <input
            type="text"
            placeholder="아이콘을 클릭하여 위치값을 입력해주세요"
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
              placeholder="이름"
              value={member.name}
              onChange={(e) => handleMemberChange(idx, 'name', e.target.value)}
            />
            <input
              type="number"
              placeholder="세일즈 개수"
              value={member.count}
              onChange={(e) => handleMemberChange(idx, 'count', e.target.value)}
            />
            {idx != 0 ?  <span onClick={(e)=>deleteMember(idx)}>❌</span> : ""}
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
          placeholder="40대이상 후원자수"
        />
      </div>

      <button type="submit" className={styles.submitBtn}>
        Save
      </button>
    </form>
  );
}