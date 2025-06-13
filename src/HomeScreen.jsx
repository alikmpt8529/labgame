import React, { useEffect } from 'react';
import Level1Screen from './Level1Screen'; // Level1Screenコンポーネントをインポート
import Level3Screen from './Level3Screen'; // Level3Screenコンポーネントをインポート
import ResultPage from './ResultPage'; // ResultPageコンポーネントをインポート

function HomeScreen(props) {
  const {
    screen,
    onNavigate,
    // Help popup props
    showHelp,
    setShowHelp,
    HelpPopup,
  } = props;

  useEffect(() => {
    if (screen === 'home') {
      setShowHelp(false);
    }
  }, [screen, setShowHelp]);

  // ホーム画面で h キーを押すとヘルプを表示
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (screen === 'home' && event.key === 'h') {
        setShowHelp(true); // ホーム画面で h キーでヘルプ表示
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [screen, setShowHelp]);

  if (screen === 'home') {
    return (
      <div style={{ textAlign: 'center', marginTop: '100px' }}>
        <h1>インド式計算ゲーム</h1>
        <p>Indian calculation game</p>
        <h2>レベルを選択してください</h2>
        <p>Please select a level.</p>
        <button onClick={() => onNavigate('level1')} style={{ margin: '10px', padding: '10px 20px', fontSize: '16px' }}>
          Level 1
        </button>
        <button onClick={() => onNavigate('level2')} style={{ margin: '10px', padding: '10px 20px', fontSize: '16px' }}>
          Level 2
        </button>
        <button onClick={() => onNavigate('level3')} style={{ margin: '10px', padding: '10px 20px', fontSize: '16px' }}>
          Level 3
        </button>
        {/* ホーム画面でもヒントキーの案内を表示 */}
        
        {showHelp && HelpPopup && <HelpPopup level="level1" onClose={() => setShowHelp(false)} />}
      </div>
    );
  }

  if (screen === 'level1') {
    return <Level1Screen onGoBack={() => onNavigate('home')} />;
  }

  if (screen === 'level3') {
    return (
      <>
        <Level3Screen onGoBack={() => onNavigate('home')} onGoForward={() => onNavigate('result')} />
        {showHelp && HelpPopup && <HelpPopup level="level3" onClose={() => setShowHelp(false)} />}
      </>
    );
  }

  if (screen === 'result') {
    return <ResultPage onGoBack={() => onNavigate('home')} />;
  }

  return null; // 通常は到達しない
}

export default HomeScreen;