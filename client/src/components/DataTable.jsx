export default function DataTable({ columns, data, onEdit, onDelete, emptyIcon = '📋', emptyText = 'No data yet' }) {
  if (!data || data.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-state-icon">{emptyIcon}</div>
        <p>{emptyText}</p>
      </div>
    );
  }

  return (
    <div className="table-wrapper">
      <table className="data-table" role="table">
        <thead>
          <tr>
            {columns.map(col => (
              <th key={col.key}>{col.label}</th>
            ))}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map(row => (
            <tr key={row._id}>
              {columns.map(col => (
                <td key={col.key}>
                  {col.render ? col.render(row[col.key], row) : row[col.key]}
                </td>
              ))}
              <td>
                <div className="action-cell">
                  <button
                    className="btn btn-secondary btn-sm"
                    onClick={() => onEdit(row)}
                    aria-label={`Edit ${row.name || row.title || ''}`}
                  >
                    ✎ Edit
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => onDelete(row._id)}
                    aria-label={`Delete ${row.name || row.title || ''}`}
                  >
                    ✕ Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
