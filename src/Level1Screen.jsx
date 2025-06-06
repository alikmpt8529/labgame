import React, { useState } from 'react';

function Level1Screen({ onGoBack }) {
    const [inputValue, setInputValue] = useState('');
    const [inputValueSum, setInputValueSum] = useState(''); // 19 + 4 の答え用
    const [inputValueSumSupport, setInputValueSumSupport] = useState(''); // 9 * 4 の答え用
    const [message, setMessage] = useState('');

    const questionProduct = "27 × 23";
    const correctAnswerProduct = 27 * 23;

    const questionSum = "2 x (2+1)";
    const correctAnswerSum = 2 * (2 + 1); // 必要であれば判定ロジックも追加
    const questionSumSupport = "7 × 3";
    const correctAnswerSumSupport = 7 * 3; // 9 * 4 の答え
    const checkAnswer = () => {
        if (parseInt(inputValue, 10) === correctAnswerProduct) {
            setMessage(`正解`);
        } else {
            setMessage(`不正解`);
        }
    };

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
        setMessage(''); // 入力中はメッセージをクリア
    };

    const handleInputChangeSum = (e) => {
        setInputValueSum(e.target.value);
    };

    const handleInputChangeSumSupport = (e) => {
        setInputValueSumSupport(e.target.value);
    };

    return (
        <div style={{ textAlign: 'center', marginTop: '100px' }}>
            <h1>レベル1-インド式計算法を練習しよう-</h1>

            <p style={{ fontSize: '20px', fontWeight: 'bold', margin: '20px 0 5px 0' }}>
                step1: {questionSum} =

                <input
                    type="text"
                    value={inputValueSum}
                    onChange={handleInputChangeSum}
                    style={{ padding: '10px', fontSize: '18px', width: '150px', marginBottom: '20px' }}
                />
            </p>
            <p style={{ fontSize: '20px', fontWeight: 'bold', margin: '20px 0 5px 0' }}>
                step2: {questionSumSupport} =
                <input
                    type="text"
                    value={inputValueSumSupport}
                    onChange={handleInputChangeSumSupport}
                    style={{ padding: '10px', fontSize: '18px', width: '150px', marginBottom: '20px' }}
                />
            </p>
            <p style={{ fontSize: '24px', fontWeight: 'bold', margin: '20px 0' }}>
                step3: {questionProduct} =
                <input
                    type="text"
                    value={inputValue}
                    onChange={handleInputChange}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            checkAnswer();
                        }
                    }}
                    style={{ padding: '10px', fontSize: '18px', marginRight: '10px', width: '150px' }}
                />
            </p>
            {message && (
                <p style={{ marginTop: '20px', fontSize: '18px', color: message.includes('正解') ? 'green' : 'red' }}>
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
    );
}

export default Level1Screen;