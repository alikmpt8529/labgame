import React from 'react';

function HelpPopup({ onClose, level }) {
  let helpTextContent = "インド式計算法の一般的な説明です。"; // デフォルト

  if (level === 'game') {
    helpTextContent = 'ゲーム画面のヘルプ：ここではゲームのルールや操作方法について説明します。';
  } else if (level === 'level3') {
    helpTextContent = 'Level 3 のヘルプ：Level 3 の問題に関するヒントや解き方を説明します。';
  }
  // 他のレベルやデフォルトのテキストが必要な場合は、適宜追加・修正してください。

  return (
    <div style={{
      position: 'fixed', top: '50%', left: '50%',
      transform: 'translate(-50%, -50%)', backgroundColor: 'white',
      padding: '20px', borderRadius: '10px',
      boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)', zIndex: 1000,
      color: '#333333', maxWidth: '80%', minWidth: '300px'
    }}>
      <h2 style={{ color: '#000000', borderBottom: '1px solid #ddd', paddingBottom: '8px' }}>ヘルプ</h2>
      <p style={{ fontSize: '16px', lineHeight: '1.5', marginBottom: '15px' }}>{helpTextContent}</p>
      <button onClick={onClose} style={{
        backgroundColor: '#4caf50', color: 'white', border: 'none',
        padding: '8px 16px', borderRadius: '4px', cursor: 'pointer', fontSize: '16px'
      }}>閉じる</button>
    </div>
  );
}

export default HelpPopup;