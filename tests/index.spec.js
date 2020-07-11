require('jest');

const axios = require('axios');

describe('Booleans', ()=>{

    it('tests the testing function', async()=>{

        expect(true===true).toEqual(true);
    })

    describe('Test merchandise routes', ()=>{

        it('tests GET /merch', async()=>{
            const res = await axios.get('/api/merchandise');

            expect(res.data.status).toEqual(true);
        })

        it('tests GET /search', async ()=>{
            const res = await axios.get('/api/mearchandise/search', {name:'quantifying', category:'tents'});

            console.log(res);

            expect(res.data.status).toEqual(true);
        })
    })

})

