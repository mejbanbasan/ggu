import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const curriculumPath = path.join(__dirname, '../../curriculum_llms.txt');
const programDetailsPath = path.join(__dirname, '../../program_details_llms.txt');

let curriculumContent = fs.readFileSync(curriculumPath, 'utf-8');
let programDetailsContent = fs.readFileSync(programDetailsPath, 'utf-8');

// Escape backticks and string interpolation syntax so template literal remains valid JS
function sanitizeForTemplateLiteral(str) {
  return str
    .replace(/\\/g, '\\\\')
    .replace(/`/g, '\\`')
    .replace(/\${/g, '\\${');
}

const cleanCurriculum = sanitizeForTemplateLiteral(curriculumContent);
const cleanProgramDetails = sanitizeForTemplateLiteral(programDetailsContent);

const jsContent = `// FULL UNABRIDGED KNOWLEDGE BASE FROM curriculum_llms.txt AND program_details_llms.txt
// Formatted in clean, human-readable multiline template strings for easy reading.

export const RAW_CURRICULUM_TEXT = \`${cleanCurriculum}\`;

export const RAW_PROGRAM_DETAILS_TEXT = \`${cleanProgramDetails}\`;
`;

fs.writeFileSync(path.join(__dirname, 'rawKnowledgeBase.js'), jsContent, 'utf-8');
console.log('Successfully formatted rawKnowledgeBase.js into clean, human-readable multiline text!');
