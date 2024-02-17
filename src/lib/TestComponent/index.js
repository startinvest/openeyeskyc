import React from "react"
import { FaceLivenessDetector } from "@aws-amplify/ui-react-liveness"
import { Loader, ThemeProvider } from "@aws-amplify/ui-react"
import axios from "axios"
import { Amplify, Auth } from "aws-amplify"
import awsExports from "../aws-exports" // The path might vary based on your setup
import { Authenticator } from "@aws-amplify/ui-react"
import "@aws-amplify/ui-react/styles.css"
import { getCurrentUser } from "aws-amplify/auth"

async function currentAuthenticatedUser() {
  try {
    const data = await getCurrentUser()
    return data
  } catch (err) {
    console.log(err)
    return null
  }
}

Amplify.configure(awsExports)

export default function TestComponent() {
  const [loading, setLoading] = React.useState(true)
  const [sessionID, setSessionID] = React.useState(null)

  React.useEffect(() => {
    const fetchCreateLiveness = async () => {
      const userData = await currentAuthenticatedUser()
      if (userData && userData?.username && userData?.userId) {
        const response = await axios.get(`https://4cskcoalj3.execute-api.us-east-1.amazonaws.com/dev/start-liveliness`)
        setSessionID(response?.data?.sessionID)
        setLoading(false)
      }
    }

    fetchCreateLiveness()
  }, [])

  const handleAnalysisComplete = async (data) => {
    console.log("Analysis complete!!!", data)
    /*
     * This should be replaced with a real call to your own backend API
     */
    // const response = await fetch(`/api/get?sessionId=${createLivenessApiData.sessionId}`)
    // const data = await response.json()
    // create axios post call:

    const response = await axios.post(
      `https://4cskcoalj3.execute-api.us-east-1.amazonaws.com/dev/check-liveliness`, // Use the correct endpoint
      JSON.stringify({ sessionID: sessionID }), // Include sessionID in the body
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    )
    console.log(response)
  }

  return (
    <Authenticator hideSignUp>
      <ThemeProvider>
        {loading || !sessionID || sessionID === "" ? (
          <Loader />
        ) : (
          <>
            <div>{sessionID}</div>
            <FaceLivenessDetector
              sessionId={sessionID}
              region='us-east-1'
              onAnalysisComplete={handleAnalysisComplete}
              onError={(error) => {
                console.error(error)
              }}
            />
          </>
        )}
      </ThemeProvider>
    </Authenticator>
  )
}
