import {McpServer} from "@modelcontextprotocol/sdk/server/mcp.js";
import {StdioServerTransport} from "@modelcontextprotocol/sdk/server/stdio.js";
import {z} from "zod";
import * as fs from "node:fs";

// Create an MCP server
const server = new McpServer({
    name: "my mcp server",
    title: 'my mcp server',
    version: "1.0.0"
});

// Add an addition tool
server.registerTool(
    "sum",
    {
        title: "计算两数之和",
        description: "得到两数之和为：",
        inputSchema: {
            a: z.number().describe('第一个数'),
            b: z.number().describe('第二个数')
        }
    },
    ({a, b}) => ({
        content: [{type: "text", text: `两数之和的结果是: ${String(a + b)}`}]
    })
);

server.registerTool(
    "createFile",
    {
        title: "创建文件",
        description: "在指定目录下建一个文件：",
        inputSchema: {
            filename: z.string().describe('文件地址/文件名'),
            content: z.string().describe('文件内容')
        }
    },
    ({filename, content}) => {
        try {
            fs.writeFileSync(filename, content);
            return {
                content: [{type: 'text', text: '文件创建成功'}],
            }
        } catch (err) {
            return {
                content: [{type: 'text', text: err}],
            }
        }
    }
);

// Add a dynamic greeting resource
// server.registerResource(
//     "greeting",
//     new ResourceTemplate("greeting://{name}", {list: undefined}),
//     {
//         title: "Greeting Resource",      // Display name for UI
//         description: "Dynamic greeting generator"
//     },
//     async (uri, {name}) => ({
//         contents: [{
//             uri: uri.href,
//             text: `Hello, ${name}!`
//         }]
//     })
// );

// Start receiving messages on stdin and sending messages on stdout
const transport = new StdioServerTransport();
await server.connect(transport);