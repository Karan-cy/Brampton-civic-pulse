

export default function RepairList({ assets = [] }) {
  if (!assets || assets.length === 0) {
    return <div style={styles.errorAlert}>⚠️ Operational core database registry unreadable.</div>;
  }

  const prioritizedAssets = [...assets].sort((a, b) => b.ai_risk_score - a.ai_risk_score);

  const getUrgencyConfig = (score) => {
    if (score >= 75) return { text: '#ef4444', border: 'rgba(239, 68, 68, 0.2)', bg: 'rgba(239, 68, 68, 0.05)', status: 'CRITICAL' };
    if (score >= 40) return { text: '#f59e0b', border: 'rgba(245, 158, 11, 0.2)', bg: 'rgba(245, 158, 11, 0.05)', status: 'WARNING' };
    return { text: '#10b981', border: 'rgba(16, 185, 129, 0.2)', bg: 'rgba(16, 185, 129, 0.05)', status: 'NOMINAL' };
  };

  return (
    <div style={styles.workflowViewWrapper}>
      <div style={styles.viewHeaderBlock}>
        <h3 style={styles.viewTitle}>🔧 System Maintenance Workflows Matrix</h3>
        <p style={styles.viewSubtitle}>AI-orchestrated dispatch matrix sorted dynamically by satellite risk vectors.</p>
      </div>

      {/* 🔒 Viewport Anchor Layer: This locks the dimensions and scrolls internally */}
      <div style={styles.tableScrollFrame}>
        <table style={styles.enterpriseTable}>
          <thead style={styles.fixedTableHeader}>
            <tr>
              <th style={styles.th}>ASSET METRIC ID</th>
              <th style={styles.th}>ASSET DESIGNATION</th>
              <th style={styles.th}>NETWORK SECTOR</th>
              <th style={styles.th}>AI RISK EQUATION</th>
              <th style={styles.th}>TELEMETRY PROFILE</th>
              <th style={styles.th}>WORKFLOW STATUS</th>
            </tr>
          </thead>
          <tbody>
            {prioritizedAssets.map((asset) => {
              const theme = getUrgencyConfig(asset.ai_risk_score);
              return (
                <tr key={asset.asset_id} style={styles.tableRowStyle}>
                  <td style={styles.monospaceIdColumn}>{asset.asset_id}</td>
                  <td style={styles.strongAssetColumn}>{asset.name || 'Core System Node'}</td>
                  <td style={styles.standardCell}>{asset.type}</td>
                  <td style={styles.standardCell}>
                    <span style={{
                      ...styles.enterpriseBadge,
                      color: theme.text,
                      borderColor: theme.border,
                      backgroundColor: theme.bg
                    }}>
                      {asset.ai_risk_score} // {theme.status}
                    </span>
                  </td>
                  <td style={styles.italicThreatColumn}>{asset.anomaly_type || 'No variances detected'}</td>
                  <td style={styles.standardCell}>{asset.status}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const styles = {
  workflowViewWrapper: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
  },
  viewHeaderBlock: {
    marginBottom: '20px',
  },
  viewTitle: { margin: 0, fontSize: '18px', fontWeight: '700', color: '#f1f5f9' },
  viewSubtitle: { margin: '4px 0 0 0', fontSize: '13px', color: '#64748b' },
  errorAlert: { padding: '16px', backgroundColor: '#1e1b4b', border: '1px solid #ef4444', borderRadius: '6px', color: '#f87171', fontSize: '13px' },
  tableScrollFrame: {
    flex: 1,
    overflowY: 'auto', // 👑 Infinite scroll occurs strictly inside this coordinate window
    border: '1px solid #1e293b',
    borderRadius: '8px',
    backgroundColor: '#0f172a',
  },
  enterpriseTable: { width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' },
  fixedTableHeader: { position: 'sticky', top: 0, backgroundColor: '#0b0f19', zIndex: 10, borderBottom: '1px solid #1e293b' },
  th: { padding: '14px 16px', color: '#64748b', fontWeight: '600', fontSize: '11px', letterSpacing: '0.05em' },
  tableRowStyle: { borderBottom: '1px solid #1e293b', backgroundColor: 'transparent' },
  standardCell: { padding: '14px 16px', color: '#cbd5e1' },
  monospaceIdColumn: { padding: '14px 16px', color: '#3b82f6', fontFamily: 'monospace', fontWeight: '600' },
  strongAssetColumn: { padding: '14px 16px', color: '#ffffff', fontWeight: '500' },
  italicThreatColumn: { padding: '14px 16px', color: '#94a3b8', fontStyle: 'italic' },
  enterpriseBadge: { padding: '4px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: '600', display: 'inline-block', border: '1px solid' }
};