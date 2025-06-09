import React from 'react';
import Level1Screen from './Level1Screen';
import Level3Screen from './Level3Screen';

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
        {showHelp && HelpPopup && <HelpPopup level="level3" onClose={() => setShowHelp(false)} />}
      </>
    );
  }

  return null;
}

export default HomeScreen;