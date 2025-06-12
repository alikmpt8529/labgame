<<<<<<< HEAD
import React, { useState, useEffect } from 'react';

function Level1Screen({ onGoBack }) {
    const [inputValue, setInputValue] = useState('');
    const [inputValueSum, setInputValueSum] = useState(''); // step1の答え用
    const [inputValueSumSupport, setInputValueSumSupport] = useState(''); // step2の答え用
    const [message, setMessage] = useState('');
    const [showCorrectAnimation, setShowCorrectAnimation] = useState(false);
    const [currentStep, setCurrentStep] = useState(1); // 現在のステップを管理
=======
import { useEffect, useState } from 'react';

const VedicTutorial = ({ onGoBack }) => {
  const [step, setStep] = useState(0);
  const [input, setInput] = useState('');
  const [message, setMessage] = useState('');
  const [isStepCleared, setIsStepCleared] = useState(false);
  const [practiceProblem, setPracticeProblem] = useState({ num1: 0, num2: 0, answer: 0 });
>>>>>>> main

  const correctAnswers = {
    1: 6,
    2: 21,
    3: 621,
    7: 266,
  };

<<<<<<< HEAD
    const questionSum = "2 x (2+1)";
    const correctAnswerSum = 2 * (2 + 1);
    const questionSumSupport = "7 × 3";
    const correctAnswerSumSupport = 7 * 3;
    
    const checkAnswer = () => {
        if (parseInt(inputValue, 10) === correctAnswerProduct) {
            setMessage(`正解`);
            setShowCorrectAnimation(true);
            
            // 2秒後にアニメーションを非表示
            setTimeout(() => {
                setShowCorrectAnimation(false);
            }, 2000);
        } else {
            setMessage(`不正解`);
        }
    };
=======
  const stepContent = {
    0: {
      question: 'Step 0: インド式計算法の考え方を知ろう！',
      explanation: `27 × 23 を図で考えてみましょう！
      十の位と一の位を分けて考えることが、インド式計算法のポイントです。`,
      image: '/images/step0.png',
      inputRequired: false,
    },
    1: {
      question: 'Step 1: 2 × (2 + 1) = ?',
      explanation: '水色の部分の面積から上位桁を求めてみよう！',
      image: '/images/step1.png',
      inputRequired: true,
    },
    2: {
      question: 'Step 2: 7 × 3 = ?',
      explanation: '右下の紫色の部分の面積から下位桁を求めてみよう！',
      image: '/images/step2.png',
      inputRequired: true,
    },
    3: {
      question: 'Step 3: 27 × 23 = ?',
      explanation: `Step 1の「6」とStep 2の「21」を
      つなげて最終的な積を求めてみよう！`,
      image: '/images/step3.png',
      inputRequired: true,
    },
    4: {
      question: 'Step 4: 考え方を整理しよう！',
      explanation: `十の位の数が同じで、一の位の数の和が10になる2桁の数同士のかけ算は、
      この方法で簡単に計算できます。
>>>>>>> main

      (十の位の数) × (十の位の数 + 1) … 上位桁
      (一の位の数) × (もう一方の一の位の数) … 下位桁

<<<<<<< HEAD
    const handleInputChangeSum = (e) => {
        setInputValueSum(e.target.value);
        // Step1が正解の場合、Step2に進む
        if (parseInt(e.target.value, 10) === correctAnswerSum) {
            setTimeout(() => {
                setCurrentStep(2);
            }, 500);
        }
    };

    const handleInputChangeSumSupport = (e) => {
        setInputValueSumSupport(e.target.value);
        // Step2が正解の場合、Step3に進む
        if (parseInt(e.target.value, 10) === correctAnswerSumSupport) {
            setTimeout(() => {
                setCurrentStep(3);
            }, 500);
        }
    };

    // 共通のスタイル
    const stepContainerStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: '20px 0',
        fontSize: '20px',
        fontWeight: 'bold'
    };

    const labelStyle = {
        minWidth: '120px',
        textAlign: 'right',
        marginRight: '10px'
    };

    const equalsStyle = {
        margin: '0 10px',
        minWidth: '20px'
    };

    const inputStyle = {
        padding: '10px',
        fontSize: '18px',
        width: '150px',
        border: '1px solid #ccc',
        borderRadius: '4px',
        backgroundColor: '#ffffff',
        transition: 'background-color 0.2s ease'
    };

    const disabledInputStyle = {
        ...inputStyle,
        backgroundColor: '#f5f5f5',
        color: '#666',
        cursor: 'not-allowed'
    };

    // 正解アニメーションのスタイル
    const correctAnimationStyle = {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: '200px',
        zIndex: 9999,
        animation: 'fadeInOut 1s ease-in-out'
    };

    return (
        <>
            <div style={{ textAlign: 'center', marginTop: '100px' }}>
                <h1>レベル1-チュートリアル-</h1>

                <div style={stepContainerStyle}>
                    <span style={labelStyle}>step1: {questionSum}</span>
                    <span style={equalsStyle}>=</span>
                    <input
                        style={currentStep >= 1 ? inputStyle : disabledInputStyle}
                        type="text"
                        value={inputValueSum}
                        onChange={handleInputChangeSum}
                        disabled={currentStep < 1}
                        onMouseEnter={(e) => {
                            if (!e.target.disabled) {
                                e.target.style.backgroundColor = '#f0f0f0';
                            }
                        }}
                        onMouseLeave={(e) => {
                            if (!e.target.disabled) {
                                e.target.style.backgroundColor = '#ffffff';
                            }
                        }}
                    />
                    {parseInt(inputValueSum, 10) === correctAnswerSum && (
                        <span style={{ marginLeft: '10px', color: 'green' }}>✓</span>
                    )}
                </div>

                <div style={stepContainerStyle}>
                    <span style={labelStyle}>step2: {questionSumSupport}</span>
                    <span style={equalsStyle}>=</span>
                    <input
                        style={currentStep >= 2 ? inputStyle : disabledInputStyle}
                        type="text"
                        value={inputValueSumSupport}
                        onChange={handleInputChangeSumSupport}
                        disabled={currentStep < 2}
                        onMouseEnter={(e) => {
                            if (!e.target.disabled) {
                                e.target.style.backgroundColor = '#f0f0f0';
                            }
                        }}
                        onMouseLeave={(e) => {
                            if (!e.target.disabled) {
                                e.target.style.backgroundColor = '#ffffff';
                            }
                        }}
                    />
                    {parseInt(inputValueSumSupport, 10) === correctAnswerSumSupport && (
                        <span style={{ marginLeft: '10px', color: 'green' }}>✓</span>
                    )}
                </div>

                <div style={{...stepContainerStyle, fontSize: '24px'}}>
                    <span style={labelStyle}>step3: {questionProduct}</span>
                    <span style={equalsStyle}>=</span>
                    <input
                        style={currentStep >= 3 ? inputStyle : disabledInputStyle}
                        type="text"
                        value={inputValue}
                        onChange={handleInputChange}
                        disabled={currentStep < 3}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' && currentStep >= 3) {
                                checkAnswer();
                            }
                        }}
                        onMouseEnter={(e) => {
                            if (!e.target.disabled) {
                                e.target.style.backgroundColor = '#f0f0f0';
                            }
                        }}
                        onMouseLeave={(e) => {
                            if (!e.target.disabled) {
                                e.target.style.backgroundColor = '#ffffff';
                            }
                        }}
                    />
                </div>

                {message && (
                    <p style={{ marginTop: '20px', fontSize: '18px', color: message === '正解' ? 'red' : 'blue' }}>
                        {message}
                    </p>
                )}
                <button
                    onClick={onGoBack}
                    style={{ display: 'block', margin: '30px auto', padding: '10px 20px' }}
                >
                    戻る
                </button>
            </div>

            {/* 正解アニメーション */}
            {showCorrectAnimation && (
                <div style={correctAnimationStyle}>
                    ⭕️
                </div>
            )}

            {/* CSS アニメーション */}
            <style jsx>{`
                @keyframes fadeInOut {
                    0% { opacity: 0; transform: scale(0.5); }
                    50% { opacity: 1; transform: scale(1.1); }
                    100% { opacity: 1; transform: scale(1); }
                }
            `}</style>
        </>
    );
}
=======
      図で構造を整理して練習問題にチャレンジしよう！`,
      image: '/images/step4.png',
      inputRequired: false,
    },
    7: {
      question: 'Step 5: 14 × 19 = ?',
      explanation: `十の位の数で一の位の数が違う時は以下のように考えられます。
      {(一方の数)+(他方の数の一の位)}×(十の位の数×10)+(一の位の数の積)
      図で構造を整理して練習問題にチャレンジしよう！`,
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
      setMessage('✅ 正解！次のステップに進みます...');
      setIsStepCleared(true);
      setTimeout(() => {
        setStep((prev) => prev + 1);
        setInput('');
        setMessage('');
        setIsStepCleared(false);
      }, 1000);
    } else {
      setMessage('❌ 不正解');
    }
  };


  const handlePracticeSubmit = () => {
    const userAnswer = parseInt(input, 10);
    if (userAnswer === practiceProblem.answer) {
      setMessage('✅ 正解！次の問題へ...');
      setTimeout(() => {
        setStep((prev) => prev + 1);
        setInput('');
        setMessage('');
      }, 1000);
    } else {
      setMessage('❌ 不正解');
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
          <p className="explanation-text" style={{ maxWidth: '600px', margin: '20px auto', fontSize: '18px' }}>{current.explanation}</p>
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
              <button onClick={handleSubmit} disabled={isStepCleared}>答え合わせ</button>
            </>
          )}

          {message && <p style={{ marginTop: '20px', fontSize: '18px', color: message.includes('正解') ? 'green' : 'red' }}>{message}</p>}

          <div style={{ marginTop: '30px' }}>
            {step > 0 && <button onClick={handleBack} style={{ padding: '8px 16px' }}>← 前へ</button>}
            {step === 0 && <button onClick={handleNextStep0} style={{ padding: '8px 16px', marginLeft: '10px' }}>次へ →</button>}
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
              <button onClick={handleSubmit} disabled={isStepCleared}>答え合わせ</button>
            </>
          )}

          {message && <p style={{ marginTop: '20px', fontSize: '18px', color: message.includes('正解') ? 'green' : 'red' }}>{message}</p>}

          <div style={{ marginTop: '30px' }}>
            {step > 0 && <button onClick={handleBack} style={{ padding: '8px 16px' }}>← 前へ</button>}
            {step === 0 && <button onClick={handleNextStep0} style={{ padding: '8px 16px', marginLeft: '10px' }}>次へ →</button>}
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
          <button
            onClick={() => setStep(5)}
            style={{ marginTop: '20px', padding: '10px 20px', fontSize: '16px' }}
          >
            練習問題へチャレンジ →
          </button>
        </>
      )}


      {step === 5 && (
        <>
          <h2>練習問題①</h2>
          <p style={{ maxWidth: '600px', margin: '20px auto', fontSize: '30px' }}>{practiceProblem.num1} × {practiceProblem.num2} = ?</p>
          <input type="number" value={input} onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handlePracticeSubmit()} disabled={isStepCleared} style={{ padding: '10px', fontSize: '18px', width: '180px', marginBottom: '10px' }}/>
          <br />
          <button onClick={handlePracticeSubmit}>答え合わせ</button>
          {message && <p>{message}</p>}
        </>
      )}

      {step === 6 && (
        <>
          <h2>練習問題②</h2>
          <p style={{ maxWidth: '600px', margin: '20px auto', fontSize: '30px' }}>{practiceProblem.num1} × {practiceProblem.num2} = ?</p>
          <input type="number" value={input} onChange={(e) => setInput(e.target.value)} 
          onKeyDown={(e) => e.key === 'Enter' && handlePracticeSubmit()} disabled={isStepCleared} style={{ padding: '10px', fontSize: '18px', width: '180px', marginBottom: '10px' }}/>
          <br />
          <button onClick={handlePracticeSubmit}>答え合わせ</button>
          {message && <p>{message}</p>}
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
              <button onClick={handleSubmit} disabled={isStepCleared}>答え合わせ</button>
            </>
          )}

          {message && <p style={{ marginTop: '20px', fontSize: '18px', color: message.includes('正解') ? 'green' : 'red' }}>{message}</p>}

          <div style={{ marginTop: '30px' }}>
            {step > 0 && <button onClick={handleBack} style={{ padding: '8px 16px' }}>← 前へ</button>}
            {step === 0 && <button onClick={handleNextStep0} style={{ padding: '8px 16px', marginLeft: '10px' }}>次へ →</button>}
          </div>
        </>
      )}
      {step === 8 && (/*Same10の問題 */
        <>
          <h2>練習問題②</h2>
          <p style={{ maxWidth: '600px', margin: '20px auto', fontSize: '30px' }}>{practiceProblem.num1} × {practiceProblem.num2} = ?</p>
          <input type="number" value={input} onChange={(e) => setInput(e.target.value)} 
          onKeyDown={(e) => e.key === 'Enter' && handlePracticeSubmit()} disabled={isStepCleared} style={{ padding: '10px', fontSize: '18px', width: '180px', marginBottom: '10px' }}/>
          <br />
          <button onClick={handlePracticeSubmit}>答え合わせ</button>
          {message && <p>{message}</p>}
        </>
      )}
      {step === 9 && (
        <>
          <h2>🎉 練習完了！</h2>
          <p>すべての問題に正解しました！</p>
          <button onClick={onGoBack}>トップに戻る</button>
        </>
      )}

      {/* トップに戻るボタンは常に表示 */}
      {step < 9 && (
        <div style={{ marginTop: '40px' }}>
          <button onClick={onGoBack}>トップに戻る</button>
        </div>
      )}
    </div>
  );
};
>>>>>>> main

export default VedicTutorial;