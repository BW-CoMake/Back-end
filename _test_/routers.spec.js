const request = require("supertest");
const db = require("../data/db-config");
const server = require("../api/server");

describe("server", () => {
  let token;
  it("db environment set to testing", () => {
    expect(process.env.DB_ENV).toBe("testing");
  });

  describe("routes", () => {
    beforeAll(async () => {
      await db("users")
        .truncate()
        .then(function () {
          return db("issues")
            .truncate()
            .then(function () {
              return db("comments")
                .truncate()
                .then(function () {
                  return db("commentUpvotes")
                    .truncate()
                    .then(function () {
                      return db("issueUpvotes").truncate();
                    });
                });
            });
        });
    });

    describe("register", () => {
      it("should return 201 for creating new user", () => {
        return request(server)
          .post(`/api/auth/register`)
          .send({
            email: "steven@gmail.com",
            username: "Steven",
            password: "123pass",
            zipCode: 10065,
          })
          .then((res) => {
            expect(res.status).toBe(201);
          });
      });

      describe("login", () => {
        it("should return 200 OK", () => {
          // rest client and make a get to '/', look at the status code

          return request(server)
            .post("/api/auth/login")
            .send({
              email: "steven@gmail.com",
              password: "123pass",
            })
            .then((res) => {
              expect(res.status).toBe(200);
              token = res.body.token;
            });
        });
      });
    });
  });

  describe("get all users", () => {
    it("should return 200 for getting users", () => {
      return request(server)
        .get(`/api/users/`)
        .set("authorization", token)
        .then((res) => {
          expect(res.status).toBe(200);
        });
    });
  });

  describe("get single user by id", () => {
    it("should return 200 for getting correct user", () => {
      return request(server)
        .get(`/api/users/1`)
        .set("authorization", token)
        .then((res) => {
          expect(res.status).toBe(200);
        });
    });
  });

  describe("create an issue", () => {
    it("should return 201 for creating an issue", () => {
      const newIssue = {
        user_id: "1",
        zipCode: "02045",
        issue_name: "test_issue",
        description: "test",
      };
      return request(server)
        .post(`/api/issues`)
        .set("authorization", token)
        .send(newIssue)
        .then((res) => {
          expect(res.status).toBe(201);
        });
    });
  });

  describe("create an comment", () => {
    it("should return 201 for creating an comment", () => {
      const newComment = {
        user_id: "1",
        issue_id: "test_issue",
        comment: "test-comment",
      };
      return request(server)
        .post(`/api/comments/`)
        .set("authorization", token)
        .send(newComment)
        .then((res) => {
          expect(res.status).toBe(201);
        });
    });
  });

  describe("get list of issues created by a user", () => {
    it("should return 200 for getting correct user", () => {
      return request(server)
        .get(`/api/users/1`)
        .set("authorization", token)
        .then((res) => {
          expect(res.status).toBe(200);
        });
    });
  });

  describe("update issue info", () => {
    it("should return 200 for issue update", () => {
      return request(server)
        .put(`/api/issues/1`)
        .set("authorization", token)
        .send({
          user_id: "1",
          zipCode: "02045",
          issue_name: "test_issue",
          description: "test-updated",
        })
        .then((res) => {
          expect(res.status).toBe(200);
        });
    });
  });

  describe("get single comment by id", () => {
    it("should return 200 for getting correct comment", () => {
      return request(server)
        .get(`/api/comments/1`)
        .set("authorization", token)
        .then((res) => {
          expect(res.status).toBe(200);
        });
    });
  });

  describe("get single issue by id", () => {
    it("should return 200 for getting correct issue", () => {
      return request(server)
        .get(`/api/issues/1`)
        .set("authorization", token)
        .then((res) => {
          expect(res.status).toBe(200);
        });
    });
  });

  describe("update comment info", () => {
    const updatedComment = {
      user_id: "1",
      issue_id: "test_issue",
      comment: "test-comment-updated",
    };
    it("should return 200 for issue update", () => {
      return request(server)
        .put(`/api/comments/1`)
        .set("authorization", token)
        .send(updatedComment)
        .then((res) => {
          expect(res.status).toBe(200);
        });
    });
  });

  describe("upvote an issue", () => {
    it("should return 201 for creating an upvote", () => {
      const newUpvote = {
        user_id: "1",
        issue_id: "1",
      };
      return request(server)
        .post(`/api/upvotes/issue`)
        .set("authorization", token)
        .send(newUpvote)
        .then((res) => {
          expect(res.status).toBe(201);
        });
    });
  });

  describe("upvote an comment", () => {
    it("should return 201 for creating an upvote", () => {
      const newUpvote = {
        user_id: "1",
        comment_id: "1",
      };
      return request(server)
        .post(`/api/upvotes/comment`)
        .set("authorization", token)
        .send(newUpvote)
        .then((res) => {
          expect(res.status).toBe(201);
        });
    });
  });

  describe("get single issue with comments", () => {
    it("should return 200 for getting correct issue with the comments attached", () => {
      return request(server)
        .get(`/api/issues/1/withComments`)
        .set("authorization", token)
        .then((res) => {
          expect(res.status).toBe(200);
        });
    });
  });

  describe("get single issue with comments", () => {
    it("should return 200 for getting correct comments from an issue id", () => {
      return request(server)
        .get(`/api/issues/1/comments`)
        .set("authorization", token)
        .then((res) => {
          expect(res.status).toBe(200);
        });
    });
  });

  describe("get single issue by id", () => {
    it("should return 200 for getting correct issue by id", () => {
      return request(server)
        .get(`/api/issues/1`)
        .set("authorization", token)
        .then((res) => {
          expect(res.status).toBe(200);
        });
    });
  });

  describe("delete comment upvote", () => {
    it("should return 200 for deleting upvote on a comment", () => {
      return request(server)
        .delete(`/api/upvotes/1/comment`)
        .set("authorization", token)
        .then((res) => {
          expect(res.status).toBe(200);
        });
    });
  });

  describe("delete issue", () => {
    it("should return 200 for deleting issue", () => {
      return request(server)
        .delete(`/api/issues/1`)
        .set("authorization", token)
        .then((res) => {
          expect(res.status).toBe(200);
        });
    });
  });

  describe("delete user", () => {
    it("should return 200 for deleting user info", () => {
      return request(server)
        .delete(`/api/users/1`)
        .set("authorization", token)
        .then((res) => {
          expect(res.status).toBe(200);
        });
    });
  });
});
