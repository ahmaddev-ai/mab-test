import {
  createP2PForge,
  defineTemplate,
  defineDataSource,
  defineRoute,
} from "p2pforge";
import { buildServiceLocationRows } from "./seo-data";

const rows = buildServiceLocationRows();

const serviceLocations = defineDataSource({ id: "service-locations", rows });

const serviceLocationPage = defineTemplate({
  id: "service-location",
  slug: "{ServiceSlug}-{Connector}-{LocationSlug}",
  title: "{ServiceName} Course {WithAiText}in {Location}",
  description:
    "Learn {ServiceName} {WithAiText}in {Location}. Practical, campaign-ready training.",
  content: `<h1>{ServiceName} Course {WithAiText}in {Location}</h1>`,
  seo: {
    title: "{ServiceName} Course {WithAiText}in {Location}",
    description:
      "Master {ServiceName} {WithAiText}in {Location}. Hands-on training, live campaigns, and certification.",
    schemas: { webpage: { enabled: true }, localbusiness: { enabled: true } },
  },
});

export const forge = createP2PForge({
  brand: "Mian Ahmad Basit",
  siteUrl: "https://ahmadbasit.com",
  dataSources: [serviceLocations],
  templates: [serviceLocationPage],
  routes: [
    defineRoute({
      path: "/",
      template: "service-location",
      dataSource: "service-locations",
    }),
  ],
});
