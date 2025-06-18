import { useEffect, useState } from 'react';

const VedicTutorial = ({ onGoBack }) => {
  const [step, setStep] = useState(0);
  const [input, setInput] = useState('');
  const [message, setMessage] = useState('');
  const [isStepCleared, setIsStepCleared] = useState(false);
  const [practiceProblem, setPracticeProblem] = useState({ num1: 0, num2: 0, answer: 0 });
  // 前のstepを記憶するstate
  const [previousStep, setPreviousStep] = useState(null);

  const correctAnswers = {
    1: 6,
    2: 21,
    3: 621,
    7: 266,
  };

  const stepContent = {
    0: {
      question: 'Step 0: インド式計算法の考え方を知ろう！',
      explanation: `27 × 23 を図で考えてみましょう！
      (Consider 27 x 23 in the diagram!)
      十の位と一の位を分けて考えることが、インド式計算法のポイントです。
      (The key to the Indian method of calculation is to separate the tens and ones.)`,
      image: '/images/step0.png',
      inputRequired: false,
    },
    1: {
      question: 'Step 1: 2 × (2 + 1) = ?',
      explanation: '水色の部分の面積から上位桁を求めてみよう！\n(Let\'s find the upper digits from the area of the light blue area!)',
      image: '/images/step1.png',
      inputRequired: true,
    },
    2: {
      question: 'Step 2: 7 × 3 = ?',
      explanation: '右下の紫色の部分の面積から下位桁を求めてみよう！\n(Let\'s find the lower digits from the area of the purple area in the lower right corner!)',
      image: '/images/step2.png',
      inputRequired: true,
    },
    3: {
      question: 'Step 3: 27 × 23 = ?',
      explanation: `Step 1の「6」とStep 2の「21」をつなげて最終的な積を求めてみよう！\n(Let\'s connect “6” in Step 1 and “21” in Step 2 to find the final product!)`,
      image: '/images/step3.png',
      inputRequired: true,
    },
    4: {
      question: 'Step 4: 考え方を整理しよう！(Let\'s organize our thinking!)',
      explanation: `十の位の数が同じで、一の位の数の和が10になる2桁の数同士のかけ算は、
      この方法で簡単に計算できます。
      Multiplication between two-digit numbers with the same number of tens places and the sum of the numbers of ones places equals 10 can be easily calculated in this way.

      (十の位の数) × (十の位の数 + 1) … 上位桁
      (number of decimal places) × (number of decimal places + 1) ... Upper Digits

      (一の位の数) × (もう一方の一の位の数) … 下位桁
      (number of first places) × (number of the other first place) ... Lower Digit

      図で構造を整理して練習問題にチャレンジしよう！
      Let's organize the structure with diagrams and try the exercises!`,
      image: '/images/step4.png',
      inputRequired: false,
    },
    7: {
      question: 'Step 5: 14 × 19 = ?',
      explanation: `十の位の数が同じだけの時は以下のように考えられます。
      (When the number of decimal places is the same, it is considered as follows.)
      {(一方の数)+(他方の数の一の位)}×(十の位の数×10)+(一の位の数の積)
      {(one number) + (first place of the other number)} x (number of tenth places x 10) + (product of the number of first places)

      図で構造を整理して練習問題にチャレンジしよう！
      Let's organize the structure with diagrams and try the exercises!`,
      image: '/images/step5.png',
      inputRequired: true,
    }
  };

  useEffect(() => {
    if (step === 5) generatePracticeProblem('sum10');
    if (step === 6) generatePracticeProblem('sum10');
    if (step === 8) generatePracticeProblem('sameTens');
  }, [step]);

  const generatePracticeProblem = (type) => {
    let n1, n2;
    if (type === 'sum10') {
      const commonTens = Math.floor(Math.random() * 9) + 1;
      const unit1 = Math.floor(Math.random() * 9) + 1;
      const unit2 = 10 - unit1;
      n1 = commonTens * 10 + unit1;
      n2 = commonTens * 10 + unit2;
    } else if (type === 'sameTens') {
      const commonTens = Math.floor(Math.random() * 9) + 1;
      let unit1 = Math.floor(Math.random() * 10);
      let unit2 = Math.floor(Math.random() * 10);
      while (unit1 === unit2) unit2 = Math.floor(Math.random() * 10);
      n1 = commonTens * 10 + unit1;
      n2 = commonTens * 10 + unit2;
    }
    setPracticeProblem({ num1: n1, num2: n2, answer: n1 * n2 });
    setInput('');
    setMessage('');
  };

  const handleSubmit = () => {
    const userAnswer = parseInt(input, 10);
    if (userAnswer === correctAnswers[step]) {
      setMessage(`✅ 正解！次のステップに進みます...
        Correct! Moving to the next step...`);
      setIsStepCleared(true);
      setTimeout(() => {
        setStep((prev) => prev + 1);
        setInput('');
        setMessage('');
        setIsStepCleared(false);
      }, 1000);
    } else {
      setMessage('❌ 不正解/Incorrect');
    }
  };

  const handleBackSummary = () => {
    // 現在のstepを記憶
    setPreviousStep(step);
    
    if (step === 5 || step === 6) {
      setStep(4);
    } else if (step === 8) {
      setStep(7);
    }
    setInput('');
    setMessage('');
    setIsStepCleared(false);
  };

  // 練習問題に戻る関数
  const handleReturnToPractice = () => {
    if (previousStep !== null) {
      setStep(previousStep);
      setPreviousStep(null); // リセット
    }
  };

  const handlePracticeSubmit = () => {
    const userAnswer = parseInt(input, 10);
    if (userAnswer === practiceProblem.answer) {
      setMessage(`✅ 正解！次の問題へ...
        Correct! To the next question...`);
      setTimeout(() => {
        setStep((prev) => prev + 1);
        setInput('');
        setMessage('');
      }, 1000);
    } else {
      setMessage('❌ 不正解/Incorrect');
    }
  };

  const handleNextStep0 = () => {
    setStep(1);
    setInput('');
    setMessage('');
  };

  const handleBack = () => {
    setStep((prev) => Math.max(prev - 1, 0));
    setInput('');
    setMessage('');
    setIsStepCleared(false);
  };

  const current = stepContent[step];

  return (
    <div style={{ textAlign: 'center', padding: '40px' }}>
      <h1>Level 1</h1>
      {(step===0) && (
        <>
          {/* ↓↓↓ classNameを追加 ↓↓↓ */}
          <h2>{current.question}</h2>
          <h2>(Step0: Let's know the concept of the Indian method of calculation!)</h2>
          <p className="explanation-text" style={{ maxWidth: '1000px', margin: '20px auto', fontSize: '18px' }}>{current.explanation}</p>
          <img src={current.image} alt={`step${step}`} style={{ width: '700px', marginBottom: '20px', borderRadius: '10px' }} />
          
          {current.inputRequired && (
            <>
              <input
                type="number"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && !isStepCleared && handleSubmit()}
                disabled={isStepCleared}
                style={{ padding: '10px', fontSize: '18px', width: '180px', marginBottom: '10px' }}
              /><br />
              <button onClick={handleSubmit} disabled={isStepCleared}>答え合わせ/Check answers</button>
            </>
          )}

          {message && <p style={{ marginTop: '20px', fontSize: '18px', color: message.includes('正解/Correct') ? 'green' : 'red', whiteSpace: 'pre-line' }}>{message}</p>}

          <div style={{ marginTop: '30px' }}>
            {step > 0 && <button onClick={handleBack} style={{ padding: '8px 16px' }}>← 前へ/Previous</button>}
            {step === 0 && <button onClick={handleNextStep0} style={{ padding: '8px 16px', marginLeft: '10px' }}>次へ/Next →</button>}
          </div>
        </>
      )}
      {(step>0 && step <= 3) && (
        <>
          {/* ↓↓↓ classNameを追加 ↓↓↓ */}
          <p className="explanation-text" style={{ maxWidth: '600px', margin: '20px auto', fontSize: '18px' }}>{current.explanation}</p>
          <img src={current.image} alt={`step${step}`} style={{ width: '700px', marginBottom: '20px', borderRadius: '10px' }} />
          <h2>{current.question}</h2>
          {current.inputRequired && (
            <>
              <input
                type="number"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && !isStepCleared && handleSubmit()}
                disabled={isStepCleared}
                style={{ padding: '10px', fontSize: '18px', width: '180px', marginBottom: '10px' }}
              /><br />
              <button onClick={handleSubmit} disabled={isStepCleared}>答え合わせ/Check answers</button>
            </>
          )}

          {message && <p style={{ marginTop: '20px', fontSize: '18px', color: message.includes('正解/Correct') ? 'green' : 'red' , whiteSpace: 'pre-line'}}>{message}</p>}

          <div style={{ marginTop: '30px' }}>
            {step > 0 && <button onClick={handleBack} style={{ padding: '8px 16px' }}>← 前へ/Previous</button>}
            {step === 0 && <button onClick={handleNextStep0} style={{ padding: '8px 16px', marginLeft: '10px' }}>次へ/Next →</button>}
          </div>
        </>
      )}

      {step === 4 && (
        <>
          <h2>{current.question}</h2>
          {/* ↓↓↓ classNameを追加 ↓↓↓ */}
          <p className="explanation-text" style={{ maxWidth: '600px', margin: '20px auto', fontSize: '18px' }}>{current.explanation}</p>
          <img
            src={current.image}
            alt={`step${step}`}
            style={{ width: '700px', marginBottom: '20px', borderRadius: '10px' }}
          />
          <br></br>
          <button
            onClick={() => setStep(5)}
            style={{ marginTop: '20px', padding: '10px 20px', fontSize: '16px' }}
          >
            練習問題へチャレンジ(Try the Exercises) →
          </button>
          
          {/* 練習問題に戻るボタンを追加 */}
          {previousStep && (previousStep === 5 || previousStep === 6) && (
            <div style={{ marginTop: '20px' }}>
              <button 
                onClick={handleReturnToPractice}
                style={{
                  padding: '10px 20px',
                  fontSize: '16px',
                  backgroundColor: '#4caf50',
                  color: 'white',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer'
                }}
              >
                練習問題に戻る (Exercise {previousStep - 4}) / Return to Practice
              </button>
            </div>
          )}
        </>
      )}


      {step === 5 && (
        <>
          <h2>練習問題①(Exercise①)</h2>
          <p style={{ maxWidth: '600px', margin: '20px auto', fontSize: '30px' }}>{practiceProblem.num1} × {practiceProblem.num2} = ?</p>
          <input type="number" value={input} onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handlePracticeSubmit()} disabled={isStepCleared} style={{ padding: '10px', fontSize: '18px', width: '180px', marginBottom: '10px' }}/>
          <br />
          <button onClick={handlePracticeSubmit}>答え合わせ/Check answers</button>
          <button onClick={handleBackSummary} style={{ marginLeft: '10px', padding: '10px 20px' }}>
            まとめに戻る|Back to Summary
          </button>
          {/* まとめに戻るボタンを追加 */}
          {message && <p style={{ whiteSpace: 'pre-line'}}>{message}</p>}
        </>
      )}

      {step === 6 && (
        <>
          <h2>練習問題②(Exercise②)</h2>
          <p style={{ maxWidth: '600px', margin: '20px auto', fontSize: '30px' }}>{practiceProblem.num1} × {practiceProblem.num2} = ?</p>
          <input type="number" value={input} onChange={(e) => setInput(e.target.value)} 
          onKeyDown={(e) => e.key === 'Enter' && handlePracticeSubmit()} disabled={isStepCleared} style={{ padding: '10px', fontSize: '18px', width: '180px', marginBottom: '10px' }}/>
          <br />
          <button onClick={handlePracticeSubmit}>答え合わせ/Check answers</button>
          <button onClick={handleBackSummary} style={{ marginLeft: '10px', padding: '10px 20px' }}>
            まとめに戻る|Back to Summary
          </button>
          {message && <p style={{ whiteSpace: 'pre-line'}}>{message}</p>}
        </>
      )}
      {(step === 7) && (
        <>
          {/* ↓↓↓ classNameを追加 ↓↓↓ */}
          <p className="explanation-text" style={{ maxWidth: '600px', margin: '20px auto', fontSize: '18px' }}>{current.explanation}</p>
          <img src={current.image} alt={`step${step}`} style={{ width: '700px', marginBottom: '20px', borderRadius: '10px' }} />
          <h2>{current.question}</h2>
          {current.inputRequired && (
            <>
              <input
                type="number"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && !isStepCleared && handleSubmit()}
                disabled={isStepCleared}
                style={{ padding: '10px', fontSize: '18px', width: '180px', marginBottom: '10px' }}
              /><br />
              <button onClick={handleSubmit} disabled={isStepCleared}>答え合わせ/Check answers</button>
            </>
          )}

          {message && <p style={{ marginTop: '20px', fontSize: '18px', color: message.includes('正解/Correct') ? 'green' : 'red', whiteSpace: 'pre-line' }}>{message}</p>}

          <div style={{ marginTop: '30px' }}>
            {step > 0 && <button onClick={handleBack} style={{ padding: '8px 16px' }}>← 前へ/Previous</button>}
            {step === 0 && <button onClick={handleNextStep0} style={{ padding: '8px 16px', marginLeft: '10px' }}>次へ/Next →</button>}
          </div>
          
          {/* 練習問題に戻るボタンを追加 */}
          {previousStep && previousStep === 8 && (
            <div style={{ marginTop: '20px' }}>
              <button 
                onClick={handleReturnToPractice}
                style={{
                  padding: '10px 20px',
                  fontSize: '16px',
                  backgroundColor: '#4caf50',
                  color: 'white',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer'
                }}
              >
                練習問題に戻る (Exercise ③) / Return to Practice
              </button>
            </div>
          )}
        </>
      )}
      {step === 8 && (/*Same10の問題 */
        <>
          <h2>練習問題③(Exercise③)</h2>
          <p style={{ maxWidth: '600px', margin: '20px auto', fontSize: '30px' }}>{practiceProblem.num1} × {practiceProblem.num2} = ?</p>
          <input type="number" value={input} onChange={(e) => setInput(e.target.value)} 
          onKeyDown={(e) => e.key === 'Enter' && handlePracticeSubmit()} disabled={isStepCleared} style={{ padding: '10px', fontSize: '18px', width: '180px', marginBottom: '10px' }}/>
          <br />
          <button onClick={handlePracticeSubmit}>答え合わせ/Check answers</button>
          {message && <p style={{ whiteSpace: 'pre-line'}}>{message}</p>}
          <button onClick={handleBackSummary} style={{ marginLeft: '10px', padding: '10px 20px' }}>
            まとめに戻る|Back to Summary
          </button>
        </>
      )}
      {step === 9 && (
        <>
          <h2>🎉 練習完了！(Practice Complete!)</h2>
          <p>すべての問題に正解しました！</p>
          <p>(All questions were answered correctly!)</p>
          <button onClick={onGoBack}>トップに戻る/Back to Top</button>
        </>
      )}

      {/* トップに戻るボタンは常に表示 */}
      {step < 9 && (
        <div style={{ marginTop: '40px' }}>
          <button onClick={onGoBack}>トップに戻る/Back to Top</button>
        </div>
      )}
    </div>
  );
};

export default VedicTutorial;