import { createClient } from "@sanity/client"

export const client = createClient({
  projectId: "zp9uodup", // lo trovi in sanity.config
  dataset: "production",
  useCdn: true,
  apiVersion: "2024-01-01",
})