import { withIronSessionApiRoute } from "iron-session/next";
import { ironOptions } from "../../../lib/config";
import { NextApiRequest, NextApiResponse } from 'next'

export default withIronSessionApiRoute(
  function logoutRoute(req:NextApiRequest, res:NextApiResponse) {
    req.session.destroy();
    res.send({ ok: true });
  },
  ironOptions
);
