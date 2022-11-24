import * as IronSession from "iron-session";

declare module "iron-session" {
    interface IronSessionData {
      user?: {
        id: number;
        admin?: boolean;
      };
      
      cart?:{
        id: string;
        name: string;
        description: string;
        price: string;
        imageUrl: string;
      }[]
    }
  }
