import React from 'react';

function App() {
  React.useEffect(() => {
    console.log('✅ zyFlows App loaded successfully');
  }, []);

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      padding: '2rem',
      textAlign: 'center'
    }}>
      <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>
        🚀
      </div>
      <h1 style={{ 
        fontSize: '3rem', 
        marginBottom: '1rem',
        fontWeight: 700 
      }}>
        zyFlows
      </h1>
      <p style={{ 
        fontSize: '1.2rem', 
        opacity: 0.9, 
        marginBottom: '2rem',
        maxWidth: '600px'
      }}>
        Votre plateforme d'automatisation de workflows est maintenant opérationnelle
      </p>
      <button 
        onClick={() => {
          console.log('Button clicked!');
          alert('🎉 zyFlows fonctionne parfaitement !');
        }}
        style={{
          background: 'white',
          color: '#667eea',
          padding: '1rem 2rem',
          border: 'none',
          borderRadius: '50px',
          fontSize: '1.1rem',
          fontWeight: 600,
          cursor: 'pointer',
          transition: 'transform 0.2s',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.05)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
        }}
      >
        Tester l'application
      </button>
      <div style={{
        marginTop: '3rem',
        padding: '1rem',
        background: 'rgba(255,255,255,0.1)',
        borderRadius: '10px',
        fontSize: '0.9rem'
      }}>
        <p>✅ JavaScript chargé</p>
        <p>✅ React initialisé</p>
        <p>✅ Application fonctionnelle</p>
      </div>
    </div>
  );
}

export default App;
