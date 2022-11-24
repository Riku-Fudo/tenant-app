import { withIronSessionApiRoute } from 'iron-session/next'
import { ironOptions } from "../../../lib/config";
import { NextApiRequest, NextApiResponse } from 'next'

export default withIronSessionApiRoute(loginRoute, ironOptions);

  async function loginRoute(req:NextApiRequest, res:NextApiResponse) {
    const result = await fetch(`http://localhost:8000/users?userId=${req.body.id}&password=${req.body.password}`).then(data => data.json()).catch((error) => {console.log(`エラーです：${error}`)})
    
    if(result.length === 0){
      console.log(`ログイン失敗`)
      res.status(404).end();
      return
    }

    req.session.user = {
      id: result[0].userId,
      admin: true,
    };
    await req.session.save();
    // await req.session.destroy();
    console.log(req.session.user);
    res.status(200).end();
  }
