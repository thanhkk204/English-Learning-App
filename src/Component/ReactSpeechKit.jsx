import React, { useEffect, useState } from "react"
import { useSpeechSynthesis } from "react-speech-kit"
import { VscUnmute, VscMute } from "react-icons/vsc"
export default function ReactSpeechKit({ text }) {
  const [isSpeaking, setIsSpeaking] = useState(false)
  const onEnd = () => {
    setIsSpeaking(false)
  }
  const { speak, voices, cancel, speaking } = useSpeechSynthesis({
    onEnd,
  })
  // Gắn tính năng đọc cho 1 phím
  useEffect(() => {
    function handleKeydonwn(e) {
      if (e.keyCode === 116) {
        e.preventDefault()
        handleSpeak()
      }
      if (e.keyCode === 117) {
        e.preventDefault()
        handleCancel()
      }
    }
    window.addEventListener("keydown", handleKeydonwn)
    return () => window.removeEventListener("keydown", handleKeydonwn)
  })
  function handleSpeak() {
    if (!speaking) {
      setIsSpeaking(true)
      speak({
        text: text,
        voice: voices[3],
        rate: 1,
      })
    }
  }
  function handleCancel() {
    setIsSpeaking(false)
    cancel()
  }
  return (
    <>
      {isSpeaking ? (
        <VscMute onClick={() => handleCancel()} className="voiceIcon" />
      ) : (
        <VscUnmute onClick={() => handleSpeak()} className="voiceIcon" />
      )}
    </>
  )
}
