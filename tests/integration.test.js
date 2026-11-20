
const path = require('path');
const { spawn } = require('child_process');

const projectDir = path.join(__dirname, '..');
const serverPath = path.join(
    projectDir,
    'node_modules',
    'http-server',
    'bin',
    'http-server'
);

const port = 8090;
const baseUrl = `http://127.0.0.1:${port}`;

let server;

const pages = [
    'index.html',
    'contact.html',
    'login.html',
    'registration.html'
];

describe('Student Management System - HTTP Integration Tests', () => {

    // Start HTTP server before testing
    beforeAll(async () => {
        server = spawn(
            process.execPath,
            [serverPath, '-a', '127.0.0.1', '-p', String(port)],
            {
                cwd: projectDir,
                stdio: 'ignore'
            }
        );

        // Wait until HTTP server is ready
        let ready = false;

        for (let i = 0; i < 20; i++) {
            try {
                const response = await fetch(`${baseUrl}/index.html`);

                if (response.status === 200) {
                    ready = true;
                    break;
                }
            } catch (error) {
                await new Promise(resolve => setTimeout(resolve, 250));
            }
        }

        if (!ready) {
            throw new Error('HTTP server failed to start.');
        }
    }, 10000);

    // Stop HTTP server after testing
    afterAll(() => {
        if (server && !server.killed) {
            server.kill();
        }
    });

    // Test each page through HTTP
    test.each(pages)(
        '%s should return HTTP 200',
        async (page) => {
            const response = await fetch(`${baseUrl}/${page}`);

            expect(response.status).toBe(200);
        }
    );

    // Test homepage navigation links
    test('homepage should contain navigation links', async () => {
        const response = await fetch(`${baseUrl}/index.html`);
        const content = await response.text();

        expect(content).toContain('contact.html');
        expect(content).toContain('login.html');
        expect(content).toContain('registration.html');
    });

});
