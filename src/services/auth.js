import { AuthenticationDetails, CognitoUser, CognitoUserPool } from 'amazon-cognito-identity-js'

const userPool = new CognitoUserPool({
  UserPoolId: import.meta.env.VITE_COGNITO_USER_POOL_ID,
  ClientId: import.meta.env.VITE_COGNITO_CLIENT_ID,
})

function getCognitoUser(email) {
  return new CognitoUser({ Username: email, Pool: userPool })
}

function toError(error) {
  const normalized = new Error(error?.message || 'Authentication failed.')
  normalized.code = error?.code
  return normalized
}

export function getReadableAuthError(error) {
  const messages = {
    UsernameExistsException: 'An account with this email already exists.',
    InvalidPasswordException: 'Password does not meet Cognito requirements.',
    InvalidParameterException: 'Please check the information you entered.',
    CodeMismatchException: 'The verification code is incorrect.',
    ExpiredCodeException: 'The verification code has expired. Please request a new code.',
    LimitExceededException: 'Too many attempts. Please wait and try again.',
    UserNotConfirmedException: 'Your account is not verified. Please verify your email.',
    NotAuthorizedException: 'Invalid email or password.',
    UserNotFoundException: 'Invalid email or password.',
  }
  return messages[error?.code] || error?.message || 'Authentication failed. Please try again.'
}

export function signUp({ name, email, password }) {
  return new Promise((resolve, reject) => {
    userPool.signUp(email, password, [
      { Name: 'name', Value: name },
      { Name: 'email', Value: email },
    ], null, (error, result) => {
      if (error) reject(toError(error))
      else resolve(result)
    })
  })
}

export function confirmSignUp(email, code) {
  return new Promise((resolve, reject) => {
    getCognitoUser(email).confirmRegistration(code, true, (error, result) => {
      if (error) reject(toError(error))
      else resolve(result)
    })
  })
}

export function resendConfirmationCode(email) {
  return new Promise((resolve, reject) => {
    getCognitoUser(email).resendConfirmationCode((error, result) => {
      if (error) reject(toError(error))
      else resolve(result)
    })
  })
}

export function signIn(email, password) {
  return new Promise((resolve, reject) => {
    getCognitoUser(email).authenticateUser(new AuthenticationDetails({ Username: email, Password: password }), {
      onSuccess: resolve,
      onFailure: (error) => reject(toError(error)),
      newPasswordRequired: () => reject(toError({ message: 'A new password is required for this account.' })),
    })
  })
}

export function signOut() {
  const user = userPool.getCurrentUser()
  if (user) user.signOut()
}

export function getCurrentUser() {
  const user = userPool.getCurrentUser()
  if (!user) return Promise.resolve(null)

  return new Promise((resolve) => {
    user.getSession((error, session) => {
      if (error || !session?.isValid()) resolve(null)
      else resolve(user)
    })
  })
}

export function getIdToken() {
  const user = userPool.getCurrentUser()
  if (!user) return Promise.resolve(null)

  return new Promise((resolve) => {
    user.getSession((error, session) => {
      if (error || !session?.isValid()) resolve(null)
      else resolve(session.getIdToken().getJwtToken())
    })
  })
}