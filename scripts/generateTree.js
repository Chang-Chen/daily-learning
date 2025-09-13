// generateTree.js
import fs from 'fs';
import path from 'path';

function generateTreeTreeStyle(dir, baseDir = dir, prefix = '') {
    const files = fs.readdirSync(dir, { withFileTypes: true });
    let tree = '';

    files.forEach((file, index) => {
        const isLast = index === files.length - 1;
        const pointer = isLast ? '└── ' : '├── ';
        const fullPath = path.join(dir, file.name);
        const relativePath = path.relative(baseDir, fullPath);

        if (file.isDirectory()) {
            tree += `${prefix}${pointer}${file.name}/\n`;
            tree += generateTreeTreeStyle(fullPath, baseDir, prefix + (isLast ? '    ' : '│   '));
        } else {
            tree += `${prefix}${pointer}[${file.name}](${relativePath})\n`;
        }
    });

    return tree;
}

function generateTreeMarkdownStyle(dir, baseDir = dir, indent = '') {
    const files = fs.readdirSync(dir, { withFileTypes: true });
    let tree = '';

    files.forEach((file) => {
        const fullPath = path.join(dir, file.name);
        const relativePath = path.relative(baseDir, fullPath);

        if (file.isDirectory()) {
            tree += `${indent}- **${file.name}/**\n`;  // 每个目录独立一行
            tree += generateTreeMarkdownStyle(fullPath, baseDir, indent + '  ');
        } else {
            tree += `${indent}- [${file.name}](${relativePath})\n`;  // 每个文件独立一行
        }
    });

    return tree;
}

function writeMarkdownTree(rootDir, outputFile, style = 'markdown') {
    let treeContent = `# 🪄 文件目录结构 ✨️\n\n`;

    if (style === 'tree') {
        // treeContent += '```\n' + rootDir + '\n```\n\n';
        // treeContent += '## 文件索引\n\n';
        treeContent += generateTreeTreeStyle(rootDir);
    } else {
        treeContent += generateTreeMarkdownStyle(rootDir);
    }

    fs.writeFileSync(outputFile, treeContent, 'utf-8');
    console.log(`✅ 目录树已生成到 ${outputFile} (style=${style})`);
}

// CLI 用法： node generateTree.js ./src ./TREE.md --style=tree|markdown
const args = process.argv.slice(2);
if (args.length < 2) {
    console.error('用法: node generateTree.js <目录路径> <输出文件.md> [--style=tree|markdown]');
    process.exit(1);
}

const [rootDir, outputFile, styleArg] = args;
const style = styleArg?.replace('--style=', '') || 'markdown';

writeMarkdownTree(path.resolve(rootDir), path.resolve(outputFile), style);