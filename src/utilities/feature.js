export function validateString(dataWord, userInput) {
    // Chuyển string thành chữ viết thường và loại bỏ khoảng trống ở đầu và cuối
    let NewdataWord = dataWord.toLowerCase().trim()
    let NewuserInput = userInput.toLowerCase().trim()
    // Lọc Khoảng trống giữa các chữ chỉ để " "
    NewdataWord = NewdataWord.toLowerCase().trim().replace(/\s+/g, " ")
    NewuserInput = NewuserInput.toLowerCase().trim().replace(/\s+/g, " ")
    return NewdataWord == NewuserInput
}
 //   restart vocab
export function restartVocab() {
    const confirmRestart = confirm("Mày có muốn ôn lại tất cả từ vựng không")
    if (confirmRestart) {
      setVocabularyProp("")
      setSimpleWord("")
      setNumber(null)
      navigate("")
    }
  }

