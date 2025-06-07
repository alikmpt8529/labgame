import React, { useState, useRef, useEffect } from 'react';
// 問題タイプの定数定義
const QUESTION_TYPE_SAME_TENS_UNITS_SUM_10 = 'SAME_TENS_UNITS_SUM_10'; // 十の位が同じ、一の位の和が10
const QUESTION_TYPE_SAME_TENS_DIFFERENT_UNITS = 'SAME_TENS_DIFFERENT_UNITS'; // 十の位が同じ、一の位が異なる
const QUESTION_TYPE_UNITS_SAME_TENS_SUM_10 = 'UNITS_SAME_TENS_SUM_10'; // 一の位が同じ、十の位の和が10

const TOTAL_QUESTIONS = 5; // 問題の総数
/* Level3Screen コンポーネント
 * インド式計算法のLevel3（上級）問題を提供
 * 
 * @param {Function} onGoBack - ホーム画面に戻るためのコールバック関数
 */
function Level3Screen({ onGoBack }) {
  // ステート管理
  const [inputValue, setInputValue] = useState(''); // ユーザーの入力値
  const [numA, setNumA] = useState(null); // 問題の第一の数値
  const [numB, setNumB] = useState(null); // 問題の第二の数値
  const [result, setResult] = useState(null); // 回答結果（正解/不正解）
  const [showHelp, setShowHelp] = useState(false); // ヘルプ表示フラグ
  const [timeRemaining, setTimeRemaining] = useState(60); // 残り時間（秒）
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

  // タイマー管理
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
    // 全問終了していない場合のみタイマーを開始
    if (currentQuestionIndex < TOTAL_QUESTIONS) {
      timerIdRef.current = setInterval(() => {
        setTimeRemaining(prevTime => prevTime - 1);
      }, 1000);
    }
    // クリーンアップ関数
    return () => {
      if (timerIdRef.current) {
        clearInterval(timerIdRef.current);
      }
    };
  }, [timeRemaining, onGoBack, currentQuestionIndex]);

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

  // 問題インデックス変更時の処理
  useEffect(() => {
    if (questionSequence.length === 0) return;

    if (currentQuestionIndex < TOTAL_QUESTIONS) {
      // 次の問題を生成
      generateQuestion();
    } else if (currentQuestionIndex >= TOTAL_QUESTIONS) {
      // 全問終了時の処理
      if (timerIdRef.current) {
        clearInterval(timerIdRef.current);
      }
      alert('全問終了！おめでとうございます！');
      onGoBack();
    }
  }, [questionSequence, currentQuestionIndex, onGoBack]);

  // 回答チェック処理
  const checkAnswer = () => {
    // 数値が設定されていない場合は処理しない
    if (numA === null || numB === null) return;
    const correctAnswer = numA * numB;
    
    if (parseInt(inputValue, 10) === correctAnswer) {
      // 正解の場合
      setResult('正解！');
      const nextQuestionIndex = currentQuestionIndex + 1;
      
      // 1秒後に次の問題へ進む
      setTimeout(() => {
        setCurrentQuestionIndex(nextQuestionIndex);
      }, 1000);
    } else {
      // 不正解の場合
      setResult('不正解');
    }
  };

  // ローディング状態の表示
  if (numA === null || numB === null && currentQuestionIndex < TOTAL_QUESTIONS) {
    return (
      <div style={{ textAlign: 'center', marginTop: '100px' }}>
        <p>問題を準備中...</p>
        <button onClick={onGoBack}>戻る</button>
      </div>
    );
  }

  // メインUI表示
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      {/* ヘッダー */}
      <h1>レベル3 - インド式計算チャレンジ</h1>
      {/* メインコンテンツ */}
      <div style={{ 
        maxWidth: '600px', 
        margin: '20px auto', 
        padding: '20px', 
        border: '1px solid #ccc', 
        borderRadius: '8px', 
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)' 
      }}>
        {/* 問題表示 */}
        <div style={{ 
          fontSize: '24px', 
          fontWeight: 'bold', 
          textAlign: 'center',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          margin: '20px 0'
        }}>
          <span>問題: {numA} × {numB} = </span>
          <input 
            type="text" 
            value={inputValue} 
            onChange={e => setInputValue(e.target.value)} 
            onKeyDown={e => { 
              if (e.key === 'Enter') { 
                checkAnswer(); 
              } 
            }} 
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
        {/* 問題番号表示 */}
        <p style={{ textAlign: 'center' }}>問題 {currentQuestionIndex + 1} / {TOTAL_QUESTIONS}</p>
        {/* タイマー表示 */}
        <div>
          <p style={{ textAlign: 'center', marginBottom: '5px' }}>残り時間: {timeRemaining} 秒</p>
          {/* プログレスバー */}
          <div style={{ 
            width: '100%', 
            height: '20px', 
            backgroundColor: '#e0e0e0', 
            borderRadius: '10px', 
            overflow: 'hidden', 
            margin: '10px 0 20px 0' 
          }}>
            <div style={{ 
              height: '100%', 
              width: `${(timeRemaining / 60) * 100}%`, 
              backgroundColor: timeRemaining > 10 ? '#4caf50' : '#f44336', 
              transition: 'width 0.5s linear' 
            }}></div>
          </div>
        </div>
        {/* 結果表示エリア */}
        <div style={{ marginTop: '20px', textAlign: 'center' }}>
          {/* 結果表示 */}
          {result && (
            <p style={{ 
              marginTop: '15px', 
              fontSize: '20px', 
              fontWeight: 'bold', 
              color: result === '正解！' ? 'red' : 'blue' // 正解は赤色、不正解は青色
            }}>{result}</p>
          )}
          {/* ヘルプヒント */}
          <p style={{ fontSize: '0.8em', color: 'gray', marginTop: '20px' }}>
            ヒント: hキーでヘルプを表示</p>
        </div>
      </div>
      {/* ホームに戻るボタン */}
      <button 
        onClick={onGoBack} 
        style={{ marginTop: '30px', padding: '10px 20px' }}
      >リタイア</button>
    </div>
  );
}

export default Level3Screen;