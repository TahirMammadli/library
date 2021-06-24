const getDb = require("../util/db").getDb;
const mongoDb = require("mongodb");

class Post {
  constructor(title, content) {
    this.title = title;
    this.content = content;
  }

  save() {
    const db = getDb();
    db.collection("posts")
      .insertOne(this)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));

    return db;
  }
  static update(postId, title, content) {
    
    const db = getDb();
    console.log(title, content)
    return db
      .collection("posts")
      .updateOne(
        { _id: new mongoDb.ObjectId(postId) },
        { $set: { title: title, content: content } }
      )
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
      
  }


static deletePost(postId) {
    const db = getDb();

    return db
      .collection("posts")
      .deleteOne({ _id: new mongoDb.ObjectId(postId) });
  }






  static fetchAll() {
    const db = getDb();

    return db
      .collection("posts")
      .find()
      .toArray()
      .then((res) => {
        console.log(res);
        return res;
      })
      .catch((err) => console.log(err));
  }

  

  static findById(postId) {
    const db = getDb();

    return db
      .collection("posts")
      .find({ _id: new mongoDb.ObjectId(postId) })
      .next()
      .then((res) => {
        console.log(res, "FROM MODEL");
        return res;
      })
      .catch((err) => console.log(err));
  }
}

module.exports = Post;