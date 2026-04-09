import { compile, run } from "@mdx-js/mdx";
import remarkGfm from "remark-gfm";
import * as runtime from "react/jsx-runtime";
import { Callout } from "@/components/callout";
import { Steps, Step } from "@/components/steps";
import { GameCard } from "@/components/game-card";

const components = {
  Callout,
  Steps,
  Step,
  GameCard,
};

export async function compileMDX(source: string) {
  const compiled = await compile(source, {
    outputFormat: "function-body",
    remarkPlugins: [remarkGfm],
  });

  const { default: MDXContent } = await run(String(compiled), {
    ...(runtime as any),
  });

  return <MDXContent components={components} />;
}
