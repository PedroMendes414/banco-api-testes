const request = require('supertest');
const { expect } = require('chai');
const {obterToken } = require('../helpers/autenticacao')
require('dotenv').config();
const postTransferencias = require('../fixtures/postTransferencias.json')

describe('Transferencias', () => {
    describe('POST /transferencias', () => {
        let token
        
        beforeEach( async () => {
            token = await obterToken('julio.lima', '123456')
        })

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
            const bodyTransferencias = { ...postTransferencias}
            bodyTransferencias.valor = 7

            const resposta = await request(process.env.BASE_URL)
                .post('/transferencias')
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send(bodyTransferencias )

            expect(resposta.status).to.equal(422);

        })
    })
})