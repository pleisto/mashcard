export const productinEnvInit = (): void => {
  // Self-XSS Attack Warning
  console.log(
    '\n\n%cUsing this console may allow attackers to impersonate you and steal your information using an attack called Self-XSS. Do not enter or paste code that you do not understand.',
    'font-weight: bold;color:#dc3545;font-size:18px;'
  )
 }