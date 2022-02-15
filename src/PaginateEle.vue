<template>
    <nav>
        <ul class="pagination justify-content-end">
            <li :class="`page-item ${canGoPrev}`">
                <a
                    href="#"
                    class="page-link"
                    @click.prevent="onPageClick(meta.page-1)"
                >
                    &laquo;
                </a>
            </li>
            <li
                v-for="page in totalPages"
                :class="`page-item ${page === meta.page ? 'active' : ''}`"
            >
                <a
                    href="#"
                    class="page-link"
                    @click.prevent="onPageClick(page)"
                >
                    {{ page }}
                </a>
            </li>
            <li :class="`page-item ${canGoNext}`">
                <a
                    href="#"
                    class="page-link"
                    @click.prevent="onPageClick(meta.page+1)"
                >
                    &raquo;
                </a>
            </li>
        </ul>
    </nav>
</template>


<script>

    export default {
        props: {
            meta: Object
        },

        computed: {
            canGoPrev() {
                return this.meta.page - 1 >= 1 ? '' : 'disabled';
            },

            canGoNext() {
                return this.meta.page === this.totalPages ? 'disabled' : '';
            },

            totalPages() {
                return Math.ceil(this.meta.total/this.meta.limit);
            }
        },

        methods: {
            onPageClick(page) {
                this.$emit('pageChanged', page)
            }
        }
    }

</script>