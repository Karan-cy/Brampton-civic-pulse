import { useState } from 'react';

export default function AdminControlPanel() {
  // ⚓ Local state to control our input fields and system logs
  const [riskThreshold, setRiskThreshold] = useState(75);
  const [systemLog, setSystemLog] = useState('');

  // 🛡️ Defensive Input Handler: Filters data on every keystroke
  const handleThresholdChange = (e) => {
    const value = parseInt(e.target.value, 10);
    
    // Prevent non-numeric entry or out-of-bounds metrics before saving to state
    if (isNaN(value)) {
      setRiskThreshold('');
      return;
    }
    if (value < 1 || value > 100) return; 

    setRiskThreshold(value);
  };

  const handleApplyOverride = (e) => {
    e.preventDefault();
    if (!riskThreshold) return;
    
    // Simulating a secure event dispatch log
    setSystemLog(`[${new Date().toLocaleTimeString()}] 🔐 SYSTEM CONFIG UPDATED: AI Risk Threshold altered to ${riskThreshold}%. Overriding grid prioritization algorithms.`);
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.title}>🔐 Restricted Administrative Control Panel</h2>
        <p style={styles.subtitle}>Authorized municipal configuration gate. Actions are cryptographically logged.</p>
      </div>

      <div style={styles.panelBody}>
        <form onSubmit={handleApplyOverride} style={styles.formCard}>
          <h3 style={styles.cardTitle}>🎛️ AI Engine Core Tuning</h3>
          
          <div style={styles.inputGroup}>
            <label style={styles.label}>Global Critical Alert Threshold (1 - 100)</label>
            <input
              type="number"
              value={riskThreshold}
              onChange={handleThresholdChange}
              style={styles.input}
              min="1"
              max="100"
            />
            <p style={styles.inputHint}>Determines the risk score baseline required to automatically flag a pipe or bridge as "Critical Intervention".</p>
          </div>

          <button type="submit" style={styles.submitBtn}>
            Deploy System-Wide Configuration
          </button>
        </form>

        <div style={styles.logCard}>
          <h3 style={styles.cardTitle}>📜 Operational Security Audit Trail</h3>
          <div style={styles.logScreen}>
            {systemLog ? (
              <span style={styles.logText}>{systemLog}</span>
            ) : (
              <span style={styles.logPlaceholder}>Awaiting operational system inputs...</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: { fontFamily: 'system-ui, sans-serif' },
  header: { marginBottom: '24px' },
  title: { margin: 0, fontSize: '22px', fontWeight: '700' },
  subtitle: { margin: '4px 0 0 0', fontSize: '14px', color: '#a0aec0' },
  panelBody: { display: 'flex', gap: '24px', flexWrap: 'wrap' },
  formCard: { flex: 1, minWidth: '300px', backgroundColor: '#1a1a24', border: '1px solid #2d2d3d', padding: '24px', borderRadius: '8px' },
  logCard: { flex: 1, minWidth: '300px', backgroundColor: '#14141c', border: '1px solid #2d2d3d', padding: '24px', borderRadius: '8px', display: 'flex', flexDirection: 'column' },
  cardTitle: { margin: '0 0 16px 0', fontSize: '16px', fontWeight: '600', color: '#cbd5e1' },
  inputGroup: { marginBottom: '20px', display: 'flex', flexDirection: 'column', gap: '8px' },
  label: { fontSize: '13px', color: '#cbd5e1', fontWeight: '500' },
  input: { padding: '10px', backgroundColor: '#111116', border: '1px solid #2d2d3d', borderRadius: '6px', color: '#ffffff', fontSize: '14px', width: '100px' },
  inputHint: { margin: 0, fontSize: '12px', color: '#4a5568', lineHeight: '1.4' },
  submitBtn: { width: '100%', padding: '12px', backgroundColor: '#ef4444', color: '#ffffff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '14px', fontWeight: '600' },
  logScreen: { flex: 1, backgroundColor: '#0b0b0f', border: '1px solid #1a1a24', padding: '16px', borderRadius: '6px', minHeight: '120px', fontFamily: 'monospace' },
  logText: { color: '#ef4444', fontSize: '13px', lineHeight: '1.5' },
  logPlaceholder: { color: '#4a5568', fontSize: '13px', fontStyle: 'italic' }
};