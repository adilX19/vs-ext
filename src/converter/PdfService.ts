import * as puppeteer from 'puppeteer-core';
import * as launcher from 'chrome-launcher';
import * as fs from 'fs';

export class PdfService {
    public async convertHtmlToPdf(html: string, outputPath: string): Promise<void> {
        let browser;
        try {
            // Find compatible browser (Chrome or Edge)
            const chromePath = await this.getExecutablePath();
            
            browser = await puppeteer.launch({
                executablePath: chromePath,
                headless: true,
                args: ['--no-sandbox', '--disable-setuid-sandbox']
            });

            const page = await browser.newPage();
            await page.setContent(html, { waitUntil: 'networkidle0' });
            
            await page.pdf({
                path: outputPath,
                format: 'A4',
                printBackground: true,
                margin: {
                    top: '20px',
                    bottom: '20px',
                    left: '20px',
                    right: '20px'
                }
            });

        } catch (error) {
            console.error('Error generating PDF:', error);
            throw error;
        } finally {
            if (browser) {
                await browser.close();
            }
        }
    }

    private async getExecutablePath(): Promise<string> {
        // Use chrome-launcher to find locally installed chrome/edge
        const install = launcher.Launcher.getFirstInstallation();
        if (install) {
            return install;
        }
        throw new Error('No Chrome or Edge installation found. Please install Chrome or Edge to generate PDFs.');
    }
}
