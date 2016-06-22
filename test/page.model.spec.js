// var mocha = require('../mocha');
var expect = require('chai').expect;
var chai = require('chai');
var spies = require('chai-spies');
var models = require('../models')
var Page = models.Page;
var Sequelize = require('sequelize');

chai.use(spies);


describe('Page model', function () {

  before(function (done) {
    var db = new Sequelize('postgres://localhost:5432/wikistacktest', {
    logging: false
    });

    Promise.all([
        models.User.sync({}),
        models.Page.sync({})
    ])
    .then(function () {
        done();
    })
    .catch(console.error);
  })

  describe('Virtuals', function () {

    describe('route', function () {
      it('returns the url_name prepended by "/wiki/"', function () {
        var page = Page.build({
          urlTitle: "New_World_Monkeys"
        });
        expect(page.route).to.be.equal('/wiki/New_World_Monkeys');
      });
    });

    describe('renderedContent', function () {
      it('converts the markdown-formatted content into HTML', function () {
        var page = Page.build({
          content: "# Hi Mom!"
        });
        expect(page.renderedContent.trim()).to.be.equal('<h1 id="hi-mom-">Hi Mom!</h1>');
      });
    });
  });

  describe('Class methods', function () {
    describe('findByTag', function () {
      beforeEach(function () {
        return Promise.all([
          Page.create({
            title: 'Test Page 1',
            content: 'This is content 1',
            tags: ['misc', 'test', 'star-wars']
          }),
          Page.create({
            title: 'Test Page 2',
            content: 'Other stuff',
            tags: ['misc', 'star-wars', 'fsa']
          })
        ]);
      });
      afterEach(function(){
        Page.destroy;
      });

      it('gets pages with the search tag', function (done) {
        Page.findByTag("star-wars")
        .then(function (pages) {
          expect(pages).to.have.lengthOf(2);
          done();
        }).catch(done);
      });

      it('does not get pages without the search tag', function (done) {
        Page.findByTag('falafel')
        .then(function(pages) {
          expect(pages).to.have.lengthOf(0);
           done();
        })
        .catch(done);
      });
    });
  });

  describe('Instance methods', function () {
    describe('findSimilar', function () {
      it('never gets itself');
      it('gets other pages with any common tags');
      it('does not get other pages without any common tags');
    });
  });

  describe('Validations', function () {
    var page;
    beforeEach(function(){
      page = Page.create();
    })
    it('errors without title', function(done){
      page.validate()
      .then(function (err){
        expect(err).to.exist;
        expect(err.errors).to.exist;
        expect(err.error[0].path).to.equal('title');
        done();
      })
    })
    it('errors without content');
    it('errors given an invalid status');
  });

  describe('Hooks', function () {
    it('it sets urlTitle based on title before validating');
  });

});












// ********************Our first attempt *******************************
// describe("Page model", function () {

//   describe("Page properties", function () {

//     it("has title, urlTitle, content, status, date, and tags properties", function () {})

//     it("tags is an array that contains sequelize strings", function (){})
//   })

//   describe("Page getter methods", function () {

//     it("has route and renderedContent getter methods", function () {})

//     it("route method returns the correct url", function () {})

//     it("renderedContent returns something", function () {})

//   })

//   describe("Page class methods", function () {

//     it("findByTag function returns all of a specified tag", function () {})

//   })

//   describe("Page instance methods", function () {

//     it("findSimilar function returns all pages that are related to something", function () {})

//   })

//   describe("Page validations", function () {

//     it("title, urlTitle, and content are not null", function () {})

//   })



// })
