import { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import RepairList from './components/RepairList';
import RiskMap from './components/RiskMap';
import AdminControlPanel from './components/AdminControlPanel';


export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const [assetData, setAssetData] = useState([]);

  // 3. The side-effect to fetch data securely from your backend
  useEffect(() => {
    const fetchAssets = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/assets');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setAssetData(data); // 🔄 Overwrites the empty array with your live database rows
      } catch (err) {
        console.error('Fetch error:', err);
      }
    };

    fetchAssets();
  }, []); // Empty array ensures this only runs once when the app starts

  const totalAssets = assetData.length;
  const criticalThreats = assetData.filter(a => a.ai_risk_score >= 75).length;
  const avgRisk = Math.round(assetData.reduce((acc, curr) => acc + curr.ai_risk_score, 0) / totalAssets) || 0;

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <div style={styles.dashboardHome}>
            {/* Top Text Segment */}
            <div style={styles.welcomeBanner}>
              <h2 style={styles.viewTitle}>📊 Executive Asset Command Overview</h2>
              <p style={styles.viewSubtitle}>AI synthesis of telemetry for the City of Brampton municipal grid.</p>
            </div>
            
            {/* 🚀 Fully Expanded Hero Cards Grid */}
            <div style={styles.heroGrid}>
              <div style={styles.heroCard}>
                <h4 style={styles.cardLabel}>System Stability Index</h4>
                <p style={styles.cardValue}>{100 - avgRisk}%</p>
                <div style={styles.statusPillGroup}>
                  <span style={styles.cardTrend}>🟢 Nominal Range</span>
                </div>
              </div>
              
              <div style={styles.heroCard}>
                <h4 style={styles.cardLabel}>Active Satellite Telemetry Feeds</h4>
                <p style={styles.cardValue}>Live</p>
                <div style={styles.statusPillGroup}>
                  <span style={styles.cardTrend}>🛰️ Sentinel-2 Orbits Synced</span>
                </div>
              </div>
            </div>
          </div>
        );
      case 'risk-map':
        return <RiskMap assets={assetData} />;
      case 'repairs':
        return <RepairList assets={assetData} />;
      case 'admin':
        return <AdminControlPanel />;
      default:
        return <div style={{ color: '#94a3b8' }}>Select an operational quadrant.</div>;
    }
  };

  return (
    <div style={styles.appWrapper}>
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <div style={styles.mainContainer}>
        {/* Fixed Horizontal Telemetry Header Block */}
        <header style={styles.topRibbon}>
          <div style={styles.metaBlock}>
            <span style={styles.metaLabel}>NETWORK ASSETS TRACKED</span>
            <span style={styles.metaValue}>{totalAssets} Nodes</span>
          </div>
          <div style={styles.divider} />
          <div style={styles.metaBlock}>
            <span style={styles.metaLabel}>CRITICAL ANOMALIES</span>
            <span style={{ ...styles.metaValue, color: criticalThreats > 0 ? '#f87171' : '#34d399' }}>
              {criticalThreats} Escalations
            </span>
          </div>
          <div style={styles.divider} />
          <div style={styles.metaBlock}>
            <span style={styles.metaLabel}>AGGREGATE NETWORK RISK</span>
            <span style={styles.metaValue}>{avgRisk} / 100</span>
          </div>
        </header>

        {/* 🔒 Height-Locked Content Viewport Box */}
        <main style={styles.contentBody}>
          {renderContent()}
        </main>
      </div>
    </div>
  );
}

const styles = {
  appWrapper: {
    display: 'flex',
    width: '100vw',
    height: '100vh',
    backgroundColor: '#090d16',
    color: '#f8fafc',
    overflow: 'hidden',
    fontFamily: 'Inter, system-ui, sans-serif',
  },
  mainContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    overflow: 'hidden',
  },
  topRibbon: {
    height: '56px',
    backgroundColor: '#0f172a',
    borderBottom: '1px solid #1e293b',
    display: 'flex',
    alignItems: 'center',
    padding: '0 24px',
    gap: '24px',
    boxSizing: 'border-box',
  },
  metaBlock: { display: 'flex', flexDirection: 'column' },
  metaLabel: { fontSize: '9px', color: '#64748b', fontWeight: '700', letterSpacing: '0.05em' },
  metaValue: { fontSize: '13px', color: '#cbd5e1', fontWeight: '600' },
  divider: { width: '1px', height: '16px', backgroundColor: '#1e293b' },
  contentBody: {
    flex: 1,
    padding: '24px',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    boxSizing: 'border-box',
    width: '100%',
  },
  dashboardHome: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
    flex: 1, // 👑 Instructs the inner homepage panel to stretch full height
    width: '100%',
  },
  welcomeBanner: { 
    borderBottom: '1px solid #1e293b', 
    paddingBottom: '16px' 
  },
  viewTitle: { margin: 0, fontSize: '20px', fontWeight: '700', color: '#f1f5f9' },
  viewSubtitle: { margin: '4px 0 0 0', fontSize: '13px', color: '#64748b' },
  heroGrid: { 
    display: 'flex', 
    gap: '24px', 
    flex: 1, // 👑 Stretches the card wrapper all the way to the screen's bottom boundary
    width: '100%',
    minHeight: 0 
  },
  heroCard: {
    flex: 1, // 👑 Maximizes card horizontal real-estate across screen splits
    backgroundColor: '#0f172a',
    border: '1px solid #1e293b',
    borderRadius: '8px',
    padding: '24px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  cardLabel: { margin: 0, fontSize: '11px', color: '#94a3b8', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.03em' },
  cardValue: { margin: '16px 0', fontSize: '30px', fontWeight: '800', color: '#ffffff' },
  statusPillGroup: { marginTop: 'auto' }, // Pushes internal indicators cleanly to card baseline
  cardTrend: { fontSize: '12px', color: '#64748b', fontWeight: '500' },
};