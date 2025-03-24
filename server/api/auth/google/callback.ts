import { defineEventHandler, getQuery, sendRedirect, setCookie } from 'h3'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const code = query.code as string

  if (!code) {
    console.error('No code provided in query')
    return sendRedirect(event, '/login?error=no_code')
  }

  try {
    const clientId = process.env.GOOGLE_CLIENT_ID
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET
    const redirectUri = 'http://localhost:3000/auth/google/callback'

    console.log('Starting Google OAuth process with:', {
      clientId: clientId?.substring(0, 10) + '...',
      redirectUri,
      codeLength: code.length
    })

    // Access token авах
    const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: redirectUri,
        grant_type: 'authorization_code',
        code: code,
      }),
    })

    const tokenData = await tokenResponse.json()
    console.log('Token response status:', tokenResponse.status)
    
    if (!tokenData.access_token) {
      console.error('Token error:', tokenData)
      throw new Error(`Failed to get access token: ${JSON.stringify(tokenData)}`)
    }

    console.log('Successfully got access token')

    // Хэрэглэгчийн мэдээлэл авах
    const userResponse = await fetch(
      `https://www.googleapis.com/oauth2/v2/userinfo?access_token=${tokenData.access_token}`,
      {
        headers: {
          Authorization: `Bearer ${tokenData.access_token}`,
        },
      }
    )

    const userData = await userResponse.json()
    console.log('Got user data:', {
      id: userData.id,
      email: userData.email,
      name: userData.name
    })

    // Хэрэглэгчийн мэдээллийг хадгалах
    const user = {
      id: userData.id,
      name: userData.name,
      email: userData.email,
      avatar: userData.picture,
    }

    // Cookie-д хадгалах
    setCookie(event, 'user', JSON.stringify(user), {
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 хоног
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax'
    })

    console.log('Set cookie and redirecting to profile page')

    // Профайл хуудас руу шилжих
    return sendRedirect(event, '/profile')
  } catch (error) {
    console.error('Detailed Google callback error:', error)
    return sendRedirect(event, '/login?error=google_auth_failed')
  }
}) 