

const CURRENT_USER_ROLE = 'Admin'; 

const navigationItems = [
  { id: 'dashboard', label: '📊 Asset Dashboard', roles: ['Admin', 'Viewer'] },
  { id: 'risk-map', label: '🗺️ GIS Risk Map', roles: ['Admin', 'Viewer'] },
  { id: 'repairs', label: '🔧 Maintenance Workflows', roles: ['Admin', 'Viewer'] },
  { id: 'admin', label: '🔐 System Admin Panel', roles: ['Admin'] }, 
];

export default function Sidebar({ activeTab, setActiveTab }) {
  if (typeof setActiveTab !== 'function') return null;

  return (
    <aside style={styles.sidebarContainer}>
      <div style={styles.brandWrapper}>
        <h2 style={styles.brandText}>Brampton IMS</h2>
        <span style={styles.roleTag}>{CURRENT_USER_ROLE} View</span>
      </div>
      
      <nav style={styles.navigationGrid}>
        {navigationItems
          .filter(item => item.roles.includes(CURRENT_USER_ROLE))
          .map(item => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                style={{
                  ...styles.navItemButton,
                  ...(isActive ? styles.activeNavItemButton : {}),
                }}
                aria-current={isActive ? 'page' : undefined}
              >
                {item.label}
              </button>
            );
          })}
      </nav>
      
      <div style={styles.sidebarFooter}>
        <span style={styles.versionLabel}>System Ready // v1.0.0</span>
      </div>
    </aside>
  );
}

const styles = {
  sidebarContainer: {
    width: '240px',
    height: '100%',
    backgroundColor: '#0b0f19', // Premium midnight slate
    borderRight: '1px solid #1e293b', // Monochromatic thin rule
    display: 'flex',
    flexDirection: 'column',
    boxSizing: 'border-box',
  },
  brandWrapper: {
    padding: '24px 20px',
    borderBottom: '1px solid #1e293b',
  },
  brandText: {
    margin: 0,
    fontSize: '16px',
    fontWeight: '700',
    letterSpacing: '-0.02em',
    color: '#f8fafc',
  },
  roleTag: {
    display: 'inline-block',
    marginTop: '4px',
    padding: '2px 6px',
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
    border: '1px solid rgba(59, 130, 246, 0.2)',
    borderRadius: '4px',
    fontSize: '10px',
    color: '#60a5fa',
    fontWeight: '600',
  },
  navigationGrid: {
    flex: 1,
    padding: '16px 12px',
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  },
  navItemButton: {
    width: '100%',
    padding: '10px 12px',
    backgroundColor: 'transparent',
    color: '#94a3b8',
    border: 'none',
    borderRadius: '6px',
    textAlign: 'left',
    fontSize: '13px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.15s ease-in-out',
  },
  activeNavItemButton: {
    backgroundColor: '#1e293b',
    color: '#ffffff',
    fontWeight: '600',
  },
  sidebarFooter: {
    padding: '16px 20px',
    borderTop: '1px solid #1e293b',
  },
  versionLabel: {
    fontSize: '11px',
    color: '#475569',
    fontFamily: 'monospace',
  },
};