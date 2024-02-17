import React from "react"
import { FaceLivenessDetector } from "@aws-amplify/ui-react-liveness"
import { Loader, ThemeProvider } from "@aws-amplify/ui-react"
import { Amplify } from "aws-amplify"
import awsExports from "../aws-exports" // The path might vary based on your setup
import { Authenticator } from "@aws-amplify/ui-react"
import "@aws-amplify/ui-react/styles.css"
import { getCurrentUser } from "aws-amplify/auth"

Amplify.configure(awsExports)

async function fetchStartLiveliness() {
  try {
    const response = await fetch(`https://4cskcoalj3.execute-api.us-east-1.amazonaws.com/dev/start-liveliness`)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const data = await response.json()
    console.log(data)
    return data // Return data for further processing
  } catch (error) {
    console.error("Error fetching data: ", error)
    return null // Return null or appropriate error handling
  }
}

async function postCheckLiveliness(sessionID) {
  try {
    const response = await fetch(`https://4cskcoalj3.execute-api.us-east-1.amazonaws.com/dev/check-liveliness`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ sessionID: sessionID })
    })
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const data = await response.json()
    console.log(data)
    return data // Return data for further processing
  } catch (error) {
    console.error("Error posting data: ", error)
    return null // Return null or appropriate error handling
  }
}

async function currentAuthenticatedUser() {
  try {
    const data = await getCurrentUser()
    return data
  } catch (err) {
    console.log(err)
    return null
  }
}

export default function TestComponent() {
  const [loading, setLoading] = React.useState(true)
  const [sessionID, setSessionID] = React.useState(null)

  React.useEffect(() => {
    const fetchCreateLiveness = async () => {
      const userData = await currentAuthenticatedUser()
      if (userData && userData?.username && userData?.userId) {
        let response
        try {
          response = await fetchStartLiveliness()
          console.log("Liveliness check initiated:", response)
        } catch (error) {
          console.error("Error initiating liveliness:", error)
        }
        setSessionID(response?.sessionID)
        setLoading(false)
      }
    }

    fetchCreateLiveness()
  }, [])

  const handleAnalysisComplete = async (data) => {
    console.log("Analysis complete!!!", data)
    let response

    try {
      response = await postCheckLiveliness(sessionID)
      console.log("Liveliness check result:", response)
    } catch (error) {
      console.error("Error checking liveliness:", error)
    }

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
