var ip = require("ip");
var redbird = new require('redbird')({
        port: 80,

        // Specify filenames to default SSL certificates (in case SNI is not supported by the
        // user's browser)
        ssl: {
                port: 443,
                key: "/etc/ssl/certs/dev-key.pem",
                cert: "/etc/ssl/certs/dev-cert.pem",
        }
});

// Since we will only have one https host, we dont need to specify additional certificates.
redbird.register(ip.address(), 'http://localhost:3000');

