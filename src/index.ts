import { Weapp } from "@tarojs/plugin-platform-weapp";
import { resolve } from "path";
import { readFileSync, writeFileSync, existsSync } from "fs";
import type { IPluginContext } from "@tarojs/service";
import type { IOptions } from "@tarojs/plugin-platform-weapp";

export interface Options extends IOptions {
  prefix?: string;
  suffix?: string;
  include?: Array<string | RegExp>;
  exclude?: Array<string | RegExp>;
}

const defaultOptions: Options = {
  prefix: readFileSync(
    resolve(__dirname, "../template/prefix.wxml")
  ).toString(),
  suffix: readFileSync(
    resolve(__dirname, "../template/suffix.wxml")
  ).toString(),
};

export default (ctx: IPluginContext, options: Options) => {
  ctx.registerPlatform({
    name: "miniprogram",
    useConfigName: "mini",
    async fn({ config }) {
      config.onBuildFinish = ({ stats }) => {
        stats.compilation.entries.forEach((entry) => {
          if (entry.miniType !== "PAGE") return

          if (
            options.include &&
            !options.include.some((pattern) => entry.name.match(pattern))
          ) {
            return;
          }
          if (
            options.exclude &&
            options.exclude.some((pattern) => entry.name.match(pattern))
          ) {
            return;
          }

          const WxmlFilePath = resolve(
            config.outputRoot,
            `${entry.name}.wxml`
          );
          const WxmlFileContent = readFileSync(WxmlFilePath, "utf-8");
          let { prefix, suffix } = defaultOptions;
          if (options?.prefix) {
            if (existsSync(options.prefix)) {
              prefix = readFileSync(options.prefix, "utf-8");
            } else {
              prefix = options.prefix;
            }
          }
          if (options?.suffix) {
            if (existsSync(options.suffix)) {
              suffix = readFileSync(options.suffix, "utf-8");
            } else {
              suffix = options.suffix;
            }
          }
          writeFileSync(WxmlFilePath, `${prefix}${WxmlFileContent}${suffix}`);
        });
      };

      const program = new Weapp(ctx, config, options || {});
      await program.start();
    },
  });
};
