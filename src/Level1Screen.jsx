import React, { useState, useEffect } from 'react';

function Level1Screen({ onGoBack }) {
    const [inputValue, setInputValue] = useState('');
    const [inputValueSum, setInputValueSum] = useState(''); // step1の答え用
    const [inputValueSumSupport, setInputValueSumSupport] = useState(''); // step2の答え用
    const [message, setMessage] = useState('');
    const [showCorrectAnimation, setShowCorrectAnimation] = useState(false);
    const [currentStep, setCurrentStep] = useState(1); // 現在のステップを管理

    const questionProduct = "27 × 23";
    const correctAnswerProduct = 27 * 23;

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

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
        setMessage(''); // 入力中はメッセージをクリア
    };

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

export default Level1Screen;