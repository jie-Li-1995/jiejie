<template>
  <div class="CheckCustomer">
    <h1>杰杰美女</h1>
  </div>
</template>

<script>
export default {
  name: 'CheckCustomer',
  data: () => ({
    State: true,
    Checked: [],
    Arr: [
      {
        State: false,
        id: '1'
      },
      {
        State: false,
        id: '2'
      },
      {
        State: false,
        id: '3'
      },
      {
        State: false,
        id: '4'
      },
      {
        State: false,
        id: '5'
      }
    ]
  }),
  methods: {
    ChangeState () {
      this.State = !this.State
    },
    ChangeCheck (val) {
      this.Checked = []
      this.Arr[val].State = !this.Arr[val].State
      this.Checked = this.Arr.map(item => {
        if (item.State) {
          console.log(item)
          return item.id
        }
      })
    }
  },
  watch: {
    Checked (val) {
      console.log(val)
    }
  }
}
</script>

<style lang="less">
  .CheckCustomer {
    h1 {
      position: absolute;
      top: 0;
      color: #ff6700;
      font-size: 25px;
      text-align: center;
      padding-top: 20px;
    }
  }
</style>
