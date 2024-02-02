import React from 'react'
import { useActionData } from 'react-router'

function Check() {
    
    const request = useActionData()
  console.log(request.formData)
  return (
    <div>Check</div>
  )
}

export default Check