import React from "react"
// import { FaceLivenessDetector } from "@aws-amplify/ui-react-liveness"
// import { Loader, ThemeProvider } from "@aws-amplify/ui-react"
// import axios from "axios"
import { Amplify } from "aws-amplify"
import awsExports from "../aws-exports" // The path might vary based on your setup
import { Authenticator } from "@aws-amplify/ui-react"
import "@aws-amplify/ui-react/styles.css"

Amplify.configure(awsExports)

export default function LivenessQuickStartReact() {
  const [loading, setLoading] = React.useState(true)
  const [sessionID, setSessionID] = React.useState(null)

  return (
    <Authenticator>
    <div>hello</div>
    </Authenticator>
  )
}
