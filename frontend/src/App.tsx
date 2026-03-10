import { useState } from 'react';
import './App.css';

const hexToRgb = (hex: string) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : { r: 0, g: 0, b: 0 };
};

const App: React.FC = () => {
  const INITIAL_COLOR = '#3498db';

  const [color, setColor] = useState<string>(INITIAL_COLOR);
  const [colorName, setColorName] = useState<string | null>(null);

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setColor(e.target.value)
  }

  const resetApp = () => {
    setColor(INITIAL_COLOR);
    setColorName(null);
  };

  const nameColor = async () => {
    const rgb = hexToRgb(color);

    try {
      const response = await fetch('http://localhost:3000/api/color', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(rgb),
      });

      const data = await response.json();
      
      if (data.closestColor) {
        setColorName(data.closestColor);
      }
    } catch (error) {
      console.error('Error fetching color name:', error);
    }
  };

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
      
      {!colorName && (
        <>
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
            onClick={nameColor}
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
      </>
    )}

      {colorName && (
        <>
          <div style={{
            marginTop: '1rem',
            marginBottom: '2rem',
            padding: '2rem',
            paddingTop: '0.7rem',
            borderRadius: '16px',
            backgroundColor: '#f5f5f5',
            textAlign: 'center',
            border: `4px solid ${color}`,
            animation: 'fadeInRight 0.5s ease-out'
          }}>
            <h2><i>Your color is...</i></h2>
            <h1 style={{ color: color, fontSize: '3rem', margin: 0 }}>
              {colorName}
            </h1>
          </div>

          <div
            className="button"
            onClick={resetApp}
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
            New color
          </div>
        </>
      )}
    </div>
  );
}

export default App