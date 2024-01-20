import { UserIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'


export default defineType({
  name: 'team',
  title: 'Team',
  icon: UserIcon,
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'color',
      title: 'Color',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
  ],
})
