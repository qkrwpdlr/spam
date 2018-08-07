const request = require("supertest");
const should = require("should");
const app = require("../../index");
const models = require("../../models")

describe('GET users/ 는',()=>{
    describe('성공시',()=>{
        var users = [
            {"name":"jake"},{"name":"jj"}
        ];
        before(()=>{
            return models.sequelize.sync({force:true});
        });
        before(()=>{
            return models.User.bulkCreate(users);
        });
        it("객체들을 환한다.",(done)=>{
            request(app)
            .get('/users')
            .end((err,res)=>{
                res.body.should.be.instanceOf(Array);
                done();
            });
        })
    })
});

describe('GET users/id 는',()=>{
    describe('성공시',()=>{
        it('id가 1인 객체를 반환한다',(done)=>{
            request(app)
            .get('/users/1')
            .end((err,res)=>{
                res.body.should.have.property('id',1);
                done();
            });
        });
    });
    describe('실패시',()=>{
        it('id가 숫자가 아니다',(done)=>{
            request(app)
            .get('/users/one')
            .expect(400)
            .end(done);
        })
        it('id가 없는 id이다',(done)=>{
            request(app)
            .get('/users/100000')
            .expect(404)
            .end(done);
        })
    })
});

describe('delete users/id 는',()=>{
    describe('성공시',()=>{
        it('204를 응답한다.',(done)=>{
            request(app)
            .delete('/users/1')
            .expect(204)
            .end(done)
        })
    })
    describe('실패시',()=>{
        it("id 가 숫자가 아닐경우 400을 응답한다.",(done)=>{
            request(app)
            .delete('/users/apple')
            .expect(400)
            .end(done)
        })
    })
})

describe('POST users는',()=>{
    var users = [
        {"name":"jake"},{"name":"jj"}
    ];
    before(()=>{
        return models.sequelize.sync({force:true});
    });
    before(()=>{
        return models.User.bulkCreate(users);
    });
    describe('성공시',()=>{
        it('user를 반환한다.',(done)=>{
            request(app)
            .post("/users")
            .set("Content-Type", "application/json")
            .send({"name":"jake102"})
            .expect(201)
            .end((err,res)=>{
                res.body.should.have.property('name','jake102')
                done();
            })
        })
    })
    describe('실패시 ',()=>{
        it("아무것도 안왔을시 400error 를 출력한다",(done)=>{
            request(app)
            .post('/users')
            .set("Content-Type", "application/json")
            .send({})
            .expect(400)
            .end(done);
        })
        it("중복된 것이 왔을경우 409error",(done)=>{
            request(app)
            .post('/users')
            .set("Content-Type", "application/json")
            .send({"name":"jake102"})
            .expect(409)
            .end(done);
        })
    })
})

describe('PUT users/id는',()=>{
    describe('success',()=>{
        it('return change name and ',(done)=>{
            request(app)
            .put('/users/2')
            .set("Content-Type", "application/json")
            .send({"name":"jj"})
            .end((err,res)=>{
                res.body.should.have.property('name','jj');
                done();
            })
        })
    })
})