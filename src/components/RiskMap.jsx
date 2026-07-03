import { useState } from 'react';

export default function RiskMap({ assets = [] }) {
  const [selectedAsset, setSelectedAsset] = useState(null);

  if (!assets || assets.length === 0) return null;

  return (
    <div style={styles.gisWorkspaceContainer}>
      <div style={styles.viewHeaderBlock}>
        <h3 style={styles.viewTitle}>🗺️ Geospatial GIS Threat Matrix Vector Canvas</h3>
        <p style={styles.viewSubtitle}>Millimeter-precision telemetry mapping generated from active synthetic-aperture radar arrays.</p>
      </div>

      <div style={styles.fluidSplitGrid}>
        {/* Left Side: Height-Locked Map Plotting Workspace */}
        <div style={styles.mapViewportCanvas}>
          <div style={styles.gridMatrixBackdrop}>
            <span style={styles.satSyncIndicator}>🛰️ Satellite Uplink Locked</span>
            
            {assets.map((asset) => {
              const coreColor = asset.ai_risk_score >= 75 ? '#ef4444' : asset.ai_risk_score >= 40 ? '#f59e0b' : '#10b981';
              return (
                <button
                  key={asset.asset_id}
                  onClick={() => setSelectedAsset(asset)}
                  style={{
                    ...styles.coordinateNodePin,
                    backgroundColor: coreColor,
                    boxShadow: `0 0 10px ${coreColor}`,
                    // Updated to access longitude and latitude directly
                    left: `${((parseFloat(asset.longitude) + 80) * 1500) % 65 + 15}%`,
                    top: `${((parseFloat(asset.latitude) - 43) * 1800) % 55 + 20}%`,
                  }}
                  title={asset.type}
                />
              );
            })}
          </div>
        </div>

        {/* Right Side: Sleek Monochromatic Telemetry Audit Node */}
        <div style={styles.gisTelemetryInspector}>
          <h4 style={styles.inspectorTitle}>🔍 System Node Inspector</h4>
          {selectedAsset ? (
            <div style={styles.activeProfileGrid}>
              <h5 style={styles.profileHeaderTitle}>{selectedAsset.type}</h5>
              <span style={styles.profileMonospaceCode}>{selectedAsset.asset_id}</span>
              
              <div style={styles.metricDataChain}>
                <div style={styles.chainRow}>
                  <span style={styles.chainLabel}>GEOSPATIAL AXIS</span>
                  {/* Updated to access longitude and latitude directly */}
                  <span style={styles.chainValue}>{selectedAsset.latitude}, {selectedAsset.longitude}</span>
                </div>
                <div style={styles.chainRow}>
                  <span style={styles.chainLabel}>RISK CLASSIFICATION</span>
                  <span style={styles.chainValue}>{selectedAsset.type}</span>
                </div>
                <div style={styles.chainRow}>
                  <span style={styles.chainLabel}>CRITICAL INDEX LEVEL</span>
                  <span style={{ ...styles.chainValue, color: selectedAsset.ai_risk_score >= 75 ? '#f87171' : '#ffffff' }}>
                    {selectedAsset.ai_risk_score} / 100
                  </span>
                </div>
                <div style={styles.chainRow}>
                  <span style={styles.chainLabel}>OPERATIONAL STATUS</span>
                  <span style={styles.chainValue}>{selectedAsset.status}</span>
                </div>
              </div>
              <button style={styles.resetInspectorBtn} onClick={() => setSelectedAsset(null)}>
                Deselect Infrastructure Node
              </button>
            </div>
          ) : (
            <div style={styles.emptyInspectorWrapper}>
              <p style={styles.emptyInspectorPrompt}>Select an active geometric coordinate pin on the canvas to inspect real-time radar fields.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const styles = {
  gisWorkspaceContainer: { height: '100%', display: 'flex', flexDirection: 'column', overflow: 'hidden' },
  viewHeaderBlock: { marginBottom: '20px' },
  viewTitle: { margin: 0, fontSize: '18px', fontWeight: '700', color: '#f1f5f9' },
  viewSubtitle: { margin: '4px 0 0 0', fontSize: '13px', color: '#64748b' },
  fluidSplitGrid: { flex: 1, display: 'flex', gap: '24px', overflow: 'hidden', paddingBottom: '12px' },
  mapViewportCanvas: { flex: 2, backgroundColor: '#090d16', border: '1px solid #1e293b', borderRadius: '8px', position: 'relative', overflow: 'hidden' },
  gridMatrixBackdrop: { width: '100%', height: '100%', backgroundImage: 'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)', backgroundSize: '24px 24px' },
  satSyncIndicator: { position: 'absolute', top: '16px', left: '16px', backgroundColor: 'rgba(16, 185, 129, 0.08)', border: '1px solid rgba(16, 185, 129, 0.2)', color: '#10b981', padding: '4px 10px', borderRadius: '4px', fontSize: '11px', fontWeight: '600', fontFamily: 'monospace' },
  coordinateNodePin: { position: 'absolute', width: '10px', height: '10px', borderRadius: '50%', border: '2px solid #ffffff', cursor: 'pointer', padding: 0, transition: 'transform 0.15s ease' },
  gisTelemetryInspector: { flex: 1, backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '8px', padding: '20px', display: 'flex', flexDirection: 'column', overflowY: 'auto' },
  inspectorTitle: { margin: '0 0 16px 0', fontSize: '12px', fontWeight: '700', color: '#64748b', letterSpacing: '0.05em' },
  emptyInspectorWrapper: { flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' },
  emptyInspectorPrompt: { color: '#475569', fontSize: '13px', textAlign: 'center', lineHeight: '1.5' },
  activeProfileGrid: { display: 'flex', flexDirection: 'column', height: '100%' },
  profileHeaderTitle: { margin: '0 0 4px 0', fontSize: '15px', fontWeight: '600', color: '#ffffff' },
  profileMonospaceCode: { fontFamily: 'monospace', color: '#3b82f6', fontSize: '11px', fontWeight: '600', backgroundColor: 'rgba(59, 130, 246, 0.08)', padding: '2px 6px', borderRadius: '4px', alignSelf: 'flex-start', marginBottom: '20px' },
  metricDataChain: { display: 'flex', flexDirection: 'column', gap: '14px', flex: 1 },
  chainRow: { display: 'flex', flexDirection: 'column', borderBottom: '1px solid #1e293b', paddingBottom: '10px' },
  chainLabel: { fontSize: '10px', color: '#64748b', fontWeight: '700', letterSpacing: '0.05em', marginBottom: '2px' },
  chainValue: { fontSize: '13px', color: '#cbd5e1' },
  resetInspectorBtn: { marginTop: '16px', padding: '10px', backgroundColor: '#1e293b', color: '#ffffff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '12px', fontWeight: '600', transition: 'background-color 0.15s' }
};