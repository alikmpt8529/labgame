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

  if (screen === 'home') {
    return (
      <div style={{ textAlign: 'center', marginTop: '100px' }}>
        <h1>インド式計算ゲーム</h1>
        <button onClick={() => onNavigate('level1')} style={{ margin: '10px', padding: '10px 20px', fontSize: '16px' }}>
          Level 1
        </button>
        <button onClick={() => onNavigate('level2')} style={{ margin: '10px', padding: '10px 20px', fontSize: '16px' }}>
          Level 2
        </button>
        <button onClick={() => onNavigate('level3')} style={{ margin: '10px', padding: '10px 20px', fontSize: '16px' }}>
          Level 3
        </button>
      </div>
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