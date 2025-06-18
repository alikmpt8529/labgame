import React, { useState } from 'react';

function HelpPopup({ onClose, level: initialLevel, isDarkMode }) {
  const [selectedLevel, setSelectedLevel] = useState(initialLevel || 'level1');

  const getHelpText = (level) => {
    switch (level) {
      case 'level1':
        return `Level 1 のヒント：基本的な問題の解き方や考え方を説明します。`;
      case 'level2':
        return `十の位の数が同じだけの時は以下のように考えられます。

(When the number of decimal places is the same, it is considered as follows.)

{(一方の数)+(他方の数の一の位)}×(十の位の数×10)+(一の位の数の積)

{(one number) + (first place of the other number)} x (number of tenth places x 10) + (product of the number of first places)

図で構造を整理しよう！
Let's organize the structure with diagrams!`;
      case 'level3':
        return `十の位の数の和が10で、１の位の数が同じ場合は以下のように考えられます。
      (When the sum of the numbers in the tens place is 10 and the numbers in the ones place are the same, it is considered as follows.)
      {(一方の10の位の数)×(他方の10の位の数)}＋(共通の1のくらいの数)×100+(一の位の数の積)
      {(one number in the tens place) x (the other number in the tens place)} + (common number in the ones place) x 100 + (product of the number in the ones place)
      図で構造を整理しよう！
      Let's organize the structure with diagrams!`
      ;
      default:
        return 'ヘルプ情報が見つかりません。';
    }
  };

  const getHelpImage = (level) => {
    switch (level) {
      case 'level1':
        return '/images/step0.png'; // 先頭の./を/に変更
      case 'level2':
        return '/images/step5.png'; // 先頭の./を/に変更
      case 'level3':
        return '/images/l3tips.png'; // 先頭の./を/に変更
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

      {/* テキスト内容を改行対応で表示 */}
      <div style={{ 
        fontSize: '16px', 
        lineHeight: '1.8', // 行間をさらに広げる
        marginBottom: '20px',
        color: isDarkMode ? '#ffffff' : '#333333',
        whiteSpace: 'pre-wrap', // pre-lineからpre-wrapに変更
        fontFamily: '"Courier New", monospace, sans-serif', // より見やすいフォント
        backgroundColor: isDarkMode ? '#2a2a2a' : '#f8f8f8', // 背景色を追加
        padding: '15px', // パディングを追加
        borderRadius: '8px', // 角を丸くする
        border: isDarkMode ? '1px solid #555555' : '1px solid #e0e0e0'
      }}>
        {helpTextContent}
      </div>

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
              e.target.parentNode.innerHTML = `
                <div style="
                  padding: 20px; 
                  color: ${isDarkMode ? '#ff6b6b' : '#d32f2f'}; 
                  text-align: center;
                  border: 2px dashed ${isDarkMode ? '#555555' : '#cccccc'};
                  border-radius: 8px;
                ">
                  画像を読み込めませんでした<br/>
                  Image failed to load: ${helpImageSrc}
                </div>
              `;
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