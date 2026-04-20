import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'Ledger Knox - আমার হিসাব';
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#000',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
        }}
      >
        {/* Abstract Gradient Pattern */}
        <div 
          style={{
            position: 'absolute',
            top: '-20%',
            left: '-10%',
            width: '60%',
            height: '60%',
            background: 'radial-gradient(circle, #B45309 0%, transparent 70%)',
            opacity: 0.3,
            borderRadius: '50%',
          }}
        />
        <div 
          style={{
            position: 'absolute',
            bottom: '-20%',
            right: '-10%',
            width: '60%',
            height: '60%',
            background: 'radial-gradient(circle, #78350F 0%, transparent 70%)',
            opacity: 0.2,
            borderRadius: '50%',
          }}
        />

        {/* Logo Icon */}
        <div
          style={{
            width: 140,
            height: 140,
            background: '#B45309',
            borderRadius: 40,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 72,
            fontWeight: 900,
            color: 'white',
            marginBottom: 40,
            boxShadow: '0 20px 40px rgba(180, 83, 9, 0.4)',
            transform: 'rotate(-5deg)',
          }}
        >
          LK
        </div>

        {/* Text Details */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
          }}
        >
          <h1
            style={{
              fontSize: 88,
              fontWeight: 900,
              color: 'white',
              margin: 0,
              letterSpacing: '-0.05em',
              textShadow: '0 4px 12px rgba(0,0,0,0.5)',
            }}
          >
            Ledger Knox
          </h1>
          <p
            style={{
              fontSize: 32,
              fontWeight: 600,
              color: '#B45309',
              marginTop: 10,
              textTransform: 'uppercase',
              letterSpacing: '0.4em',
            }}
          >
            আমার হিসাব
          </p>
        </div>

        {/* Footer info */}
        <div
          style={{
            position: 'absolute',
            bottom: 60,
            display: 'flex',
            alignItems: 'center',
            gap: 20,
            color: 'rgba(255,255,255,0.4)',
            fontSize: 24,
            fontWeight: 700,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
          }}
        >
          Secure • Minimalist • Premium
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
