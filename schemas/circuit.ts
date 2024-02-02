// Schema for the Circuit model
// -------------------------------------------------------------
// I need following fields:
// - name
// - Contract start
// - Contract end
// - Comment
// - Active this year
// - Race date this year

import { CalendarIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'circuit',
    title: 'Circuit',
    icon: CalendarIcon,
    type: 'document',
    fields: [
        defineField({
            name: 'name',
            title: 'Name',
            type: 'string',
            validation: (rule) => rule.required(),
        }),
        // defineField({
        //     name: 'contractStart',
        //     title: 'Contract start',
        //     type: 'number',
        //     validation: (rule) => rule.required(),
        // }),
        defineField({
            name: 'contractEnd',    
            title: 'Contract end',
            type: 'number',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'length',
            title: 'Length',
            type: 'number',
        }),
        defineField({
            name: 'laps',
            title: 'Laps',
            type: 'number',
        }),
        defineField({
            name: 'comment',
            title: 'Comment',
            type: 'string',
        }),
        defineField({
            name: 'active',
            title: 'Active this year',
            type: 'boolean',
            initialValue: true,
        }),
        defineField({
            name: 'racedate',
            title: 'Racedate this year',
            type: 'date',
        }),
    ]
})