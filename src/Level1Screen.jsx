import React, { useState, useEffect } from 'react';

function Level1Screen({ onGoBack }) {
    const [inputValue, setInputValue] = useState('');
    const [inputValueSum, setInputValueSum] = useState(''); // 19 + 4 の答え用
    const [inputValueSumSupport, setInputValueSumSupport] = useState(''); // 9 * 4 の答え用
    const [message, setMessage] = useState('');
    const [showCorrectAnimation, setShowCorrectAnimation] = useState(false);

    const questionProduct = "27 × 23";
    const correctAnswerProduct = 27 * 23;

    const questionSum = "2 x (2+1)";
    const correctAnswerSum = 2 * (2 + 1); // 必要であれば判定ロジックも追加
    const questionSumSupport = "7 × 3";
    const correctAnswerSumSupport = 7 * 3; // 9 * 4 の答え
    
    const checkAnswer = () => {
        if (parseInt(inputValue, 10) === correctAnswerProduct) {
            setMessage(`正解`);
            setShowCorrectAnimation(true);
            
            // 1秒後にアニメーションを非表示
            setTimeout(() => {
                setShowCorrectAnimation(false);
            }, 2000);
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

    // 共通のスタイル
    const stepContainerStyle = {
        display: 'flex',
        justifyContent: 'center',  // 水平方向の中央揃え
        alignItems: 'center',      // 垂直方向の中央揃え
        margin: '20px 0',          // 上下のマージン
        fontSize: '20px',
        fontWeight: 'bold'
    };

    const labelStyle = {
        minWidth: '120px',    // ラベル部分の最小幅
        textAlign: 'right',   // 右寄せで「=」の前で揃える
        marginRight: '10px'   // 「=」との間隔
    };

    const equalsStyle = {
        margin: '0 10px',     // 「=」の左右マージン
        minWidth: '20px'      // 「=」の最小幅
    };

    const inputStyle = {
        padding: '10px',
        fontSize: '18px',
        width: '150px'        // 入力欄の固定幅
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
                        style={inputStyle}
                        type="text"
                        value={inputValueSum}
                        onChange={handleInputChangeSum}
                    />
                </div>

                <div style={stepContainerStyle}>
                    <span style={labelStyle}>step2: {questionSumSupport}</span>
                    <span style={equalsStyle}>=</span>
                    <input
                        style={inputStyle}
                        type="text"
                        value={inputValueSumSupport}
                        onChange={handleInputChangeSumSupport}
                    />
                </div>

                <div style={{...stepContainerStyle, fontSize: '24px'}}>
                    <span style={labelStyle}>step3: {questionProduct}</span>
                    <span style={equalsStyle}>=</span>
                    <input
                        style={inputStyle}
                        type="text"
                        value={inputValue}
                        onChange={handleInputChange}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                checkAnswer();
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

export default Level1Screen;