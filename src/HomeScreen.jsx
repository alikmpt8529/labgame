import React, { useEffect } from 'react';
import Level1Screen from './Level1Screen'; // Level1Screenコンポーネントをインポート
import Level3Screen from './Level3Screen'; // Level3Screenコンポーネントをインポート
import ResultPage from './ResultPage'; // ResultPageコンポーネントをインポート
import ResultPageB from './ResultPageB';
import ResultPageC from './ResultPageC';
import ResultPageD from './ResultPageD';

function HomeScreen(props) {
  const {
    screen,
    onNavigate,
    // Game screen props
    num4,
    num5,
    count,
    timeRemaining, // 表示用（整数）
    progressTime,  // プログレスバー用（小数点あり）
    inputValue,
    setInputValue,
    checkAnswer,
    result,
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
      <p style={{ fontSize: '0.8em', color: 'gray', marginTop: '20px' }}>
        ヒント: hキーでヘルプを表示
      </p>
        {showHelp && HelpPopup && <HelpPopup level="level1" onClose={() => setShowHelp(false)} />} {/* ホーム画面でもヘルプ表示可能に */}
      </div>
    );
  }

  if (screen === 'level1') {
    return <Level1Screen onGoBack={() => onNavigate('home')} />;
  }

  if (screen === 'level3') {
    return (
      <>
        <Level3Screen onGoBack={() => onNavigate('home')} onGoForward={(page) => onNavigate(page)} />
        {showHelp && HelpPopup && <HelpPopup level="level3" onClose={() => setShowHelp(false)} />} {/* Level 3 ヘルプ */}
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
      overflow: 'hidden',
      margin: '10px 0 20px 0'
    };

    const progressBarStyle = {
      height: '100%',
      width: `${(progressTime / 60) * 100}%`, // progressTimeを使用
      backgroundColor: progressTime > 10 ? '#4caf50' : '#f44336', // progressTimeで色判定
      transition: 'width 0.1s linear' // 100ms更新に対応
    };

    return (
      <>
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
          <h1>レベル2 - インド式計算ゲーム</h1>
          <div style={{ maxWidth: '600px', margin: '20px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
            <p style={{ fontSize: '24px', fontWeight: 'bold', textAlign: 'center' }}>
              問題: {num4} × {num5} = 
              <input 
                type="text" 
                value={inputValue} 
                onChange={(e) => setInputValue(e.target.value)} 
                onKeyDown={(e) => { if (e.key === 'Enter') { checkAnswer(); } }} 
                placeholder="答えを入力" 
                style={{ padding: '10px', fontSize: '18px', width: '150px', borderRadius: '5px', border: '1px solid #ccc', marginRight: '10px' }} 
              />
            </p>
            <p style={{ textAlign: 'center' }}>問題 {count + 1} / 5</p>
            <div>
              
              <p style={{ 
                textAlign: 'center', 
                marginBottom: '5px',
                color: showHelp ? '#999' : '#000'
              }}>
                残り時間: {timeRemaining} 秒 {showHelp && '(一時停止中)'}
              </p>
              <div style={progressBarContainerStyle}>
                <div style={progressBarStyle}></div>
              </div>
            </div>
            <div style={{ marginTop: '20px', textAlign: 'center' }}>
              
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
        {showHelp && HelpPopup && <HelpPopup level="level2" onClose={() => setShowHelp(false)} />}
      </>
    );
  }

  if (screen === 'result') {
    return <ResultPage onGoBack={() => onNavigate('home')} />;
  }

  if (screen === 'resultB') {
    return <ResultPageB onGoBack={() => onNavigate('home')} />;
  }

  if (screen === 'resultC') {
    return <ResultPageC onGoBack={() => onNavigate('home')} />;
  }

  if (screen === 'resultD') {
    return <ResultPageD onGoBack={() => onNavigate('home')} />;
  }

  return null; // 通常は到達しない
}

export default HomeScreen;