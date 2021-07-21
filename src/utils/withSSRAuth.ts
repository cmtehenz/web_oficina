import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { destroyCookie, parseCookies } from 'nookies';
import { AuthTokenError } from "../services/errors/AuthTokenError";

export function withSSRAuth<P>(fn: GetServerSideProps<P>){
  return async (ctx: GetServerSidePropsContext): Promise<GetServerSidePropsResult<P>> => {
    const cookies = parseCookies(ctx);

    if(!cookies['flygo.token']){
      return {
        redirect: {
          destination: '/',
          permanent: false,
        }
      }
    }
    try {
      return await fn(ctx);
    } catch (err){
      if(err instanceof AuthTokenError){
        destroyCookie(ctx, 'flygo.token');
        destroyCookie(ctx, 'flygo.refreshToken');

        return {
          redirect: {
            destination: '/',
            permanent: false,
          }
        }
      }
    }
  }
}
