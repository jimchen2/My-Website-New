## Install

```sh
# configure .env
docker run -d --restart always --env-file .env -p 3010:3000 jimchen2/my-website:latest
```

## Build

```sh
# add Dockerfile
docker build --no-cache -t jimchen2/my-website:latest .
```

build then push
```sh
sudo docker build --no-cache -t jimchen2/my-website:latest . && docker push jimchen2/my-website:latest
```

## Stats

```
use test

var pipeline = [
  {
    $project: {
      body: 1
    }
  }
];

function countWords(str) {
  return str.trim().split(/\s+/).length;
}

var totalWords = 0;

db.documents.aggregate(pipeline).forEach(function(doc) {
  if (doc.body) {
    totalWords += countWords(doc.body);
  }
});

print(totalWords);


function printPost(doc) {
  print("ID: " + doc._id + 
        ", Words: " + doc.wordCount + 
        ", Date: " + (doc.date ? doc.date.toISOString() : "N/A") + 
        ", Title: " + (doc.title || "N/A"));
}

// Set up the aggregation pipeline
var pipeline = [
  {
    $project: {
      _id: 1,
      author: 1,
      date: 1,
      title: 1,
      wordCount: { $size: { $split: ["$body", " "] } }
    }
  },
  {
    $sort: { wordCount: -1 }
  }
];

// Execute the aggregation and store results
var result = db.documents.aggregate(pipeline).toArray();

// Calculate and print average words per post
var totalWords = result.reduce((sum, doc) => sum + doc.wordCount, 0);
var avgWords = totalWords / result.length;
print("Average words per post: " + avgWords.toFixed(2));

// Print post with most words
print("\nPost with most words:");
printPost(result[0]);

// Print post with least words
print("\nPost with least words:");
printPost(result[result.length - 1]);

// Print top 5 posts with most words
print("\nTop 5 posts with most words:");
for (var i = 0; i < 5 && i < result.length; i++) {
  printPost(result[i]);
}

// Print bottom 5 posts with least words
print("\nBottom 5 posts with least words:");
for (var i = result.length - 1; i >= Math.max(0, result.length - 5); i--) {
  printPost(result[i]);
}
```
