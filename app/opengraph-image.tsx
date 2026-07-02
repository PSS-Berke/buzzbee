import { ImageResponse } from 'next/og';

export const alt = 'Busby — American-Made Mattresses';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#203552',
          backgroundImage: 'radial-gradient(ellipse at 50% 0%, #2A63A9 0%, #203552 60%)',
        }}
      >
        <div
          style={{
            fontSize: 132,
            fontWeight: 700,
            color: '#ffffff',
            letterSpacing: '-0.02em',
            display: 'flex',
          }}
        >
          Busby
        </div>
        <div
          style={{
            width: 120,
            height: 6,
            backgroundColor: '#F3A51D',
            borderRadius: 3,
            margin: '28px 0 32px',
            display: 'flex',
          }}
        />
        <div
          style={{
            fontSize: 40,
            color: '#F7B94D',
            display: 'flex',
          }}
        >
          American-Made Mattresses
        </div>
        <div
          style={{
            fontSize: 28,
            color: 'rgba(255, 255, 255, 0.75)',
            marginTop: 20,
            display: 'flex',
          }}
        >
          Handcrafted in the USA · 100-Night Trial · 10-Year Warranty
        </div>
      </div>
    ),
    { ...size }
  );
}
