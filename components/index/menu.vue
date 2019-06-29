<template>
  <div class="m-menu">
    <dl class="nav"
        @mouseleave="mouseleave">
      <dt>全部分类</dt>
      <dd
        v-for="(item,index) of menu"
        :key="index"
        @mouseenter="mouseenter(item.type)">
        <i
          :class="item.type">
        </i><nuxt-link :to="`search/${item.name}`">{{item.name}}</nuxt-link><span class="arrow"></span>
      </dd>
    </dl>
    <div class="detail"
         v-if="kind"
         @mouseenter="sover"
         @mouseleave="sout">
      <template
        v-for="(item,index) in curdetail">
        <h4
          :key="index">{{item.title}}</h4>
        <a
          v-for="v in item.child"
          :to="`/search/${v}`">{{v}}</a>
      </template>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        kind: '',
        menu: this.$store.state.home.menu
      }
    },
    computed: {
      curdetail () {
        return this.menu.filter((item) => {
          return item.type === this.kind
        })[0].child
      }
    },
    methods: {
      mouseleave () {
        let self = this
        self._timer = setTimeout(function () {
          self.kind = ''
        }, 150)
      },
      mouseenter (type) {
        this.kind = type
      },
      sover () {
        clearTimeout(this._timer)
      },
      sout () {
        this.kind = ''
      }
    }
  }
</script>

<style scoped lang="sass">

</style>
