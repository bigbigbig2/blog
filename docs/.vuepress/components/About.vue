<template>
  <Common>
    <template #page>
      <div class="about-wrapper">
        <div class="profile">
          <div class="profile__content">
            <div class="profile__basic">
              <img class="avatar" :src="$withBase(pageData.frontmatter.avatar)" />

              <h2 class="title">{{ pageData.frontmatter.name }}</h2>
              <p class="subname">{{ pageData.frontmatter.subname }}</p>

              <div class="sns">
                <div
                  v-for="(link, platform) in LINKS"
                  :key="`about-${link}`"
                  class="sns__item"
                >
                  <a target="_blank" :href="link">
                    <v-icon :name="snsIcon(platform)" scale="1.82" />
                  </a>
                </div>

                <div v-if="pageData.frontmatter.cv" class="sns__item">
                  <a :href="pageData.frontmatter.cv">
                    <v-icon name="ai-cv" scale="2" />
                  </a>
                </div>
              </div>
            </div>

            <div class="profile__info">
              <h2 class="title">some</h2>

              <div class="bio-info" v-html="bioMarkdown" />

              <div class="personal-info">
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </Common>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { pageData } from "@vuepress/client";
import Common from "vuepress-theme-gungnir/lib/client/components/Common.vue";
import MarkdownIt from "markdown-it";

const LINKS = {
  github: "https://github.com/bigbigbig2",
  twitter: "https://www.twitter.com/pibv96YZx5HVHx0",
  email: "mailto:abcdglas@gmail.com"
};

const ICONS = {
  github: "ri-github-fill",
  twitter: "ri-twitter-fill",
  email: "hi-mail"
};

const BIO_PATH = "/md/about.md";

const getMarkdownIt = () => {
  const md = new MarkdownIt();

  // Remember old renderer, if overridden, or proxy to default renderer
  const defaultRender = md.renderer.rules.link_open || function(tokens, idx, options, env, self) {
    return self.renderToken(tokens, idx, options);
  };

  md.renderer.rules.link_open = function (tokens, idx, options, env, self) {
    // If you are sure other plugins can't add `target` - drop check below
    const aIndex = tokens[idx].attrIndex("target");
    if (aIndex < 0) {
      tokens[idx].attrPush(["target", "_blank"]); // add new attribute
    } else {
      tokens[idx].attrs[aIndex][1] = "_blank";    // replace value of existing attr
    }
    // pass token to default renderer.
    return defaultRender(tokens, idx, options, env, self);
  };

  return md;
}

const bioMarkdown = ref("");

onMounted(() => {
  const md = getMarkdownIt();

  fetch(BIO_PATH)
    .then((response) => response.text())
    .then((result) => bioMarkdown.value = md.render(result))
    .catch((error) => console.error(error));
});

const snsIcon = (platform) => ICONS[platform];
</script>
