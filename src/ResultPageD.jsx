export default function ResultPageD({ onGoBack }) {
  return (
    <div style={{ textAlign: 'center', marginTop: '100px' }}>
        <h1>レベルクリア！</h1>
        <h2 style={{color: 'blue'}}>
          RANK D
        </h2>
        <button
            onClick={onGoBack}
            style={{ display: 'block', margin: '30px auto', padding: '10px 20px' }}
        >
            ホームに戻る
        </button>
    </div>
  )
}