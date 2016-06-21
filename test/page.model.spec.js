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
    var db = new Sequelize('postgres://localhost:5432/wikistackstest', {
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

    // var page;
    // var page2 = Page.build({
    //   title: "Stinky Cheeses",
    //   content: "I only eat the stinkiest of cheeses",
    //   tags: ["#socool", "#dank", "#himom"]
    // })

    // beforeEach(function (done) {
    //   page = Page.build({
    //     title: 'New World Monkeys',
    //     content: "Blah blah blah",
    //     tags: ["#Hi", "#monkeys", "#socool"]
    //   });
    //   return page.validate()
    //   .then(function () {
    //     done();
    //   }).catch(done);
    // });


    describe('route', function () {
      it('returns the url_name prepended by "/wiki/"', function () {
        var page = Page.build({
          urlTitle: "New_World_Monkeys"
        });
        expect(page.route).to.be.equal('/wiki/New_World_Monkeys')
      })
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
      it('gets pages with the search tag');
      it('does not get pages without the search tag');
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
    it('errors without title');
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
