function SiteLoader({ fullScreen = false, label = 'Načítám obsah...' }) {
  return (
    <div
      className={`site-loader ${fullScreen ? 'site-loader--fullscreen' : ''}`}
      role="status"
      aria-live="polite"
      aria-label={label}
    >
      <div className="site-loader__ring" aria-hidden="true" />
      <div className="site-loader__ring site-loader__ring--offset" aria-hidden="true" />
      <p className="site-loader__text">{label}</p>
    </div>
  )
}

export default SiteLoader
