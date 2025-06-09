import React, { useState } from 'react';

const VedicTutorial = ({ onGoBack }) => {
  const [step, setStep] = useState(0);
  const [input, setInput] = useState('');
  const [message, setMessage] = useState('');
  const [isStepCleared, setIsStepCleared] = useState(false);

  const correctAnswers = {
    1: 6,
    2: 21,
    3: 621,
  };

  const handleSubmit = () => {
    const userAnswer = parseInt(input, 10);
    if (userAnswer === correctAnswers[step]) {
      setMessage('✅ 正解！次のステップに進みます...');
      setIsStepCleared(true);
      setTimeout(() => {
        setStep((prev) => Math.min(prev + 1, 4));
        setInput('');
        setMessage('');
        setIsStepCleared(false);
      }, 1000);
    } else {
      setMessage('❌ 不正解');
    }
  };

  const handleNextStep0 = () => {
    setStep(1);
    setInput('');
    setMessage('');
    setIsStepCleared(false);
  };

  const handleBack = () => {
    setStep((prev) => Math.max(prev - 1, 0));
    setInput('');
    setMessage('');
    setIsStepCleared(false);
  };

  const stepContent = {
    0: {
      question: 'Step 0: 問題のしくみを見てみよう',
      explanation: '27 × 23 を図で分解してみましょう。十の位と一の位を分けて考えることが、インド式計算のポイントです。',
      image: '/images/intro.png',
      inputRequired: false,
    },
    1: {
      question: 'Step 1: 2 × (2 + 1) = ?',
      explanation: '十の位が同じ「2」なので、2 に 1 を足して 3 にし、2 × 3 = 6 を計算します。',
      image: '/images/step1.png',
      inputRequired: true,
    },
    2: {
      question: 'Step 2: 7 × 3 = ?',
      explanation: '一の位 7 と 3 を掛け算して、右下の面積 7 × 3 = 21 を求めます。',
      image: '/images/step2.png',
      inputRequired: true,
    },
    3: {
      question: 'Step 3: 27 × 23 = ?',
      explanation: 'Step 1の「6」とStep 2の「21」をつなげて答えを出しましょう。',
      image: '/images/step3.png',
      inputRequired: true,
    },
    4: {
      question: 'Step 4: 答えを確認しよう',
      explanation: '最終的に 600 + 21 = 621 になります。この構造を図でもう一度確認しましょう。',
      image: '/images/final.png',
      inputRequired: false,
    },
  };

  const current = stepContent[step];

  return (
    <div style={{ textAlign: 'center', padding: '40px' }}>
      <h1>インド式掛け算チュートリアル</h1>
      <h2>{current.question}</h2>

      <p style={{ maxWidth: '600px', margin: '20px auto', fontSize: '18px' }}>
        {current.explanation}
      </p>

      <img
        src={current.image}
        alt={`step${step}`}
        style={{ width: '700px', marginBottom: '20px', borderRadius: '10px' }}
      />

      {current.inputRequired && (
        <>
          <input
            type="number"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && !isStepCleared && handleSubmit()}
            disabled={isStepCleared}
            style={{
              padding: '10px',
              fontSize: '18px',
              width: '180px',
              marginBottom: '10px',
            }}
          />
          <br />
          <button
            onClick={handleSubmit}
            disabled={isStepCleared}
            style={{
              padding: '10px 20px',
              fontSize: '16px',
              marginTop: '10px',
              opacity: isStepCleared ? 0.5 : 1,
              cursor: isStepCleared ? 'not-allowed' : 'pointer',
            }}
          >
            答えを確認
          </button>
        </>
      )}

      {message && (
        <p
          style={{
            marginTop: '20px',
            fontSize: '18px',
            color: message.includes('正解') ? 'green' : 'red',
          }}
        >
          {message}
        </p>
      )}

      <div style={{ marginTop: '30px' }}>
        {step > 0 && (
          <button
            onClick={handleBack}
            style={{ padding: '8px 16px' }}
          >
            ← 前へ
          </button>
        )}

        {/* Step 0専用の「次へ」ボタン */}
        {step === 0 && (
          <button
            onClick={handleNextStep0}
            style={{ padding: '8px 16px', marginLeft: '10px' }}
          >
            次へ →
          </button>
        )}
      </div>

      {step === 4 && (
        <p style={{ fontSize: '20px', color: 'green', marginTop: '30px' }}>
          🎉 チュートリアル完了！ お疲れ様でした！
        </p>
      )}

      <button
        onClick={onGoBack}
        style={{ marginTop: '40px', padding: '10px 20px' }}
      >
        トップに戻る
      </button>
    </div>
  );
};

export default VedicTutorial;
