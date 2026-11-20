
const fs = require('fs');
const path = require('path');

const projectDir = path.join(__dirname, '..');

const pages = [
    'index.html',
    'contact.html',
    'login.html',
    'registration.html'
];

describe('Student Management System - Unit Tests', () => {

    // Test 1: Check that all HTML pages exist
    test.each(pages)('%s should exist', (page) => {
        const filePath = path.join(projectDir, page);

        expect(fs.existsSync(filePath)).toBe(true);
    });

    // Test 2: Check that all pages contain HTML structure
    test.each(pages)('%s should contain valid HTML structure', (page) => {
        const filePath = path.join(projectDir, page);
        const content = fs.readFileSync(filePath, 'utf8');

        expect(content).toContain('<!DOCTYPE html>');
        expect(content).toContain('<html');
        expect(content).toContain('<head>');
        expect(content).toContain('<body>');
    });

    // Test 3: Check that each page has a title
    test.each(pages)('%s should contain a page title', (page) => {
        const filePath = path.join(projectDir, page);
        const content = fs.readFileSync(filePath, 'utf8');

        expect(content).toMatch(/<title>.*<\/title>/i);
    });

});
