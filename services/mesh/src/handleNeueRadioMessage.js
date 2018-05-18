const actions = {
  
  send: async ( atrxNetwork, neueRadioBroker, topic, payload ) => {
    console.log( 'mesh.send', payload );
    atrxNetwork.broadcast( 'message', payload );
  }

};

module.exports = ( atrxNetwork, neueRadioBroker ) => async ({ topic, payload }) => {
  
  let action = null;

  try {
    
    switch (topic) {
      case 'mesh/command/send':
        action = actions.send;
        break;
    }

    action( atrxNetwork, neueRadioBroker, topic, payload );
  
  } catch (e) {
    
    console.log('Error handling action', e);
  }
};