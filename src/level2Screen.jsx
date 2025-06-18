import { useState, useRef, useEffect } from 'react'
import './App.css'
//ここより下はアプリ内部の挙動を別スクリプトに分離するためのインポート部分
import HomeScreen from './HomeScreen'; // HomeScreenコンポーネントをインポート
import OriginalHelpPopup from './HelpPopup'; // HelpPopupコンポーネントをインポート（名前を変更）

// 問題タイプ定数
const QUESTION_TYPE_SAME_TENS_UNITS_SUM_10 = 'SAME_TENS_UNITS_SUM_10'; // 十の位が同じ、一の位の和が10
const QUESTION_TYPE_SAME_TENS_DIFFERENT_UNITS = 'SAME_TENS_DIFFERENT_UNITS'; // 十の位が同じ、一の位が異なる

// Level2画面コンポーネント
function Level2Screen({
  num4,
  num5,
  count,
  timeRemaining,
  progressTime,
  inputValue,
  setInputValue,
  checkAnswer,
  result,
  showHelp,
  setShowHelp,
  onGoBack,
  HelpPopup
}) {
  // システムの色設定を検出
  const [isDarkMode, setIsDarkMode] = useState(
    window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e) => setIsDarkMode(e.matches);
    
    mediaQuery.addListener(handleChange);
    return () => mediaQuery.removeListener(handleChange);
  }, []);

  // Level2用の入力制御関数
  const handleLevel2InputChange = (e) => {
    const value = e.target.value;
    // 数字のみを許可（空文字も許可）
    if (value === '' || /^\d+$/.test(value)) {
      setInputValue(value);
    }
  };

  // Level2用のキーボード入力処理
  const handleLevel2KeyDown = (e) => {
    if (e.key === 'Enter' && inputValue.trim() !== '') {
      checkAnswer();
    }
    // 数字、Backspace、Delete、Arrow keys、Tabのみ許可
    if (!/[\d]/.test(e.key) && 
        !['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab', 'Enter'].includes(e.key)) {
      e.preventDefault();
    }
  };

  // Level3と同じプログレスバースタイル
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
    width: `${(progressTime / 60) * 100}%`,
    backgroundColor: progressTime > 10 ? '#4caf50' : '#f44336', 
    transition: 'width 0.1s linear' // Level3の滑らかな更新を維持
  };

  return (
    <>
      <div className={`game-container ${showHelp ? 'popup-active' : ''}`} style={{ 
        color: isDarkMode ? '#ffffff' : '#000000',
        backgroundColor: isDarkMode ? '#2d2d30' : '#ffffff',
      }}>
        <h1 className="game-title" style={{ color: isDarkMode ? '#ffffff' : '#000000' }}>
          level2
        </h1>
        <div className="game-main-content" style={{ 
          border: isDarkMode ? '1px solid #555555' : '1px solid #cccccc',
          boxShadow: isDarkMode 
            ? '0 2px 4px rgba(0,0,0,0.3)' 
            : '0 2px 4px rgba(0,0,0,0.1)',
          backgroundColor: isDarkMode ? '#3c3c3c' : '#ffffff'
        }}>
          <h3 className={`game-timer level2-timer ${showHelp ? 'help-active' : ''} ${isDarkMode ? 'dark-theme' : 'light-theme'}`} style={{
            color: isDarkMode ? '#ffffff' : '#000000'
          }}>
              残り時間(remaining time): {timeRemaining}  {showHelp && '(一時停止中)'}
            </h3>
          {/* 問題表示 */}
          <p className={`game-question level2-question ${isDarkMode ? 'dark-theme' : 'light-theme'}`}>
            問題(Question): {num4} × {num5} = 
            <input 
              type="text" 
              value={inputValue} 
              onChange={handleLevel2InputChange}
              onKeyDown={handleLevel2KeyDown}
              placeholder="答えを入力" 
              disabled={showHelp}
              autoFocus={!showHelp}
              className={`game-input level2-input ${showHelp ? 'level2-input-disabled' : ''} ${isDarkMode ? 'dark-theme' : 'light-theme'}`}
            />
          </p>
          
          <p className={`game-counter level2-counter ${isDarkMode ? 'dark-theme' : 'light-theme'}`}>
            now {count + 1} / 5
          </p>
          <div>
            
            <div className="game-progress-container" style={progressBarContainerStyle}>
              <div style={progressBarStyle}></div>
            </div>
          </div>
          
          <div className="game-input-section">
            {result && (
              <p className="game-result" style={{ 
                color: result === '正解！' 
                  ? (isDarkMode ? '#ff6b6b' : '#d32f2f')
                  : (isDarkMode ? '#4dabf7' : '#1976d2')
              }}>
                {result}
              </p>
            )}
            
            <p className="game-hint" style={{ 
              color: isDarkMode ? '#cccccc' : '#666666'
            }}>
              ヒント: hキーで表示(Hint: Press the h key to display.) | Enterキーで回答(Press the Enter key to answer.)
            </p>
          </div>
        </div>
        
        <button 
          onClick={onGoBack} 
          className="game-retry-button"
        >
          ホームに戻る(return to home)
        </button>
      </div>
      
      {/* ポップアップを最前面に表示 */}
      {showHelp && HelpPopup && (
        <div className="help-popup">
          <div className={`help-popup-content ${isDarkMode ? 'dark' : ''}`}>
            <HelpPopup level="level2" onClose={() => setShowHelp(false)} />
          </div>
        </div>
      )}
    </>
  );
}

// 以下のAppコンポーネントは既存のコードと同じ
function App() {
  // 画面状態: 'home', 'game', 'level1', 'level2', 'level3', 'result', 'resultB', 'resultC', 'resultD'
  const [screen, setScreen] = useState('home')
  const [count, setCount] = useState(0)
  const [inputValue, setInputValue] = useState('')
  const [num4, setNum4] = useState(0);
  const [num5, setNum5] = useState(0);
  const [result, setResult] = useState(null)
  const [showHelp, setShowHelp] = useState(false); // 初期状態でヒント非表示
  const [helpLevel, setHelpLevel] = useState('level1'); // 表示するヒントのレベル
  const [timeRemaining, setTimeRemaining] = useState(60) // 表示用（整数）
  const [progressTime, setProgressTime] = useState(60) // プログレスバー用（小数点あり）
  const [timeSpent, setTimeSpent] = useState(0);　//経過時間（秒）
  const timerIdRef = useRef(null)
  const progressTimerIdRef = useRef(null) // プログレスバー用タイマー

  const [questionSequence, setQuestionSequence] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  // 画面がlevel2に切り替わったタイミングでヒント表示＆レベル2設定
  useEffect(() => {
    if (screen === 'level2') {
      setHelpLevel('level2');  // ヒントレベルを2に設定
      setShowHelp(true);       // ヒント表示ON
      initializeQuestionSequence();
    }
  }, [screen]);

  // hキーでのヘルプ表示
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (screen === 'level2' && event.key === 'h') {
        setHelpLevel('level2'); // 現在のレベルをヒントレベルに
        setShowHelp(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [screen]);

  // タイマー管理（1秒間隔 - 表示用）
  useEffect(() => {
    if (screen === 'level2' && !showHelp) { // ヒント表示中はタイマーを止める
      if (timerIdRef.current) {
        clearInterval(timerIdRef.current);
      }
      timerIdRef.current = setInterval(() => {
        setTimeRemaining(prevTime => {
          if (prevTime <= 1) {
            clearInterval(timerIdRef.current);
            if (progressTimerIdRef.current) {
              clearInterval(progressTimerIdRef.current);
            }
            setScreen('home'); // 時間切れでホームへ
            alert('時間切れです！');
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000); // 1秒間隔
    } else {
      if (timerIdRef.current) {
        clearInterval(timerIdRef.current);
      }
    }
    return () => {
      if (timerIdRef.current) {
        clearInterval(timerIdRef.current);
      }
    };
  }, [screen, showHelp]);

  // プログレスバー用タイマー管理（100ms間隔）
  useEffect(() => {
    if (screen === 'level2' && !showHelp) { // ヒント表示中はタイマーを止める
      if (progressTimerIdRef.current) {
        clearInterval(progressTimerIdRef.current);
      }
      progressTimerIdRef.current = setInterval(() => {
        setProgressTime(prevTime => {
          const newTime = prevTime - 0.1;
          if (newTime <= 0) {
            clearInterval(progressTimerIdRef.current);
            return 0;
          }
          return newTime;
        });
      }, 100); // 100ms間隔
    } else {
      if (progressTimerIdRef.current) {
        clearInterval(progressTimerIdRef.current);
      }
    }
    return () => {
      if (progressTimerIdRef.current) {
        clearInterval(progressTimerIdRef.current);
      }
    };
  }, [screen, showHelp]);

  const initializeQuestionSequence = () => {
    const typeSum10Count = 2; // QUESTION_TYPE_SAME_TENS_UNITS_SUM_10 の問題数
    const typeDifferentUnitsCount = 3; // QUESTION_TYPE_SAME_TENS_DIFFERENT_UNITS の問題数
    let sequence = [];
    for (let i = 0; i < typeSum10Count; i++) sequence.push(QUESTION_TYPE_SAME_TENS_UNITS_SUM_10);
    for (let i = 0; i < typeDifferentUnitsCount; i++) sequence.push(QUESTION_TYPE_SAME_TENS_DIFFERENT_UNITS);

    // Fisher-Yates shuffle でシーケンスをシャッフル
    for (let i = sequence.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [sequence[i], sequence[j]] = [sequence[j], sequence[i]];
    }
    setQuestionSequence(sequence);
    setCurrentQuestionIndex(0);
    setCount(0);
    setTimeSpent(0);
  };

  const generateQuestion = () => {
    if (questionSequence.length === 0 || currentQuestionIndex >= questionSequence.length) {
      return;
    }

    const currentQuestionType = questionSequence[currentQuestionIndex];
    let n4Value, n5Value;

    if (currentQuestionType === QUESTION_TYPE_SAME_TENS_UNITS_SUM_10) {
      // 十の位が同じ、一の位の和が10のパターン
      const commonTens = Math.floor(Math.random() * 9) + 1; // 共通の十の位
      const unit1 = Math.floor(Math.random() * 9) + 1; // 第一の数の一の位
      const unit2 = 10 - unit1; // 第二の数の一の位（和が10になる）
      n4Value = commonTens * 10 + unit1;
      n5Value = commonTens * 10 + unit2;
    } else if (currentQuestionType === QUESTION_TYPE_SAME_TENS_DIFFERENT_UNITS) {
      // 十の位が同じ、一の位が異なるパターン
      const commonTens = Math.floor(Math.random() * 9) + 1; // 共通の十の位
      let unit1 = Math.floor(Math.random() * 9) + 1;
      let unit2 = Math.floor(Math.random() * 9) + 1;
      // 一の位が同じか和が10になる場合は再生成
      while (unit1 === unit2 || (unit1 + unit2 === 10)) {
        unit1 = Math.floor(Math.random() * 9) + 1;
        unit2 = Math.floor(Math.random() * 9) + 1;
      }
      n4Value = commonTens * 10 + unit1;
      n5Value = commonTens * 10 + unit2;
    } else {
      n4Value = 0;
      n5Value = 0;
    }

    setNum4(n4Value);
    setNum5(n5Value);
    setInputValue('');
    setResult(null);
  };

  useEffect(() => {
    if (screen === 'level2') {
      initializeQuestionSequence();
    }
  }, [screen]);

  useEffect(() => {
    if (screen === 'level2' && questionSequence.length > 0 && currentQuestionIndex < questionSequence.length) {
      generateQuestion();
      setTimeRemaining(60);
      setProgressTime(60); // プログレス用時間もリセット
    }
  }, [screen, questionSequence, currentQuestionIndex]);

  const answer = num4 * num5;

  const checkAnswer = () => {
    if (parseInt(inputValue, 10) === answer) {
      setResult('⚪︎　正解！')
      const nextQuestionIndex = currentQuestionIndex + 1;
      setTimeSpent(timeSpent + (60 - timeRemaining));
      setCount(nextQuestionIndex);

      if (nextQuestionIndex >= questionSequence.length) {
        setTimeout(() => {
          alert('クリア時間' + Math.round(timeSpent + (60 - timeRemaining)) + '秒\nRANK A : ~45秒\nRANK B : ~85秒\nRANK C : ~125秒\nRANK D : 126秒~');
          if (Math.round(timeSpent + (60 - timeRemaining)) < 46) setScreen('result');
          else if (Math.round(timeSpent + (60 - timeRemaining)) < 86) setScreen('resultB');
          else if (Math.round(timeSpent + (60 - timeRemaining)) < 126) setScreen('resultC');
          else setScreen('resultD')
        }, 1000)
      } else {
        setTimeout(() => {
          setCurrentQuestionIndex(nextQuestionIndex);
        }, 1000)
      }
    } else {
      setResult('× 不正解')
    }
  }

  const handleNavigation = (targetScreen) => {
    if (targetScreen === 'level2' && screen !== 'level2') {
      setInputValue('');
      setResult(null);
    } else if (targetScreen !== 'level2' && screen === 'level2') {
      if (timerIdRef.current) {
        clearInterval(timerIdRef.current);
      }
      if (progressTimerIdRef.current) {
        clearInterval(progressTimerIdRef.current);
      }
    }
    setScreen(targetScreen);
  };

  // Level2画面の場合は独立したコンポーネントを使用
  if (screen === 'level2') {
    return (
      <Level2Screen
        num4={num4}
        num5={num5}
        count={currentQuestionIndex}
        timeRemaining={timeRemaining}
        progressTime={progressTime}
        inputValue={inputValue}
        setInputValue={setInputValue}
        checkAnswer={checkAnswer}
        result={result}
        showHelp={showHelp}
        setShowHelp={setShowHelp}
        onGoBack={() => handleNavigation('home')}
        HelpPopup={OriginalHelpPopup}
      />
    );
  }

  return (
    <HomeScreen
      screen={screen}
      onNavigate={handleNavigation}
      num4={num4}
      num5={num5}
      count={currentQuestionIndex}
      timeRemaining={timeRemaining} // 表示用（整数）
      progressTime={progressTime} // プログレスバー用（小数点あり）
      inputValue={inputValue}
      setInputValue={setInputValue}
      checkAnswer={checkAnswer}
      result={result}
      showHelp={showHelp}
      setShowHelp={setShowHelp}
      HelpPopup={({ level, ...otherProps }) => (
        <OriginalHelpPopup 
          level={helpLevel} // ボタン操作またはキー入力に応じてレベル変更可
          onClose={() => setShowHelp(false)} 
          {...otherProps} 
        />
      )}
    />
  );
}

export default App;