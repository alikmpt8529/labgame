import { useState, useRef, useEffect } from 'react'
import './App.css'
//ここより下はアプリ内部の挙動を別スクリプトに分離するためのインポート部分
import HomeScreen from './HomeScreen'; // HomeScreenコンポーネントをインポート
import OriginalHelpPopup from './HelpPopup'; // HelpPopupコンポーネントをインポート（名前を変更）

// 問題タイプ定数
const QUESTION_TYPE_SAME_UNITS_TENS_SUM_10 = 'SAME_UNITS_TENS_SUM_10'; // 一の位が同じ、十の位の和が10
const QUESTION_TYPE_SAME_TENS_DIFFERENT_UNITS = 'SAME_TENS_DIFFERENT_UNITS'; // 十の位が同じ、一の位が異なる

function App() {
  // 画面状態: 'home', 'level2', 'level1', 'level3'
  const [screen, setScreen] = useState('home')
  // count は現在の問題インデックス (0-indexed) として扱い、currentQuestionIndex と同義
  const [count, setCount] = useState(0)
  const [inputValue, setInputValue] = useState('')
  // num1, num2, num3 は問題生成ロジックで使われる一時的な値を保持するために使用していましたが、
  // num4, num5 を直接stateで管理するため、これらは不要になるか、役割が変わります。
  // ここでは、問題の構成要素として保持するのではなく、最終的な表示数値 num4, num5 をstateにします。
  const [num4, setNum4] = useState(0);
  const [num5, setNum5] = useState(0);
  const [result, setResult] = useState(null)
  const [resultColor, setResultColor] = useState('black')
  const [showHelp, setShowHelp] = useState(false)
  const [timeRemaining, setTimeRemaining] = useState(60)
  const timerIdRef = useRef(null)

  const [questionSequence, setQuestionSequence] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  // タイマー機能の追加
  useEffect(() => {
    let timer;
    if (screen === 'level2' && timeRemaining > 0 && currentQuestionIndex < questionSequence.length) {
      timer = setTimeout(() => {
        setTimeRemaining(timeRemaining - 1);
      }, 1000);
    } else if (screen === 'level2' && timeRemaining === 0) {
      setScreen('home');
      alert('時間切れです！');
    }
    return () => clearTimeout(timer);
  }, [screen, timeRemaining, currentQuestionIndex, questionSequence.length]);

  // 問題シーケンスの初期化
  const initializeQuestionSequence = () => {
    const typeSum10Count = 2;
    const typeDifferentUnitsCount = 3;
    let sequence = [];
    for (let i = 0; i < typeSum10Count; i++) sequence.push(QUESTION_TYPE_SAME_UNITS_TENS_SUM_10);
    for (let i = 0; i < typeDifferentUnitsCount; i++) sequence.push(QUESTION_TYPE_SAME_TENS_DIFFERENT_UNITS);

    // Fisher-Yates shuffle でシーケンスをシャッフル
    for (let i = sequence.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [sequence[i], sequence[j]] = [sequence[j], sequence[i]];
    }
    setQuestionSequence(sequence);
    setCurrentQuestionIndex(0);
    setCount(0);
  };

  // 問題生成
  const generateQuestion = () => {
    if (questionSequence.length === 0 || currentQuestionIndex >= questionSequence.length) {
      return;
    }

    const currentQuestionType = questionSequence[currentQuestionIndex];
    let n4Value, n5Value;

    if (currentQuestionType === QUESTION_TYPE_SAME_UNITS_TENS_SUM_10) {
      const commonUnit = Math.floor(Math.random() * 9) + 1;
      let tens1 = Math.floor(Math.random() * 9) + 1;
      let tens2 = 10 - tens1;
      if (tens2 === 0) {
        tens1 = 9;
        tens2 = 1;
      }
      n4Value = tens1 * 10 + commonUnit;
      n5Value = tens2 * 10 + commonUnit;
    } else if (currentQuestionType === QUESTION_TYPE_SAME_TENS_DIFFERENT_UNITS) {
      const commonTens = Math.floor(Math.random() * 9) + 1;
      let unit1 = Math.floor(Math.random() * 9) + 1;
      let unit2 = Math.floor(Math.random() * 9) + 1;
      while (unit1 === unit2 || (unit1 + unit2 === 10)) {
        unit1 = Math.floor(Math.random() * 9) + 1;
        unit2 = Math.floor(Math.random() * 9) + 1;
      }
      n4Value = commonTens * 10 + unit1;
      n5Value = commonTens * 10 + unit2;
    } else {
      // フォールバックや初期値
      n4Value = 0;
      n5Value = 0;
    }

    setNum4(n4Value);
    setNum5(n5Value);
    setInputValue('');
    setResult(null);
  };

  // キーボードイベント処理（hキーでヘルプ表示）
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (screen === 'level2' && event.key === 'h') {
        setShowHelp(!showHelp);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [screen, showHelp]);

  useEffect(() => {
    if (screen === 'level2') {
      initializeQuestionSequence();
      setTimeRemaining(60); // タイマーをリセット
    }
  }, [screen]);

  useEffect(() => {
    if (screen === 'level2' && questionSequence.length > 0 && currentQuestionIndex < questionSequence.length) {
      generateQuestion();
      setTimeRemaining(60); // 新しい問題でタイマーをリセット
    }
  }, [screen, questionSequence, currentQuestionIndex]);

  const answer = num4 * num5;

  const checkAnswer = () => {
    if (parseInt(inputValue, 10) === answer) {
      setResult('正解！')
      setResultColor('red')
      const nextQuestionIndex = currentQuestionIndex + 1;
      setCount(nextQuestionIndex);

      if (nextQuestionIndex >= questionSequence.length) {
        setTimeout(() => {
          setScreen('home')
          alert('全問正解！おめでとうございます！');
        }, 1000)
      } else {
        setTimeout(() => {
          setCurrentQuestionIndex(nextQuestionIndex);
        }, 1000)
      }
    } else {
      setResult('不正解')
      setResultColor('blue')
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
    }
    setScreen(targetScreen);
  };

  // Level2画面のUI
  if (screen === 'level2') {
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
      width: `${(timeRemaining / 60) * 100}%`,
      backgroundColor: timeRemaining > 10 ? '#4caf50' : '#f44336',
      transition: 'width 0.5s linear'
    };

    return (
      <>
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
          <h1>レベル2 - インド式計算ゲーム</h1>
          <div style={{ maxWidth: '600px', margin: '20px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
            <div style={{ 
              fontSize: '24px', 
              fontWeight: 'bold', 
              textAlign: 'center',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              margin: '20px 0'
            }}>
              <span>問題: {num4} × {num5} = </span>
              <input 
                type="text" 
                value={inputValue} 
                onChange={(e) => setInputValue(e.target.value)} 
                onKeyDown={(e) => { if (e.key === 'Enter') { checkAnswer(); } }} 
                placeholder="答えを入力" 
                style={{ 
                  padding: '10px', 
                  fontSize: '18px', 
                  width: '150px', 
                  borderRadius: '5px', 
                  border: '1px solid #ccc', 
                  marginLeft: '10px' 
                }} 
              />
            </div>
            <p style={{ textAlign: 'center' }}>問題 {count + 1} / 5</p>
            
            {/* タイマー表示と視覚化 */}
            <div>
              <p style={{ textAlign: 'center', marginBottom: '5px' }}>残り時間: {timeRemaining} 秒</p>
              <div style={progressBarContainerStyle}>
                <div style={progressBarStyle}></div>
              </div>
            </div>
            
            <div style={{ marginTop: '20px', textAlign: 'center' }}>
              {result && (
                <p style={{ 
                  marginTop: '15px', 
                  fontSize: '20px', 
                  fontWeight: 'bold', 
                  color: resultColor
                }}>
                  {result}
                </p>
              )}
              <p style={{ fontSize: '0.8em', color: 'gray', marginTop: '20px' }}>ヒント: hキーでヘルプを表示</p>
            </div>
          </div>
          <button onClick={() => handleNavigation('home')} style={{ marginTop: '30px', padding: '10px 20px' }}>リタイア</button>
        </div>
        {showHelp && (
          <OriginalHelpPopup 
            level="level2" 
            onClose={() => setShowHelp(false)} 
          />
        )}
      </>
    );
  }

  // その他の画面はHomeScreenに委譲
  return (
    <HomeScreen
      screen={screen}
      onNavigate={handleNavigation}
      num4={num4}
      num5={num5}
      count={currentQuestionIndex}
      timeRemaining={timeRemaining}
      inputValue={inputValue}
      setInputValue={setInputValue}
      checkAnswer={checkAnswer}
      result={result}
      showHelp={showHelp}
      setShowHelp={setShowHelp}
      HelpPopup={({ level, ...otherProps }) => (
        <OriginalHelpPopup 
          level={level} 
          onClose={() => setShowHelp(false)} 
          {...otherProps} 
        />
      )}
    />
  );
}

export default App;