const nrSocket = require('websocket');
const log = require('debug')('mesh:main');
const ataraxia = require('ataraxia');
const atrxTCPTransport = require('ataraxia-tcp');

const handleNeueRadioMessage = require('./handleNeueRadioMessage');

//const autoSpawn = !!process.env.NO_AUTO_SPAWN;

function initMesh( messageHandler ){
    
    // init mesh network
    var atrxNetwork = new ataraxia({ name: 'uk.co.bbc.rd.irfs.gignmix' });
    
    atrxNetwork.addTransport( new atrxTCPTransport() );

    atrxNetwork.on('node:available', node => {
      console.log('A new node is available:', node.id);      
    });

    atrxNetwork.on('message', msg => {
      console.log('A message was received', msg.type, 'with data', msg.payload, 'from', msg.returnPath.id);
      messageHandler( msg );
    });

    return atrxNetwork;
}


const main = async () => {
  try {

    // init connection to neue-radio message broker
    const broker = nrSocket();

    // init mesh network
    const net = initMesh(

        function( message ){
            broker.publish({
              topic: 'mesh/event/received',
              payload: message
            });
        }

    );


    log('Connected to WebSocket');

    // set a handler for neue-radio messages
    broker.subscribe(
        new RegExp( 'mesh/.*' ),
        handleNeueRadioMessage( net, broker )
    );

    // start up mesh network
    net.start();

  } catch (e) {
    console.log('Error:', e);
  }
};

main();
