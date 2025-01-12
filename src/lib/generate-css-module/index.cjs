const crypto = require("crypto");
const fs = require("fs");
const path = require("path");

const componentsDir = path.resolve(process.cwd(), "src/components");

/**
 * 디렉토리 내의 모든 CSS Module 파일을 가져옵니다.
 * @param {string} dir - CSS 파일을 가져올 디렉토리 경로.
 * @returns {string[]} - 디렉토리 내의 모든 CSS Module 파일 경로 목록.
 */
const getAllModuleCSSFiles = (dir) => {
  const files = fs.readdirSync(dir, { withFileTypes: true });

  return files.flatMap((file) => {
    const filePath = path.resolve(dir, file.name);
    if (file.isDirectory()) {
      return getAllModuleCSSFiles(filePath);
    }
    if (file.isFile() && file.name.endsWith(".module.css")) {
      return filePath;
    }
    return [];
  });
};

/**
 * 파일 이름을 기반으로 랜덤한 문자열을 생성합니다.
 * @param {string} name - Module CSS 파일 이름
 * @returns {string} - 파일 이름을 기반으로 생성된 랜덤한 문자열
 */
const generateRandomStringFromFileName = (name) => {
  const hash = crypto.createHash("sha256").update(name).digest("hex");
  return hash.slice(0, 7);
};

/**
 * CSS 파일을 난수를 붙여 반환합니다.
 * @param {string} cssFilePath - 업데이트할 CSS 파일 경로
 * @returns {string} - 난수가 붙은 CSS 파일 내용
 */
const updateCSSFiles = (cssFilePath) => {
  const cssContent = fs.readFileSync(cssFilePath, "utf-8");
  const cssFileName = path.basename(cssFilePath).split(".")[0];
  const css = {};

  const transformedCSS = cssContent.replace(/\.([\w-]+)/g, (_, className) => {
    const newCSSClassName = `${className}-${generateRandomStringFromFileName(
      cssFileName,
    )}`;
    css[className] = newCSSClassName;
    return `.${newCSSClassName}`;
  });

  const cssExport = `export default ${JSON.stringify(css, null, 2)};`;
  const distFilePath = path.resolve(
    path.dirname(cssFilePath),
    `${cssFileName}.module.js`,
  );
  fs.writeFileSync(distFilePath, cssExport, "utf-8");

  return transformedCSS;
};

/**
 *
 * @param {string} newCSSString - 새로 적용할 CSS 파일 내용
 */
const updateStyleCSSFile = (newCSSString) => {
  const distFilePath = path.resolve(process.cwd(), "src/app/style.css");
  fs.writeFileSync(distFilePath, newCSSString, "utf-8");
};

/**
 *
 */
const main = () => {
  const moduleCSSFiles = getAllModuleCSSFiles(componentsDir);
  const newCSS = moduleCSSFiles.map(updateCSSFiles);
  updateStyleCSSFile(newCSS.join("\n"));
};

main();
