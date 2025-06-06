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
  // count は現在の問題インデックス (0-indexed) として扱い、currentQuestionIndex と同義
  const [count, setCount] = useState(0)
  const [inputValue, setInputValue] = useState('')
  // num1, num2, num3 は問題生成ロジックで使われる一時的な値を保持するために使用していましたが、
  // num4, num5 を直接stateで管理するため、これらは不要になるか、役割が変わります。
  // ここでは、問題の構成要素として保持するのではなく、最終的な表示数値 num4, num5 をstateにします。
  const [num4, setNum4] = useState(0);
  const [num5, setNum5] = useState(0);
  const [result, setResult] = useState(null)
  const [showHelp, setShowHelp] = useState(false)
  const [timeRemaining, setTimeRemaining] = useState(60)
  const timerIdRef = useRef(null)

  const [questionSequence, setQuestionSequence] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if ((screen === 'game' || screen === 'level3') && event.key === 'h') {
        setShowHelp(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [screen]);

  // タイマー管理
  useEffect(() => {
    if (screen === 'game') {
      if (timerIdRef.current) {
        clearInterval(timerIdRef.current);
      }
      timerIdRef.current = setInterval(() => {
        setTimeRemaining(prevTime => {
          if (prevTime <= 1) {
            clearInterval(timerIdRef.current);
            setScreen('home'); // 時間切れでホームへ
            alert('時間切れです！');
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
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
  }, [screen]);

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
    setCurrentQuestionIndex(0); // シーケンスの最初の問題から開始
    setCount(0); // 表示用の問題番号もリセット
  };

  const generateQuestion = () => {
    if (questionSequence.length === 0 || currentQuestionIndex >= questionSequence.length) {
      return;
    }

    const currentQuestionType = questionSequence[currentQuestionIndex];
    let n4Value, n5Value;

    if (currentQuestionType === QUESTION_TYPE_SAME_UNITS_TENS_SUM_10) {
      // 一の位が同じ、十の位の和が10
      const commonUnit = Math.floor(Math.random() * 9) + 1; // 1から9 (共通の一の位)
      let tens1 = Math.floor(Math.random() * 9) + 1;      // 1から9 (一つ目の十の位)
      let tens2 = 10 - tens1;                             // 二つ目の十の位 (tens1 + tens2 = 10)
      // tens1とtens2が0にならないように調整（現在のロジックでは1-9になるので不要）
      if (tens2 === 0) { // tens1が10の場合に発生するが、(Math.random()*9)+1では発生しない
        tens1 = 9; // 例: tens1が10なら9に
        tens2 = 1;
      }
      n4Value = tens1 * 10 + commonUnit;
      n5Value = tens2 * 10 + commonUnit;
    } else if (currentQuestionType === QUESTION_TYPE_SAME_TENS_DIFFERENT_UNITS) {
      // 十の位が同じ、一の位が異なる
      const commonTens = Math.floor(Math.random() * 9) + 1; // 1から9 (共通の十の位)
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

  useEffect(() => {
    if (screen === 'game') {
      initializeQuestionSequence();
    }
  }, [screen]);

  useEffect(() => {
    if (screen === 'game' && questionSequence.length > 0 && currentQuestionIndex < questionSequence.length) {
      generateQuestion();
      setTimeRemaining(60);
    }
  }, [screen, questionSequence, currentQuestionIndex]);

  const answer = num4 * num5;

  const checkAnswer = () => {
    if (parseInt(inputValue, 10) === answer) {
      setResult('正解！')
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
    }
  }

  const handleNavigation = (targetScreen) => {
    if (targetScreen === 'game' && screen !== 'game') {
      setInputValue('');
      setResult(null);
    } else if (targetScreen !== 'game' && screen === 'game') {
      if (timerIdRef.current) {
        clearInterval(timerIdRef.current);
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