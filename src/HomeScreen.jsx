import React from 'react';
import Level1Screen from './Level1Screen'; // Level1Screenコンポーネントをインポート
import Level3Screen from './Level3Screen'; // Level3Screenコンポーネントをインポート

function HomeScreen(props) {
  const {
    screen,
    onNavigate,
    // Game screen props
    num4,
    num5,
    count,
    timeRemaining,
    inputValue,
    setInputValue,
    checkAnswer,
    result,
    // Help popup props
    showHelp,
    HelpPopup,
  } = props;

  // ボタンのスタイル
  const buttonStyle = {
    margin: '10px',
    padding: '10px 20px',
    fontSize: '16px',
    backgroundColor: '#f0f0f0',
    border: '1px solid #ccc',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.2s ease'
  };
  if (screen === 'home') {
    return (
      <>
        <div style={{ textAlign: 'center', marginTop: '100px' }}>
          <h1>インド式計算ゲーム</h1>
          <p>レベルを選択してください</p>
          <button
            onClick={() => onNavigate('level1')}
            style={buttonStyle}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#d0d0d0'}
            onMouseLeave={(e) => e.target.style.backgroundColor = '#f0f0f0'}
          >
            Level 1
            <p>⭐</p>
          </button>
          <button
            onClick={() => onNavigate('level2')}
            style={buttonStyle}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#d0d0d0'}
            onMouseLeave={(e) => e.target.style.backgroundColor = '#f0f0f0'}
          >
            Level 2
            <p>⭐⭐</p>
          </button>
          <button
            onClick={() => onNavigate('level3')}
            style={buttonStyle}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#d0d0d0'}
            onMouseLeave={(e) => e.target.style.backgroundColor = '#f0f0f0'}
          >
            Level 3
            <p>⭐⭐⭐</p>
          </button>
        </div>

        {/* CSSスタイルを追加 */}
        <style jsx>{`
          button:hover {
            background-color: #d0d0d0 !important;
          }
        `}</style>
      </>
    );
  }

  if (screen === 'level1') {
    return <Level1Screen onGoBack={() => onNavigate('home')} />;
  }

  if (screen === 'level3') {
    return (
      <>
        <Level3Screen onGoBack={() => onNavigate('home')} />
        {showHelp && HelpPopup && <HelpPopup level="level3" onClose={() => props.setShowHelp(false)} />}
      </>
    );
  }

  if (screen === 'level2') {
    // ゲーム画面のUI
    const progressBarContainerStyle = {
      width: '100%',
      height: '20px',
      backgroundColor: '#e0e0e0',
      borderRadius: '10px',
      overflow: 'hidden', // バーがはみ出ないように
      margin: '10px 0 20px 0' // 上下のマージン調整
    };

    const progressBarStyle = {
      height: '100%',
      width: `${(timeRemaining / 60) * 100}%`,
      backgroundColor: timeRemaining > 10 ? '#4caf50' : '#f44336', // 残り時間で色変更
      transition: 'width 0.5s linear' // スムーズなトランジション
    };

    return (
      <>
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
          <h1>レベル2 - インド式計算ゲーム</h1>
          <div style={{ maxWidth: '600px', margin: '20px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
            <p style={{ fontSize: '24px', fontWeight: 'bold', textAlign: 'center' }}>
              問題: {num4} × {num5} = ?
            </p>
            <p style={{ textAlign: 'center' }}>問題 {count + 1} / 5</p>
            <div>
              <p style={{ textAlign: 'center', marginBottom: '5px' }}>残り時間: {timeRemaining} 秒</p>
              <div style={progressBarContainerStyle}>
                <div style={progressBarStyle}></div>
              </div>
            </div>
            <div style={{ marginTop: '20px', textAlign: 'center' }}>
              <input 
                type="text" 
                value={inputValue} 
                onChange={(e) => setInputValue(e.target.value)} 
                onKeyDown={(e) => { if (e.key === 'Enter') { checkAnswer(); } }} 
                placeholder="答えを入力" 
                style={{ padding: '10px', fontSize: '18px', width: '150px', borderRadius: '5px', border: '1px solid #ccc', marginRight: '10px' }} 
              />
              <button onClick={checkAnswer} style={{ padding: '10px 15px', fontSize: '18px' }}>回答</button>
              {result && (
                <p style={{ marginTop: '15px', fontSize: '20px', fontWeight: 'bold', color: result === '正解！' ? '#4caf50' : '#f44336' }}>
                  {result}
                </p>
              )}
              <p style={{ fontSize: '0.8em', color: 'gray', marginTop: '20px' }}>ヒント: hキーでヘルプを表示</p>
            </div>
          </div>
          <button onClick={() => onNavigate('home')} style={{ marginTop: '30px', padding: '10px 20px' }}>ホームに戻る</button>
        </div>
        {showHelp && HelpPopup && <HelpPopup level="level2" onClose={() => props.setShowHelp(false)} />}
      </>
    );
  }

  return null; // 通常は到達しない
}

export default HomeScreen;