import * as main from '../src/index';

const tourney = new main.Tourney();

tourney.addCsvFile('./test/example.csv', (_err: any, _data: any) => {
    tourney.generatrPairs((pairs: any) => {
        pairs = pairs.map((self: any) => {
            let r = Math.round(Math.random());

            self[r].score = 1;
            self[1-r].score = 0;

            if(self[0]._line === null) {
                self[0].score = 0;
                self[1].score = 1;
            } else if(self[1]._line === null) {
                self[0].score = 1;
                self[1].score = 0;
            }

            return self;
        }); // randomly assigns who wins each round
        tourney.printPairs(pairs, './test/pairs.csv');
    });
});