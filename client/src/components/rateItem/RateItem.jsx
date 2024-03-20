import { useState } from "react";
import Menu from "../../shared/menu/Menu";
import EditRateItem from "./EditRateItem";
import arrowIcon from "../../assets/arrow-icon.svg";
import openIcon from "../../assets/open-icon.svg";
import { useDeleteRateMutation, usePutRateMutation } from "../../redux/api/ratesApi";
import ErrorNotification from "../../shared/errorNotification/ErrorNotification";

import "./RateItem.scss";


const RateItem = ({ data }) => {
  const [deleteRate, {
    isLoading: isDeleteLoading,
    isSuccess: isDeleteSuccess,
    isError: isDeleteError,
    error: errorDelete }] = useDeleteRateMutation();
  const [putRate, {
    isLoading: isPutLoading,
    isSuccess: isPutSuccess,
    error: errorPut }] = usePutRateMutation();
  const [openEdit, setOpenEdit] = useState(false);

  const toggleHide = () => {
    const newObj = { ...data, hidden: !data.hidden };
    delete newObj.image;

    putRate({ id: data.id, data: newObj })
  }

  const handleDelete = () => {
    deleteRate(data.id)
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
            Open&nbsp;image&nbsp;<img src={openIcon} alt="link icon" />
          </a>
        </td>
        <td className="table__more">
          <Menu
            items={[
              {
                name: "Edit", onClick: () => {
                  setOpenEdit(true);
                }
              },
              { name: data.hidden ? "Show" : "Hide", onClick: toggleHide },
              { name: "Delete", onClick: handleDelete }
            ]}
            status={{
              isLoading: isDeleteLoading || isPutLoading,
              isSuccess: isDeleteSuccess || isPutSuccess,
            }} />
        </td>
      </tr>
    }
  </>)
}

export default RateItem;