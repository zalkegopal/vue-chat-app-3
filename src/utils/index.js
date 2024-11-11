

export const generateOtp = () => {
  const digits = 6;
  let otp = '';

  while(otp.length < digits) {
    otp += Math.floor(Math.random() * 10);
  }
  console.log('otp', otp);
  return otp;
}

export const validateEmail = (email) => {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}