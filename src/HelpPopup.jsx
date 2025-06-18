import React, { useState } from 'react';

function HelpPopup({ onClose, level: initialLevel, isDarkMode }) {
  const [selectedLevel, setSelectedLevel] = useState(initialLevel || 'level1');

  const getHelpText = (level) => {
    switch (level) {
      case 'level1':
        return `Level 1 のヒント：基本的な問題の解き方や考え方を説明します。`;
      case 'level2':
        return `Level 2 のヒント：`;
      case 'level3':
        return `Level 3 のヒント：より高度な問題に関するヒントや解法を説明します。`;
      default:
        return 'ヘルプ情報が見つかりません。';
    }
  };

  const getHelpImage = (level) => {
    switch (level) {
      case 'level1':
        return '/images/step0.png'; // Level1には画像なし
      case 'level2':
        return '/images/step5.png'; // publicフォルダ内のstep5.pngを参照
      case 'level3':
        return null; // Level3には画像なし（必要に応じて追加）
      default:
        return null;
    }
  };

  const helpTextContent = getHelpText(selectedLevel);
  const helpImageSrc = getHelpImage(selectedLevel);

  return (
    <div style={{
      position: 'fixed', 
      top: '50%', 
      left: '50%',
      transform: 'translate(-50%, -50%)', 
      backgroundColor: isDarkMode ? '#3c3c3c' : 'white',
      color: isDarkMode ? '#ffffff' : '#333333',
      padding: '30px', // パディングを増やす
      borderRadius: '10px',
      boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)', 
      zIndex: 1000,
      maxWidth: '85%', // 最大幅を少し広げる
      minWidth: '400px', // 最小幅を広げる
      maxHeight: '90vh', // 最大高さを90vhに拡大
      minHeight: '500px', // 最小高さを設定
      overflowY: 'auto', // スクロール対応
      border: isDarkMode ? '1px solid #555555' : '1px solid #ddd'
    }}>
      <h2 style={{ 
        color: isDarkMode ? '#ffffff' : '#000000', 
        borderBottom: isDarkMode ? '1px solid #555555' : '1px solid #ddd', 
        paddingBottom: '10px', // パディングを増やす
        marginTop: 0,
        marginBottom: '20px' // マージンを増やす
      }}>
        ヒント(Hint)
      </h2>
      
      {/* レベル選択ボタン */}
      <div style={{ marginBottom: '20px' }}> {/* マージンを増やす */}
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
              padding: '8px 16px', // パディングを増やす
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
        lineHeight: '1.6', // 行間を広げる
        marginBottom: '20px', // マージンを増やす
        color: isDarkMode ? '#ffffff' : '#333333'
      }}>
        {helpTextContent}
      </p>

      {/* 画像表示部分 */}
      {helpImageSrc && (
        <div style={{ 
          textAlign: 'center', 
          marginBottom: '20px', // マージンを増やす
          padding: '15px', // パディングを増やす
          backgroundColor: isDarkMode ? '#2a2a2a' : '#f9f9f9',
          borderRadius: '8px',
          border: isDarkMode ? '1px solid #555555' : '1px solid #e0e0e0',
          minHeight: '300px' // 画像エリアの最小高さを設定
        }}>
          <img 
            src={helpImageSrc} 
            alt={`${selectedLevel}のヒント画像`}
            style={{
              maxWidth: '100%',
              maxHeight: '400px', // 画像の最大高さを設定
              height: 'auto',
              borderRadius: '4px',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
            }}
            onError={(e) => {
              // 画像読み込みエラー時の処理
              e.target.style.display = 'none';
              console.error(`画像の読み込みに失敗しました: ${helpImageSrc}`);
            }}
          />
        </div>
      )}

      <button 
        onClick={onClose} 
        style={{
          backgroundColor: '#4caf50', 
          color: 'white', 
          border: 'none',
          padding: '12px 20px', // パディングを増やす
          borderRadius: '4px', 
          cursor: 'pointer', 
          fontSize: '16px',
          marginTop: '10px' // 上マージンを追加
        }}
      >
        問題へ戻る(Return to qustion)
      </button>
    </div>
  );
}

export default HelpPopup;