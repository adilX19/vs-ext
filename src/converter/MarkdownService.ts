import * as MarkdownIt from 'markdown-it';

export class MarkdownService {
    private md: MarkdownIt;

    constructor() {
        this.md = new MarkdownIt({
            html: true,
            linkify: true,
            typographer: true
        });
    }

    public convertToHtml(markdownContent: string): string {
        const bodyContent = this.md.render(markdownContent);
        return this.wrapHtml(bodyContent);
    }

    private wrapHtml(content: string): string {
        return `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <style>
                body {
                    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
                    font-size: 14px;
                    line-height: 1.6;
                    color: #333;
                    max-width: 800px;
                    margin: 0 auto;
                    padding: 20px;
                }
                pre {
                    background-color: #f6f8fa;
                    padding: 16px;
                    border-radius: 6px;
                    overflow: auto;
                }
                code {
                    font-family: SFMono-Regular, Consolas, "Liberation Mono", Menlo, monospace;
                    background-color: rgba(27,31,35,0.05);
                    padding: 0.2em 0.4em;
                    border-radius: 3px;
                }
                pre code {
                    background-color: transparent;
                    padding: 0;
                }
                table {
                    border-collapse: collapse;
                    width: 100%;
                }
                table, th, td {
                    border: 1px solid #dfe2e5;
                }
                th, td {
                    padding: 6px 13px;
                }
                th {
                    background-color: #f6f8fa;
                    font-weight: 600;
                }
                blockquote {
                    margin: 0;
                    padding: 0 1em;
                    color: #6a737d;
                    border-left: 0.25em solid #dfe2e5;
                }
                img {
                    max-width: 100%;
                    box-sizing: border-box;
                }
            </style>
        </head>
        <body>
            ${content}
        </body>
        </html>
        `;
    }
}
