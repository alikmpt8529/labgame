import { useState, useRef, useEffect } from 'react'
import './App.css'
//ここより下はアプリ内部の挙動を別スクリプトに分離するためのインポート部分
import HomeScreen from './HomeScreen'; // HomeScreenコンポーネントをインポート
import OriginalHelpPopup from './HelpPopup'; // HelpPopupコンポーネントをインポート（名前を変更）

// 問題タイプ定数
const QUESTION_TYPE_SAME_UNITS_TENS_SUM_10 = 'SAME_UNITS_TENS_SUM_10'; // 一の位が同じ、十の位の和が10
const QUESTION_TYPE_SAME_TENS_DIFFERENT_UNITS = 'SAME_TENS_DIFFERENT_UNITS'; // 十の位が同じ、一の位が異なる

function App() {
  // 画面状態: 'home', 'game', 'level1', 'level3'
  const [screen, setScreen] = useState('home')
  const [count, setCount] = useState(0)
  const [inputValue, setInputValue] = useState('')
  const [num4, setNum4] = useState(0);
  const [num5, setNum5] = useState(0);
  const [result, setResult] = useState(null)
  const [showHelp, setShowHelp] = useState(true); // 初期状態でヒント表示
  const [helpLevel, setHelpLevel] = useState('level2'); // 表示するヒントのレベル
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

  useEffect(() => {
    const handleKeyDown = (event) => {
      if ((screen === 'level2' || screen === 'level3') && event.key === 'h') {
        setHelpLevel(screen); // 現在のレベルをヒントレベルに
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
    const typeSum10Count = 2; // QUESTION_TYPE_SAME_UNITS_TENS_SUM_10 の問題数
    const typeDifferentUnitsCount = 3; // QUESTION_TYPE_SAME_TENS_DIFFERENT_UNITS の問題数
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
      setResult('正解！')
      const nextQuestionIndex = currentQuestionIndex + 1;
      setTimeSpent(timeSpent + (60 - timeRemaining));
      setCount(nextQuestionIndex);

      if (nextQuestionIndex >= questionSequence.length) {
        setTimeout(() => {
          alert('クリア時間' + Math.round(timeSpent) + '秒');
          setScreen('result');
        }, 1000)
      } else {
        setTimeout(() => {
          setCurrentQuestionIndex(nextQuestionIndex);
        }, 1000)
      }
    } else {
      setResult('不正解')
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