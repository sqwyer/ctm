import * as main from '../src/index';

const tourney = new main.Tourney();

tourney.addCsvFile('./test/example.csv', (err: any, data: any) => {
    tourney.generatrPairs((pairs: any) => {
        console.log(pairs);
    });
});