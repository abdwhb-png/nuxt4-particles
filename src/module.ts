import {
  defineNuxtModule,
  addPlugin,
  createResolver,
  addComponent,
} from "@nuxt/kit";
import defu from "defu";

export interface ModuleOptions {
  mode: "full" | "slim" | "basic" | "custom";
  lazy: boolean;
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: "nuxt4-particles",
    configKey: "particles4",
    compatibility: {
      nuxt: ">=3.7.0",
    },
  },
  // Default configuration options of the Nuxt module
  defaults: {
    mode: "full",
    lazy: true,
  },
  setup(options, nuxt) {
    const resolver = createResolver(import.meta.url);

    if (!options.lazy && options.mode !== "custom") {
      addPlugin(resolver.resolve("./runtime/plugins/particle-loader.client"));
    }

    nuxt.options.runtimeConfig.public = defu(
      nuxt.options.runtimeConfig.public || {},
      {
        particles: {
          mode: options.mode,
          lazy: options.lazy,
        },
      }
    );

    // noinspection JSIgnoredPromiseFromCall
    addComponent({
      name: "Nuxt4Particles",
      filePath: resolver.resolve("./runtime/components/Nuxt4Particles.vue"),
    });
  },
});
