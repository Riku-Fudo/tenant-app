import { withIronSessionApiRoute } from "iron-session/next";
import { ironOptions } from "../../../lib/config";
import { NextApiRequest, NextApiResponse } from 'next'

export default withIronSessionApiRoute(
  async function cartRoute(req:NextApiRequest, res:NextApiResponse) {

    const data = req.body
    console.log(`でーた：${data}`)
    const cart = req.session.cart
    if(cart !== undefined){
        cart.push(data);
    }else{
        req.session.cart = [data];
    }
    await req.session.save();

    // const tmp = req.session.cart
    console.log(`カート追加しました。`);
    res.status(200).end();
  },

  ironOptions
);
