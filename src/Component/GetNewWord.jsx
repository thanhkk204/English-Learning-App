import React, { useEffect, useState} from 'react'
function GetNewWord({vocabulary}) {
  const [vocabularyProp , setVocabularyProp] = useState()
  const [number , setNumber] = useState(0)
  const [simpleWord , setSimpleWord] = useState()

useEffect(()=>{
    setVocabularyProp(vocabulary)
} ,[vocabulary])




  function getNewVocab(){
    if (vocabularyProp.length > 1) {
      // Lọc ra 1 mảng mới không có từ đã rander
    let newVocabulary = vocabularyProp.filter((item , index) => {
      return index != number
    })

    setVocabularyProp(newVocabulary)
    // Random số ngỗng nhiên trong mảng mới
    let numberRandom = Math.floor(Math.random() * newVocabulary.length)
    
      // Set lại từ để rander
      setSimpleWord(newVocabulary[numberRandom])
      // Set lại index ngỗng nhiên
      setNumber(numberRandom)
      console.log("implement");
    }else{
      console.log("Non-implement");
      alert("Hết từ học rồi nha con")
    }
  }
//   restart vocab 
function restartVocab(){
    const confirmRestart = confirm('Mày có muốn ôn lại tất cả từ vựng không')

}
  console.log(vocabulary)
  console.log(vocabularyProp)
  return <>
   {vocabularyProp  && (vocabularyProp.length >= 1) && (simpleWord ? <div>{simpleWord.vocab}</div> : <div>{vocabularyProp[number].vocab}</div>)}
    
    <button onClick={getNewVocab}>
     Get New Vocab
    </button>
    <button onClick={restartVocab}>
     Restart Vocab
    </button>
  </>
}

export default GetNewWord