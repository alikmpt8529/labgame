import React, { useState } from 'react';

function HelpPopup({ onClose, level: initialLevel, isDarkMode }) {
  const [selectedLevel, setSelectedLevel] = useState(initialLevel || 'level1');

  const getHelpText = (level) => {
    switch (level) {
      case 'level1':
        return `Level 1 のヒント：基本的な問題の解き方や考え方を説明します。`;
      case 'level2':
        return `Level 2 のヒント：少し複雑な問題に対応するためのコツを紹介します。`;
      case 'level3':
        return `Level 3 のヒント：より高度な問題に関するヒントや解法を説明します。`;
      default:
        return 'ヘルプ情報が見つかりません。';
    }
  };

  const helpTextContent = getHelpText(selectedLevel);

  return (
    <div style={{
      position: 'fixed', 
      top: '50%', 
      left: '50%',
      transform: 'translate(-50%, -50%)', 
      backgroundColor: isDarkMode ? '#3c3c3c' : 'white',
      color: isDarkMode ? '#ffffff' : '#333333',
      padding: '20px', 
      borderRadius: '10px',
      boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)', 
      zIndex: 1000,
      maxWidth: '80%', 
      minWidth: '300px',
      border: isDarkMode ? '1px solid #555555' : '1px solid #ddd'
    }}>
      <h2 style={{ 
        color: isDarkMode ? '#ffffff' : '#000000', 
        borderBottom: isDarkMode ? '1px solid #555555' : '1px solid #ddd', 
        paddingBottom: '8px',
        marginTop: 0
      }}>
        ヒント(Hint)
      </h2>
      
      {/* レベル選択ボタン */}
      <div style={{ marginBottom: '15px' }}>
        <span style={{ 
          marginRight: '10px', 
          fontWeight: 'bold',
          color: isDarkMode ? '#ffffff' : '#000000'
        }}>
          レベル選択(Select Level):
        </span>
        {['level1', 'level2', 'level3'].map((lvl) => (
          <button
            key={lvl}
            onClick={() => setSelectedLevel(lvl)}
            style={{
              margin: '0 5px',
              padding: '6px 12px',
              backgroundColor: selectedLevel === lvl 
                ? '#2196f3' 
                : (isDarkMode ? '#555555' : '#e0e0e0'),
              color: selectedLevel === lvl 
                ? 'white' 
                : (isDarkMode ? '#ffffff' : 'black'),
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

      <p style={{ 
        fontSize: '16px', 
        lineHeight: '1.5', 
        marginBottom: '15px',
        color: isDarkMode ? '#ffffff' : '#333333'
      }}>
        {helpTextContent}
      </p>

      <button 
        onClick={onClose} 
        style={{
          backgroundColor: '#4caf50', 
          color: 'white', 
          border: 'none',
          padding: '8px 16px', 
          borderRadius: '4px', 
          cursor: 'pointer', 
          fontSize: '16px'
        }}
      >
        問題へ戻る(Return to qustion)
      </button>
    </div>
  );
}

export default HelpPopup;