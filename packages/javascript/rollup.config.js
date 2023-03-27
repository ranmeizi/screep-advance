import typescript from "rollup-plugin-typescript2";
import commonjs from "@rollup/plugin-commonjs";
import del from "rollup-plugin-delete";
import fs from "node:fs";
import path from "node:path";

const plugin = [typescript(), commonjs(), del({ targets: "pkg/*" })];

// 打包modules下的文件夹
const dirs = fs.readdirSync(path.resolve(__dirname, "./src/modules"));

const config = dirs.map((module) => ({
  input: `src/modules/${module}/index.ts`,
  plugins: plugin,
  output: [
    {
      file: `pkg/${module}.js`,
      format: "cjs",
    },
  ],
}));

console.log(config);

export default config;
