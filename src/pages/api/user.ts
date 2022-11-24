import { withIronSessionSsr,withIronSessionApiRoute } from "iron-session/next";
import {ironOptions} from "../../../lib/config";
import { NextApiRequest, NextApiResponse } from 'next'

export default withIronSessionApiRoute(
    async function userRoute(req:NextApiRequest, res:NextApiResponse) {
        console.log(req);
        res.send({ user: req.session.user });
    },
    ironOptions,
  );
