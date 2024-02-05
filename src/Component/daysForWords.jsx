import React from 'react'
import axios from 'axios'
import moment from 'moment'
import { Button, Col } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
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
  // filterData là hàm sẽ trả về những object có createAt - timeMustFilter lớn hơn 0
  const filterData = data.data.filter((item) => {
    const createAt = new Date(item.createAt)
    return createAt.getTime() - timeMustFilter >= 0
  })
  return filterData
}
export default function DaysForWords() {
  const navigate = useNavigate()
  // Gửi API để lấy từ vựng của từng ngày
  function getWordsAlongTheDay(e, params) {
    e.preventDefault()

    console.log(params)
    navigate(`/vob/${params}`)
  }
  return (
    <Col id="timeForWords">
    <Button
      onClick={(e) => getWordsAlongTheDay(e, "yesterday")}
      as="a"
      variant="primary"
    >
      Since 1 ago
    </Button>
    <Button
      onClick={(e) => getWordsAlongTheDay(e, "3DayAgo")}
      as="a"
      variant="primary"
    >
     Since 3 ago
    </Button>
    <Button
      onClick={(e) => getWordsAlongTheDay(e, "now")}
      as="a"
      variant="primary"
    >
      Today
    </Button>
  </Col>
  )
}
