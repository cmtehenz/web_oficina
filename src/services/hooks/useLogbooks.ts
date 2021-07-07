import { useQuery } from 'react-query';
import api from '../api';

type Logbook = {
  date: string,
  from: string,
  to: string,
  partida: string,
  decolagem: string,
  pouso: string,
  corte: string,
  diurno: string,
  noturno: string,
  ifrr: string,
  ifrc: string,
  total: string,
  combustivel: string,
  pob: string,
  carga: string,
  pousos: string,
  ng: string,
  ntl: string,
  usage: string,
  vemd: string,
  nat: string,
  pic: string,
  sic: string,
  rubrica: string,
}

type GetLogbooksResponse = {
  totalCount: number;
  logbooks: Logbook[];
}

export async function getLogbooks(page: number): Promise<GetLogbooksResponse>{
  const { data, headers } = await api.get('/logbooks', {
    params: {
      page,
    }
  });

  const totalCount = Number(headers['x-total-count'])

  const logbooks = data.logbooks.map(logbook=> {
    return {
      date: new Date(logbook.date).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
      }),
      from: logbook.from,
      to: logbook.to,
      partida: logbook.partida,
      decolagem: logbook.decolagem,
      pouso: logbook.pouso,
      corte: logbook.corte,
      diurno: logbook.diurno,
      noturno: logbook.noturno,
      ifrr: logbook.ifrr,
      ifrc: logbook.ifrc,
      total: logbook.total,
      combustivel: logbook.combustivel,
      pob: logbook.pob,
      carga: logbook.carga,
      pousos: logbook.pousos,
      ng: logbook.ng,
      ntl: logbook.ntl,
      usage: logbook.usage,
      vemd: logbook.vemd,
      nat: logbook.nat,
      pic: logbook.pic,
      sic: logbook.sic,
      rubrica: logbook.rubrica,
    }
  })

  return {
    logbooks,
    totalCount,
  }
};

export function useLogbooks(page: number) {
  return useQuery(['logbooks', page], () => getLogbooks(page), {
    staleTime: 1000 * 5, // 5 segundos
  })
}
