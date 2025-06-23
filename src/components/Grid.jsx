import React, { useState, useMemo } from 'react';
import { FixedSizeList as List } from 'react-window';
import { useNavigate } from 'react-router-dom';
import '../css/grid.css';

const Grid = ({ data = [], columns = [], mode = 'user', onEdit, onDelete, onView }) => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState({});
  const [searches, setSearches] = useState({});

  const handleApplyClick = (jobId) => {
    navigate(`/apply/${jobId}`);
  };

  const getUniqueValues = (col) => ['All', ...new Set(data.map(item => item[col]))];

  const handleFilterChange = (col, value) => {
    setFilters(prev => ({ ...prev, [col]: value }));
  };

  const handleSearchChange = (col, value) => {
    setSearches(prev => ({ ...prev, [col]: value.toLowerCase() }));
  };

  const filteredData = useMemo(() => {
    return data.filter(item =>
      columns.every(col => {
        const filterMatch = !filters[col] || filters[col] === 'All' || item[col] === filters[col];
        const searchMatch = !searches[col] || String(item[col]).toLowerCase().includes(searches[col]);
        return filterMatch && searchMatch;
      })
    );
  }, [data, filters, searches, columns]);

  const Row = ({ index, style }) => {
    const item = filteredData[index];
    if (!item) return null;

    return (
      <div className="grid-row" style={style}>
        {columns.map(col => (
          <div key={col} className="grid-cell">{item[col] ?? 'N/A'}</div>
        ))}
        <div className="grid-cell">
          {mode === 'user' && (
            <button onClick={() => handleApplyClick(item.id)}>Apply Job</button>
          )}
          {mode === 'admin' && (
            <div className="admin-actions">
              <button onClick={() => onEdit?.(item)} className="btn btn-primary btn-sm">Edit</button>
              <button onClick={() => onDelete?.(item.id)} className="btn btn-danger btn-sm">Delete</button>
              <button onClick={() => onView?.(item.id)} className="btn btn-secondary btn-sm">View Job</button>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="grid-container">
      <div className="grid-header">
        {columns.map(col => (
          <div key={col} className="grid-header-cell">
            <strong>{col.toUpperCase()}</strong>
            <input
              type="text"
              placeholder={`Search ${col}`}
              onChange={(e) => handleSearchChange(col, e.target.value)}
            />
            <select onChange={(e) => handleFilterChange(col, e.target.value)}>
              {getUniqueValues(col).map((val, idx) => (
                <option key={idx} value={val}>{val}</option>
              ))}
            </select>
          </div>
        ))}
        <div className="grid-header-cell"><strong>Action</strong></div>
      </div>

      {filteredData.length === 0 ? (
        <div className="no-data">No jobs found.</div>
      ) : (
        <List
          height={400}
          itemCount={filteredData.length}
          itemSize={60}
          width="100%"
        >
          {Row}
        </List>
      )}
    </div>
  );
};

export default Grid;
