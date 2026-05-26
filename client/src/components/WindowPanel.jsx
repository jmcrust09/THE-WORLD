import React from 'react';

export default function WindowPanel({ title, subtitle, icon = '▣', children, extra }) {
  return (
    <div className="window-panel">
      <div className="window-panel-header">
        <div className="window-panel-title">
          <span className="window-panel-icon">{icon}</span>
          <div>
            <div className="window-panel-label">{title}</div>
            {subtitle && <div className="window-panel-subtitle">{subtitle}</div>}
          </div>
        </div>
        {extra && <div className="window-panel-extra">{extra}</div>}
      </div>
      <div className="window-panel-body">{children}</div>
    </div>
  );
}
