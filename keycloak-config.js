const session = require('express-session');
const Keycloak = require('keycloak-connect');

let _keycloak;

const keycloakConfig = {
    clientId: 'nodejs-microservice',
    bearerOnly: true,
    serverUrl: 'http://localhost:8080/auth',
    realm: 'TP2-Seguridad',
    credentials: {
        secret: 'fde3674d-1bbc-4d0e-9ff2-4f68ca9ae0de'
    }
};

function initKeycloak() {
    if (_keycloak) {
        console.warn("Intentando inicializar Keycloak otra vez!");
        return _keycloak;
    } 
    else {
        console.log("Inicializando Keycloak...");
        var memoryStore = new session.MemoryStore();
        _keycloak = new Keycloak({ store: memoryStore }, keycloakConfig);
        return _keycloak;
    }
}

function getKeycloak() {
    if (!_keycloak){
        console.error('Keycloak no se pudo inicializar.Llamar al comando init.');
    } 
    return _keycloak;
}

module.exports = {
    initKeycloak,
    getKeycloak
};