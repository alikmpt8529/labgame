import React, { useState } from 'react';

function HelpPopup({ onClose, level: initialLevel }) {
  const [selectedLevel, setSelectedLevel] = useState(initialLevel || 'level1');

  const getHelpText = (level) => {
    switch (level) {
      case 'level1':
        return 'Level 1 のヘルプ：基本的な問題の解き方や考え方を説明します。';
      case 'level2':
        return 'Level 2 のヘルプ：少し複雑な問題に対応するためのコツを紹介します。';
      case 'level3':
        return 'Level 3 のヘルプ：より高度な問題に関するヒントや解法を説明します。';
      default:
        return 'ヘルプ情報が見つかりません。';
    }
  };

  const helpTextContent = getHelpText(selectedLevel);

  return (
    <div style={{
      position: 'fixed', top: '50%', left: '50%',
      transform: 'translate(-50%, -50%)', backgroundColor: 'white',
      padding: '20px', borderRadius: '10px',
      boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)', zIndex: 1000,
      color: '#333333', maxWidth: '80%', minWidth: '300px'
    }}>
      <h2 style={{ color: '#000000', borderBottom: '1px solid #ddd', paddingBottom: '8px' }}>ヘルプ</h2>

      {/* レベル選択ボタン */}
      <div style={{ marginBottom: '15px' }}>
        <span style={{ marginRight: '10px', fontWeight: 'bold' }}>レベル選択:</span>
        {['level1', 'level2', 'level3'].map((lvl) => (
          <button
            key={lvl}
            onClick={() => setSelectedLevel(lvl)}
            style={{
              margin: '0 5px',
              padding: '6px 12px',
              backgroundColor: selectedLevel === lvl ? '#2196f3' : '#e0e0e0',
              color: selectedLevel === lvl ? 'white' : 'black',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '14px'
            }}
          >
            {lvl === 'level1' ? 'レベル1' : lvl === 'level2' ? 'レベル2' : 'レベル3'}
          </button>
        ))}
      </div>

      <p style={{ fontSize: '16px', lineHeight: '1.5', marginBottom: '15px' }}>{helpTextContent}</p>

      <button onClick={onClose} style={{
        backgroundColor: '#4caf50', color: 'white', border: 'none',
        padding: '8px 16px', borderRadius: '4px', cursor: 'pointer', fontSize: '16px'
      }}>閉じる</button>
    </div>
  );
}

export default HelpPopup;