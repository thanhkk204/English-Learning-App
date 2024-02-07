import React, { useState } from "react"
import axios from "axios"
import moment from "moment"
import { Button, Col, ToggleButton } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
export const loaderWithParams = async ({ params }) => {
  const id = await params.dateId
  const data = await axios.get("http://localhost:3000/Vocabbulary")
  let SI = 0
  if (id == "yesterday") {
    SI = 86400000
  } else if (id == "3DayAgo") {
    SI = 86400000 * 3
  }

  // timeMustFilter là số ngày người dùng muốn lấy từ vựng cho đến ngày nay, ví dụ ngày hôm qua sẽ tạo ra chính xác ngày hôm qua với thời gian lúc 0:00
  // SI là số giây trong 1 ngày mặc định là 0 là ngày hôm nay
  const timeMustFilter = moment().startOf("day").toDate() - SI
  // filterData là hàm sẽ trả về những object có createAt - timeMustFilter lớn hơn 0 , Nếu id(params) == 'all' thì lấy hết
  const filterData = data.data.filter((item) => {
    if (id === "all") {
      return true
    }
    const createAt = new Date(item.createAt)
    return createAt.getTime() - timeMustFilter >= 0
  })
  return filterData
}
const toggleButton = [
  {
    title: "Since 1 ago",
    value: "yesterday",
  },
  {
    title: "Since 3 ago",
    value: "3DayAgo",
  },
  {
    title: "Now",
    value: "now",
  },
  {
    title: "All",
    value: "all",
  },
]
export default function DaysForWords() {
  const navigate = useNavigate()
  const [checked, setChecked] = useState("all")
  // Gửi API để lấy từ vựng của từng ngày
  function getWordsAlongTheDay(e, params) {
    e.preventDefault()

    navigate(`/vob/${params}`)
  }
  return (
    <Col id="timeForWords">
      {toggleButton.map((item) => (
        <ToggleButton
          key={item.value}
          className="mb-2"
          id="toggle-check"
          type="checkbox"
          variant="outline-primary"
          checked={item.value == checked}
          onClick={(e) => {
            getWordsAlongTheDay(e, item.value)
            setChecked(item.value)
          }}
        >
          {item.title}
        </ToggleButton>
      ))}
      {/* <ToggleButton
        className="mb-2"
        id="toggle-check"
        type="checkbox"
        variant="outline-primary"
        checked={checked}
        value="1"
        
        onChange={(e) => setChecked(e.currentTarget.checked)}
      >
        Since 1 ago
      </ToggleButton>
    <ToggleButton
        className="mb-2"
        id="toggle-check"
        type="checkbox"
        variant="outline-primary"
        checked={checked}
        value="1"
        onClick={(e) => getWordsAlongTheDay(e, "3DayAgo")}
        onChange={(e) => setChecked(e.currentTarget.checked)}
      >
        Since 3 ago
      </ToggleButton>
    <ToggleButton
        className="mb-2"
        id="toggle-check"
        type="checkbox"
        variant="outline-primary"
        checked={checked}
        value="1"
        onClick={(e) => getWordsAlongTheDay(e, "now")}
        onChange={(e) => setChecked(e.currentTarget.checked)}
      >
        Today
      </ToggleButton> */}
    </Col>
  )
}
