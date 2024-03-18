import { useEffect, useRef, useState } from "react";
import arrowIcon from "../../assets/arrow-icon.svg";
import moreIcon from "../../assets/more-icon.svg";
import openIcon from "../../assets/open-icon.svg";
import useOutsideClick from "../../hooks/UseOutsideClick";
import { useDeleteRateMutation, usePutRateMutation } from "../../redux/api/ratesApi";
import ErrorNotification from "../../shared/errorNotification/ErrorNotification";
import { positionPopup } from "../../utils/helpers";

import "./RateItem.scss";
import EditRateItem from "./EditRateItem";


const RateItem = ({ data }) => {
  const [deleteRate, {
    isLoading: isDeleteLoading,
    isError: isDeleteError,
    error: errorDelete }] = useDeleteRateMutation();
  const [putRate, {
    isLoading: isPutLoading,
    error: errorPut }] = usePutRateMutation();
  const [openMenu, setOpenMenu] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const popupRef = useRef(null);
  const popupMenuRef = useRef(null);

  useOutsideClick(popupRef, () => setOpenMenu(false));

  useEffect(() => {
    positionPopup(popupMenuRef);
  }, [openMenu]);

  const toggleHide = () => {
    const newObj = { ...data, hidden: !data.hidden };
    delete newObj.image;

    putRate({ id: data.id, data: newObj })
      .then(res => setOpenMenu(false));
  }

  const handleDelete = () => {
    deleteRate(data.id)
      .then(res => setOpenMenu(false));
  }

  return (<>
    <tr>
      {isDeleteError && <ErrorNotification error={errorDelete} />}
      {errorPut && <ErrorNotification error={errorPut} />}
    </tr>

    {openEdit ? <EditRateItem data={data} setOpenEdit={setOpenEdit} /> :
      <tr className={`rate-item ${data.hidden ? "rate-item_hide" : ""}`}>
        <td data-title="ID">
          {data.id}
        </td>
        <td data-title="Currency">
          <div className="center__content">
            {data.sold_currency}&nbsp;<img className="arrow-icon" src={arrowIcon} alt="arrow left" />&nbsp;{data.bought_currency}
          </div>
        </td>
        <td data-title="Bank rate">
          <div className="center__content">
            {+data.coin_rate}&nbsp;{data.sold_currency}&nbsp;
            <img className="tabele__arrow" src={arrowIcon} alt="arrow left" />&nbsp;
            {+data.dollar_rate}&nbsp;{data.bought_currency}
          </div>
        </td>
        <td data-title="Markup">
          {+data.market_rate}%
        </td>
        <td data-title="Markup 2">
          {+data.market_rate_other}%
        </td>
        <td data-title="Rounding">
          {+data.round_num}
        </td>
        <td data-title="Hidden">
          {data.hidden ? "Hide" : "Show"}
        </td>
        <td data-title="Image">
          <a href={data.image} target="_blank">
            Open image <img src={openIcon} alt="link icon" />
          </a>
        </td>
        <td className="table__more" ref={popupRef}>
          <div onClick={() => setOpenMenu(!openMenu)}>
            <img src={moreIcon} alt="more info" />
          </div>
          {openMenu && (
            <ul className="table__more-list" ref={popupMenuRef}>
              {(isDeleteLoading || isPutLoading) ?
                (<li className="table__more-list__first">Loading...</li>) :
                (<>
                  <li
                    className="table__more-list__first"
                    onClick={() => {
                      setOpenEdit(true);
                      setOpenMenu(false);
                    }}
                  >
                    Edit</li>
                  <li onClick={toggleHide}>{data.hidden ? "Show" : "Hide"}</li>
                  <li onClick={handleDelete}>Delete</li>
                </>)
              }
            </ul>
          )}
        </td>
      </tr>
    }
  </>)
}

export default RateItem;