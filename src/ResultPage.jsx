export default function ResultPage({ onGoBack }) {
  return (
    <div style={{ textAlign: 'center', marginTop: '100px' }}>
        <h1>レベルクリア！(level clear)</h1>
        <button
            onClick={onGoBack}
            style={{ display: 'block', margin: '30px auto', padding: '10px 20px' }}
        >
            ホームに戻る(return to home)
        </button>
    </div>
  )
}
