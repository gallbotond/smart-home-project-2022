export default {
  name: "restaurant",
  title: "Restaurant",
  type: "document",
  fields: [
    {
      name: "name",
      type: "string",
      title: "Restaurant name",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "short_description",
      type: "string",
      title: "Short description",
      validation: (Rule) => Rule.max(200),
    },
    {
      name: "image",
      type: "image",
      title: "Image of the Restaurant",
      validation: (Rule) => Rule.max(200),
    },
    {
      name: "lat",
      type: "number",
      title: "Latitude of the Restaurant",
      validation: (Rule) => Rule.max(200),
    },
    {
      name: "long",
      type: "number",
      title: "Longitude of the Restaurant",
      validation: (Rule) => Rule.max(200),
    },
    {
      name: "address",
      type: "string",
      title: "Restaurant address",
      validation: (Rule) => Rule.required(),
    },
  ],
};
