import React, { useState, useRef, useEffect } from 'react';
import HelpPopup from './HelpPopup';

// 問題タイプの定数定義
const QUESTION_TYPE_SAME_TENS_UNITS_SUM_10 = 'SAME_TENS_UNITS_SUM_10'; // 十の位が同じ、一の位の和が10
const QUESTION_TYPE_SAME_TENS_DIFFERENT_UNITS = 'SAME_TENS_DIFFERENT_UNITS'; // 十の位が同じ、一の位が異なる
const QUESTION_TYPE_UNITS_SAME_TENS_SUM_10 = 'UNITS_SAME_TENS_SUM_10'; // 一の位が同じ、十の位の和が10

const TOTAL_QUESTIONS = 5; // 問題の総数

// 時間を分:秒形式に変換する関数

function Level3Screen({ onGoBack, onGoForward }) {
  // ダークモード対応
  const [isDarkMode, setIsDarkMode] = useState(
    window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e) => setIsDarkMode(e.matches);

    mediaQuery.addListener(handleChange);
    return () => mediaQuery.removeListener(handleChange);
  }, []);

  // ステート管理
  const [inputValue, setInputValue] = useState(''); // ユーザーの入力値
  const [numA, setNumA] = useState(null); // 問題の第一の数値
  const [numB, setNumB] = useState(null); // 問題の第二の数値
  const [result, setResult] = useState(null); // 回答結果（正解/不正解）
  const [showHelp, setShowHelp] = useState(false); // ヘルプ表示フラグ
  const [timeRemaining, setTimeRemaining] = useState(60); // 残り時間（秒）
  const [timeSpent, setTimeSpent] = useState(0);　//経過時間（秒）
  const timerIdRef = useRef(null); // タイマーID保持用
  const [questionSequence, setQuestionSequence] = useState([]); // 問題の出題順序
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // 現在の問題番号
  
  // ヘルプ表示のキーボードイベント処理
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'h') {
        setShowHelp(true); // hキー押下でヘルプを表示
      }
    };
    // イベントリスナーの登録
    window.addEventListener('keydown', handleKeyDown);
    
    // クリーンアップ関数（コンポーネントアンマウント時にイベントリスナーを削除）
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Level3開始時にヘルプポップアップを自動表示
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowHelp(true);
    }, 100); // 0.1秒後に表示
    
    return () => clearTimeout(timer);
  }, []); // 初回のみ実行

  // タイマー管理（ポップアップ表示中は停止）
  useEffect(() => {
    // 時間切れの場合の処理  
    if (timeRemaining <= 0) {
      if (timerIdRef.current) {
        clearInterval(timerIdRef.current);
      }
      alert('時間切れです！');
      onGoBack();
      return;
    }
    // 既存のタイマーをクリア
    if (timerIdRef.current) {
      clearInterval(timerIdRef.current);
    }
    // ゲーム進行中かつヘルプ表示中でない場合のみタイマーを開始
    if (currentQuestionIndex < TOTAL_QUESTIONS && !showHelp) {
      timerIdRef.current = setInterval(() => {
        setTimeRemaining(prevTime => {
          const newTime = prevTime - 0.1; // 0.1秒ずつ減らす
          return newTime > 0 ? newTime : 0;
        });
      }, 100); // 100ms間隔で更新
    }
    // クリーンアップ関数
    return () => {
      if (timerIdRef.current) {
        clearInterval(timerIdRef.current);
      }
    };
  }, [timeRemaining, onGoBack, currentQuestionIndex, showHelp]); // showHelpを依存配列に追加

  // 問題シーケンスの初期化
  const initializeQuestionSequence = () => {
    // 各問題タイプの出題数を定義
    const typeSameTensUnitsSum10Count = 2; // 十の位同じ・一の位和10タイプ
    const typeSameTensDifferentUnitsCount = 2; // 十の位同じ・一の位異なるタイプ  
    const typeUnitsSameTensSum10Count = 1; // 一の位同じ・十の位和10タイプ
    let sequence = [];
    // 各タイプの問題をシーケンスに追加
    for (let i = 0; i < typeSameTensUnitsSum10Count; i++) {
      sequence.push(QUESTION_TYPE_SAME_TENS_UNITS_SUM_10);
    }
    for (let i = 0; i < typeSameTensDifferentUnitsCount; i++) {
      sequence.push(QUESTION_TYPE_SAME_TENS_DIFFERENT_UNITS);
    }
    for (let i = 0; i < typeUnitsSameTensSum10Count; i++) {
      sequence.push(QUESTION_TYPE_UNITS_SAME_TENS_SUM_10);
    }
    // Fisher-Yatesアルゴリズムでシーケンスをシャッフル
    for (let i = sequence.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [sequence[i], sequence[j]] = [sequence[j], sequence[i]];
    }
    setQuestionSequence(sequence);
    setCurrentQuestionIndex(0);
  };

  // 問題生成ロジック
  const generateQuestion = () => {
    // シーケンスの範囲外チェック
    if (questionSequence.length === 0 || currentQuestionIndex >= questionSequence.length) {
      return;
    }
    const currentQuestionType = questionSequence[currentQuestionIndex];
    let genA, genB;
    // 問題タイプに応じて数値を生成
    if (currentQuestionType === QUESTION_TYPE_SAME_TENS_UNITS_SUM_10) {
      // 十の位が同じ、一の位の和が10のパターン（例：23 × 27）
      const commonDigit = Math.floor(Math.random() * 9) + 1; // 共通の十の位
      const unit1 = Math.floor(Math.random() * 9) + 1; // 第一の数の一の位
      const unit2 = 10 - unit1; // 第二の数の一の位（和が10になる）
      genA = commonDigit * 10 + unit1;
      genB = commonDigit * 10 + unit2;
    } else if (currentQuestionType === QUESTION_TYPE_SAME_TENS_DIFFERENT_UNITS) {
      // 十の位が同じ、一の位が異なるパターン（例：23 × 25）
      const commonDigit = Math.floor(Math.random() * 9) + 1; // 共通の十の位
      let unit1 = Math.floor(Math.random() * 9) + 1;
      let unit2 = Math.floor(Math.random() * 9) + 1;
      // 一の位が同じか和が10になる場合は再生成
      while (unit1 === unit2 || (unit1 + unit2 === 10)) {
        unit1 = Math.floor(Math.random() * 9) + 1;
        unit2 = Math.floor(Math.random() * 9) + 1;
      }
      genA = commonDigit * 10 + unit1;
      genB = commonDigit * 10 + unit2;
    } else if (currentQuestionType === QUESTION_TYPE_UNITS_SAME_TENS_SUM_10) {
      // 一の位が同じ、十の位の和が10のパターン（例：23 × 73）
      const commonUnit = Math.floor(Math.random() * 9) + 1; // 共通の一の位
      const ten1 = Math.floor(Math.random() * 9) + 1; // 第一の数の十の位
      const ten2 = 10 - ten1; // 第二の数の十の位（和が10になる）
      genA = ten1 * 10 + commonUnit;
      genB = ten2 * 10 + commonUnit;
    }
    // 生成した数値とUIをリセット
    setNumA(genA);
    setNumB(genB);
    setInputValue('');
    setResult(null);
    setTimeRemaining(60); // タイマーリセット
  };

  // 副作用管理
  // コンポーネント初期化時に問題シーケンスを設定
  useEffect(() => {
    initializeQuestionSequence();
  }, []);

  // 問題インデックス変更時の処理 (問題生成専用)
  useEffect(() => {
    if (questionSequence.length === 0) return;

    if (currentQuestionIndex < TOTAL_QUESTIONS) {
      // 次の問題を生成
      generateQuestion();
    }
  }, [questionSequence, currentQuestionIndex]); // 依存配列から timeSpent, onGoForward を削除

  // 全問終了時の処理専用
  useEffect(() => {
    if (currentQuestionIndex >= TOTAL_QUESTIONS) {
      // 全問終了時の処理
      if (timerIdRef.current) {
        clearInterval(timerIdRef.current);
        timerIdRef.current = null; // クリアしたことを明示
      }
      alert('クリア時間' + Math.round(timeSpent) + '秒\nRANK A : ~40秒\nRANK B : ~80秒\nRANK C : ~120秒\nRANK D : 121秒~');
      if (Math.round(timeSpent) < 41) onGoForward('result');
      else if (Math.round(timeSpent) < 81) onGoForward('resultB');
      else if (Math.round(timeSpent) < 121) onGoForward('resultC');
      else onGoForward('resultD');
    }
  }, [currentQuestionIndex, timeSpent, onGoForward]); // questionSequence はこのロジックに直接関係ないので削除

  // 入力値の変更処理（数字のみ許可）
  const handleInputChange = (e) => {
    const value = e.target.value;
    // 数字のみを許可（空文字も許可）
    if (value === '' || /^\d+$/.test(value)) {
      setInputValue(value);
    }
  };

  // キーボード入力処理
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && inputValue.trim() !== '') {
      checkAnswer();
    }
    // 数字、Backspace、Delete、Arrow keys、Tabのみ許可
    if (!/[\d]/.test(e.key) && 
        !['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab', 'Enter'].includes(e.key)) {
      e.preventDefault();
    }
  };

  // 回答チェック処理
  const checkAnswer = () => {
    // 数値が設定されていない場合は処理しない
    if (numA === null || numB === null || inputValue.trim() === '') return;
    const correctAnswer = numA * numB;
    
    if (parseInt(inputValue, 10) === correctAnswer) {
      // 正解の場合
      setResult('⚪︎　正解！');
      const nextQuestionIndex = currentQuestionIndex + 1;
      // 経過時間を更新
      setTimeSpent(timeSpent + (60 - timeRemaining));
      
      // 1秒後に次の問題へ進む
      setTimeout(() => {
        setCurrentQuestionIndex(nextQuestionIndex);
      }, 1500); // 遅延時間を1000ミリ秒 (1秒) から1500ミリ秒 (1.5秒) に変更
    } else {
      // 不正解の場合
      setResult('×　不正解');
    }
  };

  // Level2と同じUIを使用
  return (
    <>
      <div className={`game-container ${showHelp ? 'popup-active' : ''}`} style={{ 
        color: isDarkMode ? '#ffffff' : '#000000',
        backgroundColor: isDarkMode ? '#2d2d30' : '#ffffff',
        minHeight: '100vh',
        transition: 'background-color 0.3s ease, color 0.3s ease'
      }}>
        <h1 className="game-title" style={{ 
          color: isDarkMode ? '#ffffff' : '#000000',
          transition: 'color 0.3s ease'
        }}>
          level3
        </h1>
        <div className="game-main-content" style={{ 
          border: isDarkMode ? '1px solid #555555' : '1px solid #cccccc',
          boxShadow: isDarkMode 
            ? '0 2px 4px rgba(0,0,0,0.3)' 
            : '0 2px 4px rgba(0,0,0,0.1)',
          backgroundColor: isDarkMode ? '#3c3c3c' : '#ffffff',
          color: isDarkMode ? '#ffffff' : '#000000',
          position: 'relative',
          paddingTop: '60px',
          transition: 'all 0.3s ease'
        }}>
          {/* タイマー表示を中央上部に配置し、文字サイズを大きく */}
          <h3 className={`level3-timer ${showHelp ? 'help-active' : ''}`} style={{
            position: 'absolute',
            top: '15px',
            left: '50%',
            transform: 'translateX(-50%)',
            fontSize: '20px',
            fontWeight: 'bold',
            zIndex: 100,
            color: showHelp ? '#ff6b6b' : (isDarkMode ? '#ffffff' : '#000000'), // ポップアップ表示中は赤色
            padding: '8px 15px',
            borderRadius: '8px',
            margin: 0,
            textAlign: 'center',
            whiteSpace: 'nowrap',
            transition: 'all 0.3s ease'
          }}>
            残り時間(remaining time): {Math.ceil(timeRemaining)} {showHelp && '(一時停止中)'}
          </h3>

          <p className={`game-question ${isDarkMode ? 'dark-theme' : 'light-theme'}`}>
            問題(Question): {numA} × {numB} = 
            <input 
              type="text" 
              value={inputValue} 
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder="答えを入力" 
              disabled={showHelp}
              autoFocus={!showHelp}
              className={`game-input ${showHelp ? 'input-disabled' : ''} ${isDarkMode ? 'dark-theme' : 'light-theme'}`}
            />
          </p>
          
          <p className={`game-counter ${isDarkMode ? 'dark-theme' : 'light-theme'}`}>
            問題(now) {currentQuestionIndex + 1} / {TOTAL_QUESTIONS}
          </p>
          
          <div className="game-input-section">
            {result && (
              <p className="game-result" style={{ 
                color: result.includes('正解') 
                  ? (isDarkMode ? '#ff6b6b' : '#d32f2f') // 正解は赤色
                  : (isDarkMode ? '#4dabf7' : '#1976d2') // 不正解は青色
              }}>
                {result}
              </p>
            )}
            
            {/* プログレスバーを緑色に変更 */}
            <div style={{
              width: '100%',
              height: '15px',
              backgroundColor: isDarkMode ? '#555555' : '#e0e0e0',
              borderRadius: '7px',
              overflow: 'hidden',
              marginBottom: '10px'
            }}>
              <div style={{
                width: `${(timeRemaining / 60) * 100}%`,
                height: '100%',
                backgroundColor: isDarkMode ? '#4caf50' : '#4caf50', // 緑色に変更
                transition: 'width 0.1s ease'
              }}></div>
            </div>
            
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
          style={{
            backgroundColor: isDarkMode ? '#555555' : '#f0f0f0',
            color: isDarkMode ? '#ffffff' : '#000000',
            border: isDarkMode ? '1px solid #777777' : '1px solid #cccccc',
            transition: 'all 0.3s ease'
          }}
        >
          ホームに戻る(return to home)
        </button>
      </div>

      {/* HelpPopupを一つだけ表示 */}
      {showHelp && (
        <HelpPopup 
          level="level3" 
          onClose={() => setShowHelp(false)}
          isDarkMode={isDarkMode}
        />
      )}
    </>
  );
}

export default Level3Screen;
