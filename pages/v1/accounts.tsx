
// See your keys here: https://dashboard.stripe.com/apikeys





import React from 'react'

export default async function accounts() {



    const stripe = require('stripe')('sk_test_51L7UpKF9KFH9wctxElK8BQaZVpVPxMEYIBwTTWZReALGRf79gLDKZLPt91QrogzuqTBK6WWJIerVdv0OxQ3jFhPu00rqzWvVgk');

    const account = await stripe.accounts.create({type: 'express'});




  return (
    <div>accounts</div>
  )
}
