const Cryptr = require('cryptr')
const cryptr = new Cryptr(process.env.SECRET1 || 'Secret-Puk-1234')

module.exports = {
    OPENAI_API_KEY: cryptr.decrypt('63a35777923d44ea150a67b03c03fa35c1729c089a965afb639280c127cb131cca26cbaf36d178e97a93f94ea324c44c9e7b430f349b3e13ecf4800b40dfeadcd5ae7da01be1320ed93e5cfd9de07f8b7b386d2cc799e53cf42919eec8b9ef5c2822ebf70bece2574b390fc720aadce4fa96e15f2e5663a0406b67e3fc5075288203bff29ee5ff37daddbf5d245aa1d6f6294f')
}
