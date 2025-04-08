import { defineEventHandler } from 'h3'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const code = query.code as string

  if (!code) {
    return sendRedirect(event, '/login?error=no_code')
  }

  try {
    const config = useRuntimeConfig()
    const clientId = config.public.facebookClientId
    const clientSecret = process.env.FACEBOOK_CLIENT_SECRET
    const redirectUri = `${process.env.BASE_URL}/auth/facebook/callback`

    // Access token авах
    const tokenResponse = await fetch('https://graph.facebook.com/v12.0/oauth/access_token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: redirectUri,
        code: code,
      }),
    })

    const tokenData = await tokenResponse.json()
    console.log('Token data:', tokenData)

    if (!tokenData.access_token) {
      throw new Error('Failed to get access token')
    }

    // Хэрэглэгчийн мэдээлэл авах
    const userResponse = await fetch(
      `https://graph.facebook.com/me?fields=id,name,email,picture&access_token=${tokenData.access_token}`
    )

    const userData = await userResponse.json()

    // Хэрэглэгчийн мэдээллийг хадгалах
    const user = {
      id: userData.id,
      name: userData.name,
      email: userData.email,
      avatar: userData.picture?.data?.url,
    }

    // localStorage-д хадгалах
    event.node.req.headers['x-user-data'] = JSON.stringify(user)

    // Нүүр хуудас руу шилжих
    return sendRedirect(event, '/')
  } catch (error) {
    console.error('Facebook callback error:', error)
    return sendRedirect(event, '/login?error=facebook_auth_failed')
  }
}) 