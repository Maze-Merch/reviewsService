const fs = require('fs');
const faker = require('faker');
const argv = require('yargs');

const lines = argv.lines || 1000;
const filename = argv.output || 'reviewData.csv';
const stream = fs.createWriteStream(filename);

const createPost = () => {
  const body = faker.hacker.phrase();
  const date = faker.date.recent();
  const helpfulness = faker.random.number(1);
  const photos = [{ id: faker.random.number(4), url: faker.imageURL() }];
  const rating = faker.random.number(1);
  const recommend = faker.random.number({ max: 1 });
  const response = faker.hacker.phrase();
  const review_id = faker.random.number(10);
  const name = faker.name.firstName();
  const summary = faker.hacker.phrase();

  return `${body},${date},${helpfulness},${photos},${rating},${recommend},${response},${review_id},${name},${summary}\n`;
};

const startWriting = (writeStream, encoding, done) => {
  let i = lines;
  function writing() {
    const canWrite = true;
    do {
      i--;
      const post = createPost();
      // check if i === 0 so we would write and call 'done'
      if (i === 0) {
        // we are done so fire callback
        writeStream.write(post, encoding, done);
      } else {
        // we are not done so don't fire callback
        writeStream.write(post, encoding);
      }
      // else call write and continue looping
    } while (i > 0 && canWrite);
    if (i > 0 && !canWrite) {
      // our buffer for stream filled and need to wait for drain
      // Write some more once it drains.
      writeStream.once('drain', writing);
    }
  }
  // initiate our writing function
  writing();
};

// write our 'header' line before we invoke the loop
stream.write('userId, title, content, image, date\n', 'utf-8');
// invoke startWriting and pass callback
startWriting(stream, 'utf-8', () => {
  stream.end();
});
