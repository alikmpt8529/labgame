import React, { useState } from 'react';

function HelpPopup({ onClose, level: initialLevel, isDarkMode }) {
  const [selectedLevel, setSelectedLevel] = useState(initialLevel || 'level1');
  const [imageIndex, setImageIndex] = useState(0); // 画像切り替え用のstate

  const getHelpText = (level) => {
    switch (level) {
      case 'level1':
        return `十の位の数が同じで、一の位の数の和が10になる2桁の数同士のかけ算は、以下のように考えられます。
      (Multiplication of two-digit numbers with the same number in the tens place and a sum of 10 in the ones place can be considered as follows.)
      
      (十の位の数) × (十の位の数 + 1) … 上位桁
      (number of decimal places) × (number of decimal places + 1) ... Upper Digits

      (一の位の数) × (もう一方の一の位の数) … 下位桁
      (number of first places) × (number of the other first place) ... Lower Digit

      図で構造を整理しよう！
      Let's organize the structure with diagrams!`;

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
      Let's organize the structure with diagrams!`;
      default:
        return 'ヘルプ情報が見つかりません。';
    }
  };

  // 各レベルで2つの画像を用意
  const getHelpImages = (level) => {
    try {
      switch (level) {
        case 'level1':
          return [
            '/images/step0.png',
            '/images/step4.png' // 2つ目の画像
          ];
        case 'level2':
          return [
            '/images/step5.png',
            '/images/level2-hint2.png' // 2つ目の画像
          ];
        case 'level3':
          return [
            '/images/l3tips.png',
            '/images/level3-hint2.png' // 2つ目の画像
          ];
        default:
          return [];
      }
    } catch (error) {
      console.error('画像パス生成エラー:', error);
      return [];
    }
  };

  const helpTextContent = getHelpText(selectedLevel);
  const helpImages = getHelpImages(selectedLevel);
  const currentImage = helpImages[imageIndex];

  // レベル切り替え時に画像インデックスをリセット
  React.useEffect(() => {
    setImageIndex(0);
  }, [selectedLevel]);

  // 画像が存在しない場合のフォールバック用プレースホルダー画像を作成
  const createPlaceholderImage = (level, index) => {
    const canvas = document.createElement('canvas');
    canvas.width = 400;
    canvas.height = 300;
    const ctx = canvas.getContext('2d');

    // 背景
    ctx.fillStyle = isDarkMode ? '#2a2a2a' : '#f0f0f0';
    ctx.fillRect(0, 0, 400, 300);

    // テキスト
    ctx.fillStyle = isDarkMode ? '#ffffff' : '#333333';
    ctx.font = '20px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(`${level} ヒント画像 ${index + 1}`, 200, 140);
    ctx.fillText('(画像を準備中)', 200, 170);

    return canvas.toDataURL();
  };

  return (
    <div style={{
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      backgroundColor: isDarkMode ? '#3c3c3c' : 'white',
      color: isDarkMode ? '#ffffff' : '#333333',
      padding: '30px',
      borderRadius: '10px',
      boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)',
      zIndex: 1000,
      maxWidth: '95%',
      minWidth: '600px',
      width: '80vw',
      maxHeight: '90vh',
      minHeight: '500px',
      overflowY: 'auto',
      border: isDarkMode ? '1px solid #555555' : '1px solid #ddd'
    }}>
      <h2 style={{
        color: isDarkMode ? '#ffffff' : '#000000',
        borderBottom: isDarkMode ? '1px solid #555555' : '1px solid #ddd',
        paddingBottom: '10px',
        marginTop: 0,
        marginBottom: '20px'
      }}>
        ヒント(Hint)(タイマー停止中(Timer stopped)):
      </h2>

      {/* レベル選択ボタン */}
      <div style={{ marginBottom: '20px' }}>
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
              padding: '8px 16px',
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

      {/* 画像切り替えボタン */}
      {helpImages.length > 1 && (
        <div style={{ marginBottom: '15px', textAlign: 'center' }}>
          <span style={{
            marginRight: '10px',
            fontWeight: 'bold',
            color: isDarkMode ? '#ffffff' : '#000000'
          }}>
            画像切り替え(Switch Image):
          </span>
          {helpImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setImageIndex(index)}
              style={{
                margin: '0 5px',
                padding: '6px 12px',
                backgroundColor: imageIndex === index
                  ? '#ff9800'
                  : (isDarkMode ? '#555555' : '#e0e0e0'),
                color: imageIndex === index
                  ? 'white'
                  : (isDarkMode ? '#ffffff' : 'black'),
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '12px'
              }}
            >
              画像 {index + 1}
            </button>
          ))}
        </div>
      )}

      {/* テキスト内容を改行対応で表示 */}
      <div style={{
        fontSize: '16px',
        lineHeight: '1.8',
        marginBottom: '20px',
        color: isDarkMode ? '#ffffff' : '#333333',
        whiteSpace: 'pre-wrap',
        fontFamily: '"Courier New", monospace, sans-serif',
        backgroundColor: isDarkMode ? '#2a2a2a' : '#f8f8f8',
        padding: '15px',
        borderRadius: '8px',
        border: isDarkMode ? '1px solid #555555' : '1px solid #e0e0e0'
      }}>
        {helpTextContent}
      </div>

      {/* 画像表示部分 */}
      <div style={{
        textAlign: 'center',
        marginBottom: '20px',
        padding: '15px',
        backgroundColor: isDarkMode ? '#2a2a2a' : '#f9f9f9',
        borderRadius: '8px',
        border: isDarkMode ? '1px solid #555555' : '1px solid #e0e0e0',
        minHeight: '300px'
      }}>
        <img
          src={currentImage || createPlaceholderImage(selectedLevel, imageIndex)}
          alt={`${selectedLevel}のヒント画像 ${imageIndex + 1}`}
          style={{
            maxWidth: '100%',
            maxHeight: '400px',
            height: 'auto',
            borderRadius: '4px',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
          }}
          onError={(e) => {
            // 画像読み込みエラー時にプレースホルダーを表示
            console.log('画像読み込み失敗、プレースホルダーを表示');
            e.target.src = createPlaceholderImage(selectedLevel, imageIndex);
          }}
          onLoad={() => {
            console.log(`画像読み込み成功: ${currentImage}`);
          }}
        />

        {/* ファイル配置の説明 */}
        <div style={{
          marginTop: '10px',
          fontSize: '12px',
          color: isDarkMode ? '#888888' : '#666666',
          textAlign: 'left'
        }}>

        </div>
      </div>

      <button
        onClick={onClose}
        style={{
          backgroundColor: '#4caf50',
          color: 'white',
          border: 'none',
          padding: '12px 20px',
          borderRadius: '4px',
          cursor: 'pointer',
          fontSize: '16px',
          marginTop: '10px'
        }}
      >
        問題へ戻る(Return to question)
      </button>
    </div>
  );
}

export default HelpPopup;