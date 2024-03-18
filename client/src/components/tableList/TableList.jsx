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
              {status.isLoading && <td><Spinner /></td>}
            </tr>
            {data.map((item, i) => (
              <ComponentsItem data={item} key={i} />
            ))}
            {/* <tr>
              <td data-title="ID">2345634</td>
              <td data-title="Date & Time">
                <div>
                  23.04.2023 <br /> 18:00
                </div>
              </td>
              <td data-title="Echange rate">
                <span>
                  <div className="center__content">BTC<img className="tabele__arrow" src={arrowIcon} alt="arrow left" />ETH<br /></div>
                  <div className="center__content">10 <img className="tabele__arrow" src={arrowIcon} alt="arrow left" /> 100</div>
                </span>
              </td>
              <td data-title="Trade">
                <div className="center__content">500 <img className="tabele__arrow" src={arrowIcon} alt="arrow left" /> 700</div>
              </td>
              <td data-title="Markup" className="item__markup">3% (120 CZK)</td>
              <td data-title="Initials" className="initials">
                <div className="user-name">
                  Vyacheslav <br /> Sagvinikov
                </div>
              </td>
              <td data-title="Contact">
                <div className="inner__content">
                  dareeweqewqewqeqwre32.@gmail.com
                  <br /> @qwertyasdf23
                </div>
              </td>
              <td data-title="Phone number">+380992869837</td>
              <td className="table__more">
                <div onClick={() => toggleMenu()}>
                  <img src={moreIcon} alt="more info about user" />
                </div>
              </td>
            </tr> */}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableList;