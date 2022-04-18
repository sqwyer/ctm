import * as main from '../src/index';

const tourney = new main.Tourney();

tourney.addCsvFile('./test/test.csv', (err: any, data: any) => {
    console.log(tourney);
});