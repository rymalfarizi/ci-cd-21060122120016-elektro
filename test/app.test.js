const request = require('supertest');
const http = require('http');
const { act } = require('react'); // Import act from react

const app = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello, GitHub Actions!\n');
});

test('GET / responds with correct message', async () => {
  await act(async () => { // Use act to wrap the async call
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
    expect(response.text).toBe('Hello, GitHub Actions!\n');
  });
});