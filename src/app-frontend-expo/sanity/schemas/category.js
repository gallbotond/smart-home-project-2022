export default {
  name: "category",
  title: "Menu Category",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Category name",
      type: "string",
      validation: (Rule) => Rule.isrequired(),
    },
    {
      name: "image",
      title: "Image of Category",
      type: "image",
    },
  ],
};
