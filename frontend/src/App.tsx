import { useState } from 'react';
import './App.css';

function App() {
  const [color, setColor] = useState<string>('#3498db')

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setColor(e.target.value)
  }

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center',
      minHeight: '100vh', 
      gap: '2rem',
      fontFamily: 'system-ui, sans-serif' 
    }}>

      <br/>
      <h1 style={{ marginTop: '0.5rem', marginBottom: 0 }}>ColorNamer</h1>
      <h3 style={{ marginTop: '-1.5rem', textAlign: 'center' }}>
        <i>An appeal to authority<br/>for stupid arguments</i>
      </h3>
      
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexDirection: 'column' }}>
        <input 
          type="color"
          value={color}
          onChange={handleColorChange}
          className="custom-picker"
          style={{ backgroundColor: color }}
        />

        <input 
          type="text" 
          value={color} 
          onChange={handleColorChange}
          placeholder="#FFFFFF"
          maxLength={7}
          style={{ padding: '0.5rem', fontSize: '1.2rem', textTransform: 'uppercase', textAlign: 'center' }}
        />
      </div>

      <div style={{ marginTop: '2rem' }}>
        <div
          className="button"
          style={{
            backgroundColor: color,
            padding: '1rem 2rem',
            borderRadius: '16px',
            display: 'inline-block',
            fontWeight: 'bold',
            color: '#fff',
            fontSize: '110%',
            cursor: 'pointer'
          }}
        >
          Name color
        </div>
      </div>
    </div>
  )
}

export default App