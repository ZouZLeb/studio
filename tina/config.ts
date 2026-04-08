import { defineConfig } from "tinacms";

export default defineConfig({
  branch: "main",
  clientId: null,  // No Tina Cloud — local/git mode only
  token: null,     // No Tina Cloud

  build: {
    outputFolder: "admin",
    publicFolder: "public",
    host: true,
  },

  server: {
    allowedOrigins: ["private"],
  },

  media: {
    tina: {
      mediaRoot: "uploads",
      publicFolder: "public",
    },
  },

  schema: {
    collections: [
      {
        name: "post",
        label: "Blog Posts",
        path: "content/blog",
        format: "mdx",
        ui: {
          filename: {
            readonly: true,
            slugify: (values) => values?.slug ?? "untitled",
          },
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true,
          },
          {
            type: "string",
            name: "slug",
            label: "URL Slug",
            required: true,
            description: "Used in the URL: /blog/your-slug",
          },
          {
            type: "string",
            name: "description",
            label: "Meta Description (SEO)",
            required: true,
            ui: { component: "textarea" },
            description: "150–160 characters. Shown in Google search results.",
          },
          {
            type: "image",
            name: "bannerImage",
            label: "Banner Image",
            description: "Displayed at the top of the post",
          },
          {
            type: "string",
            name: "youtubeVideoId",
            label: "Featured YouTube Video ID",
            description: "e.g., dQw4w9WgXcQ. Displayed below the title.",
          },
          {
            type: "string",
            name: "ogTitle",
            label: "OG Title (Social Share)",
            description: "Defaults to post title if left blank.",
          },
          {
            type: "string",
            name: "ogDescription",
            label: "OG Description (Social Share)",
            ui: { component: "textarea" },
          },
          {
            type: "image",
            name: "ogImage",
            label: "OG Image (Social Share)",
            description: "Recommended: 1200×630px",
          },
          {
            type: "string",
            name: "canonicalUrl",
            label: "Canonical URL",
            description: "Leave blank to use the default page URL.",
          },
          {
            type: "string",
            name: "tags",
            label: "Tags",
            list: true,
            description: "Used for related posts and filtering.",
          },
          {
            type: "string",
            name: "category",
            label: "Category",
            options: [
              "General",
              "Tutorials",
              "News",
              "Case Studies",
              "Tips & Tricks",
            ],
          },
          {
            type: "datetime",
            name: "publishedAt",
            label: "Published Date",
            required: true,
          },
          {
            type: "datetime",
            name: "updatedAt",
            label: "Last Updated",
          },
          {
            type: "boolean",
            name: "draft",
            label: "Draft",
            description: "Draft posts are built but not shown on the live site.",
          },
          {
            type: "rich-text",
            name: "body",
            label: "Post Body",
            isBody: true,
            templates: [
              {
                name: "YouTube",
                label: "YouTube Embed",
                fields: [
                  {
                    name: "id",
                    label: "YouTube Video ID",
                    type: "string",
                    required: true,
                    description: "e.g., dQw4w9WgXcQ",
                  },
                ],
              },
              {
                name: "Callout",
                label: "Callout Box",
                fields: [
                  {
                    name: "title",
                    label: "Title (optional)",
                    type: "string",
                  },
                  {
                    name: "type",
                    label: "Type",
                    type: "string",
                    options: ["info", "warning"],
                  },
                  {
                    name: "children",
                    label: "Content",
                    type: "rich-text",
                    required: true,
                  },
                ],
              },
              {
                name: "FAQ",
                label: "FAQ Wrapper",
                fields: [
                  {
                    name: "children",
                    label: "FAQ Items",
                    type: "rich-text",
                    required: true,
                  },
                ],
              },
              {
                name: "FAQItem",
                label: "FAQ Item",
                fields: [
                  {
                    name: "question",
                    label: "Question",
                    type: "string",
                    required: true,
                  },
                  {
                    name: "value",
                    label: "Value (Accordion ID)",
                    type: "string",
                    description: "Leave empty to auto-generate from the question.",
                  },
                  {
                    name: "children",
                    label: "Answer Content",
                    type: "rich-text",
                    required: true,
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
});
