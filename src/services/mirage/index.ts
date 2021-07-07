import { ActiveModelSerializer, createServer, Factory, Model, Response } from 'miragejs';
import faker from 'faker';
faker.locale = 'pt_BR';

type User = {
  name: string,
  email: string,
  created_at: string,
  whatsapp: string,
}

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

export function makeServer(){
  const server = createServer({
    serializers: {
      application: ActiveModelSerializer,
    },

    models: {
      user: Model.extend<Partial<User>>({}),
      logbook: Model.extend<Partial<Logbook>>({})
    },

    factories: {
      user: Factory.extend({
        name(){
          return faker.name.firstName() + ' ' + faker.name.lastName();
        },
        email() {
          return faker.internet.email().toLowerCase();
        },
        createdAt() {
          return faker.date.recent(10);
        },
        whatsapp() {
          return faker.phone.phoneNumber();
        }
      }),

      logbook: Factory.extend({
        date(){
          return faker.date.past();
        },
        from(){
          return faker.lorem.word(4).toUpperCase();
        },
        to(){
          return faker.lorem.word(4).toUpperCase();
        },
        partida(){
          return "15:00";
        },
        decolagem(){
          return "15:06";
        },
        pouso(){
          return "15:53";
        },
        corte(){
          return "16:02";
        },
        diurno(){
          return "0,2";
        },
        noturno(){
          return "-";
        },
        ifrr(){
          return "-";
        },
        ifrc(){
          return "-";
        },
        total(){
          return faker.finance.amount(0.1, 2, 1);
        },
        combustivel(){
          return "436";
        },
        pob(){
          return faker.datatype.number({min:1 , max:7})
        },
        carga(){
          return "-";
        },
        pousos(){
          return faker.datatype.number({min:1 , max:10})
        },
        ng(){
          return faker.finance.amount(0.5, 1.68, 2);
        },
        ntl(){
          return faker.finance.amount(0.2, 0.87, 2);
        },
        usage(){
          return "4,8";
        },
        vemd(i: number){
          return `${2453 + i}`;
        },
        nat(){
          return "PV";
        },
        pic(){
          return "118302/SJUM";
        },
        sic(){
          return "-";
        },
        rubrica(){
          return "assinatura";
        }
      })
    },

    seeds(server){
      server.createList('user', 3);
      server.createList('logbook', 200);
    },

    routes(){
      this.namespace = 'api';
      this.timing = 750;

      this.get('/users', function(schema, request) {
        const { page = 1, per_page = 10 } = request.queryParams

        const total = schema.all('user').length

        const pageStart = (Number(page) - 1) * Number(per_page);
        const pageEnd = pageStart + Number(per_page);

        const users = this.serialize(schema.all('user'))
          .users.slice(pageStart, pageEnd)

        return new Response(
          200,
          { 'x-total-count': String(total)},
          { users }
        )

      });
      this.get('users/:id');
      this.post('/users');

      this.get('/logbooks', function(schema, request){
        const { page = 1, per_page = 8 } = request.queryParams

        const total = schema.all('logbook').length

        const pageStart = (Number(page) - 1) * Number(per_page);
        const pageEnd = pageStart + Number(per_page);

        const logbooks = this.serialize(schema.all('logbook'))
          .logbooks.slice(pageStart, pageEnd)

        return new Response(
          200,
          { 'x-total-count': String(total)},
          { logbooks }
        )
      });

      this.namespace = '';
      this.passthrough();
    }
  })
}
