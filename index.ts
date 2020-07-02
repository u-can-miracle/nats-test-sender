import { connect } from 'ts-nats';

async function start() {
  try {
    const nc = await connect('nats://localhost:4222');
    const data = JSON.stringify({
      id: 'myid',
      payload: { name: 'John' },
      reply: 'reply',
    });
    setInterval(() => {
      console.log('publish')
      nc.publish('hello', data, 'Hi');
    }, 3000);

    await nc.subscribe('reply', (err, msg) => {
      if (err) {
        console.log('subscribe err', err)
        return;
      }
      console.log('GOT msg: ', msg);
    });

  } catch (err) {
    console.log('err', err)
  }
}

start();
