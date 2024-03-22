import { useEffect, useRef, useState } from "react";
import Spinner from "../../shared/spinner/Spinner";

import "./tableList.scss";

const minColumnWidth = 150;

const columnTypeToRatioMap = {
  numeric: 1,
  'text-short': 1.67,
  'text-long': 3.33,
};

const TableList = ({ headerItems, data = [], ComponentsItem, status }) => {
  const [columns, setColumns] = useState([]);
  const headerBeingResizedRef = useRef();

  useEffect(() => {
    const columnsInit = [];

    document.querySelectorAll('th').forEach((header) => {
      if (header.classList.contains('table__order_hide-cell')) {
        columnsInit.push({
          header,
          size: `50px`,
        })
      } else {
        const maxColumnWidth = columnTypeToRatioMap[header.dataset.type] + 'fr';
        columnsInit.push({
          header,
          size: `minmax(${minColumnWidth}px, ${maxColumnWidth})`,
        })
      }
    });

    setColumns(columnsInit);
  }, []);

  const onMouseMove = (e) => requestAnimationFrame(() => {
    // Calculate the desired width
    const horizontalScrollOffset = document.documentElement.scrollLeft;
    const width = (horizontalScrollOffset + e.clientX) - headerBeingResizedRef.current.offsetLeft;

    const updatedColumns = columns.map((column) => {
      if (column.header === headerBeingResizedRef.current) {
        return {
          ...column,
          size: Math.max(minColumnWidth, width) + 'px',
        };
      }
      return column;
    })

    setColumns(updatedColumns);
  });

  const onMouseUp = () => {
    window.removeEventListener('mousemove', onMouseMove);
    window.removeEventListener('mouseup', onMouseUp);
    headerBeingResizedRef.current.classList.remove('header--being-resized');
  }

  const initResize = ({ target }) => {
    const targetHeader = target.parentNode;
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    targetHeader.classList.add('header--being-resized');
    headerBeingResizedRef.current = targetHeader;
  };

  return (
    <div className="table">
      <div className="table__wrapper">
        <table
          style={{
            gridTemplateColumns: columns.map(({ size }) => size).join(' '),
          }}
        >
          <thead>
            <tr>
              {headerItems.map(({ dataType, name }, i) => (
                <th key={i} data-type={dataType}>{name}
                  <span
                    className="resize-handle"
                    onMouseDown={(e) => initResize(e)}
                  ></span>
                </th>
              ))}
              <th className="table__order_hide-cell"></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              {status.isLoading && <td style={{border: "none"}}><Spinner /></td>}
            </tr>
            {data.map((item, i) => (
              <ComponentsItem data={item} key={i} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableList;