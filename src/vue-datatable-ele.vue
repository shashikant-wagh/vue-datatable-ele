<template>
    <flash-message />

    <slot name="table-header" />

    <table :class="tableClass">
        <thead>
            <!-- Eevn though we renders table column we given option to, override it using table-head slot  -->
            <slot name="table-head">
                <tr>
                    <th
                        v-if="actionCount"
                        class="btn-inactive"
                        :class="actionCount>1 ? `action-${actionCount}` : 'action'"
                        :colspan="actionCount"
                    />

                    <th
                        v-for="column in columns"
                        :class="getColumnClass(column)"
                    >
                        {{ column }}
                    </th>
                </tr>
            </slot>
        </thead>

        <tbody>
            <!-- table-body slot renders table rows -->
            <slot
                name="table-body"
                :showColumn="showColumn"
                :showAction="showAction"
            />

            <tr v-if="!records.length">
                <td
                    class="text-center"
                    :colspan="6"
                >
                    No Records Found.
                </td>
            </tr>
        </tbody>
    </table>

    <paginate-ele
        v-if="!withoutPagination"
        :meta="paginate"
        @pageChanged="$emit('pageChanged', $event)"
    />
</template>


<script>

    import {toSlug, sanitize, isEqualsTo} from './helper.js';
    import PaginateEle from './PaginateEle';

    export default {
        name: 'VueDatatableEle',

        props: {
            columns: Array,
            actions: Object,
            paginate: Object,
            modelValue: Array,
            tableClass: String,
            withoutPagination: Boolean,
        },

        components: {
            PaginateEle
        },

        data() {
            return {
                records: [],
            }
        },

        watch: {
            modelValue: {
                handler(newValue) {
                    if(!isEqualsTo((newValue || []), this.records)) {
                        this.records = sanitize(newValue);
                    }
                },
                immediate: true,
            },

            records: {
                handler(newValue) {
                    if(!isEqualsTo((newValue || []), this.value)) {
                        this.$emit('update:modelValue', sanitize(newValue));
                    }
                },
            }
        },

        computed: {
            actionCount() {
                return Object.values(this.actions).filter((value) => value).length;
            }
        },

        methods: {
            getColumnClass(column) {
                return toSlug(column);
            },

            showColumn(column) {
                return this.columns.includes(column);
            },

            showAction(action) {
                return this.actions[action];
            },
        }
    }

</script>