const request = require('supertest');
const { expect } = require('chai');
const { obterToken } = require('../helpers/autenticacao')
require('dotenv').config();
const postTransferencias = require('../fixtures/postTransferencias.json')

describe('Transferencias', () => {
    let token
    beforeEach(async () => {
        token = await obterToken('julio.lima', '123456')
    })

    describe('POST /transferencias', () => {
        it('Deve retornar sucesso com 201 quando o valor da transferencia for igual ou acima de RS$10,00 ', async () => {
            // Capturar o token
            const bodyTransferencias = { ...postTransferencias }
            console.log('Enviando:', bodyTransferencias);

            const resposta = await request(process.env.BASE_URL)
                .post('/transferencias')
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send(bodyTransferencias)

            expect(resposta.status).to.equal(201);
        })

        it('Deve retornar falha com 422 quando o valor da transferencia for abaixo de RS$10,00 ', async () => {
            const bodyTransferencias = { ...postTransferencias }
            bodyTransferencias.valor = 7

            const resposta = await request(process.env.BASE_URL)
                .post('/transferencias')
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send(bodyTransferencias)

            expect(resposta.status).to.equal(422);

        })
    })

    describe('GET /transferencias/{id}', () => {
        it('Deve retornar com 200 e dados iguais ao registro de transferência contido no banco de dados quando ID for válido', async () => {
            const resposta = await request(process.env.BASE_URL)
                .get('/transferencias/16')
                .set('Authorization', `Bearer ${token}`)

            expect(resposta.status).to.equal(200)
            expect(resposta.body.id).to.equal(16)
            expect(resposta.body.id).to.be.a('number')
            expect(resposta.body.conta_origem_id).to.equal(1)
        })
    })
    describe('GET /transferencias', () => {
        it('Deve retornar 10 elementos na paginação quandi informar limite de 10 registros', async () => {
            const resposta = await request(process.env.BASE_URL)
                .get('/transferencias?page=1&limit=10')
                .set('Authorization', `Bearer ${token}`)

            expect(resposta.status).to.equal(200)
            expect(resposta.body.limit).to.equal(10)
            expect(resposta.body.transferencias).to.have.lengthOf(10)

        })
    })
})