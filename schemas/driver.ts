import { UserIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'driver',
  title: 'Driver',
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
      name: 'number',
      title: 'Number',
      type: 'number',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'active',
      title: 'Active driver this year',
      type: 'boolean',
      initialValue: true,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'comment',
      title: 'Comment',
      type: 'string',
    }),
    defineField({
      name: 'contracts',
      title: 'Contracts',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'team',
              title: 'Team',
              type: 'reference',
              to: [{ type: 'team' }],
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'startYear',
              title: 'Start Year',
              type: 'number',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'endYear',
              title: 'End Year',
              type: 'number',
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {
            select: {
              team: 'team.name',
              startYear: 'startYear',
              endYear: 'endYear',
            },
            prepare({ team, startYear, endYear }) {
              return {
                title: `${team}`,
                subtitle: `${startYear} - ${endYear}`,
              }
            },
          },
        },
      ],


    }),
  ],
  // add better preview
  preview: {
    select: {
      name: 'name',
      team: 'contracts.0.team.name',
    },
    prepare({ name, team }) {
      return {
        title: `${name}`,
        subtitle: `${team}`,
      }
    },
  },
})
